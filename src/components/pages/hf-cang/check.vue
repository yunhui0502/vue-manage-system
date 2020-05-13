<template>
  <div style="padding-top:1px;">
    <!-- <el-card class="box-card"> -->
      <!-- 搜索渲染区 -->
      <el-tabs type="border-card">
        <el-tab-pane label="物品列表">
           <el-button class="a6a" type="primary" @click="dialogFormVisible1=true" style="float:right;" size="small">添加物品</el-button>
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
              <!-- <el-table-column type="selection" width="50"></el-table-column> -->
              <el-table-column align="center" label="序号" type="index" :index="indexMethod"></el-table-column>
              <el-table-column align="center" prop="goodName" label="物品名称"></el-table-column>
              <el-table-column align="center" prop="goodDesc" label="物品描述" show-overflow-tooltip></el-table-column>
              <el-table-column align="center" prop="quantity" label="库存"></el-table-column>
              <el-table-column align="center" prop="category" label="物品类目"></el-table-column>
              <!-- <el-table-column align="center" prop="typeName" label="类型">

              </el-table-column>-->
              <el-table-column align="center" prop="time" label="创建时间" width="150"></el-table-column>
              <!-- <el-table-column align="center" prop="name" label="操作人" width="150"></el-table-column> -->
              <!-- <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button class="a6a" @click="chucang(scope.row)" type="text" size="small">出库</el-button>
                  <el-button class="a6a" @click="editProduct(scope.row)" type="text" size="small">拒绝入库</el-button>
                </template>
              </el-table-column>-->
            </el-table>
            <div class="block">
              <el-pagination
                style="float:right;"
                background
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :total="totalSize"
              ></el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="进货单">

          <!-- 内容区 -->
          <div class="text item">
            <el-table
              :data="tableData1"
              v-loading="loading"
              stripe
              style="width: 100%"
              highlight-current-row
              ref="multipleTable"
              @selection-change="handleSelectionChange"
            >
              <!-- <el-table-column type="selection" width="50"></el-table-column> -->
              <el-table-column align="center" label="序号" type="index" :index="indexMethod"></el-table-column>
              <el-table-column align="center" prop="goodName" label="物品名称"></el-table-column>
              <el-table-column align="center" prop="goodDesc" label="物品描述" show-overflow-tooltip></el-table-column>
              <el-table-column align="center" prop="quantity" label="入库数量"></el-table-column>
              <el-table-column align="center" prop="category" label="物品类目"></el-table-column>
              <!-- <el-table-column align="center"  label="类型">
                <template slot-scope="scope">
                  <span>{{scope.row.typeName}}</span><span style="color:red;margin-left:2px;">{{scope.row.type=='1'?'*':''}}</span>
                </template>
              </el-table-column> -->
              <el-table-column align="center" prop="time" label="创建时间" width="150"></el-table-column>
              <el-table-column align="center" prop="name" label="操作人" width="150"></el-table-column>
              <!-- <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button class="a6a" @click="rucang(scope.row)" type="text" size="small">入库</el-button>
                  <el-button class="a6a" @click="editProduct(scope.row)" type="text" size="small">拒绝入库</el-button>
                </template>
              </el-table-column> -->
            </el-table>
            <div class="block">
              <el-pagination
                style="float:right;"
                background
                layout="prev, pager, next"
                @current-change="handleCurrentChange"
                :total="totalSize"
              ></el-pagination>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="出货单">
            <el-table
              :data="tableData2"
              v-loading="loading"
              stripe
              style="width: 100%"
              highlight-current-row
              ref="multipleTable"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column align="center" label="序号" type="index" :index="indexMethod"></el-table-column>
              <el-table-column align="center" prop="goodName" label="物品名称"></el-table-column>
              <el-table-column align="center" prop="goodDesc" label="物品描述" show-overflow-tooltip></el-table-column>
              <el-table-column align="center" prop="quantity" label="出库数量"></el-table-column>
              <el-table-column align="center" prop="category" label="物品类目"></el-table-column>
              <el-table-column align="center" prop="warehouseName" label="所属仓库">
              </el-table-column>
              <el-table-column align="center" prop="time" label="创建时间" width="150"></el-table-column>
              <el-table-column align="center" prop="name" label="操作人" width="150"></el-table-column>
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button class="a6a" @click="chucang(scope.row)" type="text" size="small">出库</el-button>
                  <el-button class="a6a" @click="editProduct(scope.row)" type="text" size="small">拒绝入库</el-button>
                  <!-- <el-button class="ff3" @click="deleteProduct(scope.row)" type="text" size="small">删除</el-button> -->
                </template>
              </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="历史记录">
           <el-table
          style="width: 100%"
          :data="tableData3"
          v-loading="loading"
          stripe
          highlight-current-row
          ref="multipleTable"
          @selection-change="handleSelectionChange"
        >
          <el-table-column align="center" label="序号" type="index" :index="indexMethod"></el-table-column>
          <el-table-column align="center" prop="goodName" label="物品名称"></el-table-column>
          <el-table-column align="center" prop="goodDesc" label="物品描述" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="quantity" label="入库/出库数量">
            <template slot-scope="scope">
              <span>{{scope.row.type==1?'+':'-'}}{{scope.row.quantity}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="category" label="物品类目"></el-table-column>
          <el-table-column align="center" prop="warehouseName" label="仓库"></el-table-column>
          <el-table-column align="center" prop="typeName" label="类型"></el-table-column>
          <el-table-column align="center" prop="time" label="创建时间" width="150"></el-table-column>
          <el-table-column align="center" prop="name" label="操作人" width="150"></el-table-column>
          <!-- <el-table-column align="center" label="状态" width="150">
            <template slot-scope="scope">
              <span>{{scope.row.type==1?'入库':'出库'}}</span>
            </template>
          </el-table-column> -->
        </el-table>
        </el-tab-pane>
      </el-tabs>
      <!-- 内容区 -->
    <!-- </el-card> -->
    <el-dialog title="添加物品"  :visible.sync="dialogFormVisible1">
       <el-table
              :data="goodlist.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              v-loading="loading"
              stripe

              highlight-current-row
              ref="multipleTable"
              @selection-change="handleSelectionChange"
            >
              <!-- <el-table-column type="selection" width="50"></el-table-column> -->
              <el-table-column align="center" label="序号" type="index" :index="indexMethod"></el-table-column>
              <el-table-column align="center" prop="goodName" label="物品名称"></el-table-column>
              <el-table-column align="center" prop="goodDesc" label="物品描述" show-overflow-tooltip></el-table-column>
              <el-table-column align="center" prop="quantity" label="物品数量"></el-table-column>
              <el-table-column align="center" prop="category" label="物品类目"></el-table-column>
               <el-table-column align="center" prop="category" label="申请数量">
                  <template slot-scope="scope">
                     <el-input   placeholder="请输入"  type="number" v-model.number='scope.row.count'>
                      </el-input>
                </template>
               </el-table-column>
                 <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button class="a6a" @click="applygood(scope.row)" type="primary" size="small">提交</el-button>
                </template>
              </el-table-column>
            </el-table>
               <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="goodlist.length"
          :page-size="pagesize"
        ></el-pagination>
    </el-dialog>
  </div>
</template>

<script>
import serviceProduct from '@/service/product.js';
import category from '../hf-product/category';
import Search from '../hf-product/search';
// eslint-disable-next-line no-unused-vars
import cang from '@/service/cang.js';
import constants from '@/store/constants.js';
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Search,
    // eslint-disable-next-line vue/no-unused-components
    category,
  },
  data() {
    return {
      tableData3: [],
      tableData2: [],
      applys: {},
      count: '',
      currentPage: 1, // 初始页
      pagesize: 5, // 每页的数据
      goodlist: [],
      id: '',
      content: {},
      boss: {
        bossId: 1,
      },
      dialogFormVisible1: false,
      rules: {
        warehouseId: [
          {
            required: true,
            message: '请选择仓库',
            trigger: 'blur',
          },
        ],
      },
      form1: {
        warehouseId: '',
      },
      form: {
        warehouseId: '',
      },
      amount: '0',
      indexMethod: 1,
      activeName: 'goods',
      loading: false,
      totalSize: 0,
      currpage: 1,
      tableData: [],
      tableData1: [],
      Batch: [],
      canglist: [],
    };
  },
  methods: {
    applygood: function(row) {
      console.log(row);
      this.applys = row;
      if (!row.count) {
        this.$message({
          message: '请填写申请数量',
          type: 'error',
        });
        return false;
      }
      this.applys.userId = this.content.id;
      this.applys.warehouseId = this.id;
      cang.subapply(this.applys, (res) => {
        console.log(res);
        if (res.data.status === constants.SUCCESS_CODE) {
          this.$message({
            message: '申请成功',
            type: 'success',
          });


        } else {
          this.$message({
            message: '申请失败',
            type: 'error',
          });
        }
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    checkgood: function() {
      cang.checkgood(this.boss, (res) => {
        console.log(res);
        this.goodlist = res.data.data;
      });
    },
    submit1: function(ruleForm1) {
      this.form.userId = this.content.id;
      console.log(this.content.id);
      this.$refs[ruleForm1].validate((valid) => {
        if (valid) {
          console.log(this.form);
          cang.rucang(this.form, (res) => {
            if (res.data.status === constants.SUCCESS_CODE) {
              this.$message({
                message: '入库成功',
                type: 'success',
              });
              this.dialogFormVisible1 = false;
              this.setProducts();
            } else {
              this.$message({
                message: '入库失败',
                type: 'error',
              });
            }
          });
        }
      });
    },
    selectmethod: function(tab) {
      console.log(tab);
      for (var i = 0; i < this.canglist.length; i++) {
        if (this.canglist[i].hfName === tab) {
          console.log(this.canglist[i].id);
          this.form.warehouseId = this.canglist[i].id;
        }
      }
      console.log(this.form);
    },
    checkcang: function() {
      console.log(this.boss);
      cang.checkcang(this.boss, (res) => {
        console.log(res);
        this.canglist = res.data.data;
        console.log(this.canglist);
      });
    },
    chucang: function(row) {
      // this.form.productId = row.productId;
      // this.form.goodId = row.goodId;
      // this.form.quantity = row.quantity;
      // this.form.typeWho = row.type;
      // this.dialogFormVisible1 = true;
      //   cang.getProductListBoss((res) => {
      //   });
    },
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
      cang.findcang(this.id, (res) => {
        console.log(res);
        this.tableData = res.data.data;
        console.log(this.tableData);
        this.loading = false;
      });
    },
    findkulistone() {
      this.loading = true;

      cang.findkulistone(this.id, (res) => {
        console.log(res);
        this.tableData1 = res.data.data;
        console.log(this.tableData1);
        this.loading = false;
      });
    },
    recordone() {
      this.loading = true;

      cang.recordone(this.id, (res) => {
        console.log(res);
        this.tableData3 = res.data.data;
        console.log(this.tableData3);
        this.loading = false;
      });
    },
    danone() {
      this.loading = true;

      cang.danone(this.id, (res) => {
        console.log(res);
        this.tableData2 = res.data.data;
        console.log(this.tableData2);
        this.loading = false;
      });
    },
    handleCreate(e) {
      this.$router.push({
        path: '/hf-product/detail',
      });
    },
    editProduct(row) {
      //   console.log(row);
      //   this.$router.push({
      //     path:
      //       '/hf-product/detail?productId=' +
      //       row.id +
      //       '&stoneId=' +
      //       row.stoneId +
      //       '&stoneName=' +
      //       row.stoneName,
      //   });
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
    handleClick(tab, event) {
      console.log(tab, event);
    },
    childClick(tableData) {
      this.tableData = tableData;
    },
  },
  mounted() {
    this.checkcang();
    this.checkgood();
    var content = window.sessionStorage.getItem('userInfor');
    this.content = JSON.parse(content);
    this.id = this.$route.query.id;
    this.findkulistone();
    this.setProducts();
    this.danone();
    this.recordone();
    console.log(this.content);
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
  margin: 0 5px 5px 5px;
  margin-bottom: 25px;
}
.el-tabs__nav-wrap {
  margin-bottom: -6px;
}
.el-main {
  background: #f0f1f6;
}
.el-header {
  height: 31px;
}
</style>
