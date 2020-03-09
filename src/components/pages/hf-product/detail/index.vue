<template>
<div slot="header" class="clearfix">
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item v-for="statistics in statusStatistics" v-bind:key="statistics.index">
      {{statistics.desc}} ({{statistics.quantity}})
    </el-menu-item>
  </el-menu>
</div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1',
      statusStatistics: [{
        index: '1',
        name: 'all',
        desc: '全部商品',
        quantity: 0,
      }, {
        index: '2',
        name: 'selling',
        desc: '出售中',
        quantity: 0,
      }, {
        index: '3',
        name: 'stock',
        desc: '库存',
        quantity: 0,
      }],
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>
