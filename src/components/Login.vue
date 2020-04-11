<template>
  <v-container fluid>
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        md="4"
        sm="8"
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>请登录</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-autocomplete
                :items="office"
                item-text="name"
                item-value="id"
                prepend-icon="person"
                type="text"
                placeholder="请选择您要登入的检察院"
                v-model="officeId"
              />
              <v-text-field
                name="login"
                prepend-icon="person"
                type="email"
                placeholder="请输入注册时使用的邮箱"
                v-model="email"
              />
              <v-text-field
                name="password"
                prepend-icon="lock"
                type="password"
                v-model="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn
              color="primary"
              @click="login"
            >
              登录
            </v-btn>
          </v-card-actions>
        </v-card>
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
  import {apiLogin,apiIsLogged} from '../requests/api'
  import {LOGIN_SUCCESS, IS_LOGGED_TRUE, OK, USER_AUDIT_NOT_PASSED} from '../requests/apiCode'
  import {mapMutations} from 'vuex'
  import {setIdToken} from '../common/utils'
  import {TIME_OUT_SNACKBAR} from '../common/settings'

  export default {
    name: "Login",
    data(){
      return {
        office: [],
        officeId: "",
        email: "",
        password: "",
        snackbar: {
          enable: false,
          text: "",
          color: "error",
          timeout: TIME_OUT_SNACKBAR
        }
      }
    },
    methods: {
      ...mapMutations(['changeAccessToken','changeIsLogged']),
      login(){
        // 先查看是否已经登录
        let _this = this;
        apiIsLogged().then(function (res) {
          console.log("Login-isLoggedServer: " + res.msg);
          if(res.code === IS_LOGGED_TRUE) {
            // 已经登录，弹窗提示
            _this.snackbar.text = res.msg;
            _this.snackbar.enable = true;
          }
          else {
            // 一个重要问题是找不到 this
            apiLogin(_this.officeId, _this.email,_this.password).then(function (res) {
              console.log("Login: " + res.msg);
              if(res.code === LOGIN_SUCCESS){
                let idTokenUnparse = res.data.idToken;
                let accessToken = res.data.accessToken;
                // accessToken 提交给 vuex
                _this.changeAccessToken(accessToken);
                // 保存 idToken 到 localStorage
                setIdToken(idTokenUnparse);
                _this.changeIsLogged(true);
                // 转到主页
                _this.$router.push('/');
              }
              else if(res.code === USER_AUDIT_NOT_PASSED){
                _this.snackbar.color = "error";
                _this.snackbar.text = res.msg;
                _this.snackbar.enable = true;
              }
              else{
                // 已经登录，弹窗提示
                _this.snackbar.color = "error";
                _this.snackbar.text = res.msg;
                _this.snackbar.enable = true;
              }
            })
          }
        })
        .catch(function (err) {
          console.log("遇到了一个问题：" + err);
        });
      }
    },
    mounted() {
      let _this = this;
      // 获取检察院
      this.$api.office.all().then(function (res) {
        if(res.data.code ===  OK){
          _this.office = res.data.data.map(entry => {
            return Object.assign({}, {id: entry.id}, {name: entry.name});
          })
        }
        console.log(_this.office);
      });
    }
  }
</script>

<style scoped>

</style>
