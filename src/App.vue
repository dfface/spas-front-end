<template>
  <v-app>
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

        <span class="display-1">检察建议流程辅助办案系统</span>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        :href="idToken.officeUrl"
        target="_blank"
        text
        v-if="isLogged"
      >
        <span class="mr-2" v-text="idToken.officeName"/>
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
        >
          <v-list-item v-for="item in drawerCaseItems" :value="item.value" :to="item.to" :key="item.to"/>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import {isLogged as isLoggedUtil, getIdToken} from './common/utils'
export default {
  name: 'App',
  components: {
  },
  data: () => ({
    drawerCaseItems: [
      {
        to: '/case/new',
        value: '值'
      }
    ]
  }),
  computed: {
    isLogged() {
      return isLoggedUtil();
    },
    idToken() {
      return getIdToken();
    }
  }
};
</script>
