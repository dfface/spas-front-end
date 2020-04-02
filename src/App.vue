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
      <div class="d-flex align-center">
        <v-img
          alt="Logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo.png"
          transition="scale-transition"
          width="40"
        />
        <router-link to="/" class="display-1" style="text-decoration: none; color: aliceblue">
        检察建议流程辅助办案系统
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        :href="idToken.officeUrl"
        target="_blank"
        text
        v-if="isLogged"
      >
        <div
          class="mr-2"
          v-text="`${idToken.name}(${idToken.position}) : ${idToken.officeName}`"
          v-ripple
        />
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      app
      clipped
      v-if="isLogged">
      <v-list>
        <v-list-group
          group="case"
          v-model="drawerCaseItems.model"
        >
          <template slot="activator">
            <v-list-item-content>
             <v-list-item-title>{{ drawerCaseItems.title }}</v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item
            v-for="item in drawerCaseItems.items"
            :to="item.to"
            :key="item.to">
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
  </v-app>
</template>

<script>
import {getIdToken} from './common/utils'
import JWT from 'jwt-decode'
export default {
  name: 'App',
  components: {
  },
  data: () => ({
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
      return getIdToken();
    }
  },
  methods: {
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
};
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
