<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card outlined>
          <v-card-title>{{ title }}</v-card-title>
          <v-card-subtitle>{{ description }}</v-card-subtitle>
          <v-card-actions>
            <v-btn
              :to="{'name': 'CaseDetail', 'params': {'caseId': id}}"
              color="secondary"
              text
            >查看详情</v-btn>
            <v-btn
              disabled
              text
            >{{ stateText }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {CASE_AUDIT_NOT_PASSED, CASE_AUDIT_PASSED, CASE_UNAUDITED} from "../../common/settings";

  export default {
    name: "Outline",
    props: [
        'title',
        'description',
        'state',
        'id'
    ],
    computed: {
      stateText() {
        console.log("case-outline-start");
        switch (this.state) {
          case CASE_UNAUDITED: return  "未经审核";
          case CASE_AUDIT_NOT_PASSED: return  "审核不通过";
          case CASE_AUDIT_PASSED: return  "审核通过";
          default: return "状态未知";
        }
      }
    }
  }
</script>

<style scoped>

</style>
