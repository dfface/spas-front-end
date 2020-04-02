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
              <v-select
                :items="user.positionAll"
                prepend-icon="person"
                type="text"
                :rules="[rules.required]"
                placeholder="请选择您的职位"
                v-model="user.position"
              />
              <v-select
                :items="office"
                prepend-icon="person"
                type="text"
                :rules="[rules.required]"
                placeholder="请选择您要关联的检察院"
                v-model="user.officeId"
                v-if="user.position !== '行政单位人员'"
              />
              <v-select
                :items="department"
                prepend-icon="person"
                type="text"
                :rules="[rules.required]"
                placeholder="请选择您所在的部门"
                v-model="user.departmentId"
                v-if="user.officeId !== ''"
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

  export default {
    name: "Register",
    data: () => ({
      show1: false,
      show2: false,
      office: Object,  // 变化 对象格式，分为 text 和 value
      department: Object,  // 变化
      user: {
        name: "",
        email: "",
        password: "",
        passwordVer: "",
        positionAll: ["行政单位人员", "检察人员"],  // 不变 ， 删除 "检察长"
        position: "行政单位人员",  // 不变
        officeId: '',
        departmentId: '',
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
      toRegister() {
        let user = {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          position: this.user.position,
          officeId: this.user.officeId,
          departmentId: this.user.departmentId
        };
        console.log(user);
      },
    },
    mounted() {
      let office =  [
        {
          text: '内江市人民检察院',
          value: 'a887c5eb331721807d88f4e9c40e2dcd'
        },
        {
          text: '宜昌市人民检察院',
          value: '74a708c6a4d8f4bf55035540bc5adb81'
        }
      ];
      let department = [
        {
          text: '检察一组',
          value: '494a49c4e895a791b61e53df257f9f60'
        }
      ];
      this.office = office;
      this.department = department;
    }
  }
</script>

<style scoped>

</style>
