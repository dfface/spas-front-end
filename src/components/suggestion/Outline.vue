<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
          outlined
        >
          <v-card-title>{{ suggestion.supervisedName }}</v-card-title>
          <v-card-subtitle>得分：{{ suggestion.score || '无'}} &nbsp;&nbsp;发出时间：{{ new Date(suggestion.createTime).toLocaleDateString() }}&nbsp;&nbsp; 回复期限：{{ new Date(suggestion.deadline).toLocaleDateString()}}</v-card-subtitle>
          <v-card-text>{{ suggestion.content }}</v-card-text>
          <v-card-actions>
            <v-btn :to="`/suggestion/detail/${suggestion.id}`" text> 查看详情 </v-btn>
            <v-btn v-if="suggestion.sue" color="error" text>建议起诉</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "SuggestionOutline",
    props:[
        'suggestion'
    ]
  }
</script>

<style scoped>

</style>
