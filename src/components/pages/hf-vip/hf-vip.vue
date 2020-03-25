<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="会员列表">
        <div style="overflow:hidden;margin-right:130px;margin-bottom:30px;">
          <el-button type="primary" style="float:right;">添加会员</el-button>
        </div>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="date" align="center" label="会员名"></el-table-column>
          <el-table-column prop="name" align="center" label="会员等级"></el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="updatelevel(scope.row.userId)" type="text" size="small" align="center">修改</el-button>
              </template>
            </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="配置管理">
        <div style="overflow:hidden;margin-right:130px;margin-bottom:30px;">
          <el-button type="primary" style="float:right;" @click="drawer=true">添加等级</el-button>
        </div>
        <div style="display:flex;">
          <el-table :data="levellist" stripe style @row-click="getlevel">
            <el-table-column prop="levelName" align="center" label="会员等级"></el-table-column>
          </el-table>
          <el-table :data="tableData" stripe style="margin-left:130px;">
            <el-table-column prop="date" align="center" label="等级描述"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-drawer
      size="70%"
      title="我是标题"
      :visible.sync="drawer"
      :direction="direction"
    >
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="等级名称" prop="name">
          <el-input  style="width:300px;" v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import vip from '@/service/vip.js';
export default {
  data() {
    return {
      levellist: [],
      rules: {
        name: [
          {
            required: true,
            message: '请输入等级名称',
            trigger: 'blur',
          },
        ],
      },
      ruleForm: {
        name: '',
      },
      drawer: false,
      direction: 'btt',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
      activeName: 'second',
    };
  },
  methods: {
    getlevel: function() {
      vip.checkLevel((res) => {
        console.log(res);
        this.levellist = res.data.data;
      });
    },
    checkLevel: function() {
      vip.checkLevel((res) => {
        console.log(res);
        this.levellist = res.data.data;
      });
    },
    submitForm(ruleForm) {

      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm.name);
          vip.addLevel(this.ruleForm.name, (res) => {
            console.log(res);
            // eslint-disable-next-line no-magic-numbers
            if (res.data.status === 200) {
              this.$message({
                message: '添加成功',
                type: 'success',
              });
              this.drawer = false;
              this.checkLevel();
            } else {
              this.$message({
                message: '添加失败',
                type: 'error',
              });
            }

          });
        }
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  mounted() {
    this.checkLevel();
  },
};
</script>
