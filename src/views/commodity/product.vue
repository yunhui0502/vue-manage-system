
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
          <el-form-item label="商品标题" prop="goodName">
            <el-input style="width:100%" v-model="ruleForm.goodName"></el-input>
          </el-form-item>
          <!-- <el-form-item style="width:100%" label="商品编号" prop="goodName">
            <el-input style="width:40%" v-model="ruleForm.goodName"></el-input>
          </el-form-item>-->
          <el-form-item style="width:100%" label="总库存数" prop="inventory">
            <el-input style="width:40%" v-model="ruleForm.inventory"></el-input>
            <span>件</span>
            <span style="margin: 6px;width:40%">商品属性</span>
            <el-select style="width:30%" v-model="ruleForm.member" placeholder="请选择商品属性">
              <el-option label="会员" value="1"></el-option>
              <el-option label="非会员" value="0"></el-option>
            </el-select>
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
            <el-select v-model="ruleForm.freight" placeholder="请选择运费模板">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <!-- </el-form-item> -->
          <el-form-item label="商品类目" prop="categoryId">
            <el-select  @change="twocategshijan" style="width:33.3%" v-model="ruleForm.categoryId" placeholder="上衣">
              <el-option
                v-for="item in leiMu"
                :key="item.id"
                :label="item.hfName"
                :value="item.id"
                style="height: 45px;"
              ></el-option>
            </el-select>
            <el-select  @change="threecategshijan" style="width:33.3%" v-model="ruleForm.region" placeholder="卫衣">
                 <el-option
                v-for="(item, index) in erjimulu"
                :key="index"
                :label="item.hfName"
                :value="item.id"
                style="height: 45px;"
              ></el-option>
            </el-select>
            <el-select @change="threecateg" style="width:33.3%" v-model="ruleForm.freight" placeholder="乐事联名">
                 <el-option
                v-for="(item, index) in tiwoCatalogues"
                :key="index"
                :label="item.hfName"
                :value="item.id"
                style="height: 45px;"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label prop="brandId">
            <!-- <el-button style="width:25%; margin-left: 5px;" type="primary" @click="submitForm">+新建商品</el-button> -->
            <!-- <el-button style="width:25%" @click="resetForm('ruleForm')">批量添加</el-button> -->
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
        <el-button class="sc-delete" @click="clickdelete" type="text">删除型号</el-button>
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
          v-for="tag in ruleForm.specValue"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{tag}}</el-tag>
        <!-- 图片上传图片 -->
        <el-upload
          ref="upload"
          class="upload-poster"
          accept=".jpg, .jpeg, .png, .gif, .bmp, .JPG, .JPEG, .GIF, .BMP"
          action
          list-type="picture-card"
          :on-remove="onRemove"
          :on-change="imgPreview"
          :auto-upload="false"
        >
          <i class="el-icon-plus"></i>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="ruleForm.fileInfo " alt />
          </el-dialog>
        </el-upload>
        <el-input v-model="AddColor" style="width:194px; height:32px;" placeholder="请输入内容"></el-input>
        <el-button @click="submit" style="margin:8px">添加商品规格</el-button>
      </div>
      <!-- ==================================================================================================================================================== -->
      <el-button class="add-button">添加</el-button>
      <div class="kaipi">
        <el-button class="sc-delete" @click="clickdelete2" type="text">删除型号</el-button>
        <div>
          <el-input
            v-model="measure"
            style="width:304px;height: 32px; margin: 24px 0"
            placeholder="请输入内容"
          ></el-input>
          <!-- 单选按钮 -->
          <el-checkbox v-model="checked">添加规格</el-checkbox>
        </div>
        <!-- 标签 -->
        <el-tag
          :key="tag"
          v-for="tag in specificationForm2.specValue"
          closable
          :disable-transitions="false"
          @close="handleClose1(tag)"
        >{{tag}}</el-tag>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <div>
          <el-input
            class="margin-top:8px"
            v-model="AddSize"
            style="width:194px; height:32px;"
            placeholder="请输入内容"
          ></el-input>
          <el-button @click="submit1" style="margin:8px">添加商品规格</el-button>
        </div>
      </div>
      <!-- <span style="position: relative;top: 40px;left:82px">商品价格/库存</span>
      <el-table :data="specificationForm2.specValue">
        <el-table-column :label="input" width="156">
          <template slot-scope="scope">
            <span @click="scope(scope)" style="margin-left: 10px">{{scope}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="measure" width="156">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="156">
          <input  style="width:120px;height:30px;"/>
        </el-table-column>
        <el-table-column label="库存" width="156">
          <input  style="width:120px;height:30px;"/>
        </el-table-column>
        <el-table-column label="划线价" width="156">
          <input  style="width:120px;height:30px;"/>
        </el-table-column>
        <el-table-column label="图片" width="156">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="156">
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
      </el-table>-->
      <!-- ------------------------------------------------------------------------------------------ -->
      <el-form :model="ruleForm2" ref="ruleForm" label-width="140px" class="reduceForm">
        <!-- <el-form-item label="库存减扣方式" prop="region">
          <el-select v-model="ruleForm2.region" placeholder="拍下减库存"></el-select>
        </el-form-item>-->

        <el-form-item style="width:21%" label="商品描述" prop="name">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 6}"
            placeholder="请输入商品描述"
            v-model="ruleForm.goodsDesc"
          ></el-input>
        </el-form-item>

        <el-form-item class="particulars" label="商品详情" prop="name">
          <el-upload
            ref="upload"
            class="upload-poster"
            accept=".jpg, .jpeg, .png, .gif, .bmp, .JPG, .JPEG, .GIF, .BMP"
            action
            list-type="picture-card"
            :on-remove="onRemove"
            :on-change="imgPreview"
            :auto-upload="false"
          >
            <i class="el-icon-plus"></i>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="ruleForm.fileInfo " alt />
            </el-dialog>
          </el-upload>
        </el-form-item>
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
    <div class="button">
      <el-button @click="submitForm" type="primary">保存</el-button>
    </div>
  </div>
</template>

<script>
import api from '@/api/commodity_api.js'
// import { log } from 'util'
export default {
  data () {
    return {
      tiwoCatalogues: [], // 三级目录
      erjimulu: [], // 二级目录
      input: '颜色', // 颜色框 绑定的值
      measure: '尺寸', // 尺寸
      // 添加规格
      AddSize: '',
      // 添加颜色
      AddColor: '',
      // 核销员绑定的值
      verifier: {},
      // 图片上传控件里的
      disabled: false,
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
        freight: '',
        inventory: '', // 库存    productId username
        bossId: '1', // 商家id
        brandId: '1', // 品牌id
        goodName: '', // 商品名称
        hfStoreId: '1', // 商铺id
        goodsDesc: '', // 产品描述
        productId: '33', // 商品id
        username: '1', // 商家名称
        requestId: '', // 发起请求的随机数, 用来判断请求是否重复 0
        timestamp: '', // 当前时间
        token: '11238',
        userId: '12', // 用户id
        verifier: '', // 核销员
        specValue: [], // 颜色和尺寸
        member: '', // 是否为会员 0 非会员 1会员
        cancelId: '2', // 核销员Id
        fileInfo: [] // 图片路径
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
      value: '',
      // 添加至
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      // 添加规格
      specificationForm1: {
        specValue: [] // 标签 颜色 // 规格
      },
      // 添加规格
      specificationForm2: {
        specValue: [] // 标签 颜色 // 规格
      },
      ruleForm2: {
        name: '',
        region: '',
        region1: '',
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
    this.scope()
  },
  methods: {
    clickdelete2 () {
      this.specificationForm2.specValue = ''
    },
    clickdelete () {
      this.ruleForm.specValue = ''
    },
    onRemove (file) {},
    imgPreview (file) {
      let fileName = file.name
      let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/
      if (regex.test(fileName.toLowerCase())) {
        this.ruleForm.fileInfo.push(URL.createObjectURL(file.raw))
        console.log(file.raw)
        console.log(this.ruleForm.fileInfo)
        // this.uploadFile(file)
      } else {
        this.$message.error('请选择图片文件')
      }
    },
    scope (scope) {
      console.log(scope)
    },
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
          console.log(res.data)
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // 添加图片

    // 添加颜色事件
    submit () {
      // console.log(this.AddColor)
      console.log(1223332)
      this.ruleForm.specValue.push(this.AddColor)
      this.AddColor = ''
    },
    // 添加尺寸事件
    submit1 () {
      // console.log(this.AddColor)
      this.specificationForm2.specValue.push(this.AddSize)
      this.AddSize = ''
    },
    // 图片列表移除图片时的钩子
    handleRemove (file, fileList) {
      // console.log(file, fileList)
    },
    success (err, file, fileList) {
      console.log(err)
    },
    // 图片上传前事件
    handleBeforeUpload (file) {
      console.log(22222)
      this.file = file // 需要传给后台的file文件
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        const _base64 = reader.result
        this.imgUrl = _base64 // 将_base64赋值给图片的src，实现图片预览
      }
      return false // 阻止图片继续上传，使得form表单提交时统一上传
    },
    // // 点击图片列表中的放大
    handlePictureCardPreview (file) {
      console.log(1111111)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // handleDownload (file) {
    //   console.log(file)
    // },
    // 标签点击按钮
    handleClose (tag) {
      this.ruleForm.specValue.splice(this.ruleForm.specValue.indexOf(tag))
    },
    // 标签点击按钮
    handleClose1 (tag) {
      this.specificationForm2.specValue.splice(
        this.specificationForm2.specValue.indexOf(tag)
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
    },
    // 二级 下拉触发事件
    twocategshijan (e) {
      // console.log(e)
      this.$http
        .get('/cat/product/category?parentCategoryId=' + e)
        .then(res => {
          this.erjimulu = res.data.data
          // console.log('类目', this.onecatalogues)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    // 三级 下拉触发事件 threecateg
    threecategshijan (e) {
      // console.log(e)
      this.$http
        .get('/cat/product/category?parentCategoryId=' + e)
        .then(res => {
          this.tiwoCatalogues = res.data.data
          // console.log('类目', this.onecatalogues)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    threecateg (e) {
      // console.log(e)
      this.$http
        .get('/cat/product/category?parentCategoryId=' + e)
        .then(res => {
          this.threecategs = res.data.data
          // console.log('类目', this.onecatalogues)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    // 添加商品
    async submitForm () {
      this.ruleForm.specValue.push(this.specificationForm2.specValue)
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            console.log(this.ruleForm)
            // 拷贝
            this.ruleForm.requestId = Date.now()
            let param = this.ruleForm
            api.addProduct(param).then(res => {
              this.$router.push({ name: 'commodity' })
              this.$message({
                message: '恭喜你，添加成功',
                type: 'success'
              })
            })
          })
        }
      })
    },
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
.button {
  width: 100%;
  text-align: center;
}
.box-card {
  height: 100%;
}
</style>
