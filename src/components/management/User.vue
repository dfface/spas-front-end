<template>
<!--  添加等待激活的人员表格-->
  <v-data-table
    :headers="headers"
    :items="userRoleInfos"
  >
    <template v-slot:top>
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
      <v-toolbar flat>

        <v-toolbar-title v-if="$store.state.roles.indexOf('chief_procurator') !== -1">所有</v-toolbar-title>
        <v-toolbar-title>
          <v-select
            v-if="$store.state.roles.indexOf('super_admin') !== -1"
            :items="offices"
            v-model="officeId"
            @change="changeOffice"
          />
        </v-toolbar-title>
        <v-divider class="mx-4" inset vertical/>
        <v-toolbar-title>人员管理</v-toolbar-title>
        <v-spacer/>
        <v-dialog v-model="dialog.enable">
          <v-card>
            <v-card-title>
              <span class="headline">{{ dialog.title }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.name"
                      label="姓名"
                      />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.position"
                      label="职位"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.email"
                      label="邮箱"
                    />
                  </v-col>
                </v-row>
<!--                选择状态，有：通过（正常）和不通过（禁用），还有一个是未审核.-->
                <v-row>
                  <v-col>
                    <v-select
                      :items="editedStateText"
                      v-model="editedItem.state"
                      label="状态"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-select
                      :items="editedRolesText"
                      v-model="editedItem.roles"
                      multiple
                      label="角色"
                      @change="JSON.stringify(editedItem.roles.sort()) === JSON.stringify(editedItem.rolesBefore.sort())? editedItem.rolesChanged = false : editedItem.rolesChanged = true"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer/>
              <v-btn
                color="primary"
                @click="dialog.enable = false"
              >取消</v-btn>
              <v-btn
                color="primary"
                @click="submit"
              >提交</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >mdi-pencil</v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script>
  import {
    USER_REGISTERED,
    USER_REGISTER_NOT_PASSED,
    USER_REGISTER_PASSED, TIME_OUT_SNACKBAR,
  } from '../../common/settings'
  import {
    getIdToken
  } from '../../common/utils'
  import {OK} from "../../requests/apiCode";
  export default {
    name: "UserManagement",
    data(){
      return {
        snackbar: {
          enable: false,
          text: "",
          color: "error",
          timeout: TIME_OUT_SNACKBAR
        },
        offices: [],
        officeId: getIdToken().officeId,
        headers: [
          {
            text: "姓名",
            value: "name"
          },
          {
            text: "职位",
            value: "position"
          },
          {
            text: "邮箱",
            value: "email"
          },
          {
            text: "角色",
            value: "roles"
          },
          {
            text: "状态",
            value: "stateText"
          },
          {
            text: '操作',
            value: 'actions',
            sortable: false
          }
        ],
        userRoleInfos: [],
        dialog: {
          enable: false,
          title: "修改信息",
        },
        editedItem: {
          index: Number,
          userId: "",
          name: "",
          position: "",
          email: "",
          state: Number,
          roles: [],  // 字符串数组,
          rolesBefore: [],
          rolesChanged: false
        },
        editedStateText: [
          {
            text: "未审核",
            value: USER_REGISTERED
          },
          {
            text: "通过",
            value: USER_REGISTER_PASSED
          },
          {
            text: "不通过",
            value: USER_REGISTER_NOT_PASSED
          }
        ],
        editedRolesText: []  // 需要初始化获取检察院所有可用角色，值是id

      }
    },
    methods: {
      submit(){
        // 提交更改
        console.log(this.editedItem);
        let userRoleUpdateDto = {};
        let _this = this;
        userRoleUpdateDto.userId = this.editedItem.userId;
        userRoleUpdateDto.name = this.editedItem.name;
        userRoleUpdateDto.position = this.editedItem.position;
        userRoleUpdateDto.email = this.editedItem.email;
        userRoleUpdateDto.state = this.editedItem.state;
        userRoleUpdateDto.officeId = getIdToken().officeId;
        if(this.editedItem.rolesChanged) {
          userRoleUpdateDto.roles = this.editedItem.roles;
          this.$api.user.revise(userRoleUpdateDto).then(function (res) {
            if(res.data.code === OK){
              _this.snackbar.color = "success";
            }
            else{
              _this.snackbar.color = "error";
            }
            _this.snackbar.text = res.data.msg;
            _this.snackbar.enable = true;
          })
        }
        else{
          userRoleUpdateDto.roles = ["no-data"];
          this.$api.user.revise(userRoleUpdateDto).then(function (res) {
            if(res.data.code === OK){
              _this.snackbar.color = "success";
            }
            else{
              _this.snackbar.color = "error";
            }
            _this.snackbar.text = res.data.msg;
            _this.snackbar.enable = true;
          });
        }
        this.dialog.enable = false;
        // userId: item.userId, name: item.name, position: item.position, email: item.email, state: item.state, stateText: stateText, roles, rolesId
        let userId = this.editedItem.userId;
        let name = this.editedItem.name;
        let position = this.editedItem.position;
        let email = this.editedItem.email;
        let state = this.editedItem.state;
        let stateText;
        // 特别注意，都是字符串，要准确判断，必须转换类型
        switch (Number(state)) {
          case USER_REGISTERED: stateText =  '等待审核'; break;
          case USER_REGISTER_NOT_PASSED: stateText =  '已禁用'; break;
          case USER_REGISTER_PASSED: stateText =  '正常使用'; break;
          default: stateText = '未知'; break;
        }
        let roles = [];
        for(let role of this.editedRolesText){
          for(let roleId of this.editedItem.roles){
            if(role.value === roleId){
              roles.push(role.text);
            }
          }
        }
        let rolesId = this.editedItem.roles;
        this.editedItem.rolesBefore = this.editedItem.roles;
        this.editedItem.rolesChanged = false;
        Object.assign(this.userRoleInfos[this.editedItem.index], {userId,name,position,email,state,stateText,roles,rolesId})
      },
      editItem(item){
        this.dialog.enable = true;
        this.editedItem.index = this.userRoleInfos.indexOf(item);
        this.editedItem.userId = item.userId;
        this.editedItem.name = item.name;
        this.editedItem.email = item.email;
        this.editedItem.position = item.position;
        this.editedItem.state = Number(item.state);
        this.editedItem.roles = item.rolesId;
        this.editedItem.rolesBefore = item.rolesId;
        console.log(item);
      },
      deleteItem(item){
        let _this = this;
        this.$api.user.deleteUser(item.userId).then(function (res) {
          if(res.data.code === OK){
            _this.snackbar.color = "success";
            // 删除
            _this.userRoleInfos.splice(_this.userRoleInfos.indexOf(item),1);
          }
          else{
            _this.snackbar.color = "error";
          }
          _this.snackbar.text = res.data.msg;
          _this.snackbar.enable = true;
        })
        console.log(item);
      },
      changeOffice(){
        let officeIdGet = this.officeId;
        let _this = this;
        // 获取所有用户
        this.$api.user.allOnce(officeIdGet).then(function (res) {
          if(res.data.code === OK){
            _this.userRoleInfos = Object.assign([],res.data.data.map(function (item) {
              let stateText;
              // 特别注意，都是字符串，要准确判断，必须转换类型
              switch (Number(item.state)) {
                case USER_REGISTERED: stateText =  '等待审核'; break;
                case USER_REGISTER_NOT_PASSED: stateText =  '已禁用'; break;
                case USER_REGISTER_PASSED: stateText =  '正常使用'; break;
                default: stateText = '未知'; break;
              }
              let roles = item.roles.map(entry => entry.description);
              let rolesId = item.roles.map(entry => entry.id);
              return Object.assign({}, {userId: item.userId, name: item.name, position: item.position, email: item.email, state: item.state, stateText: stateText, roles, rolesId});
            }));
            console.log(_this.userRoleInfos);
          }
          else{
            console.log(res);
          }
        });
        // 获取所有角色信息
        this.$api.office.roles(officeIdGet).then(function (res) {
          if(res.data.code === OK){
            _this.editedRolesText = Object.assign([],res.data.data.map(entry => ({
              text: entry.description,
              value: entry.id
            })))
          }
        });
      }
    },
    mounted() {
      let officeIdGet = getIdToken().officeId;
      // 获取所有角色信息
      this.$api.office.roles(officeIdGet).then(function (res) {
        if(res.data.code === OK){
          _this.editedRolesText = Object.assign([],res.data.data.map(entry => ({
            text: entry.description,
            value: entry.id
          })))
        }
      });
      // 获取所有检察院信息
      this.$api.office.all().then(function (res) {
        if(res.data.code === OK){
          _this.offices = Object.assign([],res.data.data.map(entry => ({
            text: entry.name,
            value: entry.id
          })))
        }
        // _this.officeId = _this.offices[0].value;
      });
      this.officeId = officeIdGet;
      let _this = this;
      // 获取所有用户
      this.$api.user.allOnce(officeIdGet).then(function (res) {
        if(res.data.code === OK){
          _this.userRoleInfos = Object.assign([],res.data.data.map(function (item) {
            let stateText;
            // 特别注意，都是字符串，要准确判断，必须转换类型
            switch (Number(item.state)) {
              case USER_REGISTERED: stateText =  '等待审核'; break;
              case USER_REGISTER_NOT_PASSED: stateText =  '已禁用'; break;
              case USER_REGISTER_PASSED: stateText =  '正常使用'; break;
              default: stateText = '未知'; break;
            }
            let roles = item.roles.map(entry => entry.description);
            let rolesId = item.roles.map(entry => entry.id);
            return Object.assign({}, {userId: item.userId, name: item.name, position: item.position, email: item.email, state: item.state, stateText: stateText, roles, rolesId});
          }));
          console.log(_this.userRoleInfos);
        }
        else{
          console.log(res);
        }
      });

    }
  }
</script>

<style scoped>

</style>
