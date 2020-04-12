<template>
  <v-app>
    <v-slide-x-transition>
      <v-alert
        type="error"
        v-model="isOffline"
        min-width="300"
      >
        网络错误，请检查您的网络。
      </v-alert>
    </v-slide-x-transition>
    <v-app-bar
      app
      color="primary"
      dark
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="isLogged"/>
      <div class="d-flex align-center">
        <v-img
          alt="Logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo.png"
          transition="scale-transition"
          width="40"
        />
        <router-link to="/" class="display-1 d-md-flex d-none" style="text-decoration: none; color: aliceblue">
        检察建议流程辅助办案系统
        </router-link>
      </div>

      <v-spacer></v-spacer>
<!--     用户菜单：登出-->
      <v-menu offset-y v-if="isLogged">
        <template v-slot:activator="{ on }">
          <v-btn
            text
            v-on="on"
          >
            {{ `${getId().name}(${getId().position})` }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in userItems"
            :key="index"
            @click="userItemsMethods(item.method)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>


      <v-btn
        :href="getId().officeUrl"
        target="_blank"
        text
        v-if="isLogged"
      >
        <div
          class="mr-2"
          v-text="`${getId().officeName}`"
          v-ripple
        />
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      app
      clipped
      v-model="drawer"
      v-if="isLogged">
      <v-list>
        <v-list-group
          group="case"
          v-model="drawerCaseItems.model"
          v-if="this.$store.state.roles.indexOf('procurator') !== -1"
        >
          <template slot="activator">
            <v-list-item-content>
             <v-list-item-title>{{ drawerCaseItems.title }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="item in getCasesItems"
            :to="item.to"
            :key="item.to">
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        <v-list-group
          group="suggestion"
          v-model="drawerSuggestionItems.model"
        >
          <template slot="activator">
            <v-list-item-content>
            <v-list-item-title>{{ drawerSuggestionItems.title }}</v-list-item-title>
            </v-list-item-content>
          </template>
        <v-list-item
          v-for="(item,i) in getSuggestionItems"
          :to="item.to"
          :key="i"
        >
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list-group>
        <v-list-group
          group="report"
          v-model="drawerReportItems.model"
        >
          <template slot="activator">
            <v-list-item-content>
            <v-list-item-title>{{ drawerReportItems.title }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="(item,i) in getReportItems"
            :to="item.to"
            :key="i"
          >
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view/>
    </v-content>
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
  </v-app>
</template>

<script>
import {getIdToken} from './common/utils'
import {ADMIN_ROLE_NAME, GOV_ROLE_NAME, TIME_OUT_SNACKBAR} from './common/settings'
import JWT from 'jwt-decode'
import {IS_LOGGED_FALSE, LOGOUT_FAILED, LOGOUT_SUCCESS} from "./requests/apiCode";
export default {
  name: 'App',
  components: {
  },
  data: () => ({
    drawer: null,
    snackbar: {
      enable: false,
      text: "",
      color: "error",
      timeout: TIME_OUT_SNACKBAR
    },
    userItems: [
      {
        title: '退出',
        method: 'logout'
      }
    ],
    drawerCaseItems: {
      title: '案件管理',
      model: true,
      items: [
        {
          to: '/case/handling',
          title: '正在办理'
        },
        {
          to: '/case/new',
          title: '新建案件'
        },
        {
          to: '/case/history',
          title: '历史案件'
        }
      ],
      itemsMoreChief: [
        {
          to: '/case/auditing',  // 如果不加开头的 / 将直接更改现在的URL（最后一个/换成现在的）
          title: '审核案件'
        }
      ]
    },
    drawerSuggestionItems: {
      title: '检察建议管理',
      model: false,
      items: [
        {
          to: '/suggestion/new',
          title: '发出检察建议'
        },
        {
          to: '/suggestion/waiting-reply',
          title: '正等待处理中'
        },
        {
          to: '/suggestion/history',
          title: '历史检察建议'
        }
      ],
      itemsMoreChief: [
      ],
      itemsForGov: [
        {
          to: '/suggestion/associate',
          title: '关联检察建议'
        },
        {
          to: '/suggestion/replying',
          title: '正在处理'
        },
        {
          to: '/suggestion/reply-history',
          title: '历史关联'
        }
      ]
    },
    drawerReportItems: {
      title: '整改报告管理',
      model: false,
      items: [
        {
          to: '/report/evaluating',
          title: '评估整改报告'
        },
        {
          to: '/report/evaluate-history',
          title: '历史整改报告'
        }
      ],
      itemsForGov: [
        {
          to: '/report/new',
          title: '新建整改报告'
        },
        {
          to: '/report/history',
          title: '历史整改报告'
        }
      ]
    }
  }),
  computed: {
    isLogged() {
      // 只有这个是实时响应，cookie 做不到
      return this.$store.state.isLogged;
    },
    isOffline(){
      return this.$store.state.isOffline;
    },
    idToken() {
      return getIdToken();  // 一旦获取之后，它就没有变过，切换账号就会出问题，因此应选择调用方法
    },
    getCasesItems() {
      if(this.$store.state.roles.indexOf(ADMIN_ROLE_NAME) !== -1){
        return [...this.drawerCaseItems.items, ...this.drawerCaseItems.itemsMoreChief];
      }
      else{
        return this.drawerCaseItems.items;
      }
    },
    getSuggestionItems(){
      if(this.$store.state.roles.indexOf(ADMIN_ROLE_NAME) !== -1){
        return [...this.drawerSuggestionItems.items, ...this.drawerSuggestionItems.itemsMoreChief];
      }
      else if(this.$store.state.roles.indexOf(GOV_ROLE_NAME) !== -1){
        return this.drawerSuggestionItems.itemsForGov;
      }
      else{
        return this.drawerSuggestionItems.items;
      }
    },
    getReportItems(){
      if(this.$store.state.roles.indexOf(GOV_ROLE_NAME) !== -1){
        return this.drawerReportItems.itemsForGov;
      }
      else{
        return this.drawerReportItems.items;
      }
    }
  },
  methods: {
    getId(){
      return getIdToken();
    },
    userItemsMethods(method) {
      // 使用计算属性
      this[method]();
    },
    logout(){
      let userId = getIdToken().id;
      let _this = this;
      this.$api.home.logout(userId).then(function (res) {
        if(res.data.code === LOGOUT_SUCCESS){
          // 提交状态信息
          _this.$store.commit("changeIsLogged",false);
          _this.$store.commit("changeAccessToken", "");
          _this.$router.push('/login');
        }
        else if(res.data.code === LOGOUT_FAILED){
          _this.snackbar.text = res.data.msg;
          _this.snackbar.color = "error";
          _this.snackbar.enable = true;
        }
        else if(res.data.code === IS_LOGGED_FALSE){
          _this.snackbar.text = res.data.msg;
          _this.snackbar.color = "error";
          _this.snackbar.enable = true;
        }
        else{
          _this.snackbar.text = "出了点问题";
          _this.snackbar.color = "error";
          _this.snackbar.enable = true;
        }
      })
      .catch(function (err) {
        _this.snackbar.text = "出了点问题" + err.value;
        _this.snackbar.color = "error";
        _this.snackbar.enable = true;
      })
    }
  },
  mounted() {
    window.addEventListener('offline', function(){
      // 网络(拔掉网线)由正常常到异常时触发
      console.log("App.vue: 断网了");
      alert("App.vue: 断网了");
    });
  },
  updated() {
    // 取 accessToken 中的角色信息
    console.log("updated: 角色信息更新与否判断" + typeof this.$store.state.accessToken);
    if(this.$store.state.accessToken !== ""){
      let accessToken = JWT(this.$store.state.accessToken);
      if(this.$store.state.roles.toString() !== accessToken.roles.toString()){  // 注意数组的比较方法
        this.$store.commit('changeRoles',accessToken.roles);
      }
      if(this.$store.state.permissions.toString() !== accessToken.permissions.toString()){
        this.$store.state.permissions = accessToken.permissions;
      }
      console.log(accessToken);
    }

  }
}
</script>

<style lang="scss" scoped>
  #system-title{
    cursor: pointer;
  }
  .v-alert{
    z-index: 10;
    position: fixed;
    top: 2px;
    right: 2px;
  }
</style>
