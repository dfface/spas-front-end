<template>
  <v-container>
    <v-row>
      <v-col>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">案件名称</v-list-item-title>
              <v-list-item-subtitle class="grey--text">{{ cases.name }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">涉及的行政单位</v-list-item-title>
              <v-list-item-subtitle class="grey--text">{{ cases.government }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">案情描述</v-list-item-title>
              <v-list-item-subtitle class="grey--text">{{ cases.description }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">调查情况</v-list-item-title>
              <v-list-item-subtitle class="grey--text">{{ cases.investigation }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">案件状态</v-list-item-title>
              <v-list-item-subtitle class="grey--text">{{ cases.stateText }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="title">创建时间</v-list-item-title>
              <v-list-item-subtitle class="grey--text">{{ cases.createTime }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
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
  import {OK} from "../../requests/apiCode";
  import {TIME_OUT_SNACKBAR, CASE_UNAUDITED, CASE_AUDIT_NOT_PASSED, CASE_AUDIT_PASSED} from "../../common/settings";

  export default {
    name: "Detail",
    props: [
      'caseId'
    ],
    data() {
      return {
        cases: {
          name: "",
          government: "",
          description: "",
          investigation: "",
          state: "",
          stateText: "",
          opinion: "",
          createTime: "",
          updateTime: "",
          terminateTime: "",
          creatorName: "",
          creatorId: ""
        },
        snackbar: {
          text: "遇到点问题，请稍后再试",
          color: "error",
          enable: false,
          timeout: TIME_OUT_SNACKBAR
        }
      }
    },
    created() {
      // 从服务器获取案件信息
      // 一个屡教不改的 BUG this 指针
      let _this = this;
      this.$api.cases.detail(this.caseId).then(function (res) {
        if(res.data.code === OK){
          // 初始化页面
          let data = res.data.data;
          console.log("case-detail: ");
          console.log(data);
          _this.cases.name = data.name;
          _this.cases.government = data.government;
          _this.cases.description = data.description;
          _this.cases.investigation = data.investigation;
          // state 还需文字化处理
          _this.cases.state = data.state;
          switch (data.state) {
            case CASE_UNAUDITED: _this.cases.stateText = "未经审核"; break;
            case CASE_AUDIT_NOT_PASSED: _this.cases.stateText = "审核不通过"; break;
            case CASE_AUDIT_PASSED: _this.cases.stateText = "审核通过"; break;
          }
          // 时间本地化处理
          _this.cases.createTime = new Date(data.createTime).toLocaleDateString();
          _this.cases.updateTime = data.updateTime;
          _this.cases.terminateTime = data.terminateTime;
          _this.cases.creatorName = data.creatorName;
          _this.cases.creatorId = data.creatorId;
          _this.cases.opinion = data.opinion;
        }
        else{
          _this.snackbar.enable = true;
        }
      })
      .catch(function (err) {
        console.log("遇到了一点问题： " + err);
        _this.snackbar.enable = true;
      })
    }
  }
</script>

<style scoped>

</style>
