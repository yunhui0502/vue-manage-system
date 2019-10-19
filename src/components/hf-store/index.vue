<template>
<div class="wrapper">
  <v-head></v-head>
  <v-sidebar></v-sidebar>
  <div class="content-box" :class="{'content-collapse':collapse}">
    <div>dddccccccccccccccccccccccccccccccccccccccccccccccc</div>
  </div>
</div>
</template>

<script>
import vSidebar from '@/components/common/sidebar.vue';
import vHead from '@/components/common/header.vue';
export default {
  name: 'store',
  components: { 
    vHead, vSidebar
  },
  data() {
    return {
      collapse: false
    }
  }
}
</script>
