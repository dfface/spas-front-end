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
            <v-btn
              text
              disabled
            >{{ stateText }}</v-btn>
            <v-btn v-if="suggestion.sue" color="error" text>建议起诉</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import {
    SUGGESTION_ISSUED,
    SUGGESTION_REPLIED,
    SUGGESTION_NEED_NEW_REPLY,
    SUGGESTION_FINISHED,
    SUGGESTION_TO_PROSECUTE
  } from '../../common/settings'
  export default {
    name: "SuggestionOutline",
    props:[
        'suggestion'
    ],
    computed: {
      stateText() {
        switch (this.suggestion.state) {
          case SUGGESTION_ISSUED: return '等待回复';
          case SUGGESTION_REPLIED: return '已回复，等待评价';
          case SUGGESTION_NEED_NEW_REPLY: return '等待下一轮报告';
          case SUGGESTION_FINISHED: return '整改完成';
          case SUGGESTION_TO_PROSECUTE: return '准备起诉';
          default: return '未知状态';
        }
      }
    }
  }
</script>

<style scoped>

</style>
