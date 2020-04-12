<template>
  <v-container>
    <v-row>
      <v-col>
        <v-form>
          <v-select
            label="选择要回复的检察建议"
            outlined
            :items="suggestionItems"
            v-model="report.suggestionId"
          />
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
  import {getIdToken} from "../../common/utils";
  import {OK} from "../../requests/apiCode";
  import {TIME_OUT_SNACKBAR} from "../../common/settings";

  export default {
    name: "New",
    data: () => ({
      suggestionList: [],
      suggestionItems: [],
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
        this.$api.report.newReport(reportDto).then(function (res) {
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
        })
    }
  }
</script>

<style scoped>

</style>
