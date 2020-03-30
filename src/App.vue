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
    </v-navigation-drawer>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
  }),
  computed: {
    isLogged() {
      return this.$store.state.isLogged;
    },
    idToken() {
      return JSON.parse(localStorage.getItem('idToken'));
    }
  }
};
</script>
