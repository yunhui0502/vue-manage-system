<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>消息提醒</span>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="Type" label="消息类型"></el-table-column>
        <el-table-column prop="name" label="电子邮件">
          <template slot-scope="scope">
            <el-link @click="dialog(scope)" type="info">是否发送</el-link>
            <el-link @click="hreftwo('电子邮件',scope)" type="primary">编辑内容</el-link>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="name" label="站内消息">
          <el-link  @click="dialogVisible = true" type="info">是否发送</el-link>
          <el-link  @click="hreftwo('站内消息')" type="primary">编辑内容</el-link>
        </el-table-column>-->
        <el-table-column prop="address" label="手机短信">
          <template slot-scope="scope">
            <el-link @click="dialog(scope)" type="info">是否发送</el-link>
            <el-link @click="hreftwo('手机短信',scope)" type="primary">编辑内容</el-link>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="address" label="APP推送消息">
          <el-link @click="dialogVisible = true" type="info">是否发送</el-link>
          <el-link @click="hreftwo('APP推送消息')" type="primary">编辑内容</el-link>
        </el-table-column>-->
      </el-table>
    </el-card>

    <el-dialog title="是否开启" :visible.sync="dialogVisible" width="30%">
      <el-switch @change="switchChange" name="1" v-model="value1" active-text="是" inactive-text="否"></el-switch>
    </el-dialog>
  </div>
</template>

<script>
import news from '@/service/news.js';
export default {
  name: '',
  data() {
    return {
      dialogVisible: false,
      value1: true,
      value1ID: '',
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
      messageType: [],
    };
  },
  created() {
    this.getMessageContentType();
  },
  methods: {
    switchChange (e) {
      console.log(e);
      console.log(this.value1ID);
      let params = {
        id: this.value1ID,
      };
      if (e === false) {
        params.isUse = 0;
      } else {
        params.isUse = 1;
      }
      news.updateIsUse(params, (res) => {
        console.log(res);
        this.$message({
          message: '操作成功',
          type: 'success',
        });
        this.dialogVisible = false;
      });
    },
    dialog(scope) {
      console.log(scope);
      let params = {
        contentType: scope.row.Type,
      };
      if (scope.column.label === '电子邮件') {
        params.messageType = 'email';
      } else {
        params.messageType = 'shortBreath';
      }
      news.getMessageContent(params, (res) => {
        console.log(res);
        this.value1ID = res.data.data.id;
        this.dialogVisible = true;
      });
    },
    getMessageContentType() {
      news.getMessageContentType((res) => {
        console.log(res);
        // this.tableData = res.data.data.contentObject;
        let data = res.data.data;
        this.tableData = data.map((item) => ({ Type: item }));
        console.log(this.tableData);
      });
    },
    hreftwo(e, row) {
      console.log(row);
      let Type = row.row.Type;
      // console.log(Type);
      if (e === '手机短信') {
        this.$router.push({ path: '/news/phone', query: {Type: Type} });
      } else if (e === '电子邮件') {
        this.$router.push({ path: '/news/email' });
      } else {
        this.$router.push({ path: '*' });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cell {
  a:nth-child(2) {
    margin-left: 10px;
  }
}
</style>
