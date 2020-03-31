<template>
  <v-container>
    <v-row>
      <v-col>
        <div>{{ cases.name }}</div>
        <div>{{ cases.government }}</div>
        <div>{{ cases.description }}</div>
        <div>{{ cases.investigation }}</div>
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
  import {TIME_OUT_SNACKBAR} from "../../common/settings";

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
          _this.cases.state = data.state;
          _this.cases.createTime = data.createTime;
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
        this.snackbar.enable = true;
      })
    }
  }
</script>

<style scoped>

</style>
