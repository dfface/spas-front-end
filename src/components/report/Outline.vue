<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
          outlined
        >
          <v-card-text>{{ report.content }}</v-card-text>
          <v-card-actions>
            <v-btn :to="`/report/detail/${report.id}`" text> 查看详情 </v-btn>
            <v-btn
              text
              disabled
            >{{ stateText }}</v-btn>
            <v-btn text disabled>{{ `得分：${report.score || '暂无'}`}}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {
    REPORT_NOT_JUDGE,
    REPORT_JUDGED
  } from '../../common/settings'
  export default {
    name: "ReportOutline",
    props: [
      'report'
    ],
    computed: {
      stateText(){
        switch (this.report.state) {
          case REPORT_NOT_JUDGE: return '等待评价';
          case REPORT_JUDGED: return '已评价';
          default: return '未知状态';
        }
      }
    }
  }
</script>

<style scoped>

</style>
