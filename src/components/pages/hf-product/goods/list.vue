<template>
  <div>
    <el-table :data="tableData" v-loading="loading" border  highlight-current-row ref="multipleTable">
        <el-table-column prop="id" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="hfName" label="物品名称" width="120"></el-table-column>
        <el-table-column prop="goodsDesc" label="物品描述" width="120"></el-table-column>
        <el-table-column prop="brandId" label="生产厂家" width="100"></el-table-column>
        <el-table-column prop="brandId" label="售卖价格" width="100"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="150"></el-table-column>
        <el-table-column prop="modifyTime" label="更新时间" width="150"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="editProduct(scope.row)" type="text" size="small">查看详情</el-button>
            <el-button @click="editProduct(scope.row)" type="text" size="small">上架店铺</el-button>
            <el-button @click="editProduct(scope.row)" type="text" size="small">存储仓库</el-button>
            <el-button @click="deleteProduct(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination background layout="prev, pager, next" @current-change="handleCurrentChange" :total="totalSize">
        </el-pagination>
      </div>
  </div>
</template>


<script>
import serviceGoods from '@/service/goods.js';

export default {
  data() {
    return {
      loading: false,
      totalSize: 0,
      currpage: 1,
      tableData: [],
      productId: 2,
    };
  },
  created() {
    this.setProducts();
  },
  methods: {
    setProducts() {
      this.loading = true;
      // serviceGoods.getGoodsByProductId(this.productId, (res) => {
      //   this.tableData = res.data.data;
      //   this.loading = false;
      // });
    },
    handleCreate(e) {
      this.$router.push({
        path: '/hf-product/detail',
      });
    },
    editProduct(row) {
      this.$router.push({
        path: '/hf-product/detail?productId=' + row.id,
      });
    },
    deleteProduct(row) {
      this.$confirm('确认删除吗？', '提示', {}).then(async () => {
        serviceGoods.deleteById(row.id, (res) => {
          this.setProducts();
        });
      });
    },
    handleCurrentChange(val) {
      this.currpage = val;
    },
  },
};
</script>

<style lang="less" scoped>
.box-card {
  margin: 5px;
}

.clearfix {
  height: 40px;
}
</style>

