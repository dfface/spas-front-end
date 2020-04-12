<template>
  <v-container>
    <v-row>
      <v-col>
        <v-content v-if="reports.length === 0">提示：暂无需要评价的报告</v-content>
        <ReportOutline :report="item" v-for="item in reports" :key="item.id"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ReportOutline from './Outline'
  import {OK} from "../../requests/apiCode";
  export default {
    name: "Evaluating",
    components: {
      ReportOutline
    },
    data: () => ({
      reports: [],
    }),
    methods: {

      },
    mounted() {
      let _this = this;
      this.$api.report.evaluating().then(function (res) {
        if (res.data.code === OK) {
          _this.reports = res.data.data;
        }
      })
    }
  }
</script>

<style scoped>

</style>
