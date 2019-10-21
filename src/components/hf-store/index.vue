<template>
<div class="wrapper">
  <v-head></v-head>
  <v-sidebar></v-sidebar>
  <div class="content-box" :class="{'content-collapse':collapse}">
    <div>dddccccccccccccccccccccccccccccccccccccccccccccccc</div>
    <!-- <hf-stone></hf-stone> -->
    <el-row :gutter="20">
        <el-col :span="6">
          <h3>店铺列表</h3>
          <div>当前选中的商铺 {{this.selectedStone}}</div>
          <hfStoneTable v-bind:selected-stone="selectedStone" v-on:selectedStoneHandler="selectedStoneHandler($event)"></hfStoneTable>
        </el-col>
        <el-col :span="18">
          <h3>店铺内的物品列表</h3>
          <goodsTable v-bind:selected-stone="selectedStone"></goodsTable>
        </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
import vSidebar from '@/components/common/sidebar.vue';
import vHead from '@/components/common/header.vue';
import goodsTable from './goods-table';
import hfStoneTable from './hf-stone-table';
import hfStone from './hf-store';
export default {
  name: 'store',
  components: { 
    vHead, vSidebar, hfStone, goodsTable, hfStoneTable
  },
  data() {
    return {
      collapse: false,
      selectedStone: 1
    }
  },
  methods: {
     selectedStoneHandler(res){
       this.selectedStone = res;
}
  }
}
</script>
