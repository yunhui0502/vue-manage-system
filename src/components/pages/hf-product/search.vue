<template>
  <div>
    <!-- <el-collapse v-model="activeNames"> -->
    <!-- <el-collapse-item title="搜索条件" name="0"> -->
    <!-- <div slot="header" class="clearfix">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item
          v-for="statistics in statusStatistics"
          v-bind:key="statistics.index"
        >{{statistics.desc}} ({{statistics.quantity}})</el-menu-item>
      </el-menu>
    </div>-->
    <div class="text item">
      <el-form :inline="true">
        <div style="padding:25px 0 24px  44px;">
          <el-form-item style=";margin-left: 5px;" label>
            <el-form-item label>
              <div>物品名称</div>
            </el-form-item>
            <el-input
              v-model="inquire.goodsName"
              style="width:257px;height:30px;border-radius:6px;outline: none; padding-left: 14px;"
              placeholder="请输入物品名称 "
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item style="margin-left: 5px;" label>
            <el-form-item label>
              <div style>物品分类</div>
            </el-form-item>
            <el-input
              style="width:257px;height:30px;border-radius:6px;outline: none; padding-left: 14px;"
              v-model="inquire.productCategoryName"
              placeholder="请输入要查询的类目名称"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <div style="float: right;margin-right: 260px;">
            <el-button
              type="primary"
              @click="seeAbout"
              :loading="addLoading"
            >查询</el-button>
            <el-button
              type="primary"
              @click="sou"
              :loading="addLoading"
            >重置</el-button>
          </div>
        </div>
      </el-form>
    </div>
    <!-- </el-collapse-item> -->
    <!-- </el-collapse> -->
  </div>
</template>

<script>
import serviceProduct from '@/service/product.js';

export default {
  data() {
    return {
      addLoading: false,
      activeIndex: '1',
      activeNames: ['1'],
      // statusStatistics: [
      //   {
      //     index: '1',
      //     name: 'all',
      //     desc: '全部商品',
      //     quantity: 0,
      //   },
      //   {
      //     index: '2',
      //     name: 'selling',
      //     desc: '出售中',
      //     quantity: 0,
      //   },
      //   {
      //     index: '3',
      //     name: 'stock',
      //     desc: '库存',
      //     quantity: 0,
      //   },
      // ],
      inquire: {
        goodsName: '', // 商品名称
        productCategoryName: '', // 类目名称
      },
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      if (key === '1') {
        this.getcoommo();
      } else if (key === '2') {
        this.qihuanchus();
        console.log('出售中');
      } else if (key === '3') {
        this.qihuankuch();
      }
    },
    sou: function() {
      this.inquire.goodsName = '';
      this.inquire.productCategoryName = '';
    },
    seeAbout() {
      serviceProduct.productNameListBos(this.inquire, (res) => {
        let tableData = res.data.data.list;
        this.$emit('parentByClick', tableData);
        console.log(res);
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
