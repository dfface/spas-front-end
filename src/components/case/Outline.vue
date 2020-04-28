<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card outlined>
          <v-card-title>{{ title }}</v-card-title>
          <v-card-subtitle>{{ description }}</v-card-subtitle>
          <v-stepper class="elevation-0" v-model="stepNum">
            <v-stepper-header>
              <v-stepper-step step="1"
                              :complete="stepNum > 1"
                              :color="stepNum > 1 ? 'green' : 'primary'">
                立案</v-stepper-step>
              <v-divider/>
              <v-stepper-step step="2"
                              :complete="stepNum > 2"
                              :rules="[() => state!== 2]"
                              :color="state === 2 ? 'error' : (stepNum > 2 ? 'green' : 'primary')">
                审核
                <small v-if="state === 2">审核不通过</small>
              </v-stepper-step>
              <v-divider/>
              <v-stepper-step step="3"
                              :complete="stepNum > 3"
                              :color="stepNum > 3 ? 'green' : 'primary'">
                互动
              </v-stepper-step>
              <v-divider/>
              <v-stepper-step step="4"
                              :complete="stepNum === 4"
                              :color="stepNum === 4 ? 'green' : 'primary'">结案</v-stepper-step>
            </v-stepper-header>
          </v-stepper>
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
  import {
    CASE_AUDIT_NOT_PASSED,
    CASE_AUDIT_PASSED,
    CASE_FINISHED,
    CASE_PROSECUTE,
    CASE_UNAUDITED
  } from "../../common/settings";

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
          case CASE_UNAUDITED: return  "等待审核";
          case CASE_AUDIT_NOT_PASSED: return  "审核不通过";
          case CASE_AUDIT_PASSED: return  "审核通过";
          case CASE_FINISHED: return '整改完成，已结案';
          case CASE_PROSECUTE: return '准备起诉，已结案';
          default: return "未知";
        }
      },
      stepNum(){
        switch (this.state) {
          case 1: return 1;
          case 2: return 2;
          case 3: return 3;
          case 4: return 4;
          case 5: return 4;
          default: return 1;
        }
      }
    }
  }
</script>

<style scoped>

</style>
