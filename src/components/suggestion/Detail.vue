<template>
  <v-container>
    <v-row>
      <v-col>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">检察建议内容</v-list-item-title>
              <v-list-item-subtitle class="grey--text">{{ suggestion.content }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">送达的行政单位</v-list-item-title>
              <v-list-item-subtitle class="grey--text">{{ suggestion.supervisedName }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">发送时间</v-list-item-title>
              <v-list-item-subtitle class="grey--text">{{ suggestion.createTime }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">回复截止日期</v-list-item-title>
              <v-list-item-subtitle class="grey--text">
                {{ suggestion.deadline }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <v-btn v-if="suggestion.sue" color="error">建议结案起诉</v-btn>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">检察建议状态</v-list-item-title>
              <v-list-item-subtitle class="grey--text">{{ suggestion.stateText }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">检察建议评分</v-list-item-title>
              <v-list-item-subtitle class="grey--text">{{ suggestion.score ? parseFloat(suggestion.score).toFixed(2) : '无' }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-menu
            v-model="menu.enable"
            fixed
            offset-overflow
            max-width="1000"
          >
            <template v-slot:activator="{ on }">
              <v-list-item v-on="on">
                <v-list-item-content>
                  <v-list-item-title class="title">关联的案件</v-list-item-title>
                  <v-list-item-subtitle class="grey--text"> 鼠标单击以显示 </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </template>
<!--            注意这里强制刷新了组件，绑定key值-->
            <v-card>
              <CaseDetail :caseId="suggestion.caseId" :key="suggestion.id"/>
            </v-card>
          </v-menu>

        </v-list>
      </v-col>
    </v-row>

    <v-snackbar
      top
      right
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :value="snackbar.enable"
    >
      {{snackbar.text}}
    </v-snackbar>
  </v-container>
</template>

<script>
  import {
    SUGGESTION_ISSUED,
    SUGGESTION_REPLIED,
    TIME_OUT_SNACKBAR,
    SUGGESTION_NEED_NEW_REPLY,
    SUGGESTION_FINISHED,
    SUGGESTION_TO_PROSECUTE
  } from "../../common/settings";
  import CaseDetail from "../case/Detail";
  import {OK} from "../../requests/apiCode";
  export default {
    name: "SuggestionDetail",
    props: [
      "id"
    ],
    components: {
      CaseDetail
    },
    data: () => ({
      suggestion: Object,
      sue: false,
      menu: {
        enable: false,
      },
      snackbar: {
        timeout: TIME_OUT_SNACKBAR,
        text: "成功",
        color: "success",
        enable: false
      },
    }),
    created() {
      let suggestionId = this.id;
      let _this = this;
      this.$api.suggestion.detail(suggestionId).then(function (res) {
        console.log(res.data);
        if(res.data.code === OK){
          _this.suggestion = res.data.data;
          switch (res.data.data.state) {
            case SUGGESTION_ISSUED: _this.suggestion.stateText = "等待回复"; break;
            case SUGGESTION_REPLIED: _this.suggestion.stateText = "已回复，等待评价"; break;
            case SUGGESTION_NEED_NEW_REPLY: _this.suggestion.stateText = "等待新一轮整改后回复"; break;
            case SUGGESTION_FINISHED: _this.suggestion.stateText = "整改完成，完全履职"; break;
            case SUGGESTION_TO_PROSECUTE: _this.suggestion.stateText = "已准备起诉"; break;
            default: _this.suggestion.stateText = "未知"; break;
          }
          _this.suggestion.createTime = new Date(res.data.data.createTime).toLocaleDateString() + ' ' + new Date(res.data.data.createTime).toLocaleTimeString();
          _this.suggestion.deadline = new Date(res.data.data.deadline).toLocaleDateString() + ' ' + new Date(res.data.data.deadline).toLocaleTimeString();
        }
      })
    }
  }
</script>

<style scoped>

</style>
