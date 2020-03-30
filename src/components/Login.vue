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
  </v-container>
</template>

<script>
  import {apiLogin} from '../requests/api'
  import {LOGIN_SUCCESS} from '../requests/apiCode'
  import {mapMutations} from 'vuex'
  import {setIdToken} from '../common/utils'
  export default {
    name: "Login",
    data(){
      return {
        email: "",
        password: ""
      }
    },
    methods: {
      ...mapMutations(['changeAccessToken']),
      login(){
        // 一个重要问题是找不到 this
        let that = this;
        apiLogin(this.email,this.password).then(function (res) {
          console.log(res);
          if(res.code === LOGIN_SUCCESS){
            let idTokenUnparse = res.data.idToken;
            let accessToken = res.data.accessToken;
            // accessToken 提交给 vuex
            that.changeAccessToken(accessToken);
            // 保存 idToken 到 localStorage
            setIdToken(idTokenUnparse);
            // 转到主页
            that.$router.push('/');
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
