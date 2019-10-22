<template>
  <el-table :data="tableData" size="mini" highlight-current-row border class="el-tb-edit mgt20" ref="multipleTable"
    tooltip-effect="dark" v-loading="listLoading" @selection-change="selectChange">
    <el-table-column type="selection" label="序号" width="50px" align="center">
    </el-table-column>
   <el-table-column type="index" :index="indexMethod" label="序号" width="50px" align="center">
   </el-table-column>
   <el-table-column prop="id" label="商品编号" align="center">
   </el-table-column>
    <el-table-column prop="productName" label="商品名称" align="center">
    </el-table-column>
    <el-table-column prop="productDesc" label="商品描述" align="center">
    </el-table-column>
    <el-table-column prop="productCategoryName" label="商品类目" align="center">
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="260">
      <template slot-scope="scope">
        <!-- <el-button type="primary" plain size="small" @click="addgui(scope.row)" style="margin-bottom: 10px;">查看规格</el-button> -->
        <el-button type="primary" plain size="small" @click="biangui(scope.row)" style="margin-bottom: 10px;">修改规格</el-button>
         <el-button type="danger" plain size="small" @click="deletesingle(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import api from '@/apis/hf-api.js';
  export default {
    name: 'productTable',
    data() {
      return {
         tableData: [],
      }
    },
    methods: {
      TellMeId(num) {
        console.log(num)
      },
      listProduct() {
        api.getProductList(1).then(response => {
          console.log(response);
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
