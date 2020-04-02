<template>
  <v-container>
    <v-row>
      <v-col>
        <Outline
          v-for="c in caseOutlineList"
          :title="c.name"
          :id="c.id"
          :description="c.description"
          :state="c.state"
          :key="c.id"
        />
        <v-lazy

        >
          <v-pagination
            v-model="current"
            :length="length"
            @input="input"
            @next="next"
            @previous="previous"
          />
        </v-lazy>
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
    name: "History",
    components: {
      Outline
    },
    data: () => ({
      caseOutlineList: Object,
      current: 1,
      length: 5,
      snackbar: {
        timeout: TIME_OUT_SNACKBAR,
        enable: false
      }
    }),
    methods: {
      get() {
        let idToken = getIdToken();
        let _this = this;
        this.$api.cases.history(idToken.id,this.current).then(function (res) {
          console.log(res.data);
          if(res.data.code === OK){
            _this.caseOutlineList = res.data.data.content;
            _this.current = res.data.data.current;
            _this.length = res.data.data.count;
          }
          else{
            _this.snackbar.enable = true;
          }
        })
      },
      input(){
        this.get();
      },
      next(){
        this.get();
      },
      previous(){
        this.get();
      }
    },
    created() {
      console.log('case-history-page');
      let idToken = getIdToken();
      console.log('case-history-idToken: ' + idToken.toString());
      let _this = this;
      this.$api.cases.history(idToken.id,this.current).then(function (res) {
        console.log(res.data);
        if(res.data.code === OK){
          _this.caseOutlineList = res.data.data.content;
          _this.current = res.data.data.current;
          _this.length = res.data.data.count;
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
