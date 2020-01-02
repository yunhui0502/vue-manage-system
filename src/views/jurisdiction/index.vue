<template>
  <div>
    <el-card class="box-card">
      <div class="header">
        <el-button @click="centerDialogVisible = true" style="background: #a3a0fb;">
          <i class="el-icon-plus"></i>添加
        </el-button>
        <el-button size="medium" plain>批量管理</el-button>
        <div style="float: right;">
          <el-input size="medium" v-model="input" placeholder="请输入内容"></el-input>
          <el-button style="background: #a3a0fb;">
            <i class="el-icon-search"></i>查询
          </el-button>
        </div>
        <!-- <el-button style="float: right; padding: 3px 0" >操作按钮</el-button> -->
      </div>

      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="日期">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" style="color: rgba(255, 183, 70, 1);">设置权限</el-button>
            <el-button type="text" style="color: rgba(166, 163, 251, 1);">编辑</el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small"
              style="color: rgba(255, 49, 138, 1);"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :visible.sync="centerDialogVisible" width="48%" center>
          <div>
              <div></div>
              <div></div>
          </div>
    </el-dialog>
  </div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳']
export default {
  data () {
    return {
      checked: '',
      //  弹框里的多选
      checkAll: false, // 弹窗全选绑定
      checkedCities: ['上海', '北京'], //
      cities: cityOptions,
      isIndeterminate: true, // 是否全选
      // 弹窗控制显示隐藏
      centerDialogVisible: false,
      input: '',
      // 表格数据
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  created () {},
  mounted () {},
  methods: {
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    // 全选
    // handleCheckAllChange (val) {
    //   this.checkedCities = val ? cityOptions : []
    //   this.isIndeterminate = false
    // },
    // // 全选
    // handleCheckedCitiesChange (value) {
    //   let checkedCount = value.length
    //   this.checkAll = checkedCount === this.cities.length
    //   this.isIndeterminate =
    //     checkedCount > 0 && checkedCount < this.cities.length
    //   console.log(checkedCount > 0 && checkedCount < this.cities.length)
    // },
    // 表格
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style  lang="less">
.el-input {
  width: 200px;
  margin-right: 26px;
}
</style>
