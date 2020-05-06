<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane class="a6a" label="商品管理" name="goods">
        <el-card class="search-card">
          <Search  @parentByClick="childClick"></Search>
        </el-card>

        <el-card class="box-card">
          <!-- 搜索渲染区 -->
          <div class="filter-container">
            <div class="letf-items" style="float: left;font-size: 14px;">
              已选{{amount}}项商品
              <el-button class="ff3" style="padding: 0 10px;" type="text" @click="toggleSelection()">清空</el-button>
            </div>
            <div class="right-items" style="float: right;padding: 10px 0;">
              <el-button @click="setProducts()">刷新</el-button>
              <el-button @click="handleCreate()" type="purple">新增商品</el-button>
              <el-button @click="BatchRemove()">批量操作</el-button>
            </div>
          </div>
          <!-- 内容区 -->
          <div class="text item">
            <el-table
              :data="tableData"
              v-loading="loading"
              stripe
              style="width: 100%"
              highlight-current-row
              ref="multipleTable"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column label="序号" type="index" :index="indexMethod"></el-table-column>
              <el-table-column prop="productName" label="商品名称"></el-table-column>
              <el-table-column prop="productDesc" label="商品描述" show-overflow-tooltip></el-table-column>
              <el-table-column prop="categoryName" label="所属类目名称"></el-table-column>
              <el-table-column prop="stoneName" label="所属店铺"></el-table-column>
              <el-table-column prop="createTime" label="创建时间" width="150"></el-table-column>
              <el-table-column prop="modifyTime" label="更新时间" width="150"></el-table-column>
              <el-table-column prop="lastModifier" label="最近一次操作人" width="150"></el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button class="a6a" @click="editProduct(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button class="ff3" @click="deleteProduct(scope.row)" type="text" size="small">删除</el-button>
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
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane class="a6a" label="类目管理" name="category">
        <category></category>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import serviceProduct from '@/service/product.js';
import category from '../hf-product/category';
import Search from './search';

export default {
  components: {
    Search,
    category,
  },
  data() {
    return {
      amount: '0',
      indexMethod: 1,
      activeName: 'goods',
      loading: false,
      totalSize: 0,
      currpage: 1,
      tableData: [],
      Batch: [],
    };
  },
  created() {
    this.setProducts();
  },
  methods: {
    toggleSelection() {
      this.amount = '0';
      this.$refs.multipleTable.clearSelection();
    },
    handleSelectionChange(val) {
      console.log('选中', val);
      this.amount = val.length;
      this.Batch = val;
    },
    setProducts() {
      this.loading = true;
      serviceProduct.getProductListBoss((res) => {
        this.tableData = res.data.data.list;
        this.loading = false;
      });
    },

    handleCreate(e) {
      this.$router.push({
        path: '/hf-product/detail',
      });
    },
    editProduct(row) {
      console.log(row);
      this.$router.push({
        path:
          '/hf-product/detail?productId=' +
          row.id +
          '&stoneId=' +
          row.stoneId +
          '&stoneName=' +
          row.stoneName,
      });
    },
    deleteProduct(row) {
      this.$confirm('确认删除吗？', '提示', {}).then(async () => {
        serviceProduct.deleteProduct(row.id, (res) => {
          this.setProducts();
        });
      });
    },
    BatchRemove() {
      let Delete = [];
      for (let i = 0; i < this.Batch.length; i++) {
        Delete.push(this.Batch[i].id);
      }
      console.log(Delete);
      this.$confirm('确认删除吗？', '提示', {}).then(async () => {
        serviceProduct.deleteSelectProduct(Delete, (res) => {
          this.setProducts();
        });
      });
    },
    handleCurrentChange(val) {
      this.currpage = val;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    childClick(tableData) {
      this.tableData = tableData;
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
.search-card {
  margin:0 5px 5px 5px;
  margin-bottom: 25px;
}
.el-tabs__nav-wrap {
  margin-bottom: -6px;
}
</style>
