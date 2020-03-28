<template>
  <div>
<el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>商品列表</span>
    <el-button style="float: right;" type="primary" @click="add = true">添加店铺商品</el-button>
  </div>
     <el-table
      :data="list"
      stripe
      style="width: 100%"
      ref="table"
    >
      <el-table-column type="index" align="center" label="选择" width="50"></el-table-column>
      <el-table-column align="center" prop="productName" label="商品名称"></el-table-column>
      <el-table-column align="center" prop="productDesc" label="商品描述"></el-table-column>
      <el-table-column align="center" prop="categoryName" label="规格"></el-table-column>
    </el-table>
</el-card>
    <el-dialog
  title="店铺商品"
  :visible.sync="add"
 >
        <el-table   @selection-change="handleSelectionChange"  :data="tableData" border style="width: 100%" highlight-current-row ref="multipleTable">
        <el-table-column type=selection align="center"  label="选择" width="50"></el-table-column>
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
        <el-table-column prop="productDesc" label="商品描述" align="center"></el-table-column>
        <el-table-column prop="categoryName" label="所属类目名称" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"  align="center"></el-table-column>
        <el-table-column prop="lastModifier" label="最近一次操作人"  align="center"></el-table-column>
      </el-table>
  <span slot="footer" class="dialog-footer">
    <el-button @click="add = false">关闭</el-button>
    <el-button type="primary" @click="submit()">确 定</el-button>
  </span>
</el-dialog>

  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import storeService from '@/service/store.js';
// eslint-disable-next-line no-unused-vars
import constants from '@/store/constants.js';
import serviceProduct from '@/service/product.js';
export default {
  name: 'store',
  data() {
    return {
      content: {},
      product: {
        productIds: [],
        stoneId: '',
        userId: '',
      },
      add: false,
      tableData: [],
      id: '',
      list: [],
      collapse: false,
      selectDdata: [],
    };
  },
  methods: {
    submit: function() {
      // this.product.productIds = [];
      if (this.selectDdata.length > 0) {

        for (var i = 0;i < this.selectDdata.length;i++) {
          this.product.productIds.push(this.selectDdata[i].id);
        }
      } else {
        return false;
      }
      this.product.userId = this.content.id;
      this.product.stoneId = this.id;
      console.log(this.product);
      storeService.storeAddProduct(this.product, (res) => {
        // console.log(res);
        if (res.data.status === constants.SUCCESS_CODE) {
          this.$message({
            message: '添加成功',
            type: 'success',
          });
          this.add = false;
          // this.product.productIds = [];
          // this.selectDdata = [];
        } else {
          this.$message({
            message: '添加失败',
            type: 'error',
          });
          // this.product.productIds = [];
          // this.selectDdata = [];
        }
      });
    },
    handleSelectionChange (val) {
      console.log(val);
      this.selectDdata = val;
    },
    setProducts() {
      serviceProduct.getProductsByBossId((res) => {
        console.log(res);
        this.tableData = res.data.data.list;
      });
    },
    getstoneproduct: function() {
      storeService.getstoneproduct(this.id, (res) => {
        console.log(res);
        this.list = res.data.data.list;
      });
    },
  },
  mounted() {
    var content = window.sessionStorage.getItem('userInfor');
    this.content = JSON.parse(content);
    this.id = this.$route.query.id;
    this.getstoneproduct();
    this.setProducts();
  },
};
</script>
