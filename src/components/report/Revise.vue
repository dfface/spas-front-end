<template>
  <v-container>
    <v-row>
      <v-col>
        <v-form>
          <v-textarea
            outlined
            label="整改报告内容"
            v-model="report.content"
          />
          <v-btn
            color="primary"
            @click="submit"
          >
            提交
          </v-btn>
          <span class="font-weight-light ml-4">上次修改时间：
            {{ new Date(oldReport.updateTime).toLocaleDateString() + " " + new Date(oldReport.updateTime).toLocaleTimeString()}}
          </span>
        </v-form>
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
  import {TIME_OUT_SNACKBAR} from "../../common/settings";
  import {getIdToken} from "../../common/utils";
  import {OK} from "../../requests/apiCode";

  export default {
    name: "ReportRevise",
    props: [
      'id'
    ],
    data: () => ({
      suggestionList: [],
      suggestionItems: [],
      oldReport: Object,
      report: {
        content: "",
        caseId: "",
        suggestionId: ""
      },
      snackbar: {
        enable: false,
        text: "",
        color: "error",
        timeout: TIME_OUT_SNACKBAR
      }
    }),
    methods: {
      submit(){
        let reportDto = {};
        let idToken = getIdToken();
        let _this = this;
        for(let suggestion of this.suggestionList){  // 这里不对哦，不是suggestionItems（被处理过）
          console.log(suggestion);
          if(suggestion.id === this.report.suggestionId){
            this.report.caseId = suggestion.caseId;
          }
        }
        reportDto.caseId = this.report.caseId;
        reportDto.content = this.report.content;
        reportDto.creatorId = idToken.id;
        reportDto.suggestionId = this.report.suggestionId;
        reportDto.officeId = idToken.officeId;
        this.$api.report.revise(this.id,reportDto).then(function (res) {
          if(res.data.code === OK){
            // 成功跳转即可
            _this.$router.push({name: 'ReportDetail', params: { id: res.data.msg }});  // 注意msg
          }
          else{
            _this.snackbar.text = "遇到点问题：" + res.data.msg;
            _this.snackbar.color = "error";
            _this.snackbar.enable = true;
          }
        })
          .catch(function (err) {
            _this.snackbar.text = "遇到点问题：" + err.value;
            _this.snackbar.color = "error";
            _this.snackbar.enable = true;
          })
      },
    },
    mounted() {
      let _this = this;
      this.$api.suggestion.replying().then(function (res) {
        if(res.data.code === OK){
          _this.suggestionList = res.data.data;
          // 处理 suggestionItems
          _this.suggestionItems = res.data.data.map(function (element) {
            return {text: element.content, value: element.id};
          });
          console.log(_this.suggestionItems);
        }
        else{
          _this.snackbar.text = "遇到点问题：" + res.data.msg;
          _this.snackbar.color = "error";
          _this.snackbar.enable = true;
        }
      })
        .catch(function (err) {
          _this.snackbar.text = "遇到点问题：" + err.value;
          _this.snackbar.color = "error";
          _this.snackbar.enable = true;
        });
      // 加入已经填入的内容
      this.$api.report.detail(this.id).then(function (res) {
        if(res.data.code === OK){
          _this.oldReport = res.data.data;
          _this.report.suggestionId = res.data.data.suggestionId;
          _this.report.caseId = res.data.data.caseId;
          _this.report.content = res.data.data.content;
        }
        else{
          _this.snackbar.text = "遇到点问题：" + res.data.msg;
          _this.snackbar.color = "error";
          _this.snackbar.enable = true;
        }
      })
        .catch(function (err) {
          _this.snackbar.text = "遇到点问题：" + err.value;
          _this.snackbar.color = "error";
          _this.snackbar.enable = true;
        });
    }
  }
</script>

<style scoped>

</style>
