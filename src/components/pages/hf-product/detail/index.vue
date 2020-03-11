<template>
<div slot="header" class="clearfix">
  <el-row>
    <el-col :span="24">
      <div class="grid-content bg-purple-dark">商品信息</div>
      <el-form :inline="true" :model="productInfo" class="demo-form-inline">
        <el-row class="t-10">
          <el-col :span="8">
            <el-form-item label="商品名称">
              <el-input v-model="productInfo.user" placeholder="商品名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属类目">
              <el-select v-model="productInfo.catagety" placeholder="活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="所属商家">
              <el-input v-model="productInfo.user" placeholder="所属类目"></el-input>
            </el-form-item>
          </el-col>
          <el-button type="primary" @click="onProductSubmit">{{isCreate ? '添加商品' : '更新商品'}}</el-button>
          <el-button label="ltr" @click="drawer = true">查看更多</el-button>
        </el-row>
      </el-form>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="16">
      <div class='p-5'></div>
      <div class="grid-content bg-purple">物品信息列表</div>
      <GoodsList></GoodsList>
    </el-col>
    <el-col :span="8">
      <div class="grid-content bg-purple-light">属性设置</div>
      <el-container class="t-10 radius-4">
        <el-header class="font-neue t-10">图片管理</el-header>
        <el-main>
          <list-picture></list-picture>
        </el-main>
      </el-container>
      <el-container class="t-10 radius-4">
        <el-header class="font-neue t-10">规格管理</el-header>
        <el-main>
          <list-specification></list-specification>
        </el-main>
      </el-container>
    </el-col>
  </el-row>
  <el-drawer title="我是标题" :visible.sync="drawer" :direction="direction" :before-close="handleClose">
    <span>我来啦!</span>
  </el-drawer>
</div>
</template>

<script>
import GoodsList from '../goods/list';
import ListPicture from '../list-picture';
import ListSpecification from '../list-specification';
import serviceProduct from '@/service/product.js';

export default {
  components: {
    GoodsList,
    ListSpecification,
    ListPicture,
  },
  data() {
    return {
      loading: false,
      drawer: false,
      isCreate: false,
      direction: 'rtl',
      productInfo: {
        user: '',
        region: '',
        hfName: '',
        catagety: '',
      },
    };
  },
  created() {
    console.log(this.$route.query);
    let query = this.$route.query;
    if (typeof query.productId === 'undefined') {
      this.isCreate = true;
    }
    // 加载类目
    this.getCatagery();
  },
  methods: {
    getCatagery() {
      this.loading = true;
      serviceProduct.getCatagery((res) => {
        this.catagetys = res.data.data;
        this.loading = false;
      });
    },
    onProductSubmit() {
      // 添加商品
      this.loading = true;
      serviceProduct.ceateProduct(this.productInfo, (res) => {
        this.tableData = res.data.data;
        this.loading = false;
      });
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  // margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  background-color: #f9fafc;
}

.t-10 {
  margin-top: 10px;
}

.radius-4 {
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

.font-neue {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.pl-5 {
  padding-right: 5px;
}
</style>
