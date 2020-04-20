<template>
  <v-container>
    <v-row>
      <v-col>
        <v-select
          :items="caseItems"
          label="关联案件"
          outlined
          v-model="caseId"
          @change="updateCase"
        />
        <v-select
          :items="government"
          label="接收主体（被监督行政机关）"
          outlined
          multiple
          chips
          deletable-chips
          clearable
          v-model="supervisedName"
        />
        <v-combobox
          label="接收邮箱"
          outlined
          multiple
          chips
          clearable
          deletable-chips
          hint="输入后回车，可添加多个"
          v-model="email"
        />
        <v-textarea
          outlined
          v-model="content"
          label="检察建议内容"
          height="400"
        />
        <v-radio-group
          v-model="deadlineChoice"
        >
          <v-radio
            :label="'2个月以内回复：' + new Date(now.getTime() + 62 * 24 * 60 * 60 * 1000).toLocaleDateString() "
            value="1"
          />
          <v-radio
            :label="'15天以内回复：' + new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString() "
            value="2"
          />
        </v-radio-group>
        <v-btn
          color="primary"
          @click="issue"
        >
          发出
        </v-btn>
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {getIdToken} from "../../common/utils";
  import {OK} from "../../requests/apiCode";
  import {TIME_OUT_SNACKBAR} from "../../common/settings";

  export default {
    name: "New",
    props: [
        'id'
    ],
    data: () => ({
      now: new Date(),
      content: "",
      caseItems: [{text: 'test1', value: 123}, {text: 'test2', value: 2}],
      caseId: "",
      government: ['请先选择关联的案件', '接收主体将根据关联案件同步更新'],
      supervisedName: [],
      deadlineChoice: "1",
      email: [],
      snackbar: {
        timeout: TIME_OUT_SNACKBAR,
        text: "成功",
        color: "success",
        enable: false
      }
    }),
    computed: {
      deadline() {
        if(this.deadlineChoice === "1"){
          return new Date(this.now.getTime() + 62 * 24 * 60 * 60 * 1000 + 8 * 3600 * 1000);  // 还得再加8小时，原因是JAVALocalDate没问题，但是存数据库会自动减去8小时，必须补回来。
        }
        else{
          return new Date(this.now.getTime() + 15 * 24 * 60 * 60 * 1000 + 8 * 3600 * 1000);
        }
      }
    },
    methods: {
      updateCase() {
        console.log(this.caseId);
        let _this = this;
        this.$api.cases.detail(this.caseId).then(function (res) {
          if(res.data.code === OK) {
            _this.government = res.data.data.government.split(',');
          }
        })
      },
      issue(){
        let suggestionNew = {};
        suggestionNew.supervisedName = this.supervisedName.join(',');
        suggestionNew.content = this.content;
        suggestionNew.deadline = this.deadline.toISOString();
        suggestionNew.caseId = this.caseId;
        suggestionNew.creatorId = getIdToken().id;
        suggestionNew.officeId = getIdToken().officeId;
        if(this.email instanceof Array){
          suggestionNew.email = this.email;
        }
        else{
          suggestionNew.email = new Array(this.email);
        }
        console.log(suggestionNew.email);
        console.log(JSON.stringify(suggestionNew));
        let _this = this;
        this.$api.suggestion.newSuggestion(suggestionNew).then(function (res) {
          if(res.data.code === OK){  // 注意是 code 不是 msg ，这居然会搞错
            console.log(res.data.data);
            _this.snackbar.color = 'success';
            _this.snackbar.text = '成功';
            _this.snackbar.enable = true;
            _this.$router.push('/suggestion/detail/' + res.data.data.id);
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
    mounted() {
      console.log(this.id);
      if(this.id !== undefined){
        this.caseId = this.id;
        this.updateCase();
      }
      console.log('suggestion-new-page');
      let idToken = getIdToken();
      console.log('suggestion-new-idToken: ' + idToken.toString());
      let _this = this;
      this.$api.cases.handlingAudited(idToken.id).then(function (res) {
        console.log(res.data);
        if(res.data.code === OK){
          let caseItemsHere = [];
          for(let item of res.data.data){  // 注意与 for-in 循环的区别
            console.log(item);
            caseItemsHere.push({'text': item.name, 'value': item.id});
          }
          _this.caseItems = caseItemsHere;
        }
        else{
          _this.snackbar.enable = true;
        }
      })
    }
  }
</script>

<style scoped>

</style>
