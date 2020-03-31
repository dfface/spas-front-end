<template>
  <v-container>
    <v-row>
      <v-col>
        <div>{{ caseId }}</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "Detail",
    props: [
      'caseId'
    ],
    data() {
      return {
        cases: {
          name: "",
          government: "",
          description: "",
          investigation: "",
          state: "",
          createTime: "",
          updateTime: "",
          terminateTime: "",
          creatorName: ""
        }
      }
    },
    created() {
      // 从服务器获取案件信息
    }
  }
</script>

<style scoped>

</style>
