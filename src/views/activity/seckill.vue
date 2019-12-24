<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>秒杀商品</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="添加商品">
          <el-input style="width:300px" v-model="form.region" placeholder="请输入商品ID"></el-input>
          <el-button type="primary" style="margin-left:10px" @click="onSubmit">添加商品</el-button>
        </el-form-item>

        <!-- 点击添加商品弹框 -->
        <el-dialog title="搜索商品" :visible.sync="dialogTableVisible">
          <div class="grid-content bg-purple">
            <!-- 商品标签 -->
              <span class="place" style="margin: 20px 30px">商品标签</span>
              <el-input v-model="commodityName" placeholder="请输入商品名称" style="width:150px"></el-input>
            <!-- 商品ID -->
              <span class="place" style="margin: 20px 30px">商品ID</span>
              <el-input v-model="commodityId" placeholder="请输入商品ID" style="width:150px"></el-input>
            <!-- 按钮 -->
            <el-button size="medium" style="background-color:#a6a3fb; color:#fff;margin-left:30px">查询</el-button>
            <el-button size="medium">重置</el-button>
          </div>
          <el-checkbox v-model="checked">已选4人</el-checkbox>
      <span style="color:#ff2e88; margin-left:20px">清空</span>
          <el-row class="btn">
          <el-button
            size="medium"
            style="background-color:#a6a3fb; color:#fff"
             @click="tianjian"
          >+添加商品</el-button>
        </el-row>
          <el-table ref="multipleTable" :data="table" tooltip-effect="dark" style="width: 100%">
            <el-table-column type="selection" width="120"></el-table-column>
            <el-table-column prop="date" label="商品ID"></el-table-column>
            <el-table-column prop="name" label="商品描述"></el-table-column>
          </el-table>
          <div style="margin-top:10px;text-align: right; ">
            <el-pagination background layout="prev, pager, next, jumper" :total="1000"></el-pagination>
          </div>
        </el-dialog>
        <!-- /点击添加商品弹框 -->

        <el-form-item label="秒杀时间">
          <el-col :span="6">
            <el-date-picker
              type="date"
              placeholder="开始时间"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" style="text-align:center" :span="1">至</el-col>
          <el-col :span="6">
            <el-time-picker placeholder="结束时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="商品金额">
          <el-input style="width:300px" v-model="form.me" placeholder="请输入金额"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input style="width:300px" v-model="form.resource" placeholder="请输入商品数量"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
      <el-row type="flex">
        <el-col :span="12">
          已选中 {{multipleSelection.length}} 件
          <el-button @click="toggleSelection()">取消选择</el-button>
        </el-col>
        <el-col :span="12" class="row-bg">
          <el-button @click="shanchu">批量删除</el-button>
          <el-button @click="xiajia">批量下架</el-button>
        </el-col>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="ppl"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column checked type="selection" width="55"></el-table-column>
        <el-table-column prop="goodsId" label="商品ID" width="120"></el-table-column>
        <el-table-column prop="hfGoods.goodsDesc" label="商品描述" width="120"></el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="120"></el-table-column>
        <el-table-column prop="stopTime" label="结束时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="price" label="剩余数量" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="操作" show-overflow-tooltip>
          <el-button type="text" style="color:#a6a3fb">编辑</el-button>
          <el-button type="text" style="color:#fad177">记录</el-button>
          <el-button type="text" style="color:#ff2e88" >清除记录</el-button>
        </el-table-column>
      </el-table>
      <div class="block row-bg">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// import url from 'inspector'
export default {
  name: 'aa',
  components: {},

  data () {
    return {
      // tian: [],
      shan: [],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        me: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        currentPage3: 5

      },
      // 点击添加商品的弹框里面的内容
      commodityName: '',
      commodityId: '',
      tian: {
        goodsId: '2',
        price: '2',
        repertory: '2',
        startTime: '2',
        stopTime: '2'
      },
      table: [
        {
          date: '2016-05-02',
          name: '王小虎'
        },
        {
          date: '2016-05-04',
          name: '王小虎'
        },
        {
          date: '2016-05-01',
          name: '王小虎'
        },
        {
          date: '2016-05-03',
          name: '王小虎'
        }
      ],
      // 点击添加商品出现弹窗
      dialogTableVisible: false,
      ppl: {},
      tableData: [],
      multipleSelection: []
    }
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    onSubmit () {
      this.dialogTableVisible = true
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    // 数据
    async pplp () {
      const data = await this.$http.get(
        'http://192.168.1.175:9910/kill/select'
      )
      console.log(data.data)
      this.ppl = data.data
    },
    // 删除
    async shanchu () {
      const data = await this.$http.get(
        'http://192.168.1.175:9910/kill/deleteMulti?seckillId=8'
      )
      console.log(data.data.data)
      this.shan = data.data.data
    },
    // 下架
    async xiajia () {
      const data = await this.$http.get(
        'http://192.168.1.175:9910/kill/updateMulti', { seckillId: [1, 2, 3] }
      )
      console.log(data.data.data)
      this.xia = data.data.data
    },
    // 添加
    async tianjian () {
      const data = await this.$http.post(
        'http://192.168.1.175:9910/kill/insert',
        { ...this.tian }
      )
      console.log(data.data.data)
      this.tian = data.data.data
    }
  },
  computed: {},
  watch: {},
  created () {
    this.pplp()
    this.shan()
    this.xia()
    this.tian()
  }
}
</script>

<style lang='less' scoped>
.row-bg {
  text-align: right;
}
.btn {
  display: inline-block;
  // text-align: right;
  margin: 20px 30px 0 440px;
}
</style>
