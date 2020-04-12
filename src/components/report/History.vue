<template>
  <v-container>
    <v-row>
      <v-col>
        <ReportOutline :report="item" v-for="item in reports" :key="item.id"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-lazy>
          <!--        为什么可以都用同一个函数，因为模型绑定了 -->
          <v-pagination
            v-model="current"
            :length="length"
            @input="get"
            @next="get"
            @previous="get"
          />
        </v-lazy>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import ReportOutline from './Outline'
  import {OK} from "../../requests/apiCode";
  export default {
    name: "ReportHistory",
    components: {
      ReportOutline
    },
    data: () => ({
      reports: [],
      current: 1,
      length: 5
    }),
    methods: {
      get(){
        let _this = this;
        this.$api.report.history(this.current).then(function (res) {
          if(res.data.code === OK){
            _this.current = res.data.data.current;
            _this.length = res.data.data.count;
            _this.reports = res.data.data.content;
            _this.$vuetify.goTo(0);
          }
        })
      }
    },
    mounted() {
      let _this = this;
      this.$api.report.history(this.current).then(function (res) {
        if(res.data.code === OK){
          _this.current = res.data.data.current;
          _this.length = res.data.data.count;
          _this.reports = res.data.data.content;
          _this.$vuetify.goTo(0);
        }
      })
    }
  }
</script>

<style scoped>

</style>
