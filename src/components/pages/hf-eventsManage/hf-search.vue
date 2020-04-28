<template>
<!-- -----------------------------------------------------------搜索----------------------------------------------------- -->
  <el-form style="padding-top:20px" label-width="100px" :inline="true"  class="demo-form-inline">
    <el-form-item :label="labelName">
      <el-input v-model="inquire.goodsName" placeholder="请输入物品名称"></el-input>
    </el-form-item>
    <el-form-item label="活动类型">
       <el-select v-model="inquire.level" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
    </el-form-item>
    <el-form-item style="float: right;">
      <el-button type="purple" @click="seeAbout" :loading="addLoading">查询</el-button>
      <el-button @click="sou" :loading="addLoading">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import serviceProduct from '@/service/product.js';

export default {
  props: ['labelName'],
  data() {
    return {
      addLoading: false,
      activeIndex: '1',
      activeNames: ['1'],
      options: [
        {
          value: '0',
          label: '秒杀',
        },
        {
          value: '1',
          label: '团购',
        },
        {
          value: '2',
          label: '分销',
        },
        {
          value: '3',
          label: '精选',
        },
        {
          value: '4',
          label: '轮播图',
        },
      ],
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
.el-button {
  padding: 12px 46px;
}
</style>
