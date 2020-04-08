<template>
  <v-container>
    <v-row>
      <v-col>
        <v-form>
          <v-select
            label="选择案件"
            outlined
            :items="caseItems"
          />
          <v-select
            label="选择要回复的检察建议"
            outlined
            :items="suggestionItems"
          />
          <v-textarea
            label="整改报告内容"
            v-model="report.content"
          />
          <v-btn
            color="primary"
          >
            提交
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "New",
    data: () => ({
      caseItems: Object,
      suggestionItems: Object,
      report: {
        content: "",
        caseId: "",
        suggestionId: ""
      }
    })
  }
</script>

<style scoped>

</style>
