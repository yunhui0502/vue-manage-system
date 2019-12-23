<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>秒杀商品</span>
      </div>
     <el-form ref="form" :model="groupform" label-width="80px">
        <el-form-item label="添加商品">
          <el-input
            style="width:300px"
            prop="goodsId"
            v-model="groupform.goodsId"
            placeholder="请输入商品ID"
          ></el-input>
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
            <el-input v-model="commodityId" placeholder="请输入商品ID" style="width:150px"></el-input>
            <!-- 按钮 -->
            <el-button
              size="medium"
              style="background-color:#a6a3fb; color:#fff;margin-left:30px"
            >查询</el-button>
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
          <el-table
            :data="ppl"
            tooltip-effect="dark"
            style="width: 100%"
            :select-all="dianji(selection)"
            ref="multipleTable"
            @selection-change="handleSelectionChange"
          >
            <el-table-column checked type="selection"></el-table-column>
            <el-table-column label="商品ID">
              <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>
            <el-table-column label="商品描述">
              <template slot-scope="scope">{{ scope.row.goodsDesc }}</template>
            </el-table-column>
          </el-table>
          <div style="margin-top:10px;text-align: right; ">
            <el-pagination background layout="prev, pager, next, jumper" :total="1000"></el-pagination>
          </div>
        </el-dialog>
        <!-- ---------------------------------------------------- -->
        <el-form-item label="秒杀时间">
          <el-date-picker
            v-model="groupform.startTime"
            type="datetime"
            placeholder="开始时间"
            align="right"
          ></el-date-picker>

          <el-date-picker
            v-model="groupform.stopTime"
            type="datetime"
            placeholder="结束时间"
            align="right"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="商品金额">
          <el-col :span="7">
            <el-input style="width:300px" v-model="groupform.price" placeholder="请输入金额"></el-input>
          </el-col>
          <el-col class="line" style="text-align:center" :span="3">限制时间</el-col>
          <el-col :span="11">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-col :span="7">
            <el-input style="width:300px" v-model="groupform.repertory" placeholder="请输入商品数量"></el-input>
          </el-col>
          <el-col class="line" style="text-align:center" :span="3">拼团人数</el-col>
          <el-col :span="11">
            <el-select v-model="groupform.number" placeholder="请选择">
              <el-option v-for="item in numbers" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addGcommodity">添加</el-button>
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
          <el-button>批量下架</el-button>
        </el-col>
      </el-row>
      <el-table
        ref="multipleTable"
        :data="ppl"
        tooltip-effect="dark"
        style="width: 100%"
        :select-all="dianji(selection)"
        @selection-change="handleSelectionChange"
      >
        <el-table-column checked type="selection" width="55"></el-table-column>
        <el-table-column label="商品ID" width="120">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="商品描述" width="120">
          <template slot-scope="scope">{{ scope.row.goodsDesc }}</template>
        </el-table-column>
        <el-table-column prop="nstopTimeame" label="开始时间" width="120"></el-table-column>
        <el-table-column prop="startTime" label="结束时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="price" label="剩余数量" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="操作" show-overflow-tooltip>
          <el-button type="primary" size="mini">编辑</el-button>
          <el-button type="warning" size="mini">下架</el-button>
          <el-button type="danger" size="mini">删除</el-button>
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
import qs from 'qs'
export default {
  name: 'aa',
  components: {},
  props: {},
  data () {
    return {
      value2: '',
      value3: '',
      selection: [],
      multipleTable: [], // 存放选中值的数组
      checked: '',
      ppl: [],
      shan: [],
      form1: {
        goodsId: ''
      },
      groupform: {
        goodsId: '', // 商品id
        number: '', // 成团人数
        price: '', // 团购价格
        repertory: '', // 库存
        startTime: '', // 团购开始时间
        stopTime: '' // 团购结束时间
      },
      currentPage3: 5,
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
      sangchu: [], // 批量删除
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
      tableData: [
        {
          ID: Date.now(),
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          isselect: true
        },
        {
          ID: Date.now(),
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          isselect: false
        },
        {
          ID: Date.now(),
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          isselect: false
        },
        {
          ID: Date.now(),
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          isselect: false
        }
      ],
      multipleSelection: [],
      options: [
        {
          value: '选项2',
          label: '12小时'
        }
      ],
      value: '选项1',
      numbers: [1, 2, 3, 4],
      number: '1'
    }
  },
  methods: {
    // 添加团购商品
    addGcommodity () {
      let params = this.groupform
      console.log(params)
      this.$http.post('http://192.168.1.175:9910/kill/insert', params, {
        transformRequest: [function (data) {
          var str = ''
          for (var key in data) {
            str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&'
          }
          return str
        }]
      })
    },
    handleSelectionChange (val) {
      // console.log(1112112312)
      this.multipleTable = val //  this.multipleTable 选中的值
      console.log(val)
    },
    dianji (selection) {
      // console.log(selection)
    },
    async tiang () {
      await this.$http.post('http://192.168.1.175:9911/group/insert', {
        ...this.tian
      })
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
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },

    // 添加
    async tianjian () {
      for (var i = 0; i < this.multipleTable.length; i++) {
        this.groupform.goodsId = this.multipleTable[i].goodsId
        console.log(this.groupform.goodsId)
        this.dialogTableVisible = false
      }
    },
    // 删除
    async shanchu () {
      for (let i = 0; i < this.multipleTable.length; i++) {
        this.sangchu.push(this.multipleTable[i].id)
      }
      console.log({ params: this.sangchu })
      this.$http.get('http://192.168.1.175:9910/kill/deleteMulti', {
        params: {
          id: this.sangchu
        },
        paramsSerializer: params => {
          return qs.stringify(params, { indices: false })
        } })
      // this.$http.get('http://192.168.1.175:9910/kill/deleteMulti', { params: { id: this.sangchu } }).then(function (response) {
      //   // handle success
      //   console.log(response)
      // })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    // 搜索
    async shousuo () {
      const data = await this.$http.get(
        `http://192.168.1.175:9910/kill/seek?goodsId=${this.form1.goodsId}`
      )
      console.log(data.data.data)
    },
    // 获取全都团购商品
    async pplp () {
      const data = await this.$http.get(
        'http://192.168.1.175:9910/kill/select'
      )
      // console.log(data.data)
      this.ppl = data.data
    }
  },
  computed: {},
  watch: {},
  created () {
    this.pplp()
    // this.shan()
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
