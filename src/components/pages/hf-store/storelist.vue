<template>
  <div>
    <div style="display:flex;">
      <div style="width:50%">
        <div style="margin-bottom:20px;">店铺列表</div>
        <el-button type="primary" style="margin-bottom:10px;" @click="drawer = true">添加店铺</el-button>
        <el-table :data="storeData" stripe style="width: 100%" @row-click="getStoreId">
          <el-table-column align="center" prop="hfName" label="店铺名称" ></el-table-column>
          <el-table-column align="center" prop="hfDesc" label="店铺描述" ></el-table-column>
          <el-table-column align="center" prop="hfStatus" label="店铺状态" ></el-table-column>
          <el-table-column align="center" prop="address" label="店铺位置" ></el-table-column>
          <el-table-column align="center" prop="hfDesc" label="操作" >
             <template slot-scope= "scope">
                <el-button  type="text" size="small" align="center" @click="edit(scope.row.id)">编辑</el-button>
              </template>
          </el-table-column>
        </el-table>
    </div>
   <div style="margin-left:20px;width:50%" >
    <div style="margin-bottom:20px;" >店铺成员</div>
     <el-button type="primary" style="margin-bottom:10px;background:#ff0099;border-color:#ff0099;"  @click="dialogVisible = true">添加店铺成员</el-button>
    <el-table :data="Person" stripe style="width: 100%">
      <el-table-column align="center" prop="userId" label="用户id" ></el-table-column>
      <el-table-column align="center" prop="userName" label="姓名" ></el-table-column>
      <el-table-column align="center" prop="realName" label="昵称" ></el-table-column>
      <el-table-column label="是否参与核销" align="center">
        <template slot-scope= "scope">
                <div v-if="scope.row.isCancel===1">是</div>
                <div v-if="scope.row.isCancel===0">否</div>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="userPhone" label="手机号" ></el-table-column>
      <el-table-column align="center" prop="hfDesc" label="操作" >
             <template slot-scope= "scope">
                <el-button  type="text" size="small" align="center" @click="checkPersonDetail(scope.row)">查看</el-button>
              </template>
      </el-table-column>
    </el-table>
   </div>
    </div>
    <el-drawer
      size="70%"
      title="添加店铺"
      :visible.sync="drawer"
      :direction="direction"
    >
      <el-form
        style="width:25%;"
        :model="store"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="店铺名称" prop="hfName">
          <el-input v-model="store.hfName"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺描述" prop="hfDesc">
          <el-input v-model="store.hfDesc"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺状态" prop="hfStatus">
          <el-input v-model="store.hfStatus"></el-input>
        </el-form-item>
        <el-form-item label="店铺位置" prop="hfStatus">
          <el-input v-model="store.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-drawer
      size="70%"
      title="编辑店铺"
      :visible.sync="editdrawer"
      :direction="direction"
    >
      <el-form
        style="width:25%;"
        :model="editData"
        status-icon
        :rules="rules"
        ref="ruleForm1"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="店铺名称" prop="hfName">
          <el-input v-model="editData.hfName"  ></el-input>
        </el-form-item>
        <el-form-item label="店铺描述" prop="hfDesc">
          <el-input v-model="editData.hfDesc"  ></el-input>
        </el-form-item>
        <el-form-item label="店铺状态" prop="hfStatus">
          <el-input v-model="editData.hfStatus"></el-input>
        </el-form-item>
        <el-form-item label="店铺位置" prop="hfStatus">
          <el-input v-model="editData.address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitedit('ruleForm')">提交</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-dialog
      :visible.sync="dialogVisible">
        <el-table :data="userData" stripe style="width: 100%"  @selection-change="handleSelectionChange"  ref="table" @row-click="currentChange">
          <el-table-column type=selection align="center"  label="选择" width="50"></el-table-column>
          <el-table-column align="center" prop="nickName" label="用户名"> </el-table-column>
          <el-table-column align="center" prop="phone" label="手机号" ></el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>
    <el-drawer
      :visible.sync="draweruser"
      :with-header="false">
      <template >
        <div style="margin-top:100px;margin-left:30px;">
            <span style="font-size:13px;margin-right:12px;">是否参与核销</span>
            <el-radio v-model="radio" label="0" @change="changestatus">否</el-radio>
            <el-radio v-model="radio" label="1" @change="changestatus">是</el-radio>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import storeService from '@/service/store.js';
import userCenterService from '@/service/userCenter.js';
import constants from '@/store/constants.js';
export default {
  data() {
    return {
      cancle: {
        stoneId: '',
        isCancel: '',
        userId: '',
      },
      radio: '0',
      draweruser: false,
      editid: '',
      editdrawer: false,
      selectDdata: [],
      storeId: '',
      persondata: {
        stoneId: '',
        ids: [],
      },
      Person: [],
      userData: [],
      dialogVisible: false,
      bossid: 1,
      rules: {
        hfName: [
          {
            required: true,
            message: '请输入店铺名称',
            trigger: 'blur',
          },
        ],
        hfDesc: [
          {
            required: true,
            message: '请输入店铺描述',
            trigger: 'blur',
          },
        ],
        hfStatus: [
          {
            required: true,
            message: '请输入店铺状态',
            trigger: 'blur',
          },
        ],
        address: [
          {
            required: true,
            message: '请输入店铺地址',
            trigger: 'blur',
          },
        ],
      },
      content: '',
      store: {
        hfName: '',
        hfDesc: '',
        hfStatus: '',
        userId: '',
        address: '',
      },
      editData: {
        stoneId: '',
        hfName: '',
        hfDesc: '',
        hfStatus: '',
        userId: '',
        address: '',
      },
      drawer: false,
      direction: 'btt',
      storeData: [
      ],
    };
  },
  methods: {
    changestatus: function(e) {
      console.log(e);
      this.cancle.isCancel = e;
      this.cancle.stoneId = this.persondata.stoneId;
      console.log(this.cancle);
      storeService.isCancel(this.cancle, (res) => {
        console.log(res);
        if (res.data.status === constants.SUCCESS_CODE) {
          this.$message({
            message: '修改成功',
            type: 'success',
          });
          this.draweruser = false;
          this.checkPerson();
        } else {
          this.$message({
            message: '修改失败',
            type: 'error',
          });
        }
      });
    },
    checkPersonDetail: function(row) {
      console.log(row);
      this.radio = row.isCancel;
      if (row.isCancel === 0) {
        this.radio = '0';
      } else {
        this.radio = '1';
      }
      this.cancle.userId = row.userId;
      this.draweruser = true;
    },
    submitedit: function() {
      storeService.updataStore(this.editData, (res) => {
        console.log(res);
        if (res.data.status === constants.SUCCESS_CODE) {
          this.$message({
            message: '修改成功',
            type: 'success',
          });
          this.editdrawer = false;
          this.getStore();
        } else {
          this.$message({
            message: '修改失败',
            type: 'error',
          });
        }
      });
    },
    edit: function(id) {
      console.log(id);
      this.editid = id;
      this.editData.stoneId = id;
      this.editdrawer = true;
      storeService.getStoreid(this.editid, (res) => {
        console.log(res);
        this.editData.hfName = res.data.data.hfName;
        console.log(this.editData.hfName);
        this.editData.hfDesc = res.data.data.hfDesc;
        this.editData.hfStatus = res.data.data.hfStatus;
        this.editData.address = res.data.data.address;
      });
      console.log(this.editData);
    },
    handleSelectionChange (val) {
      console.log(val);
      this.selectDdata = val;

    },
    // eslint-disable-next-line no-empty-function
    currentChange: function(row) {
      console.log(row);
      // this.persondata.personid = row.id;
      this.$refs.table.toggleRowSelection(row);
    },
    getStoreId: function(row) {
      // console.log(row);
      this.storeId = row.id;
      this.persondata.stoneId = row.id;
      this.checkPerson();
    },
    submit: function() {
      if (this.selectDdata.length > 0) {
        for (var i = 0;i < this.selectDdata.length;i++) {
          this.persondata.ids.push(this.selectDdata[i].id);
        }
      }
      console.log(this.persondata);
      storeService.addPerson(this.persondata, (res) => {
        // console.log(res);
        if (res.data.status === constants.SUCCESS_CODE) {
          this.$message({
            message: '添加成功',
            type: 'success',
          });
          this.dialogVisible = false;
        } else {
          this.$message({
            message: '添加失败',
            type: 'error',
          });
        }
      });
    },
    chooseInstance (val) {
      if (val.length > 1) {
        this.$refs.table.clearSelection();
        this.$refs.table.toggleRowSelection(val.pop());
      }
    },
    checkPerson: function() {
      storeService.checkPerson(this.storeId, (res) => {
        console.log(res);
        this.Person = res.data.data;
      });
    },
    checkUser: function() {
      userCenterService.checkUser((res) => {
        // console.log(res.data.data);
        this.userData = res.data.data.list;
      });
    },
    getStore: function() {
      storeService.getStore(this.bossid, (res) => {
        console.log(res);
        this.storeData = res.data.data;
        this.storeId = this.storeData[0].id;
        this.persondata.stoneId = this.storeData[0].id;
        this.checkPerson();
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          storeService.addStore(this.store, (res) => {
            // console.log(res);
            this.$message({
              message: '添加成功',
              type: 'success',
            });
            this.getStore();
          });
          this.$refs[formName].resetFields();
          this.drawer = false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
  // eslint-disable-next-line no-empty-function
  mounted() {
    var content = window.sessionStorage.getItem('userInfor');
    this.content = JSON.parse(content);
    this.store.userId = this.content.id;
    this.editData.userId = this.content.id;
    this.checkUser();
    this.getStore();
  },

};
</script>
<style >
thead .el-table-column--selection .cell{
    display: none;
}
.el-table--striped .el-table__body tr.el-table__row--striped.current-row td,
.el-table__body tr.current-row>td {
background-color: #9FB6CD;
}
.el-table--enable-row-hover .el-table__body tr:hover>td{
background-color:  hsl(210, 32%, 71%,0.5);
}
</style>
