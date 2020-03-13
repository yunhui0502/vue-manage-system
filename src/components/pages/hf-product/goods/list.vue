<template>
  <div>
    <el-table
      :data="tableData"
      v-loading="loading"
      border
      highlight-current-row
      ref="multipleTable"
    >
      <el-table-column prop="goodsId" label="序号" width="50" align="center"></el-table-column>
      <el-table-column prop="goodsName" label="物品名称"></el-table-column>
      <el-table-column prop="goodsDesc" label="物品描述"></el-table-column>
      <el-table-column prop="brandName" label="生产厂家"></el-table-column>
      <el-table-column prop="sellPrice" label="售卖价格"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="137"></el-table-column>
      <el-table-column prop="modifyTime" label="更新时间" width="137"></el-table-column>
      <el-table-column fixed="right" width="100" label="操作">
        <template slot-scope="scope">
          <el-button @click="editProduct(scope.row)" type="text" size="small">查看详情</el-button>
          <el-button @click="deleteProduct(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="totalSize"
      ></el-pagination>
    </div>
    <el-drawer
      title="物品详情"
      :direction="direction"
      :visible.sync="drawer"
      :before-close="handleClose"
    >
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>


<script>
import serviceGoods from '@/service/goods.js';

export default {
  props: {
    value: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      loading: false,
      totalSize: 0,
      currpage: 1,
      tableData: [],
      productId: 0,
      drawer: false, // 抽屉组件开关
      direction: 'ttb', // 控制抽屉弹出位置
    };
  },
  created() {
    this.setProducts();
  },
  methods: {
    setProducts() {
      this.loading = true;
      this.productId = this.value;
      console.log(this.value);
      serviceGoods.getGoodsByProductId(this.productId, (res) => {
        this.tableData = res.data.data;
        this.loading = false;
      });
    },
    handleCreate(e) {
      this.$router.push({
        path: '/hf-product/detail',
      });
    },
    // 详情
    editProduct(row) {
      this.drawer = true;
    },
    deleteProduct(row) {
      console.log(row.goodsId);
      this.$confirm('确认删除吗？', '提示', {}).then(async () => {
        serviceGoods.deleteById(row.goodsId, (res) => {
          this.setProducts();
        });
      });
    },
    handleClose(done) {
      this.$confirm('确认关闭？').then((_) => {
        done();
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

