
<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品基本信息</span>
      </div>
      <el-container>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="280px"
          class="demo-ruleForm"
        >
          <el-form-item label="商品标题" prop="goodsDesc ">
            <el-input style="width:100%" v-model="ruleForm.goodsDesc "></el-input>
          </el-form-item>
          <el-form-item style="width:100%" label="商品名称" prop="goodName">
            <el-input style="width:40%" v-model="ruleForm.goodName"></el-input>
          </el-form-item>
          <el-form-item style="width:100%" label="总库存数" prop="inventory">
            <el-input style="width:40%" v-model="ruleForm.inventory"></el-input>
            <span>件</span>
            <span style="margin: 10px">商品属性</span>
            <el-input style="width:40%" v-model="ruleForm.brandId"></el-input>
          </el-form-item>
          <el-form-item label="提货方式" prop="goodsDesc ">
            <el-radio @change="change" style="margin-left: 50px;" v-model="radiol" label="3">快递</el-radio>
            <el-radio @change="change" v-model="radiol" label="4">自取</el-radio>
          </el-form-item>
          <el-form-item v-if="radiol == 4" label="核销员" prop="region">
            <el-select v-model="ruleForm.verifier" placeholder="请输入核销员姓名">
              <el-option
                v-for="(item, index) in verifier"
                :key="index"
                :label="item.realName"
                :value="item.realName"
                style="height: 45px;"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="快递运费" prop="region"> -->
            <el-form-item v-if="radiol == 3" label="运费模板" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择运费模板">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          <!-- </el-form-item> -->
          <el-form-item label="商品类目" prop="categoryId">
            <el-select style="width:33.3%" v-model="ruleForm.categoryId" placeholder="上衣">
              <el-option
                v-for="(item, index) in leiMu"
                :key="index"
                :label="item.hfName"
                :value="item.hfName"
                style="height: 45px;"
              ></el-option>
            </el-select>
            <el-select style="width:33.3%" v-model="ruleForm.region" placeholder="卫衣"></el-select>
            <el-select style="width:33.3%" v-model="ruleForm.region" placeholder="乐事联名"></el-select>
          </el-form-item>
          <el-form-item label="添加至" prop="brandId">
            <el-input style="width:40%" v-model="ruleForm.id"></el-input>

            <el-button style="width:25%; margin-left: 5px;" type="primary" @click="submitForm">+新建商品</el-button>
            <el-button style="width:25%" @click="resetForm('ruleForm')">批量添加</el-button>
          </el-form-item>
        </el-form>
      </el-container>
    </el-card>
    <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------- -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>型号单价</span>
      </div>
      <!-- 商品型号 -->
      <span style="position: relative;top: 20px;left:220px">商品型号</span>
      <div class="kaipi">
        <el-button class="sc-delete" type="text">删除型号</el-button>
        <div>
          <el-input
            v-model="input"
            style="width:304px;height: 32px; margin: 24px 0"
            placeholder="请输入内容"
          ></el-input>
          <!-- 单选按钮 -->
          <el-checkbox v-model="checked">添加规格图片</el-checkbox>
        </div>
        <!-- 标签 -->
        <el-tag
          :key="tag"
          v-for="tag in specificationForm.specValue"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{tag}}</el-tag>
        <!-- 图片上传图片 -->
        <el-upload
          action="http://192.168.1.104:9095/goods/addPicture"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          name="fileInfo"
          file="file"
          :on-error="success"
          :data="{...specificationForm }"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <el-input v-model="AddColor" style="width:194px; height:32px;" placeholder="请输入内容"></el-input>
        <el-button @click="submit" style="margin:8px">添加商品规格</el-button>
        <el-input v-model="specificationForm1.productSpecId" placeholder="添加商品id"></el-input>
      </div>
      <el-button @click="postspecification" class="add-button">添加</el-button>

      <span style="position: relative;top: 57px;left:-830px">商品价格/库存</span>
      <el-table :data="tableData">
        <el-table-column label="颜色" width="101">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="尺寸" width="101">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="101">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="库存" width="101">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="划线价" width="101">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="图片" width="101">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              type="text"
              style="color:red"
              plain
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- ------------------------------------------------------------------------------------------ -->
      <el-form :model="ruleForm2" ref="ruleForm" label-width="110px" class="reduceForm">
        <el-form-item label="库存减扣方式" prop="region">
          <el-select v-model="ruleForm2.region" placeholder="拍下减库存"></el-select>
        </el-form-item>

        <el-form-item style="width:21%" label="库存" prop="name">
          <el-input label="请输入库存数量" v-model="ruleForm2.name"></el-input>
        </el-form-item>

        <el-form-item style="width:21%" label="商品详情" prop="name"></el-form-item>
      </el-form>
      <el-button class="add-button">添加</el-button>
    </el-card>

    <el-card class="the-card">
      <div slot="header" class="clearfix">
        <span>其他信息</span>
      </div>
      <el-form>
        <el-form-item style="width:30%" label="活动时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <div>
          <span class="liji">立即购买按钮</span>
          <el-radio v-model="radio" label="1">系统默认</el-radio>
          <el-radio v-model="radio" label="2">自定义</el-radio>
          <el-input style="width: 10%;" placeholder="6字之内"></el-input>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import api from '@/api/commodity_api.js'
// import { log } from 'util'
export default {
  data () {
    return {
      input: '',
      // 添加规格
      AddSize: '',
      // 添加颜色
      AddColor: '',
      // 核销员绑定的值
      verifier: {},
      // 图片上传控件里的
      dialogImageUrl: '',
      dialogVisible: false,
      // 其他信息
      radio: 1, // 单选按钮
      radiol: '3', // 单选按钮运费部分
      // 多选择框 添加规格图片
      checked: true,
      checked2: true,
      // 多选择框
      checked3: true,
      // 标签
      modelTags: [], // s码
      // 时间日期表单
      form: {
        date1: ''
      },
      leiMu: {},
      // 表单绑定的添加商品?bossId=2&brandId=2&goodName=2&goodsDesc=2&hfStoreId=2&productId=2&requestId=2&timestamp=2&token=2&userId=2&username=2

      ruleForm: {
        inventory: '', // 库存    productId username
        bossId: '1', // 商家id 0
        brandId: '1', // 品牌id 0
        goodName: '', // 商品名称 0
        hfStoreId: '1', // 商铺id
        goodsDesc: '', // 产品描述
        productId: '33', // 商品id
        username: '1', // 商家名称
        requestId: '111111111111', // 发起请求的随机数, 用来判断请求是否重复 0
        timestamp: '', // 当前时间
        token: '11238',
        userId: '12', // 用户id
        verifier: '' // 核销员
      },
      // 添加图片
      specificationForm: {
        bossId: '1',
        goodsId: '2', // 物品ID
        productSpecId: '', // 商品规格ID
        requestId: '123123123', // 发起请求的随机数, 用来判断请求是否重复
        timestamp: '12231231', // 当前时间
        token: '11238',
        userId: '12' // 用户id
        // specValue: ['1.1'] // 标签 颜色 // 规格
      },
      // 添加规格
      specificationForm1: {
        productId: '3',
        bossId: '3',
        goodsDesc: '1111', // 物品描述
        goodName: '3', // 物品名称
        hfStoreId: '3', // 商铺id
        requestId: '123123123', // 发起请求的随机数, 用来判断请求是否重复
        timestamp: '12231231', // 当前时间
        token: '11238',
        userId: '12', // 用户id
        username: '1' // 商家名称
        // specValue: ['1.1'] // 标签 颜色 // 规格
      },
      ruleForm2: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      // 表单数据
      tableData: [],
      // 顶部表单验证
      rules: {
        hfName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getcategory()
    this.getcoommo()
    this.verifier1()
  },
  methods: {
    change (label) {
      console.log(label)
    },
    // 获取核销员
    async verifier1 () {
      api
        .verifier(1)
        .then(res => {
          this.verifier = res.data.data.list
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // 获取商品列表
    async getcoommo () {
      api
        .getProductList(1)
        .then(res => {
          this.tableData = res.data.data
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // 添加图片

    // 添加规格
    async postspecification () {
      this.time()
      this.specificationForm.requestId = Date.now()
      let param = Object.assign({}, this.specificationForm1)
      api
        .addSpec(param)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 添加颜色事件
    submit (e) {
      // console.log(this.AddColor)
      this.specValue = e.target.value
      this.AddColor = ''
    },
    // 图片列表移除图片时的钩子
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    success (err, file, fileList) {
      console.log(err)
    },
    // 点击图片列表中已上传的图片时的钩子
    handlePictureCardPreview (file) {
      console.log(1111111)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },

    // 标签点击按钮
    handleClose (tag) {
      this.specificationForm.specValue.splice(
        this.specificationForm.specValue.indexOf(tag),
        1
      )
    },
    // 获取类目
    async getcategory () {
      api
        .category()
        .then(res => {
          this.leiMu = res.data.data
          this.leimu.levelId = res.data.length
        })
        .catch(function (err) {
          console.log(err)
        })
      // const {
      //   data: { data }
      // } = await this.$http.get('http://192.168.1.104:9095/product/category')
      // this.leiMu = data
      // this.leimu.levelId = data.length
    },

    // 添加商品
    async submitForm () {
      this.$refs.ruleForm.validate(valid => {
        console.log(valid)
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            console.log(this.ruleForm)
            // 拷贝
            let param = this.ruleForm
            api.addProduct(param).then(res => {
              this.$router.push({ name: 'commodity' })
            })
          })
        }
      })
      // await this.$http.post('http://192.168.1.104:9095/product/addproduct', {
      //   params: this.ruleForm
      // })
      // console.log('======')
      // this.ruleForm.bossId = ''
      // this.ruleForm.brandId = ''
      // this.ruleForm.hfName = ''
      // this.ruleForm.id = parseInt(this.ruleForm.id) + 1
      // this.ruleForm.lastModifier = ''
      // this.ruleForm.productDesc = ''
      // this.ruleForm.requestId = ''
    },
    // 新建商品按钮
    // submitForm: function () {
    //   this.time()
    //   this.$refs.ruleForm.validate(valid => {
    //     console.log(valid)
    //     if (valid) {
    //       this.$confirm('确认提交吗？', '提示', {}).then(() => {
    //         this.postcoommo()
    //         this.addLoading = false
    //         this.$message({
    //           message: '提交成功',
    //           type: 'success'
    //         })
    //         this.addFormVisible = false
    //       })
    //     }
    //   })
    // },
    conver: function (s) {
      return s < 10 ? '0' + s : s
    },
    // 当前时间
    time () {
      var myDate = new Date()

      // 获取当前年
      var year = myDate.getFullYear()

      // 获取当前月
      var month = myDate.getMonth() + 1
      // 获取当前日
      var date = myDate.getDate()
      var h = myDate.getHours() // 获取当前小时数(0-23)
      var m = myDate.getMinutes() // 获取当前分钟数(0-59)
      var s = myDate.getSeconds()
      // 获取当前时间

      var now = year + '-' + month + '-' + date + ' ' + h + ':' + m + ':' + s
      this.ruleForm.timestamp = now
      // 发起请求的随机数, 用来判断请求是否重复
      this.ruleForm.requestId = Date.now()
      // console.log(this.timestamp)

      // specificationForm里的随机数和时间
      this.specificationForm.timestamp = now
    },
    // 添加批量按钮
    resetForm (formName) {
      //  清空form表单
      this.$refs[formName].resetFields()
    }
  },
  mounted () {}
}
</script>

<style scoped lang="less">
.clearfix:after {
  clear: both;
}
.el-container {
  margin: 25px;
  margin-top: 47px;
  background-color: #fff;
  .basic {
    // width: 1576px;
    // height: 42px;
    background-color: #4565;

    //  border-bottom:  1px solid #E5E5E5;
  }
  .demo-ruleForm {
    width: 920px;
  }
}
.kaipi {
  width: 676px;
  height: 100%;
  margin-left: 300px;
  border: 1px solid rgba(46, 45, 45, 0.09);
  padding-left: 30px;
  .el-tag {
    margin-bottom: 10px;
  }
  .el-checkbox {
    margin-left: 8px;
  }
}
// s码部分
.model {
  width: 676px;
  height: 170px;
  margin-left: 300px;
  border: 1px solid rgba(46, 45, 45, 0.09);
  padding-left: 30px;
  .el-checkbox {
    margin-left: 8px;
  }
}
// 所以按钮文字颜色
.el-button {
  font-size: 12px;
  font-family: SourceHanSansCN;
  font-weight: 400;
  color: rgba(163, 160, 251, 1);
}
// 删除型号文字颜色
.sc-delete {
  font-size: 12px;
  font-family: SourceHanSansCN;
  font-weight: 400;
  color: rgba(255, 49, 138, 1);
  float: right;
  padding: 8px;
}
// 添加按钮样式
.add-button {
  width: 708px;
  height: 39px;
  margin-left: 300px;
  margin-top: 10px;
  margin-bottom: 26px;
}

// 表单部分
.el-table {
  width: 710px;
  height: 100%;
  margin-left: 300px;
  border: 1px solid rgba(46, 45, 45, 0.09);
}
.reduceForm {
  margin-top: 45px;
  margin-left: 300px;
}

//最下3个卡片
.the-card {
  width: 100%;
  height: 100%;
  margin: 30px 0;
  .el-form {
    margin-left: 300px;
  }
  .liji {
    margin-right: 10px;
  }
  .div-botton {
    margin: 4px;
  }
}
.active {

}
</style>
