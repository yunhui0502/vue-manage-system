<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>拼团商品</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="添加商品">
          <el-input style="width:300px" v-model="form.name" placeholder="请输入商品ID"></el-input>
          <el-button type="primary" style="margin-left:10px" @click="onSubmit">立即创建</el-button>
        </el-form-item>

<!-- ------------------------------------------------- -->
        <el-dialog title="搜索商品" :visible.sync="dialogTableVisible">
          <div class="grid-content bg-purple">
            <!-- 商品标签 -->
              <span class="place" style="margin: 20px 30px">商品标签</span>
              <el-input v-model="commodityName" placeholder="请输入商品名称" style="width:150px"></el-input>
            <!-- 商品ID -->
              <span class="place" style="margin: 20px 30px">商品ID</span>
              <el-input v-model="form1.goodsId" placeholder="请输入商品ID" style="width:150px"></el-input>
            <!-- 按钮 -->
            <el-button size="medium" style="background-color:#a6a3fb; color:#fff;margin-left:30px" @click="shousuo">查询</el-button>
            <el-button size="medium">重置</el-button>
          </div>
          <el-checkbox v-model="checked">已选4人</el-checkbox>
      <span style="color:#ff2e88; margin-left:20px">清空</span>
          <el-row class="btn">
          <el-button
            size="medium"
            style="background-color:#a6a3fb; color:#fff"
            @click="tiang"
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
<!-- ---------------------------------------------------- -->
        <el-form-item label="秒杀时间">
          <el-col :span="6">
            <el-date-picker type="date" placeholder="开始时间" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" style="text-align:center" :span="1">至</el-col>
          <el-col :span="6">
            <el-time-picker placeholder="结束时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="商品金额">
          <el-col :span="7">
            <el-input style="width:300px" v-model="form.name" placeholder="请输入金额"></el-input>
          </el-col>
          <el-col class="line" style="text-align:center" :span="3" >限制时间</el-col>
          <el-col :span="11">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-col :span="7">
            <el-input style="width:300px" v-model="form.name" placeholder="请输入商品数量"></el-input>
          </el-col>
          <el-col class="line" style="text-align:center" :span="3" >拼团人数</el-col>
          <el-col :span="11">
            <el-select v-model="number" placeholder="请选择">
              <el-option
                v-for="item in numbers"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">添加</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">

      <el-row type="flex" >
        <el-col :span="12">
          已选中 {{multipleSelection.length}} 件
          <el-button @click="toggleSelection()">取消选择</el-button>
        </el-col>
        <el-col :span="12" class="row-bg">
          <el-button @click="shanchu">批量删除</el-button>
          <el-button>批量下架</el-button>
        </el-col>

      </el-row>
      <el-table
      ref="multipleTable"
      :data="ppl"
      tooltip-effect="dark"
      style="width: 100%"
      :select-all="dianji(selection)"
      @selection-change="handleSelectionChange">
        <el-table-column
          checked
          type="selection"
          width="55" >
        </el-table-column>
        <el-table-column
          label="商品ID"
          width="120">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column
          label="商品描述"
          width="120">
          <template slot-scope="scope">{{ scope.row.hfGoods.goodsDesc }}</template>
        </el-table-column>
        <el-table-column
          prop="nstopTimeame"
          label="开始时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="结束时间"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="price"
          label="剩余数量"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          show-overflow-tooltip>
            <el-button type="primary" size="mini">编辑</el-button>
            <el-button type="warning" size="mini">下架</el-button>
            <el-button type="danger" size="mini" >删除</el-button>
          </el-table-column>
      </el-table>
     <div class="block row-bg" >
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000">
        </el-pagination>
      </div>
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'aa',
  components: {},
  props: {},
  data () {
    return {
      checked: '',
      ppl: [],
      shan: [],
      form1: {
        goodsId: ''
      },
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        currentPage3: 5
      },
      tian: {
        goodsId: '2',
        price: '2',
        repertory: '2',
        startTime: '2',
        stopTime: '2'
      },

      commodityName: '',
      commodityId: '',
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
      tableData: [{
        ID: Date.now(),
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        isselect: true
      }, {
        ID: Date.now(),
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        isselect: false
      }, {
        ID: Date.now(),
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        isselect: false
      }, {
        ID: Date.now(),
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        isselect: false
      } ],
      multipleSelection: [],
      options: [{
        value: '选项1',
        label: '默认24小时'
      }, {
        value: '选项2',
        label: '12小时'
      }, {
        value: '选项3',
        label: '6小时'
      }],
      value: '选项1',
      numbers: [
        1, 2, 3, 4
      ],
      number: '1'

    }
  },
  methods: {
    dianji (selection) {
      console.log(selection)
    },
    async tiang () {
      await this.$http.post(
        'http://192.168.1.175:9911/group/insert', { ...this.tian }
      )
    },
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

    // 添加
    async tianjian () {
      const data = await this.$http.post(
        'http://192.168.1.175:9911/group/insert',
        { ...this.tian }
      )
      console.log(data.data.data)
      this.tian = data.data.data
    },
    // 删除
    async shanchu () {
      const data = await this.$http.get(
        'http://192.168.1.175:9911/group/deleteMulti?groupId=3&groupId=5'
      )
      console.log(data.data.data)
      this.shan = data.data.data
    },
    // 搜索
    async shousuo () {
      const data = await this.$http.get(
        `http://192.168.1.175:9911/group/selectId?goodsId=${this.form1.goodsId}`
      )
      console.log(data.data.data)
    },
    async pplp () {
      const data = await this.$http.get(
        'http://192.168.1.175:9911/group/selete'
      )
      console.log(data.data)
      this.ppl = data.data
    }
  },
  computed: {},
  watch: {},
  created () {
    this.pplp()
    this.shan()
  }

}
</script>

<style lang='less' scoped>
.row-bg {
  text-align: right;
}
</style>
