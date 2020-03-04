<template>
  <div>
    <el-card class="box-card">
            <el-form
        style="background: #fff;padding: 40px 0 20px 20px; "
        :inline="true"
        title="编辑商品"
        :model="bianrow"
        label-width="80px"
        :rules="bianRules"
        ref="bianForm"
      >
        <div style="font-size: 17px;margin-bottom: 30px;">商品编辑</div>

        <el-form-item style="margin-bottom:50px;" label>
          <div style="font-size: 15px;">商品名称:</div>
        </el-form-item>
        <el-form-item label prop="goodName">
          <el-input v-model="bianrow.goodName" auto-complete="off"></el-input>
        </el-form-item>
        <br />
        <el-form-item style="margin-bottom:50px;" label>
          <div style="font-size: 15px;">商品描述:</div>
        </el-form-item>
        <el-form-item label prop="goodsDesc">
          <el-input
            v-model="bianrow.goodsDesc"
            auto-complete="off"
            style="width: 500px;"
            type="textarea"
            resize="none"
          ></el-input>
        </el-form-item>
        <br />
        <el-form-item style="margin-bottom:50px;" label>
          <div style="font-size: 15px;">商品ID:</div>
        </el-form-item>
        <el-form-item label>
          <el-input disabled v-model="bianrow.id" auto-complete="off" prop="id"></el-input>
        </el-form-item>
        <br />
        <el-button type="primary" @click="bianjiSubmit" :loading="addLoading">提交</el-button>
      </el-form>
<div class="f10">物品规格</div>
        <el-table :data="tabledatas1" border>
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="规格名称">
            <template slot-scope="scope">
              <span v-show="!scope.row.show">{{scope.row.hfName}}</span>
              <!-- <el-input placeholder="请输入内容" v-model="scope.row.hfName"></el-input> -->
            </template>
          </el-table-column>
          <el-table-column label="规格类型">
            <template slot-scope="scope">
              <span v-show="!scope.row.show">{{scope.row.specType}}</span>
              <!-- <el-input placeholder="请输入内容" v-model="scope.row.specType"></el-input> -->
            </template>
          </el-table-column>
          <el-table-column label="规格值">
            <template slot-scope="scope">
              <el-input placeholder="请输入内容" v-model="scope.row.specValue"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button @click="additionSpec(scope)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
<div class="f10">物品价格</div>
        <el-table :data="tabledatas" border>
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="ID">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-model="scope.row.id"></el-input>
            <!-- <span v-show="!scope.row.show">{{scope.row}}</span> -->
          </template>
        </el-table-column>
        <el-table-column label="物品名称">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-model="scope.row.goodName"></el-input>
            <!-- <span v-show="!show">{{scope.row.goodName}}</span> -->
          </template>
        </el-table-column>
        <el-table-column label="价格">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-model="scope.row.sellPrice"></el-input>
            <!-- <span v-show="!show">{{scope.row.sellPrice}}</span> -->
          </template>
        </el-table-column>
        <el-table-column label="划线价">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-model="scope.row.linePrice"></el-input>
            <!-- <span v-show="!show">{{scope.row.linePrice}}</span> -->
          </template>
        </el-table-column>
        <el-table-column label="库存">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-model="scope.row.quantity"></el-input>
            <!-- <span v-show="!show">{{scope.row.quantity}}</span> -->
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <!-- <el-button @click="show =true">编辑</el-button> -->
            <el-button type="text" style="color: rgb(24, 211, 71);" @click="submitPrice(scope)">修改</el-button>
            <!-- <el-button type="text" @click="particulars(scope)">详情</el-button> -->
            <el-button type="text" style="color: rgb(218, 18, 28);" @click="deletion(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import api from '@/api/commodity_api.js'
export default {
  data () {
    return {
      // 添加按钮Loading加载
      addLoading: false,
      bianrow: {
        goodName: '',
        goodsDesc: '', // 描述
        productCategoryName: '', // 类目
        categoryId: '',
        id: '',
        timestamp: '1223',
        token: '123',
        userId: '1'
      },
      // 修改物品规格值
      specGoods: {
        fileID: '1', // 文件id
        productSpecId: '',
        goodsId: '',
        requestId: '111',
        specValue: '',
        timestamp: '111',
        token: '11',
        userId: '11'
      },
      // 删除
      deletion (scope) {
        this.$confirm('确认删除吗？', '提示', {}).then(() => {
          api
            .deleteGood(scope.row.id)
            .then(res => {
              this.getcoommo()
              this.$message({
                message: '删除成功',
                type: 'success'
              })
            })
            .catch(err => {
              console.log(err)
            })
        })
      },
      bianRules: {
        productName: [
          {
            required: true,
            message: '请输入商品名称',
            trigger: 'blur'
          }
        ],
        productDesc: [
          {
            required: true,
            message: '请输入商品描述',
            trigger: 'blur'
          }
        ],
        value4: [
          {
            required: true,
            message: '请选择商品分类',
            trigger: 'blur'
          }
        ]
      },
      // 设置价格
      specificationForm: {
        linePrice: '', // 划线价
        quantity: '', // 物品数量
        respDesc: '111', // 库存描述
        // bossId: '1',
        hfGoodsId: '', // 物品ID
        sellPrice: '', // 物品价格
        // productSpecId: '', // 商品规格ID
        requestId: '111', // 发起请求的随机数, 用来判断请求是否重复
        // timestamp: '12231231', // 当前时间
        token: '11238',
        timestamp: '11',
        userId: '12', // 用户id
        username: '12' // 店家名称, 登录修改的用户名称
        // specValue: ['1.1'] // 标签 颜色 // 规格
      },
      tabledatas: [],
      tabledatas1: []
    }
  },
  created () {
    this.mounted()
    this.Acquire()
    this.getcoommo()
  },
  methods: {
    // 商品 编辑 提交按钮
    bianjiSubmit: function () {
      api.updategoods(this.bianrow)
    },
    // 提交价格
    submitPrice (scope) {
      this.specificationForm.quantity = scope.row.quantity
      this.specificationForm.sellPrice = scope.row.sellPrice
      this.specificationForm.hfGoodsId = scope.row.id
      this.specificationForm.linePrice = scope.row.linePrice
      api
        .setPrice(this.specificationForm)
        .then(res => {
          this.getcoommo()
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    // 获取物品规格
    Acquire () {
      api.specification(this.bianrow.id).then(res => {
        console.log('获取规格ID', res)
        this.tabledatas1 = res.data.data
      })
    },
    // 获取物品列表
    async getcoommo () {
      api
        .getProductList(1)
        .then(res => {
          this.tabledatas = res.data.data
          console.log(this.tabledatas)
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // 修改物品规格值
    additionSpec (scope) {
      console.log(scope)
      // this.specGoods.goodsId = scope.row.id
      this.specGoods.specValue = scope.row.specValue
      this.specGoods.productSpecId = scope.row.id
      this.specGoods.goodsId = this.bianrow.id
      api
        .update(this.specGoods)
        .then(res => {
          this.getcoommo()
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    mounted () {
      var list = decodeURIComponent(this.$route.query.row)
      this.bianrow = JSON.parse(list)
      // this.bianrow=this.$route.query.row;
      console.log('编辑带过来的', this.bianrow)
    // this.checkType()
    }
  }
}
</script>

<style lang="less" scoped>
.f10 {
  font-size: 28px;
  margin: 10px;
}
</style>
