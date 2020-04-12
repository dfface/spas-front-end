<template>
  <v-container>
    <v-row>
      <v-col>
        <v-form>
          <v-text-field
            name="associate"
            type="text"
            placeholder="请输入邮件中给予的密码以关联案件"
            v-model="secret"
          />
          <v-btn
            color="primary"
            @click="doAssociate"
          >
            提交
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-slide-x-transition>
      <v-snackbar
        right
        top
        :timeout="snackbar.timeout"
        :color="snackbar.color"
        v-model="snackbar.enable"
      >
        {{ snackbar.text }}
      </v-snackbar>
    </v-slide-x-transition>
  </v-container>
</template>

<script>
  import {TIME_OUT_SNACKBAR} from "../../common/settings";

  export default {
    name: "Associate",
    data: () => ({
      secret: "",
      snackbar: {
        enable: false,
        text: "",
        color: "error",
        timeout: TIME_OUT_SNACKBAR
      }
    }),
    methods: {
      doAssociate(){
        console.log(this.secret);
      }
    }
  }
</script>

<style scoped>

</style>
