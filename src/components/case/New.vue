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
            @input="save"
          />
          <v-combobox
            label="2、涉及的行政单位"
            multiple
            outlined
            no-filter
            chips
            clearable
            deletable-chips
            hide-no-data
            append-icon=""
            hint="输入后回车，可添加多个"
            v-model="cases.government"
            @input="save"
          />
          <v-textarea
            label="3、案情描述"
            hint="请输入该案的总括性描述"
            outlined
            v-model="cases.description"
            @input="save"
          />
          <v-textarea
            label="4、调查情况"
            hint="请输入该案的调查情况"
            outlined
            v-model="cases.investigation"
            @input="save"
          />
        </v-form>
          <v-btn
            color="primary"
            @click="submit"
          >确认
          </v-btn>
      </v-col>
    </v-row>
    <v-slide-x-transition>
      <v-snackbar
        top
        right
        :timeout="snackbar.timeout"
        :color="snackbar.color"
        :value="snackbar.enable"
      >
        {{ snackbar.text }}
      </v-snackbar>
    </v-slide-x-transition>
  </v-container>
</template>

<script>
  import {TIME_OUT_SNACKBAR, CASE_UNAUDITED, LS_CASE_NEW} from '../../common/settings'
  import {getIdToken, getItem, removeItem, setItem} from '../../common/utils'
  import {OK} from "../../requests/apiCode";
  export default {
    name: "New",
    data: () => ({
      rules: {
        title: [ val => (val || '').length <= 50 || '案件名称不能超过50字']
      },
      snackbar: {
        timeout: TIME_OUT_SNACKBAR,
        text: "成功",
        color: "success",
        enable: false
      },
      cases:{
        name: "",
        government: "",
        description: "",
        investigation: ""
      }
    }),
    methods: {
      save() {
        let caseNew = {
          name: this.cases.name,
          government: this.cases.government,  // combox 是个数组
          description: this.cases.description,
          investigation: this.cases.investigation
        };
        setItem(LS_CASE_NEW,caseNew);
        return caseNew;
      },
      submit() {
        // 获取信息
        let caseNew = this.save();  // 必须对其中的数组进行处理
        caseNew.government = caseNew.government.join(',');
        let idToken = getIdToken();
        caseNew['state'] = CASE_UNAUDITED;
        caseNew['creatorId'] = idToken.id;
        caseNew['officeId'] = idToken.officeId;
        console.log("new-case: " + caseNew);
        let _this = this;
        this.$api.cases.newCase(caseNew).then(function (res) {
          if(res.data.code === OK){
            // 成功
            // this.snackbar.enable = true;  // 多余
            // 删除 localStorage
            removeItem(LS_CASE_NEW);
            // 跳转
            _this.$router.push({name: 'CaseDetail', params: {caseId: res.data.data}});
          }
          else{
            // 失败
            _this.snackbar.text = res.data.msg;
            _this.snackbar.color = "error";
            _this.snackbar.enable = true;
          }
        })
        .catch(function (err) {
          console.log(err);
        })
      }
    },
    created() {
      let caseNew = getItem(LS_CASE_NEW);
      if(caseNew){
        this.cases.name = caseNew.name;
        this.cases.government = caseNew.government;
        this.cases.description = caseNew.description;
        this.cases.investigation = caseNew.investigation;
      }
    }
  }
</script>

<style scoped>

</style>
