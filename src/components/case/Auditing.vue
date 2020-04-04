<template>
  <v-container>
    <v-row>
      <v-col>
        <Outline
          v-for="cases in caseOutlineList"
          :title="cases.name"
          :id="cases.id"
          :description="cases.description"
          :state="cases.state"
          :key="cases.id"
        />
      </v-col>
    </v-row>
    <v-slide-x-transition>
      <v-snackbar
        top
        right
        :timeout="snackbar.timeout"
        color="error"
        :value="snackbar.enable"
      >
        遇到点问题，请稍后再试
      </v-snackbar>
    </v-slide-x-transition>
  </v-container>
</template>

<script>
  import Outline from "./Outline";
  import {TIME_OUT_SNACKBAR} from "../../common/settings";
  import {getIdToken} from "../../common/utils";
  import {OK} from "../../requests/apiCode";

  export default {
    name: "Auditing",
    components: {
      Outline
    },
    data: () => ({
      caseOutlineList: Object,
      snackbar: {
        timeout: TIME_OUT_SNACKBAR,
        enable: false
      }
    }),
    created() {
      console.log('case-auditing-page');
      let idToken = getIdToken();
      console.log('case-auditing-idToken: ' + idToken.toString());
      let _this = this;
      this.$api.cases.auditing(idToken.officeId).then(function (res) {
        console.log(res.data);
        if(res.data.code === OK){
          _this.caseOutlineList = res.data.data;
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
