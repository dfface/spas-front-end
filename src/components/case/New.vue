<template>
  <v-container>
    <v-row>
      <v-col>
        <v-breadcrumbs
          :items="breadcrumbs"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "New",
    data: () => ({
      breadcrumbs: [
        {
          disabled: false,
          exact: true,
          href: '/',
          link: true,
          text: '首页'
        }
      ]
    })
  }
</script>

<style scoped>

</style>
