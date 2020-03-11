<template>
  <div>
    <el-table :data="specificationData" border>
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="规格名称">
        <template slot-scope="scope">
          <!-- <span v-show="!scope.row.show">{{scope.row.hfName}}</span> -->
          <el-input placeholder="请输入内容" v-model="scope.row.hfName"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="规格类型">
        <template slot-scope="scope">
          <!-- <span v-show="!scope.row.show">{{scope.row.specType}}</span> -->
          <el-input placeholder="请输入内容" v-model="scope.row.specType"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="默认值">
        <template slot-scope="scope">
          <span >{{scope.row.specValue}}</span>
          <!-- <el-input placeholder="请输入内容" v-model="scope.row.specValue"></el-input> -->
        </template>
      </el-table-column>
      <el-table-column label="规格单位">
        <template slot-scope="scope">
          <!-- <span v-show="!scope.row.show">{{scope.row.specType}}</span> -->
          <el-input placeholder="请输入内容" v-model="scope.row.specUnit"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="">
          <!-- <el-button>添加</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import serviceProduct from '@/service/product.js';
export default {
  data() {
    return {
      specificationData: [],
      productId: '1',
    };
  },
  created() {
    this.getspecification();
  },
  methods: {
    getspecification() {
      serviceProduct.specifies(this.productId, (res) => {
        console.log(res);
        this.specificationData = res.data.data;
      });
    },
  },
};
</script>
