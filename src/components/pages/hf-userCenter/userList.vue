<template>
  <div>
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="addUserVisible" width="30%">
      <el-form label-width="80px" :model="addUserForm">
        <el-form-item label="用户名">
          <el-input v-model="addUserForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="addUserForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addUserVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserSubmit()">确 定</el-button>
      </span>
    </el-dialog>
    <el-tabs v-model="activeName" @tab-click="select">
      <el-tab-pane label="用户列表" name="first">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{message}}</span>
          </div>
          <el-table
            :data="userData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            stripe
            style="width: 100%"
          >
            <el-table-column prop="nickName" label="姓名" width="180" align="center"></el-table-column>
            <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
            <el-table-column prop="invitationCode" label="邀请码" align="center"></el-table-column>
            <el-table-column prop="ownInvitationCode" label="拥有的邀请码" align="center"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="godetail(scope.row)" type="text" size="small" align="center">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            style="float:right;"
            background
            layout="prev, pager, next"
            :total="userData.length"
            :page-size="pagesize"
          ></el-pagination>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="店铺管理员列表" name="second"></el-tab-pane>
      <el-tab-pane label="基本信息" name="third"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import userCenterService from '@/service/userCenter.js';
export default {
  data() {
    return {
      message: '用户列表',
      activeName: 'first',
      currentPage: 1, // 初始页
      pagesize: 2, // 每页的数据
      dialogVisible: false,
      userId: '',
      imageUrl: '',
      pictureVisible: false,
      addUserForm: {
        name: '杨莹',
        phone: '15022209253',
      },
      userData: [],
      addUserVisible: false,
      tableData: [],
    };
  },
  methods: {
    // eslint-disable-next-line no-empty-function
    select: function(tab) {
      console.log(tab.label);
      this.message = tab.label;
    },
    godetail: function(row) {
      this.$router.push({
        path: '/userDetail',
        query: {
          id: row.id,
        },
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    addUser: function() {
      this.addUserVisible = true;
    },
    handleChange(file, fileList) {
      console.log(file);
      userCenterService.uploadPicture(file, this.userId, (res) => {
        console.log(res);
      });
    },
    addUserSubmit: function() {
      userCenterService.addUser(this.addUserForm, (res) => {
        console.log(res);
        if (res.data.data === '该用户已经存在') {
          this.$message.error('该用户已经存在');
        } else {
          this.$message({
            message: '添加成功',
            type: 'success',
          });
          this.addUserVisible = false;
          this.checkUser();
        }
      });
    },
    checkUser: function() {
      userCenterService.checkUser((res) => {
        console.log(res.data.data);
        this.userData = res.data.data.list;
      });
    },
    deleteUser: function(row) {
      console.log(row);
      this.$confirm('确认删除吗？', '提示', {}).then(() => {
        userCenterService.deleteUser(row.id, (res) => {
          if (res.data.data === '删除成功') {
            this.$message({
              message: '删除成功',
              type: 'success',
            });
            this.checkUser();
          } else {
            this.$message.error('删除失败');
          }
        });
      });
    },
  },
  mounted() {
    this.checkUser();
  },
};
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
