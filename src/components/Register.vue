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
            <v-toolbar-title>欢迎注册</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                name="name"
                prepend-icon="person"
                type="text"
                :rules="[rules.required]"
                placeholder="请输入您的姓名，以便审核"
                v-model="user.name"
              />
              <v-text-field
                name="email"
                prepend-icon="email"
                type="email"
                :rules="[rules.required]"
                placeholder="请输入您的邮箱，作为登录账号"
                v-model="user.email"
              />
              <v-text-field
                name="password"
                prepend-icon="lock"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
                :rules="[rules.required]"
                placeholder="请设置您的密码，作为登录密码"
                v-model="user.password"
              />
              <v-text-field
                name="passwordVer"
                prepend-icon="lock"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                @click:append="show2 = !show2"
                placeholder="请再次输入您的密码，以进行校验"
                :rules="[rules.passwordVerify(user.passwordVer,user.password)]"
                v-model="user.passwordVer"
              />
              <v-autocomplete
                :items="office"
                item-text="name"
                item-value="id"
                prepend-icon="person"
                type="text"
                :rules="[rules.required]"
                placeholder="请选择您要关联的检察院"
                v-model="user.officeId"
                @change="getRoles"
              />
              <v-select
                :items="role"
                prepend-icon="person"
                type="text"
                :rules="[rules.required]"
                placeholder="请选择您的角色，以待检察长审核"
                v-model="user.roleId"
                v-if="(user.officeId !== '')"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn
              color="primary"
              @click="toRegister"
            >
              注册
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
  import {TIME_OUT_SNACKBAR} from "../common/settings";
  import {ALREADY_REGISTERED, OK} from "../requests/apiCode";

  export default {
    name: "Register",
    data: () => ({
      show1: false,
      show2: false,
      office: [],  // 变化 对象格式，分为 text 和 value
      role: [],  // 变化
      user: {
        name: "",
        email: "",
        password: "",
        passwordVer: "",
        officeId: '',
        roleId: '',
      },
      rules: {
        required: value => !!value || '此字段必须填写',
        passwordVerify: function(value, password){
          return (value === password) || '两次输入的密码不匹配'
        }
      },
      snackbar: {
        enable: false,
        text: "",
        color: "error",
        timeout: TIME_OUT_SNACKBAR
      },
    }),
    methods: {
      getRoles(){
        console.log("Register-user.officeId: " + this.user.officeId);
        let _this = this;
        this.$api.office.roles(this.user.officeId).then(function (res) {
          if(res.data.code === OK){
            _this.role = res.data.data.map(entry => Object.assign({}, {text: entry.description, value: entry.id}))
          }
        });
        console.log(this.role);
      },
      getPosition(id) {
        for( let {text, value} of this.role){
          if(value === id){
            return text;
          }
        }
      },
      getOfficeName(officeId){
        for(let {id, name} of this.office){
          if(id === officeId){
            return name;
          }
        }
      },
      toRegister() {
        let user = {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          officeId: this.user.officeId,
          roleId: this.user.roleId,
          position: this.getPosition(this.user.roleId) || '',
          officeName: this.getOfficeName(this.user.officeId) || ''
        };
        console.log(user);
        let _this = this;
        this.$api.home.register(user).then(function (res) {
          if(res.data.code === OK){
            console.log("申请的用户id：" + res.data.data);
            _this.snackbar.text = "注册成功，请等待审核！";
            _this.snackbar.color = "success";
            _this.snackbar.enable = true;
            setTimeout(function () {
              _this.$router.push("/login");
            }, TIME_OUT_SNACKBAR);
          }
          else if(res.data.code === ALREADY_REGISTERED){
            _this.snackbar.text = res.data.msg;
            _this.snackbar.color = "error";
            _this.snackbar.enable = true;
          }
        })
        .catch(function (err) {
          _this.snackbar.text = "遇到了问题：" + err;
          _this.snackbar.color = "error";
          _this.snackbar.enable = true;
        })
      },
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
      });
    }
  }
</script>

<style scoped>

</style>
