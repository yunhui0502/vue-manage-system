<template>
       <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-width="280px"
        class="demo-ruleForm"
      >
        <el-form-item style="width:100%" label="物品名称" prop="goodName">
          <el-input style="width:50%" v-model="increase.goodName  "></el-input>
        </el-form-item>
         <el-form-item style="width:100%" label="物品描述" prop="goodsDesc">
          <el-input style="width:50%" v-model="increase.goodsDesc  "></el-input>
        </el-form-item>
        <el-form-item label="提货方式">
          <el-radio @change="takeManner" style="margin-left: 50px;" v-model="radio" label="0">快递</el-radio>
          <el-radio @change="takeManner" v-model="radio" label="1">自取</el-radio>
        </el-form-item>
        <el-form-item v-if="radio == 1" label="核销员" prop="region">
          <el-select @change="pullverifier" v-model="increase.verifier" placeholder="请输入核销员姓名">
            <el-option
              v-for="(item, index) in verifier"
              :key="index"
              :label="item.realName"
              :value="item.realName"
              style="height: 45px;"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width:100%" label="价格" prop="sellPrice">
          <el-input style="width:50%" v-model="specificationForm.sellPrice  "></el-input>
        </el-form-item>
         <el-form-item style="width:100%" label="划线价格" prop="linePrice">
          <el-input style="width:50%" v-model="specificationForm.linePrice  "></el-input>
        </el-form-item>
                 <el-form-item style="width:100%" label="库存" prop="quantity">
          <el-input style="width:50%" v-model="specificationForm.quantity"></el-input>
        </el-form-item>
        <el-form-item label prop="brandId">
          <el-button style="width:25%; margin-left: 5px;" type="primary" @click="SubmitGoods">提交</el-button>
          <!-- <el-button type="success" style="color: #fff;" @click="dialogTableVisible = true">添加物品规格值</el-button> -->
        </el-form-item>
      </el-form>
</template>

<script>
import serviceGoods from '@/service/goods.js';
export default {
  props: {
    commodityId: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      title: '添加物品', // Drawer 抽屉标题头
      radio: '0', // 单选按钮运费部分
      ruleForm: {},
      // 设置价格
      specificationForm: {
        linePrice: '', // 划线价
        quantity: '', // 物品数量
        hfGoodsId: '', // 物品ID
        sellPrice: '', // 物品价格
      },
      // 添加物品
      increase: {
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
        goodName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { min: 1, max: 9, message: '长度在 1 到 9 个字符', trigger: 'blur' },
        ],
      },
    };
  },
  // created() {

  // },
  methods: {
    takeManner (label) {
      // 提货方式
      this.ruleForm1.claim = this.radio;
    },
    setPrices() {
      serviceGoods.setPrice(this.specificationForm, (res) => {
        console.log('添加价格', res);
      });
    },
    SubmitGoods() {
      // 添加物品
      this.increase.productId = this.commodityId;
      serviceGoods.addProduct(this.increase, (res) => {
        console.log(res);
        this.goosID = res.data.data;
        this.specificationForm.hfGoodsId = res.data.data;
        this.setPrices();
        this.$message({
          message: '恭喜你，添加成功',
          type: 'success',
        });
        this.$emit('func', false);
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
