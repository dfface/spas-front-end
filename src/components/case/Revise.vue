<template>
  <v-container>
    <v-row>
      <v-col>
        <v-form>
          <v-text-field
                  hint="请输入案件名称，不超过50字"
                  label="1、案件名称"
                  :rules="rules.title"
                  clearable
                  outlined
                  v-model="cases.name"
          />
          <v-combobox
                  label="2、涉及的行政单位"
                  multiple
                  outlined
                  chips
                  clearable
                  deletable-chips
                  hide-no-data
                  hint="输入后回车，可添加多个"
                  v-model="cases.government"
          />
          <v-textarea
                  label="3、案情描述"
                  hint="请输入该案的总括性描述"
                  outlined
                  v-model="cases.description"
          />
          <v-textarea
                  label="4、调查情况"
                  hint="请输入该案的调查情况"
                  outlined
                  v-model="cases.investigation"
          />
        </v-form>
        <v-btn
          color="primary"
          class="ml-2 mr-4"
          @click="reviseCase"
        >修改
        </v-btn>
        <span class="font-weight-light">上次修改时间：
          {{ new Date(cases.updateTime).toLocaleDateString() + " " +  new Date(cases.updateTime).toLocaleTimeString()}}
        </span>
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
  import {CASE_AUDIT_NOT_PASSED, CASE_AUDIT_PASSED, CASE_UNAUDITED, TIME_OUT_SNACKBAR} from "../../common/settings";

  export default {
    name: "Revise",
    props: [
      'id'
    ],
    data() {
      return {
        rules: {
          title: [ val => (val || '').length <= 50 || '案件名称不能超过50字']
        },
        cases: {
          name: "",
          government: [],  // 注意这里的变化
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
    methods: {
      reviseCase(){
        let revised = {
          id: this.id,
          name: this.cases.name,
          government: this.cases.government.join(','),  // 自己序列化一下，不能直接是数组啊
          description: this.cases.description,
          investigation: this.cases.investigation,
          state: 1
        };
        console.log(revised);
        let _this = this;
        this.$api.cases.revise(revised).then(function (res) {
          if(res.data.code === OK){
            _this.snackbar.color = 'success';
            _this.snackbar.text = '成功';
            _this.snackbar.enable = true;
            _this.$router.push('/case/detail/' + revised.id);
          }
        })
            .catch(function (err) {
              console.log("遇到了一点问题： " + err);
              _this.snackbar.color = "error";
              _this.snackbar.text = "遇到了一点问题： " + err;
              _this.snackbar.enable = true;
            })
      }
    },
    created() {
      // 从服务器获取案件信息
      // 一个屡教不改的 BUG this 指针
      let _this = this;
      this.$api.cases.detail(this.id).then(function (res) {
        if(res.data.code === OK){
          // 初始化页面
          let data = res.data.data;
          console.log("case-revise-data: ");
          console.log(data);
          _this.cases.name = data.name;
          _this.cases.government = data.government.split(',');
          _this.cases.description = data.description;
          _this.cases.investigation = data.investigation;
          // state 还需文字化处理
          _this.cases.state = data.state;
          switch (data.state) {
            case CASE_UNAUDITED: _this.cases.stateText = "等待审核"; break;
            case CASE_AUDIT_NOT_PASSED: _this.cases.stateText =   "审核不通过"; break;
            case CASE_AUDIT_PASSED: _this.cases.stateText =  "审核通过"; break;
            default: _this.cases.stateText =  '未知'; break;
          }
          // 时间本地化处理
          _this.cases.createTime = new Date(data.createTime).toLocaleDateString() + ' ' + new Date(data.updateTime).toLocaleTimeString();
          _this.cases.updateTime = new Date(data.updateTime).toLocaleDateString() + ' ' + new Date(data.updateTime).toLocaleTimeString();
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
            _this.snackbar.color = "error";
            _this.snackbar.text = "遇到了一点问题： " + err;
            _this.snackbar.enable = true;
          })
    }
  }
</script>

<style scoped>

</style>
