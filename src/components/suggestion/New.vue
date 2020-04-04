<template>
  <v-container>
    <v-row>
      <v-col>
        <v-select
          :items="caseItems"
          label="关联案件"
          outlined
          v-model="caseId"
        />
        <v-select
          :items="government"
          label="接收主体（被监督行政机关）"
          outlined
          multiple
          chips
          deletable-chips
          clearable
          v-model="supervisedName"
        />
        <v-textarea
          outlined
          v-model="content"
          label="检察建议内容"
          height="400"
        />
        <v-radio-group
          v-model="deadlineChoice"
        >
          <v-radio
            :label="'2个月以内回复：' + new Date(now.getTime() + 62 * 24 * 60 * 60 * 1000).toLocaleDateString() "
            value="1"
          />
          <v-radio
            :label="'15天以内回复：' + new Date(now.getTime() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString() "
            value="2"
          />
        </v-radio-group>
        <v-text-field
          label="接收邮箱"
          outlined
        />
        <v-btn
          color="primary"
        >
          发出
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "New",
    data: () => ({
      now: new Date(),
      content: "",
      caseItems: [{text: 'test1', value: 123}, {text: 'test2', value: 2}],
      caseId: "",
      government: ['test1', 'test2'],
      supervisedName: "",
      deadlineChoice: "1"
    }),
  }
</script>

<style scoped>

</style>
