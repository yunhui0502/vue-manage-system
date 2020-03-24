<template>
  <div slot="header" class="clearfix">
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">商品信息</div>
        <el-form :rules="rules" :inline="true" :model="productInfo" class="demo-form-inline">
          <el-row class="t-10">
            <el-col :span="8">
              <el-form-item label="商品名称" prop="productName">
                <el-input v-model="productInfo.productName" placeholder="商品名称"></el-input>
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
                <!-- <el-cascader
                  :options="options"
                  :clearable="true"
                  size="mini"
                  ref="cascader"
                  @change="handleItemChange"
                  @active-item-change="handleItemChange"
                  :change-on-select="changeOnSelect"
                  :props="props"
                ></el-cascader> -->
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="所属商家">
                <el-input v-model="productInfo.lastModifier" placeholder="所属商家"></el-input>
              </el-form-item>
            </el-col>
            <el-button type="primary" @click="onProductSubmit">{{isCreate ? '添加商品' : '更新商品'}}</el-button>
            <el-button label="ltr" @click="evenMore">查看更多</el-button>
          </el-row>
          <el-form-item prop="productDesc" label="商品描述">
            <el-input type="textarea" v-model="productInfo.productDesc"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <div class="p-5"></div>
        <div class="grid-content bg-purple">
          物品信息列表
          <!-- <el-button
            size="mini"
            round
            style="float: right;margin-right: 2px;"
            type="primary"
            @click="refresh"
          >刷新</el-button> -->
          <el-button
            @click="appendGoods"
            round
            size="mini"
            style="float: right;margin-right: 8px;"
            type="primary"
          >添加物品</el-button>
        </div>
        <GoodsList v-if="isRouterAlive" :commodityId="commodityId"></GoodsList>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">属性设置</div>
        <el-container class="t-10 radius-4">
          <el-header style="height: -1px;" class="font-neue t-10">图片管理</el-header>
          <el-main>
            <list-picture :productId="productInfo.id"></list-picture>
          </el-main>
        </el-container>
        <el-container class="t-10 radius-4">
          <el-header style="height: 10px;" class="font-neue t-10">
            {{Cabinet}}规格
            <span style="margin: 0 4px">{{Cabinet}}名称：{{productInfo.name}}</span>
          </el-header>
          <el-main>
            <list-specification :goosID="goosID" :commodityId="commodityId"></list-specification>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
    <!-- 抽屉组件 -->
    <el-drawer :title="title"
    :visible.sync="drawer"
    :direction="direction"
    :before-close="handleClose"
    size="80%">
      <div>
        <GoodsLncrease
          @goodsId="goodsIdGetMsg"
          @func="getMsgFormSon"
          :commodityId="commodityId"
          :productName="productInfo.productName"
          v-if="title!=='添加商品'"
        ></GoodsLncrease>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import GoodsList from '../goods/list';
import GoodsLncrease from '../goods/lncrease';
import ListPicture from '../list-picture';
import ListSpecification from '../list-specification';
import serviceProduct from '@/service/product.js';
// import serviceGoods from '@/service/goods.js';
export default {
  components: {
    GoodsList,
    ListSpecification,
    ListPicture,
    GoodsLncrease,
  },
  props: {
    // 如果该值为false 则只能选择最后一级
    // 如果该值为true 则可以选择任意层级
    changeOnSelect: {
      default: false,
    },
  },
  data() {
    return {
      options: [],
      props: {
        value: 'main',
        // 显示的文字字段名
        label: 'label',
        // 子层级字段名
        children: 'child',
      },
      isRouterAlive: true,
      Cabinet: '商品',
      commodityId: '',
      goosID: 0,
      title: '',
      loading: false,
      drawer: false,
      isCreate: false,
      direction: 'rtl',
      classifyData: {}, // 类目数据
      productInfo: {
        bossId: '1',
        region: '',
        productName: '',
        lastModifier: '', // 商家名称
        productDesc: '',
        id: '',
        categoryId: '',
        name: '', // 展示
      },

      // 添加物品规格值
      specGoods: {
        productSpecId: '',
        goodsId: '43',
        requestId: '111',
        specValue: '',
        timestamp: '20191023T081324Z',
        token: '11',
        userId: '11',
      },
      // 顶部表单验证
      rules: {
        productName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 1, message: '请输入内容', trigger: 'blur' },
        ],
        hfName: [
          { required: true, message: '请选择类目名称', trigger: 'change' },
        ],
      },
    };
  },
  created() {
    console.log(this.$route.query);
    let query = this.$route.query;
    this.productInfo.id = query.productId;
    if (typeof query.productId === 'undefined') {
      this.isCreate = true;
    } else {
      this.commodityId = query.productId;
    }
    // 加载类目
    this.getCatagery();
    this.getCurrent();
  },
  methods: {
    // getZoning () {
    //   let self = this;
    //   // 发送请求
    //   self.$backend.request(self.$api.user.getZoning, {id: 0}).then((res) => {
    //     self.options = res.list;
    //     self.options.map((item, index) => {
    //       for (let k in item) {
    //         if (!item[k]) {
    //           delete item[k];
    //         }
    //       }
    //       // 先让数据变成父级
    //       item.child = [];
    //       // 手动创建字段表明当前索引 假设arrIndex值为'1-2-3' 即为options[1].child[2].child[3]
    //       item.arrIndex = index + '';
    //       // 将当前数据转成字符串放入对象里 当做value值
    //       item.main = JSON.stringify(item);
    //     });
    //   });
    // },
    // handleItemChange (val) {
    //   // 因为允许选择任意级,所以在向下选择时,会出现选择多个的情况,造成选中的合并成了一个数组,我这里只让他选择到第三层,页面上最多只会出现选择三个,如果超出了,直接return出去 不需要再动态加载下去了
    //   if (val.length > 2) {return;}
    //   // 开门见山的说,每选中一个选项,相当于将本条数据push到val里,所以索引为val.length - 1的那一项必然是当前点击的那一项,哇 我他娘的可真是才思敏捷啊
    //   val = JSON.parse(val[val.length - 1]);
    //   // 发送请求,是不是觉得和初始化用的同一个接口,然后还分两个事件有点冗余?写代码不累啊!
    //   this.$backend.request(this.$api.user.getZoning, {id: val.roid}).then((res) => {
    //     let data = res.list;
    //     // 是不是有点迷糊 arrIndex哪来的?这玩意就是手动塞进去的索引
    //     let arrIndex = val.arrIndex;
    //     data.map((item, index) => {
    //       // 手动创建字段表明当前索引 假设arrIndex值为'1-2-3' 即为options[1].child[2].child[3]
    //       item.arrIndex = arrIndex + '-' + index;
    //       // 将当前数据转成字符串放入对象里 当做value值
    //       item.main = JSON.stringify(item);
    //       // 判断是否是第三层及以上
    //       if (item.arrIndex.split('-').length < 3) {
    //         item.child = [];
    //       }
    //     });
    //     // 根据父元素的arrIndex判断塞到哪个父元素下
    //     arrIndex = arrIndex.split('-');
    //     // 首项键不是child 和for循环里区别开
    //     let a = this.options[arrIndex[0]];
    //     for (let i = 1; i < arrIndex.length; i++) {
    //       a = a.child[arrIndex[i]];
    //     }
    //     // 方法丑是丑了点...不过...真香
    //     this.$delete(a, 'child');
    //     this.$set(a, 'child', data);
    //   });
    // },
    // 提交按钮 物品格 productSpecId
    submitPrice(scope) {
      // this.specGoods.specValue = scope.row.specValue;
      // this.specGoods.productSpecId = scope.row.id;
      // serviceGoods.additionSpecs(this.specGoods, (res) => {
      //   console.log(res);
      // });
      // this.$message({
      //   message: '提交成功',
      //   type: 'success',
      // });
    },

    getMsgFormSon(data) {
      this.drawer = data;
      console.log(this.drawer);
      console.log(data);
    },
    // 子组件传来的 物品ID
    goodsIdGetMsg(data) {
      this.specGoods.goodsId = data;
      console.log(this.drawer);
      console.log(data);
    },

    getCatagery() {
      this.loading = true;
      serviceProduct.getCatagery((res) => {
        this.classifyData = res.data.data;
        this.loading = false;
      });
    },
    onProductSubmit() {
      console.log(this.productInfo.id);
      if (this.productInfo.id === undefined) {
        if (this.productInfo.productName !== '') {
          console.log('添加商品', this.productInfo);
          // 添加商品
          this.loading = true;
          serviceProduct.ceateProduct(this.productInfo, (res) => {
            this.commodityId = res.data.data.productId;
            this.$router.push({
              path: '/hf-product/detail?productId=' + res.data.data.productId,
            });
            location.reload();
          });
        }
      } else {
        console.log('更新商品', this.productInfo);
        serviceProduct.updateProduct(this.productInfo, (res) => {
          console.log('更新商品', res);
        });
      }
    },
    // 获取当前商品
    getCurrent() {
      if (!this.isCreate) {
        serviceProduct.getDetail(this.commodityId, (res) => {
          console.log('获取当前', res.data.data);
          this.productInfo.productName = res.data.data.productName;
          this.productInfo.id = res.data.data.id + '';
          this.productInfo.lastModifier = res.data.data.stoneName;
          this.productInfo.categoryId = res.data.data.categoryId;
          this.productInfo.name = res.data.data.productName;
          this.productInfo.productDesc = res.data.data.productDesc;
        });
      }
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
    // 下拉 事件 核销员
    pullverifier(e) {
      // console.log(e)
      this.ruleForm1.cancelId = e;
    },
    refresh() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    },
    handleClose(done) {
      this. refresh();
      done();
    },
  },
  mounted () {
    // this.getZoning();
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
