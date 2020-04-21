<template>
  <div>
    <el-card class="box-card" style="margin-bottom:20px;">
      <div slot="header" class="clearfix">
        <span>店铺基本信息</span>
        <div style="margin-top:10px;">
          <span>店铺名称:{{storeinfor.hfName}}</span>
          <span style="margin-left: 20px;" v-if="storeinfor.hfStatus=== 0">店铺状态:营业</span>
          <span style="margin-left: 20px;" v-if="storeinfor.hfStatus === 1">店铺状态:未营业</span>
          <span style="margin-left: 20px;">店铺描述:{{storeinfor.hfDesc}}</span>
          <span style="margin-left: 20px;">店铺地址:{{storeinfor.address}}</span>
          <!-- <span style="margin-left: 20px;">{{storeinfor.hfDesc}}</span>
      <span style="margin-left: 20px;">支付时间:{{storeinfor.hfStatus}}</span>
          <span style="margin-left: 20px;">订单状态:{{zhuang}}</span>-->
          <el-button style="float: right;" @click="Statistics(0)" type="primary">查看店铺统计信息</el-button>
        </div>
      </div>
    </el-card>
    <div style="display:flex;">
      <el-card class="box-card" style="width:40%;">
        <div slot="header" class="clearfix">
          <span>商品列表</span>
          <el-button style="float: right;margin-left:10px;" type="primary" @click="Added">新增店铺商品</el-button>
          <el-button style="float: right;" type="primary" @click="add = true">添加店铺商品</el-button>
        </div>
        <el-table :data="list" stripe style="width: 100%" ref="table" @row-click="getproductgood">
          <el-table-column type="index" align="center" label="选择" width="50"></el-table-column>
          <el-table-column align="center" prop="productName" label="商品名称"></el-table-column>
          <el-table-column align="center" prop="productDesc" label="商品描述"></el-table-column>
        </el-table>
      </el-card>
      <el-card class="box-card" style="width:50%;margin-left:20px;">
        <div slot="header" class="clearfix">
          <span>物品列表</span>
        </div>
        <el-table :data="listwu" stripe style="width: 100%" ref="table" @row-click="getproductgood">
          <el-table-column prop="goodsId" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="goodsName" label="物品名称" align="center"></el-table-column>
          <el-table-column prop="goodsDesc" label="物品描述" align="center"></el-table-column>
          <el-table-column prop="brandName" label="生产厂家" align="center"></el-table-column>
          <el-table-column prop="sellPrice" label="售卖价格" align="center">
            <template slot-scope="scope">
              <el-input style="text-align:center;" v-model="scope.row.sellPrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" width="180" label="创建时间" align="center"></el-table-column>
          <el-table-column prop="modifyTime" width="180" label="更新时间" align="center"></el-table-column>
          <el-table-column align="center" label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="updatagood(scope.row)">保存</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button @click="Shops(1)" type="primary">添加物品</el-button>
      </el-card>
    </div>

    <el-dialog title="店铺商品" :visible.sync="add">
      <el-table
        @selection-change="handleSelectionChange"
        :data="tableData"
        border
        style="width: 100%"
        highlight-current-row
        ref="multipleTable"
      >
        <el-table-column type="selection" align="center" label="选择" width="50"></el-table-column>
        <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
        <el-table-column prop="productName" label="商品名称" align="center"></el-table-column>
        <el-table-column prop="productDesc" label="商品描述" align="center"></el-table-column>
        <el-table-column prop="categoryName" label="所属类目名称" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="lastModifier" label="最近一次操作人" align="center"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="add = false">关闭</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>

    <el-drawer
      :visible.sync="drawer"
      direction="btt"
      :before-close="handleClose"
      size="60%"
    >
      <div v-if="Stat==1">
        <GoodsLncrease :productName="productName" :commodityId="productid" :stoneId="stoneId"></GoodsLncrease>
      </div>

      <div v-if="Stat==0" class="box">

        <div
          class="leftxiao"
        >
          <div
            style="display:flex;align-items:center;flex-direction:column; margin-top:20px;width:155px;"
          >
            <div>今日收入金额（元）</div>
            <div style="margin-top:2px;">{{liulan.amountDay}}</div>
          </div>
          <div style="font-size:12px;display:flex;">
            <div
              style="margin-left:14px; display:flex;align-items:center;flex-direction:column; margin-top:15px;"
            >
              <div>支付订单数</div>
              <i style="font-size:13px;margin-top:2px;margin-bottom:2px;">{{liulan.orderCountsDay}}</i>
              <div style="font-size:10px;">昨日:{{liulan.orderCountsYestday}}</div>
            </div>
            <div
              style="margin-left:14px;display:flex;align-items:center;flex-direction:column; margin-top:15px;"
            >
              <div>支付人数</div>
              <i style="font-size:13px;margin-top:2px;margin-bottom:2px;">4</i>
              <div style="font-size:10px;">昨日：{{liulan.paymentConutsYestday}}</div>
            </div>
            <div
              style="margin-left:14px;display:flex;align-items:center;flex-direction:column; margin-top:15px;"
            >
              <div>浏览量</div>
              <i style="font-size:13px;margin-top:2px;margin-bottom:2px;">6</i>
              <div style="font-size:10px;">昨日：{{liulan.browseCountsYestday}}</div>
            </div>
          </div>
        </div>

        <div
          class="leftxiao1"
        >
          <div
            style="display:flex;align-items:center;flex-direction:column; margin-top:20px;width:155px;"
          >
            <div>本月收入金额（元）</div>
            <div style="margin-top:2px;">{{liulan.amountMouth}}</div>
          </div>
          <div style="font-size:12px;display:flex;">
            <div
              style="margin-left:14px; display:flex;align-items:center;flex-direction:column; margin-top:15px;"
            >
              <div>支付订单数</div>
              <i style="font-size:13px;margin-top:2px;margin-bottom:2px;">{{liulan.orderCountsDay}}</i>
              <div style="font-size:10px;">昨日{{liulan.orderConutsMouth}}</div>
            </div>
            <div
              style="margin-left:14px;display:flex;align-items:center;flex-direction:column; margin-top:15px;"
            >
              <div>支付人数</div>
              <i style="font-size:13px;margin-top:2px;margin-bottom:2px;">{{liulan.paymentConutsMouth}}</i>
              <div style="font-size:10px;">昨日：{{liulan.paymentConutsYestday}}</div>
            </div>
            <div
              style="margin-left:14px;display:flex;align-items:center;flex-direction:column; margin-top:15px;"
            >
              <div>浏览量</div>
              <i style="font-size:13px;margin-top:2px;margin-bottom:2px;">{{liulan.browseCountsMouth}}</i>
              <div style="font-size:10px;">昨日：{{liulan.browseCountsYestday}}</div>
            </div>
          </div>
        </div>

      </div>
    </el-drawer>
  </div>
</template>
<script>
import GoodsLncrease from '../hf-product/goods/lncrease';
import home from '@/service/home.js';
// eslint-disable-next-line no-unused-vars
import storeService from '@/service/store.js';
// eslint-disable-next-line no-unused-vars
import constants from '@/store/constants.js';
import serviceProduct from '@/service/product.js';
export default {
  name: 'store',
  components: { GoodsLncrease },
  data() {
    return {
      Stat: '0',
      liulan: {},
      drawer: false,
      updata: {
        productId: '',
        stoneId: '',
        userId: '',
        id: '',
        sellPrice: '',
      },
      storeinfor: {},
      content: {},
      product: {
        productIds: [],
        stoneId: '',
        userId: '',
      },
      add: false,
      tableData: [],
      id: '',
      list: [],
      collapse: false,
      selectDdata: [],
      listwu: [],
      productid: '',
      stoneId: '',
      productName: '',
    };
  },
  methods: {
    // 添加
    Shops(e) {
      console.log('添加', e);
      this.Stat = e;
      this.drawer = true;
    },
    // 统计
    Statistics(e) {
      console.log('统计', e);
      this.Stat = e;
      this.drawer = true;
    },
    DataByStone() {
      home.findAmountDataByStone(this.$route.query.id, (res) => {
        console.log('统计', res.data.data);
        this.liulan = res.data.data;
      });
    },
    updatagood: function(row) {
      console.log(row);
      this.updata.stoneId = this.$route.query.id;
      this.updata.userId = this.content.id;
      this.updata.id = row.goodsId;
      this.updata.sellPrice = row.sellPrice;
      console.log(this.updata);
      storeService.updatagood(this.updata, (res) => {
        console.log(res);
        if (res.data.status === constants.SUCCESS_CODE) {
          this.$message({
            message: '更新成功',
            type: 'success',
          });
          storeService.getproductgood(this.productid, (res) => {
            console.log(res);
            let data = res.data.data;
            for (var i = 0; i < data.length; i++) {
              // eslint-disable-next-line no-magic-numbers
              data[i].sellPrice = (data[i].sellPrice / 100).toFixed(2);
              // eslint-disable-next-line no-magic-numbers
            }
            this.listwu = data;
          });
          // this.product.productIds = [];
          // this.selectDdata = [];
        } else {
          this.$message({
            message: '更新失败',
            type: 'error',
          });
        }
      });
    },
    getproductgood: function(aaa) {
      console.log(aaa);
      this.productid = aaa.id + '';
      this.productName = aaa.productName;
      storeService.selectProductGoods(aaa.id, this.stoneId, (res) => {
        console.log(res);
        let data = res.data.data;
        for (var i = 0; i < data.length; i++) {
          // eslint-disable-next-line no-magic-numbers
          data[i].sellPrice = (data[i].sellPrice / 100).toFixed(2);
          // eslint-disable-next-line no-magic-numbers
        }
        this.listwu = data;

      });
    },
    submit: function() {
      // this.product.productIds = [];
      if (this.selectDdata.length > 0) {
        for (var i = 0; i < this.selectDdata.length; i++) {
          this.product.productIds.push(this.selectDdata[i].id);
        }
      } else {
        return false;
      }
      this.product.userId = this.content.id;
      this.product.stoneId = this.id;
      console.log(this.product);
      storeService.storeAddProduct(this.product, (res) => {
        console.log(res);
        if (res.data.status === constants.SUCCESS_CODE) {
          this.$message({
            message: '添加成功',
            type: 'success',
          });
          this.add = false;
          this.getstoneproduct();
          // this.product.productIds = [];
          // this.selectDdata = [];
        } else {
          this.$message({
            message: '添加失败',
            type: 'error',
          });
          // this.product.productIds = [];
          // this.selectDdata = [];
        }
      });
    },
    Added(e) {
      let stoneId = this.stoneId;
      this.$router.push({
        path: '/hf-product/detail',
        query: {
          stoneId: stoneId,
          stoneName: this.storeinfor.hfName,
        },
      });
    },
    handleSelectionChange(val) {
      console.log(val);
      this.selectDdata = val;
    },
    setProducts() {
      serviceProduct.getProductsByBossId((res) => {
        console.log(res);
        this.tableData = res.data.data.list;
      });
    },
    getstoneproduct: function() {
      console.log(this.id);
      storeService.getstoneproduct(this.id, (res) => {
        console.log(res);
        this.list = res.data.data.list;
        this.updata.productId = this.list[0].id;
        this.productid = this.list[0].id + '';
        this.productName = this.list[0].productName;
        storeService.getproductgood(this.list[0].id, (res) => {
          console.log(res);
          let data = res.data.data;
          for (var i = 0; i < data.length; i++) {
            // eslint-disable-next-line no-magic-numbers
            data[i].sellPrice = (data[i].sellPrice / 100).toFixed(2);
            // eslint-disable-next-line no-magic-numbers
          }
          this.listwu = data;
        });
      });
    },
    getStoreid: function() {
      console.log(this.id);
      storeService.getStoreid(this.id, (res) => {
        console.log(res);
        this.storeinfor = res.data.data;
        this.stoneId = res.data.data.id + '';
        // this.list = res.data.data.list;
      });
    },
    handleClose(done) {
      storeService.getproductgood(this.productid, (res) => {
        // console.log(res);
        let data = res.data.data;
        for (var i = 0; i < data.length; i++) {
          // eslint-disable-next-line no-magic-numbers
          data[i].sellPrice = (data[i].sellPrice / 100).toFixed(2);
          // eslint-disable-next-line no-magic-numbers
        }
        this.listwu = data;
      });
      done();
    },
  },
  mounted() {
    var content = window.sessionStorage.getItem('userInfor');
    this.content = JSON.parse(content);
    this.id = this.$route.query.id;
    this.getStoreid();
    this.getstoneproduct();
    this.DataByStone();
    this.setProducts();
  },
};
</script>
<style scoped>
.leftxiao {
  background: url(../img/21.png) no-repeat;
  font-size:14px;
  width:20%;
  height:200px;
  background-size:100%;
  color:#fff;
  overflow:hidden;
}
.leftxiao1 {
  background: url(../img/22.png) no-repeat;
  font-size:14px;
  margin-left:16px;
  width:20%;
  height:200px;
  background-size:100%;
  color:#fff;
  overflow:hidden;
}
.box {
  display:flex;
  justify-content : center;
}
</style>
