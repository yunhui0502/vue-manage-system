<template>
  <div>
    <!-- 搜索 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>搜索</span>
      </div>
      <div class="grid-content bg-purple" style="text-align:center">
        <!-- 时间 -->
        <span class="demonstration" style="margin-right:20px">时间查询</span>
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"

        ></el-date-picker>
        <!-- 地区 -->
        <span class="place">请选择地区</span>
        <el-input v-model="input" placeholder="请输入内容" style="width:150px"></el-input>
      </div>
      <!-- 按钮 -->
      <el-row class="btn">
        <el-button size="medium" style="background-color:#a6a3fb; color:#fff" @click="ppl" >查询</el-button>
        <el-button size="medium" >重置</el-button>
      </el-row>
    </el-card>

    <!-- 内容 -->
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <el-row class="btn">
          <!-- 删除按钮 -->
          <el-button size="medium" @click="shanchu">批量删除</el-button>
        </el-row>
        <!-- 点击弹框添加 -->
        <el-dialog title="添加核销员" :visible.sync="dialogFormVisible">
          <el-form :model="form">
            <el-form-item label="核销员名称" :label-width="formLabelWidth">
              <el-input
                v-model="form.id"
                autocomplete="off"
                placeholder="请输入核销员名称"
                style="width:300px"
              ></el-input>
            </el-form-item>
            <el-form-item label="核 销 地 点" :label-width="formLabelWidth">
              <el-input
                v-model="form.name1"
                autocomplete="off"
                placeholder="请输入核销地点"
                style="width:300px"
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="text-align: center;">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="dialogFormVisible = false"
              style="margin-left: 50px;background-color:#a6a3fb; color:#fff;border:0"
            >保 存</el-button>
          </div>
        </el-dialog>
        <!-- /点击弹框添加 -->
      </div>

      <!-- 列表 -->
      <el-checkbox v-model="checked">已选4人</el-checkbox>
      <span style="color:#ff2e88; margin-left:20px">清空</span>
      <el-table ref="multipleTable" :data="see" tooltip-effect="dark" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="realName" label="核销员" width="120"></el-table-column>
        <el-table-column prop="money" label="核销额" width="120"></el-table-column>
        <el-table-column prop="presentMoney" label="本次核销额" width="120"></el-table-column>
        <el-table-column prop="site" label="地址" show-overflow-tooltip></el-table-column>
        <el-table-column prop="createDate" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="操作" show-overflow-tooltip>
          <el-button type="text" style="color:#a6a3fb" @click="compile(see)" this.data >编辑</el-button>
          <el-button type="text" style="color:#fad177" @click="open = true">记录</el-button>
          <el-button type="text" style="color:#ff2e88">清除记录</el-button>
        </el-table-column>
      </el-table>
      <!-- --------------------------------------------------------------- -->
      <el-dialog title="编辑核销员" :visible.sync="dialogFormVisible">
        <el-form :model="seeform" >
          <el-form-item label="核 销 物 品" :label-width="formLabelWidth">
            <el-select v-model="seeform" placeholder="请选择">
            <el-option
              v-for="(item,i) in options"
              :key="i"
              :label="item.label"
            ></el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="核销员名称" :label-width="formLabelWidth" >
            <el-input
              v-model="seeform.RealName"
              autocomplete="off"
              placeholder="请输入核销员名称"
              style="width:300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="核 销 地 点" :label-width="formLabelWidth">
            <el-input
              v-model="seeform.site"
              autocomplete="off"
              placeholder="请输入核销地点"
              style="width:300px"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="text-align: center;">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="save"
            style="margin-left: 50px;background-color:#a6a3fb; color:#fff;border:0"
          >保 存</el-button>
        </div>
      </el-dialog>
      <!-- --------------------------------------------------------------- -->
      <!-- 点击弹框添加 -->
      <el-dialog title="核销记录" :visible.sync="open">
        <el-table :data="rec" style="width: 100%">
          <el-table-column prop="purchasePrice" label="核销金额" width="180"></el-table-column>
          <el-table-column prop="createDate" label="核销时间" width="180"></el-table-column>
          <el-table-column prop="purchaseQuantity" label="核销金额" width="180"></el-table-column>
          <el-table-column prop="createDate" label="核销时间" width="180"></el-table-column>
        </el-table>
        <div style="margin-top:10px;text-align: right; ">
          <el-pagination background layout="prev, pager, next, jumper" :total="1000"></el-pagination>
        </div>
      </el-dialog>
      <!-- /点击弹框添加 -->
      <div class="sum">合计：5000.00元</div>
      <!-- 分页 -->
      <div style="margin-top:10px;text-align: right; ">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      rec: '',
      // 列表上的双绑定
      checked: '',
      value1: '',
      input: '',
      dialogFormVisible: false,
      open: false,
      see: [],
      tian: [],
      options: [

      ],
      seeform: {
        RealName: '',
        site: '',
        UserId: '11',
        cancel2: '1'
      },
      shan: [],
      form: {
        name: '',
        name1: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '200px'
    }
  },
  computed: {},
  watch: {},
  created () {
    this.seek()
    this.record()
    // this.addition()
    this.area()
    this.ppl()
    this.time()
    this.tianjia()
    this.shanchu()
  },
  methods: {
    async save () {
      this.compile()
      await this.$http.get(
        '/ver/cancel/updateCancel', { params: this.seeform }
      ).then(function (res) {
        // handle success
        // console.log(this.seeform)

        this.dialogFormVisible = false
      })
        .catch(function (err) {
          // handle error
          console.log(err)
        })
    },
    async seek () {
      const data = await this.$http.get(
        '/ver/cancel/selectCancel'
      )
      // console.log(data.data.data)
      this.see = data.data.data
    },
    compile (see) {
      this.dialogFormVisible = true
      // console.log(see)
      // var index = '',
      for (let i = 0; i <= see.length - 1; i++) {
        console.log(i)
        this.seeform.RealName = see[i].realName
        this.seeform.site = see[i].site
      }
    },
    async record () {
      const data = await this.$http.get(
        '/ver/cancel/selectCancelId'
      )
      console.log(data.data.data)
      this.rec = data.data.data
    },
    // async addition () {
    //   const data = await this.$http.get(
    //     'http://172.26.16.97:9901/cancel/updateCancel'
    //   )
    //   console.log(data.data.data)
    //   this.form = data.data.data
    // },
    async area () {
      const data = await this.$http.get(
        '/ver/cancel/selectRegion'
      )
      console.log(data.data.data)
      this.are = data.data.data
    },
    async time () {
      const data = await this.$http.get(
        '/ver/cancel/selectDate'
      )

      console.log(data.data.data)
      this.ti = data.data.data
    },
    async ppl () {
      const data = await this.$http.get(
        '/ver/test/login'
      )

      console.log(data.data.data)
      this.pp = data.data.data
    },
    async tianjia () {
      const data = await this.$http.get(
        '/ver/updateCancelUser'
      )

      console.log(data.data)
      this.tian = data.data
    },
    async shanchu () {
      const data = await this.$http.get(
        '/ver/cancel/deleteCancel'
      )

      console.log(data.data.data)
      this.shan = data.data.data
    }

  },

  mounted () {}
}

</script>

<style scoped lang="less">
.place {
  margin-left: 50px;
  margin-right: 20px;
}
.btn {
  text-align: right;
  margin: 20px 30px 0 0;
}
.sum {
  margin-top: 10px;
  margin-left: 150px;
  color: #ff2e88;
}
</style>
