<template>
<div>
  <el-table :data="tableData">
    <el-table-column label="品牌id">
      <template slot-scope="scope">
        <span>{{ scope.row.brandId}}</span>
      </template>
    </el-table-column>

    <el-table-column label="ID">
      <template slot-scope="scope">
        <span>{{ scope.row.id}}</span>
      </template>
    </el-table-column>

    <el-table-column>
      <template slot-scope="scope">
        <el-button v-on:click="TellMeId(scope.row.id)">TellMe</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
import api from '@/apis/hf-api.js';
export default {
  name: 'productTable',
  props: ['selectedStone'],
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    TellMeId(num) {
      this.$emit('selectedStoneHandler', num);
    },
    listProduct() {
      api.getProductList(1).then(response => {
        if (response.status == 200) {
          if (response.data.status === 200) {
            this.tableData = response.data.data;
          }
        }

      });
    },
    init() {
      this.listProduct();
    }
  },
  mounted() {
    this.init()
  }
}
</script>
