<template>
  <v-container>
    <v-row>
      <v-col>
        <v-form>
          <v-text-field
            name="associate"
            type="text"
            placeholder="请输入邮件中给予的密码以关联案件"
            v-model="secret"
          />
          <v-btn
            color="primary"
            @click="doAssociate"
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
  import {TIME_OUT_SNACKBAR} from "../../common/settings";
  import {OK} from "../../requests/apiCode";

  export default {
    name: "Associate",
    data: () => ({
      secret: "",
      snackbar: {
        enable: false,
        text: "",
        color: "error",
        timeout: TIME_OUT_SNACKBAR
      }
    }),
    methods: {
      doAssociate(){
        console.log(this.secret);
        let _this = this;
        this.$api.suggestion.associate(this.secret).then(function (res) {
          if(res.data.code === OK){
            _this.snackbar.text = "关联检察建议成功";
            _this.snackbar.color = "success";
            _this.snackbar.enable = true;
            setTimeout(function () {
              _this.$router.push('/suggestion/replying');
            },_this.snackbar.timeout);
          }
          else{
            _this.snackbar.text = "遇到点问题";
            _this.snackbar.color = "error";
            _this.snackbar.enable = true;
          }
        })
        .catch(function (err) {
          _this.snackbar.text = "遇到点问题： " + err.value;
          _this.snackbar.color = "error";
          _this.snackbar.enable = true;
        })
      }
    }
  }
</script>

<style scoped>

</style>
