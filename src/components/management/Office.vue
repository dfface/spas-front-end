<template>
  <v-data-table
    :headers="headers"
    :items="offices"
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
        <v-toolbar-title>所有</v-toolbar-title>
        <v-divider class="mx-4" inset vertical/>
        <v-toolbar-title>检察院管理</v-toolbar-title>
        <v-spacer/>
        <v-dialog v-model="dialog.enable">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" class="mb-2" v-on="on" @click="add">添加检察院</v-btn>
          </template>
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
                      label="名称"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="editedItem.url"
                      label="URL"
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
  import {OK} from "../../requests/apiCode";
  import {TIME_OUT_SNACKBAR} from "../../common/settings";

  export default {
    name: "OfficeManagement",
    data(){
      return {
        snackbar: {
          enable: false,
          text: "",
          color: "error",
          timeout: TIME_OUT_SNACKBAR
        },
        headers: [
          {
            text: '名称',
            value: 'name'
          },
          {
            text: 'URL',
            value: 'url'
          },
          {
            text: '操作',
            value: 'actions',
            sortable: false
          }
        ],
        offices: [],  // 远程获取
        editedItem: {
          index: Number,
          name: "",
          url: "",
          id: ""
        },
        dialog: {
          enable: false,
          title: '添加'
        }
      }
    },
    methods: {
      add(){
        this.dialog.title = '添加';
        this.dialog.enable = true;
      },
      editItem(item){
        this.dialog.title = '修改';
        this.dialog.enable = true;
        this.editedItem.name = item.name;
        this.editedItem.id = item.id;
        this.editedItem.index = this.offices.indexOf(item);
        this.editedItem.url = item.url;
        console.log(item);
      },
      deleteItem(item){
        let _this = this;
        this.$api.office.deleteOffice(item.id).then(function (res) {
          if(res.data.code === OK){
            // 更改显示内容
            _this.offices.splice(_this.offices.indexOf(item),1);
            _this.snackbar.color = "success";
          }
          else{
            _this.snackbar.color = "error";
          }
          _this.snackbar.text = res.data.msg;
          _this.snackbar.enable = true;
        })
        console.log(item);
      },
      submit(){
        let _this = this;
        if(this.dialog.title === '修改'){
          this.$api.office.revise(this.editedItem).then(function (res) {
            if(res.data.code === OK){
              // 更改显示内容
              _this.offices[_this.editedItem.index].name = _this.editedItem.name;
              _this.offices[_this.editedItem.index].url = _this.editedItem.url;
              _this.offices[_this.editedItem.index].id = _this.editedItem.id;
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
          this.$api.office.newOffice(this.editedItem).then(function (res) {
            if(res.data.code === OK){
              // 更改显示内容
              _this.editedItem.id = res.data.msg;
              let newItem = {};
              newItem.name = _this.editedItem.name;
              newItem.url = _this.editedItem.url;
              newItem.id = _this.editedItem.id;
              _this.offices.push(newItem);
              _this.snackbar.color = "success";
              _this.snackbar.text = "成功";
            }
            else{
              _this.snackbar.color = "error";
              _this.snackbar.text = res.data.msg;
            }
            _this.snackbar.enable = true;
          })
        }
        _this.dialog.enable = false;
      }
    },
    mounted() {
      let _this = this;
      this.$api.office.all().then(function (res) {
        if(res.data.code === OK){
          _this.offices = res.data.data;
        }
      })
    }
  }
</script>

<style scoped>

</style>
