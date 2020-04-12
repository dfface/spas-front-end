<template>
  <v-container>
    <v-row>
      <v-col>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title"> 整改报告内容 </v-list-item-title>
              <v-list-item-subtitle> {{ reportDetail.content }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title"> 整改报告评价 </v-list-item-title>
              <v-list-item-subtitle> {{ reportDetail.judge || '暂无' }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title"> 整改报告评分 </v-list-item-title>
              <v-list-item-subtitle> {{ reportDetail.score || '暂无' }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title"> 创建时间 </v-list-item-title>
              <v-list-item-subtitle> {{ new Date(reportDetail.createTime).toLocaleDateString() + " " +  new Date(reportDetail.createTime).toLocaleTimeString() || '暂无' }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title"> 更新时间 </v-list-item-title>
              <v-list-item-subtitle> {{ new Date(reportDetail.updateTime).toLocaleDateString() + " " + new Date(reportDetail.updateTime).toLocaleTimeString() || '暂无' }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-menu
            v-model="menu.enable"
            fixed
            offset-y
            max-width="1000"
          >
            <template v-slot:activator="{ on }">
              <v-list-item v-on="on">
                <v-list-item-content>
                  <v-list-item-title class="title">关联的检察建议</v-list-item-title>
                  <v-list-item-subtitle class="grey--text"> 鼠标单击以显示 </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
            <!--            注意这里强制刷新了组件，绑定key值-->
            <v-card>
              <SuggestionDetail :id="reportDetail.suggestionId" :key="reportDetail.suggestionId"/>
            </v-card>
          </v-menu>
        </v-list>
      </v-col>
    </v-row>
    <v-row v-if="(reportDetail.state === REPORT_NOT_JUDGE) && (this.$store.state.roles.indexOf('procurator') !== -1)">
      <v-col>
          <v-textarea
            name="judge"
            outlined
            label="整改报告评价"
            v-model="reportDetail.judge"
          />
          <span class="ma-2">评分</span>
          <v-rating
            v-model="reportDetail.score"
            half-increments
            class="mb-12"
          />
          <v-select
            :items="items"
            label="选择后续程序"
            v-model="nextState"
            outlined
          />
          <v-btn
            color="primary"
            @click="evaluate"
          >
            提交
          </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="this.$store.state.roles.indexOf('administrative_personnel') !== -1 && reportDetail.state === 1">
      <v-col>
        <v-btn color="primary" class="mx-2" :to="`/report/revise/${reportDetail.id}`">修改</v-btn>
      </v-col>
    </v-row>
    <v-slide-x-transition>
      <v-snackbar
        right
        top
        :timeout="snackbar.timeout"
        :color="snackbar.color"
        v-model="snackbar.enable"
      >
        {{ snackbar.text }}
      </v-snackbar>
    </v-slide-x-transition>
  </v-container>
</template>

<script>
  import SuggestionDetail from '../suggestion/Detail'
  import {
    REPORT_NOT_JUDGE,
    SITUATION_RECTIFY,
    SITUATION_FINISHED,
    SITUATION_SERIOUS,
    TIME_OUT_SNACKBAR
  } from "../../common/settings";
  import {OK} from "../../requests/apiCode";

  export default {
    name: "ReportDetail",
    props: [
      'id'
    ],
    components: {
      SuggestionDetail,
    },
    data: () => ({
      REPORT_NOT_JUDGE: REPORT_NOT_JUDGE,
      reportDetail: Object,
      menu: {
        enable: false,
      },
      snackbar: {
        enable: false,
        text: "",
        color: "error",
        timeout: TIME_OUT_SNACKBAR
      },
      items: [
        {
          text: '等待新一轮整改',
          value: SITUATION_RECTIFY
        },
        {
          text: '整改完成',
          value: SITUATION_FINISHED
        },
        {
          text: '进入起诉阶段',
          value: SITUATION_SERIOUS
        }
      ],
      nextState: SITUATION_RECTIFY
    }),
    methods: {
      evaluate(){
        let reportJudgeDto = {};
        let _this = this;
        reportJudgeDto.id = this.reportDetail.id;
        reportJudgeDto.judge = this.reportDetail.judge;
        reportJudgeDto.score = this.reportDetail.score;
        reportJudgeDto.nextState = this.nextState;
        this.$api.report.evaluate(reportJudgeDto).then(function (res) {
          if(res.data.code === OK ){
            _this.snackbar.text = "提交成功";
            _this.snackbar.color = "success";
            _this.snackbar.enable = true;
            // 强制刷新组件
            setTimeout(function () {
              _this.$forceUpdate();
            }, _this.snackbar.timeout);
          }
          else{
            _this.snackbar.text = "遇到点问题: " + res.data.msg;
            _this.snackbar.color = "error";
            _this.snackbar.enable = true;
          }
        })
        .catch(function (err) {
          _this.snackbar.text = "遇到点问题: " + err.value;
          _this.snackbar.color = "error";
          _this.snackbar.enable = true;
        })
      }
    },
    mounted() {
      let _this = this;
      console.log("ReportDetail id: " + this.id);
      this.$api.report.detail(this.id).then(function (res) {
        if(res.data.code === OK){
          _this.reportDetail = res.data.data;
        }
        else{
          _this.snackbar.text = "遇到点问题: " + res.data.msg;
          _this.snackbar.color = "error";
          _this.snackbar.enable = true;
        }
      })
        .catch(function (err) {
          _this.snackbar.text = "遇到点问题: " + err.value;
          _this.snackbar.color = "error";
          _this.snackbar.enable = true;
        })
    }
  }
</script>

<style scoped>

</style>
