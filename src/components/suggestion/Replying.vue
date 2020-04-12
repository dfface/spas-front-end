<template>
  <v-container>
    <v-row>
      <v-col>
        <v-content v-if="suggestionList.length === 0">提示：暂时没有需要回复的检察建议</v-content>
        <SuggestionOutline
          v-for="item in suggestionList"
          :suggestion="item"
          :key="item.id"
        />
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
  import SuggestionOutline from "./Outline";
  import {OK} from "../../requests/apiCode";
  import {TIME_OUT_SNACKBAR} from "../../common/settings";
  export default {
    name: "Replying",
    props: [
      'isGov'
    ],
    components: {
      SuggestionOutline
    },
    data: () => ({
      suggestionList: [],
      snackbar: {
        enable: false,
        text: "",
        color: "error",
        timeout: TIME_OUT_SNACKBAR
      }
    }),
    mounted() {
      let _this = this;
      if (this.isGov) {
        this.$api.suggestion.replying().then(function (res) {
          if (res.data.code === OK) {
            _this.suggestionList = res.data.data;
          } else {
            _this.snackbar.text = "遇到点问题: " + res.data.msg;
            _this.snackbar.color = "error";
            _this.snackbar.enable = true;
          }
        })
          .catch(function (err) {
            _this.snackbar.text = "遇到点问题； " + err.value;
            _this.snackbar.color = "error";
            _this.snackbar.enable = true;
          })
      }
      else{
        this.$api.suggestion.waitingReply().then(function (res) {
          if (res.data.code === OK) {
            _this.suggestionList = res.data.data;
          } else {
            _this.snackbar.text = "遇到点问题: " + res.data.msg;
            _this.snackbar.color = "error";
            _this.snackbar.enable = true;
          }
        })
          .catch(function (err) {
            _this.snackbar.text = "遇到点问题； " + err.value;
            _this.snackbar.color = "error";
            _this.snackbar.enable = true;
          })
      }
    }
  }
</script>

<style scoped>

</style>
