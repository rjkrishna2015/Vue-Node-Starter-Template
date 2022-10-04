<template>
  <v-footer padless class="footer">
    <v-col class="text-center" cols="12">
      <strong
        >{{ tData.copyrightPre }} {{ new Date().getFullYear() }}
        {{ tData.copyrightSuff }}</strong
      >
    </v-col>
  </v-footer>
</template>
<script>
import * as common from "../../../utils/Common";
const tData = common.templateData.footerComp;
export default {
  name: "Footer",
  data() {
    return {
      tData,
    };
  },
};
</script>
<style scoped>
.footer {
  bottom: 0px;
  position: fixed;
  width: 100vw;
}
</style>
