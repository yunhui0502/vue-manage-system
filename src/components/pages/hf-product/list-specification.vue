<template>
  <div>
    <div>商品规格</div>
    <el-table class="goods-table" :data="commoditytable" border>
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="规格名称">
        <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-show="!scope.row.show" v-model="scope.row.tab2"></el-input>
          <!-- <span v-show="scope.row.show">{{scope.row.tab2}}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="默认值">
        <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-show="!scope.row.show" v-model="scope.row.tab3"></el-input>
          <!-- <span v-show="scope.row.show">{{scope.row.tab3}}</span> -->
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="addGoodsSpecificationList()">添加一行</el-button>
          <el-button @click="save(scope)">添加</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div>物品规格</div>
     <el-table :data="tabledata" border>
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="ID">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-model="scope.row.id"></el-input>
            <!-- <span v-show="!scope.row.show">{{scope.row.id}}</span> -->
          </template>
        </el-table-column>
        <el-table-column v-for="(item,i) in cols" :key="i" :prop="item.prop" :label="item.label">
          <el-table-column v-if="conceal!==1" :render-header="renderHeader">
            <template slot-scope="scope">
              <input value @input="inputEvent($event)" @blur="Article(value,scope)" ref="abc" />
              <!-- <el-input placeholder="请输入内容" @blur="Article(scope)"
              v-model="itemRadio[i]">23123</el-input>-->
              <!-- <span v-show="!show" @click="ces(scope)">23123</span> -->
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              v-model="handleAdd"
              type="text"
              circle
              plain
              icon="el-icon-plus"
              @click="handleAdd()"
            >添加一行</el-button>
            <el-button type="text" style="color: rgb(24, 211, 71);" @click="submitPrice(scope)">提交</el-button>
            <!-- <el-button type="text" style="color: rgb(218, 18, 28);" @click="deletion(scope)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    <!-- <el-table :data="specificationData" border>
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="规格名称">
        <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-model="scope.row.hfName"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="规格类型">
        <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-model="scope.row.specType"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="默认值">
        <template slot-scope="scope">
          <span >{{scope.row.specValue}}</span>
        </template>
      </el-table-column>
      <el-table-column label="规格单位">
        <template slot-scope="scope">
          <el-input placeholder="请输入内容" v-model="scope.row.specUnit"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="">
          <el-button>修改</el-button>
        </template>
      </el-table-column>
    </el-table>-->
    <div>ss{{value}}ss</div>
  </div>
</template>

<script>
import serviceProduct from '@/service/product.js';
import serviceGoods from '@/service/goods.js';
export default {
  props: ['value'],
  data() {
    return {
      specificationData: [],
      // 添加物品规格 展示数据
      tabledata: [
        {
          createTime: '',
          hfName: '',
          modifyTime: '',
          specType: '',
          specValue: '',
        },
      ],
      // 添加物品规格获取数据
      tabledatas: [],
      productId: '',
      commoditytable: [{ tab1: '1', tab2: '颜色', tab3: '红色' }],
      // 添加规格名称
      cols: [
        // { prop: 'date', label: '颜色' },
        // { prop: 'name', label: '姓名' }
      ],
      // 添加商品规格
      specification: {
        specValue: '', // 默认值
        productId: this.value,
        hfName: '', // 规格名称
        requestId: '',
        timestamp: '',
        token: '',
        userId: '',
      },
    };
  },
  created() {
    this.getspecification();
  },
  // computed: {
  watch: {
    value: (n, o) => {// 箭头函数  不然会发生this改变
      console.log(n);
      this.productId = n;
      this.specification.productId = n;
      // this.imgs = n.img;
    },
  },
  // },
  methods: {
    getspecification() {
      // serviceProduct.specifies(this.productId, (res) => {
      //   console.log(res);
      //   this.specificationData = res.data.data;
      // });
      console.log('id', this.productId);
    },
    // 添加一行商品规格
    addGoodsSpecificationList() {
      let row = { tab1: '', tab2: '', tab3: '' };
      this.commoditytable.push(row);
    },
    // 添加一行物品规格值
    handleAdd () {
      // let row = {
      //   createTime: '',
      //   hfName: '',
      //   modifyTime: '',
      //   specType: '',
      //   specValue: '',
      // };
      // this.tabledata.push(row);
      console.log('id', this.productId);
    },
    // 添加商品规格
    save(scope) {
      scope.row.show = false;
      this.specification.hfName = scope.row.tab2;
      this.specification.specValue = scope.row.tab3;
      serviceProduct.addSpecify(this.specification, () => {
        this.$message({
          message: '添加商品规格成功',
          type: 'success',
        });
        serviceProduct.specifies(this.specification.productId, (res) => {
          console.log('获取规格ID', res);
          this.tabledatas = res.data.data;
          console.log(res);
          for (var i = 0; i < res.data.data.length; i++) {
            this.cols.push({
              prop: 'specValue' + i,
              label: res.data.data[i].hfName,
            });
          }
        });
      });
    },
    // 输入事件
    inputEvent: function(e) {
      console.log(e.target.value); // 实时获取输入值
      this.specGoods.specValue = e.target.value;
      // console.log(index)// 获取点击输入框的索引
    },

    // 添加物品规格值
    Article(value, scope) {
      console.log(scope);
      console.log('2', this.tabledatas[scope.column.test].id);
      this.specGoods.productSpecId = this.tabledatas[scope.column.test].id;
      serviceGoods.additionSpecs(this.specGoods, (res) => {
        console.log(res);
      });
    },
    // 提交按钮
    submitPrice (scope) {
      this.$message({
        message: '价格提交成功',
        type: 'success',
      });

    },
  },
};
</script>
