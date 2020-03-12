<template>
  <div slot="header" class="clearfix">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">商品信息</div>
        <el-form :inline="true" :model="productInfo" class="demo-form-inline">
          <el-row class="t-10">
            <el-col :span="8">
              <el-form-item label="商品名称">
                <el-input v-model="productInfo.hfName" placeholder="商品名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属类目">
                <el-select v-model="productInfo.categoryId" placeholder="请选择类目">
                  <el-option
                    v-for="item in classifyData"
                    :key="item.id"
                    :label="item.hfName"
                    :value="item.id"
                    style="height: 45px;"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属商家">
                <el-input v-model="productInfo.user" placeholder="所属商家"></el-input>
              </el-form-item>
            </el-col>
            <el-button type="primary" @click="onProductSubmit">{{isCreate ? '添加商品' : '更新商品'}}</el-button>
            <el-button label="ltr" @click="evenMore">查看更多</el-button>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <div class="p-5"></div>
        <div class="grid-content bg-purple">
          物品信息列表
          <el-button
            @click="appendGoods"
            round
            size="mini"
            style="float: right;margin-right: 8px;"
            type="primary"
          >添加物品</el-button>
        </div>
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
            <list-specification :value="value"></list-specification>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
<!-- 抽屉组件 -->
    <el-drawer
      :title="title"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      size="50%"
    >
      <el-form
        v-if="title!=='添加商品'"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="280px"
        class="demo-ruleForm"
      >
        <el-form-item style="width:100%" label="物品名称" prop="goodName ">
          <el-input style="width:50%" v-model="ruleForm1.goodName  "></el-input>
        </el-form-item>
        <el-form-item label="提货方式">
          <el-radio @change="takeManner" style="margin-left: 50px;" v-model="radio" label="0">快递</el-radio>
          <el-radio @change="takeManner" v-model="radio" label="1">自取</el-radio>
        </el-form-item>
        <el-form-item v-if="radio == 1" label="核销员" prop="region">
          <el-select @change="pullverifier" v-model="ruleForm.verifier" placeholder="请输入核销员姓名">
            <el-option
              v-for="(item, index) in verifier"
              :key="index"
              :label="item.realName"
              :value="item.realName"
              style="height: 45px;"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width:100%" label="物品描述" prop="goodsDesc">
          <el-input style="width:50%" v-model="ruleForm1.goodsDesc  "></el-input>
        </el-form-item>
        <el-form-item label prop="brandId">
          <el-button style="width:25%; margin-left: 5px;" type="primary" @click="SubmitGoods">提交</el-button>
          <!-- <el-button type="success" style="color: #fff;" @click="dialogTableVisible = true">添加物品规格值</el-button> -->
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import GoodsList from '../goods/list';
import ListPicture from '../list-picture';
import ListSpecification from '../list-specification';
import serviceProduct from '@/service/product.js';
import serviceGoods from '@/service/goods.js';

export default {
  components: {
    GoodsList,
    ListSpecification,
    ListPicture,
  },
  data() {
    return {
      value: '',
      title: '添加商品', // Drawer 抽屉标题头
      loading: false,
      drawer: false,
      isCreate: false,
      direction: 'rtl',
      classifyData: {}, // 类目数据
      productInfo: {
        user: '',
        region: '',
        hfName: '',
        categoryId: '',
      },
      radio: '0', // 单选按钮运费部分
      ruleForm: {},
      // 添加物品
      ruleForm1: {
        sellPrice: '', // 价格
        quantity: '', // 库存量
        productId: '1', // 商品id*
        categoryId: '', // 商品所属的类目id*
        cancelId: '', // 核销Id *
        claim: '', // 是否自提 *
        // member: '', // 是否为会员商品 *
        frames: '0', // 上下架*
        goodName: '', // 物品名称*
        goodsDesc: '', // 商品描述
        requestId: '123123123', // 请求id, 发起请求的随机数, 用来判断请求是否重
        token: '11238', // 登录成功后返回的token
        userId: '12', // 用户id
        fileInfo1: [],
      },
      // 顶部表单验证
      rules: {
        hfName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
        ],
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
        this.classifyData = res.data.data;
        this.loading = false;
      });
    },
    onProductSubmit() {
      // 添加商品
      this.loading = true;
      serviceProduct.ceateProduct(this.productInfo, (res) => {
        this.value = res.data.data.id;
        console.log(res.data.data.id);
        this.loading = false;
      });
    },
    SubmitGoods() {
      // 添加物品
      serviceGoods.addProduct(this.ruleForm1, (res) => {
        console.log(res);
        // 添加物品规格值
        // this.specGoods.goodsId = res.data.data;
        // 添加价格需要保存ID
        // this.specificationForm.hfGoodsId = res.data.data;
        this.$message({
          message: '恭喜你，添加成功',
          type: 'success',
        });
        this.drawer = false;
      });
    },
    appendGoods() {
      // 抽屉控制 添加物品
      this.drawer = true;
      this.direction = 'btt';
      this.title = '添加物品';
    },
    evenMore() {
      this.drawer = true;
      this.direction = 'rtl';
      this.title = '添加商品';
    },
    takeManner (label) {
      // 提货方式
      this.ruleForm1.claim = this.radio;
    },
    // 下拉 事件 核销员
    pullverifier (e) {
      // console.log(e)
      this.ruleForm1.cancelId = e;
    },
    handleClose(done) {
      this.$confirm('确认关闭？').then((_) => {
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.font-neue {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
.pl-5 {
  padding-right: 5px;
}
</style>
