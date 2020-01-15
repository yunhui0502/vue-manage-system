
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
            <el-input style="width:100%" v-model="ruleForm.hfName "></el-input>
          </el-form-item>
          <!-- <el-form-item style="width:100%" label="商品编号" prop="goodName">
            <el-input style="width:40%" v-model="ruleForm.goodName"></el-input>
          </el-form-item>-->
          <el-form-item style="width:100%" label="商品属性" prop="inventory">
            <!-- <el-input style="width:40%" v-model="ruleForm.inventory"></el-input>
            <span>件</span>
            <span style="margin: 6px;width:40%">商品属性</span>-->
            <el-select style="width:30%" v-model="ruleForm1.member" placeholder="请选择商品属性">
              <el-option label="会员" value="1"></el-option>
              <el-option label="非会员" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="提货方式" prop="goodsDesc ">
            <el-radio @change="change" style="margin-left: 50px;" v-model="radiol" label="3">快递</el-radio>
            <el-radio @change="change" v-model="radiol" label="4">自取</el-radio>
          </el-form-item>
          <el-form-item v-if="radiol == 4" label="核销员" prop="region">
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
          <el-form-item v-if="radiol == 3" label="核销员" prop="region">
            <el-select @change="pullverifier" v-model="ruleForm.verifier" placeholder="请输入核销员姓名">
              <el-option
                v-for="item in verifier"
                :key="item.id"
                :label="item.realName"
                :value="item.id"
                style="height: 45px;"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="快递运费" prop="region"> -->
          <el-form-item v-if="radiol == 3" label="运费模板" prop="region">
            <el-select v-model="ruleForm.yunfen" placeholder="请选择运费模板">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <!-- </el-form-item> -->
          <el-form-item label="商品类目" prop="categoryId">
            <el-select
              @change="twocategshijan"
              style="width:33.3%"
              v-model="ruleForm.categoryId1"
              placeholder="请选择一级类目"
            >
              <el-option
                v-for="item in leiMu"
                :key="item.id"
                :label="item.hfName"
                :value="item.id"
                style="height: 45px;"
              ></el-option>
            </el-select>
            <el-select
              @change="threecategshijan"
              style="width:33.3%"
              v-model="ruleForm.region"
              placeholder="请选择二级类目"
            >
              <el-option
                v-for="(item, index) in erjimulu"
                :key="index"
                :label="item.hfName"
                :value="item.id"
                style="height: 45px;"
              ></el-option>
            </el-select>
            <el-select
              @change="threecateg"
              style="width:33.3%"
              v-model="ruleForm.freight"
              placeholder="请选择三级类目"
            >
              <el-option
                v-for="(item, index) in tiwoCatalogues"
                :key="index"
                :label="item.hfName"
                :value="item.id"
                style="height: 45px;"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width:60%" label="商品描述" prop="name">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 6}"
              placeholder="请输入商品描述"
              v-model="ruleForm.productDesc"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <!-- 标签 -->
            <el-tag
              :key="tag"
              v-for="tag in ruleForm.specName"
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
                style="width:120px; height:32px;"
                placeholder="请输入内容"
              ></el-input>
              <el-button @click="submit1" style="margin:8px">添加规格</el-button>
            </div>
          </el-form-item>
          <div class="reduceForm">
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
          </div>
          <el-form-item label prop="brandId">
            <el-button style="width:25%; margin-left: 5px;" type="primary" @click="NewGoods">+新建商品</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableSpec" style="width: 100%">
          <el-table-column prop="date" label="规格ID" width="180"></el-table-column>
          <el-table-column prop="specValue" label="规格名称" width="180"></el-table-column>
          <el-table-column prop="specSize" label="默认值"></el-table-column>
        </el-table>
      </el-container>
    </el-card>
    <!-- ---------------------------------------------------------------------------------------------------------------------------------------------------- -->
    <el-card class="box-card">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="280px"
        class="demo-ruleForm"
      >
        <el-form-item label="物品描述" prop="goodsDesc ">
          <el-input style="width:100%" v-model="ruleForm1.goodsDesc  "></el-input>
        </el-form-item>
        <el-form-item style="width:100%" label="物品名称" prop="goodName ">
          <el-select style="width:30%" v-model="ruleForm1.goodName " placeholder="请选择商品属性">
            <el-option label="会员" value="1"></el-option>
            <el-option label="非会员" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提货方式" prop="goodsDesc ">
          <el-radio @change="change" style="margin-left: 50px;" v-model="radiol" label="3">快递</el-radio>
          <el-radio @change="change" v-model="radiol" label="4">自取</el-radio>
        </el-form-item>
        <el-form-item v-if="radiol == 4" label="核销员" prop="region">
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
        <el-form-item v-if="radiol == 3" label="核销员" prop="region">
          <el-select @change="pullverifier" v-model="ruleForm.verifier" placeholder="请输入核销员姓名">
            <el-option
              v-for="item in verifier"
              :key="item.id"
              :label="item.realName"
              :value="item.id"
              style="height: 45px;"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="快递运费" prop="region"> -->
        <el-form-item v-if="radiol == 3" label="运费模板" prop="region">
          <el-select v-model="ruleForm.yunfen" placeholder="请选择运费模板">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <!-- </el-form-item> -->
        <el-form-item label="商品类目" prop="categoryId">
          <el-select
            @change="twocategshijan"
            style="width:33.3%"
            v-model="ruleForm.categoryId1"
            placeholder="请选择一级类目"
          >
            <el-option
              v-for="item in leiMu"
              :key="item.id"
              :label="item.hfName"
              :value="item.id"
              style="height: 45px;"
            ></el-option>
          </el-select>
          <el-select
            @change="threecategshijan"
            style="width:33.3%"
            v-model="ruleForm.region"
            placeholder="请选择二级类目"
          >
            <el-option
              v-for="(item, index) in erjimulu"
              :key="index"
              :label="item.hfName"
              :value="item.id"
              style="height: 45px;"
            ></el-option>
          </el-select>
          <el-select
            @change="threecateg"
            style="width:33.3%"
            v-model="ruleForm.freight"
            placeholder="请选择三级类目"
          >
            <el-option
              v-for="(item, index) in tiwoCatalogues"
              :key="index"
              :label="item.hfName"
              :value="item.id"
              style="height: 45px;"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <!-- 标签 -->
          <!-- <el-tag
            :key="tag"
            v-for="tag in specificationForm2.specValue"
            closable
            :disable-transitions="false"
            @close="handleClose1(tag)"
          >{{tag}}</el-tag>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>-->
          <el-tag
            :key="tag"
            v-for="tag in ruleForm1.specValue"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >{{tag}}</el-tag>
          <div>
            <!-- <el-input
              class="margin-top:8px"
              v-model="AddSize"
              style="width:120px; height:32px;"
              placeholder="请输入内容"
            ></el-input>
            <el-button @click="submit1" style="margin:8px">添加规格</el-button>-->
            <el-input v-model="AddColor" style="width:120px; height:32px;" placeholder="请输入内容"></el-input>
            <el-button @click="submit" style="margin:8px">添加规格</el-button>
          </div>
        </el-form-item>
        <el-form-item label prop="brandId">
          <el-button style="width:25%; margin-left: 5px;" type="primary" @click="submitForm">+新建物品</el-button>
        </el-form-item>
      </el-form>
      <el-button @click="dialogFormVisible = true" class="add-button">根据下方物品ID设置价格按钮</el-button>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="物品ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="物品名称">
                <span>{{ props.row.goodName }}</span>
              </el-form-item>
              <el-form-item label="物品价格">
                <span>{{ props.row.sellPrice }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="物品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="物品 ID" prop="id"></el-table-column>
        <el-table-column label="物品名称" prop="goodName"></el-table-column>
        <el-table-column label="物品描述" prop="goodsDesc"></el-table-column>
      </el-table>
      <!-- 修改价格弹窗 -->

      <el-dialog title="设置价格" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="设置价格">
            <el-input v-model="specificationForm.sellPrice" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="物品ID">
            <el-input v-model="specificationForm.hfGoodsId" placeholder="请输入下放物品ID" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="物品数量">
            <el-input v-model="specificationForm.quantity"  autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="物品描述">
            <el-input v-model="specificationForm.respDesc"  autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="SetThePrice">确 定</el-button>
        </div>
      </el-dialog>
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
      dialogFormVisible: false,
      fileList: [],
      tianjiayanse: '', // 添加颜色
      tianjiachicun: '', // 添加尺寸
      tiwoCatalogues: [], // 三级目录
      erjimulu: [], // 二级目录
      input: '颜色', // 颜色框 绑定的值
      measure: '尺寸', // 尺寸
      // 添加规格
      AddSize: '',
      // 添加颜色
      AddColor: '',
      // 核销员绑定的值
      verifier: [],
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
      // 表单绑定的添加商品?bossId=11&brandId=111&categoryId=
      // 11&hfName=11&id=11&lastModifier=11&productDesc=11&requestId=1
      // 1&specName=11&specType=11&specUnit=11&specValue=11&timestamp=11&token=11&userId=11
      ruleForm: {
        freight: '',
        categoryId1: '', // 商品所属的类目双向绑定的*
        yunfen: '',
        categoryId: '', // 商品所属的类目id*
        // inventory: '', // 库存
        // bossId: '1', // 商家id  *
        // brandId: '1', // 品牌id*
        hfName: '', // 商品名称 *
        id: '', // *
        specName: [], // 规格名称*
        // specValue: ['颜色', '尺寸'], // 颜色和尺寸*
        requestId: '112123123', // 发起请求的随机数, 用来判断请求是否重复 0 *
        lastModifier: '1', // 商家名称*
        productDesc: '', // 产品描述*
        productId: '', // 商品id
        // username: '1', // 商家名称
        // timestamp: '11111', // 当前时间*
        token: '11238', // *
        userId: '12', // 用户id*
        // hfStoreId: '1', // 商铺id
        cancelId: '2', // 核销员Id
        fileInfo: [] // 图片路径
      },
      // 添加物品
      ruleForm1: {
        sellPrice: '', // 价格
        quantity: '', // 库存量
        productId: '13', // 商品id
        // bossId: '1', // 商家id *
        // brandId: '2', // 品牌id *
        categoryId: '', // 商品所属的类目id*
        cancelId: '', // 核销Id *
        claim: '', // 是否自提 *
        member: '', // 是否为会员商品 *
        fileInfo1: [], // 图片*
        frames: '0', // 上下架*
        goodName: '', // 物品名称*
        goodsDesc: '', // 物品描述*
        // hfStoreId: '1', // 商铺id *
        // lastModifier: '1111', // 商家名称
        productDesc: '', // 商品描述
        requestId: '123123123', // 请求id, 发起请求的随机数, 用来判断请求是否重
        // timestamp: '12231231', // 当前时间
        token: '11238', // 登录成功后返回的token
        userId: '12', // 用户id
        // username: '7' // 商家名称
        specValue: [] // 标签 颜色 // 规格
      },
      // 设置价格
      specificationForm: {
        quantity: '', // 物品数量
        respDesc: '', // 库存描述
        // bossId: '1',
        hfGoodsId: '', // 物品ID
        sellPrice: '', // 物品价格
        // productSpecId: '', // 商品规格ID
        requestId: '', // 发起请求的随机数, 用来判断请求是否重复
        // timestamp: '12231231', // 当前时间
        token: '11238',
        userId: '12', // 用户id
        username: '12' // 店家名称, 登录修改的用户名称
        // specValue: ['1.1'] // 标签 颜色 // 规格
      },
      value: '',

      // 表格数据
      tableSpec: [
        {
          specValue: '颜色',
          specSize: '红色'
        },
        {
          specValue: '尺寸',
          specSize: '5.5寸'
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
      tableData: [
        {
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }
      ],
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
    this.change()
  },
  methods: {
    // 设置商品价格
    SetThePrice () {
      this.specificationForm.requestId = Date.now()
      // this.specificationForm.hfGoodsId = this.ruleForm1.productId
      api
        .setPrice(this.specificationForm)
        .then(res => {
          this.dialogFormVisible = false
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    addition () {
      // this.formSpec.specValue = this.$refs.specValue.value + ''
      // this.formSpec.specSize = this.$refs.specSize.value + ''
      // this.tableSpec.push(this.formSpec)
      // this.value1 = ''
      // this.value2 = ''
    },
    handleEdit (e) {
      console.log(e)
    },
    // 获取规格
    huq () {
      this.$http
        .get('/cat/product/category')
        .then(res => {
          this.threecategs = res.data.data
          // console.log('类目', this.onecatalogues)
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    // 添加商品 ruleForm1
    NewGoods () {
      console.log(this.ruleForm.specName)
      this.$confirm('确认提交吗？', '提示', {}).then(() => {
        console.log(this.ruleForm1)
        // 拷贝
        this.ruleForm.requestId = Date.now()
        let param = this.ruleForm
        api
          .tianjianwup(param)
          .then(res => {
            this.ruleForm1.productId = res.data.data.id

            this.$message({
              message: '恭喜你，添加成功',
              type: 'success'
            })
          })
          .catch(err => {
            console.log(err)
          })
      })
    },
    clickdelete2 () {
      this.specificationForm2.specValue = ''
    },
    clickdelete () {
      this.ruleForm1.specValue = ''
    },
    onRemove (file) {},
    imgPreview (file) {
      let fileName = file.name
      let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/
      if (regex.test(fileName.toLowerCase())) {
        this.ruleForm.fileInfo.push(URL.createObjectURL(file.raw))
        this.ruleForm1.fileInfo1.push(URL.createObjectURL(file.raw))
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
      console.log(11111111)
      this.ruleForm1.claim = this.radiol
    },
    // 获取核销员
    async verifier1 () {
      api
        .verifier()
        .then(res => {
          console.log(res)
          this.verifier = res.data.data.list
          console.log(this.verifier)
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // 获取物品列表
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
      this.ruleForm1.specValue.push(this.AddColor)
      this.tianjiayanse = this.AddColor
      // this.AddColor = ''
    },
    // 添加尺寸事件
    submit1 () {
      // console.log(this.AddColor)
      this.ruleForm.specName.push(this.AddSize)
      this.tianjiachicun = this.AddSize
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
      this.ruleForm1.specValue.splice(this.ruleForm1.specValue.indexOf(tag))
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
          // this.leimu.levelId = res.data.length
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    // 二级 下拉触发事件
    twocategshijan (e) {
      // console.log(e)
      this.ruleForm.categoryId = e
      this.ruleForm1.categoryId = e
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
      this.ruleForm.categoryId = e
      this.ruleForm1.categoryId = e
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
      this.ruleForm.categoryId = e
      this.ruleForm1.categoryId = e
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
    // 下拉 事件 核销员
    pullverifier (e) {
      this.ruleForm1.cancelId = e
    },
    // 添加物品
    async submitForm () {
      // this.ruleForm1.specValue.push(this.specificationForm2.specValue)
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            console.log(this.ruleForm)
            // 拷贝
            this.ruleForm.requestId = Date.now()
            let param = this.ruleForm1
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
.el-form {
  margin: 40px;
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
  // margin-left: 300px;
  border: 1px solid rgba(46, 45, 45, 0.09);
}
.reduceForm {
  margin: 30px;
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

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
