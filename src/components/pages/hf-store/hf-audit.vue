<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="审核列表" name="first">
        <el-table
          :data="shendata"
          stripe
          style="width: 100%"
          highlight-current-row
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50"></el-table-column>
          <el-table-column align="center" label="序号" type="index" :index="indexMethod"></el-table-column>
          <el-table-column align="center" prop="stoneName" label="提现店铺名称"></el-table-column>
          <el-table-column align="center" prop="createDate" label="提现时间" show-overflow-tooltip></el-table-column>
          <el-table-column align="center" prop="withdrawalMoney" label="提现金额"></el-table-column>
          <el-table-column align="center" prop="quantity" label="提现至"></el-table-column>
          <el-table-column align="center" prop="category" label="提现信息"></el-table-column>
          <el-table-column align="center" label="提现状态" width="150">
            <template slot-scope="scope">
              <span>{{scope.row.withdrawalState=='pending'?'未审批':(scope.row.withdrawalState=='complete'?'已审核':'已取消')}}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.status!=='pending'"
                class="a6a"
                @click="chucang(scope.row)"
                type="text"
                size="small"
              >审批</el-button>
              <el-button
                v-if="scope.row.status!=='pending'"
                class="a6a"
                @click="refuse(scope.row)"
                type="text"
                size="small"
              >拒绝</el-button>
              <el-button v-if="scope.row.status=='pending'" class="ff3" type="text" size="small">已审批</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="提款方式" name="second">
        <el-button style=" margin: 10px;" type="primary" @click="dialogFormVisible = true">添加取款方式</el-button>

        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="withdrawalWayName" label="取款名字" ></el-table-column>
          <el-table-column prop="grantAccount" label="取款账号" ></el-table-column>
          <el-table-column prop="withdrawalCommission" label="手续费"></el-table-column>
          <el-table-column fixed="right" label="操作" >
            <template slot-scope="scope">
              <!-- <el-button
                class="a6a"
                type="text"
                size="small"
              >修改</el-button> -->
              <el-button
                class="a6a"
                @click="withdrawalDelete(scope.row)"
                type="text"
                size="small"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-dialog title="添加取款方式"  width="40%" center :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="放款账号" :label-width="formLabelWidth">
          <el-input v-model="form.grantAccount"></el-input>
        </el-form-item>
        <el-form-item label="手续费" :label-width="formLabelWidth">
          <el-input v-model="form.withdrawalCommission"></el-input>
        </el-form-item>
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="form.withdrawalWayName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddMethod">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import cart from '@/service/cart.js';
import store from '@/store';
export default {
  name: '',
  data() {
    return {
      indexMethod: 1,
      activeName: 'first',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      Param: {
        WithdrawalId: '',
        type: '',
        userId: '',
      },
      form: {
        bossId: '', // 商家id
        commissionType: 'percent', // 手续费类型
        grantAccount: '', // 放款账号
        withdrawalCommission: '', // 取款手续费
        withdrawalWayName: '', // 取款方式名称
      },
      shendata: [],
      tableData: [],
    };
  },
  created() {
    this.SelectMethod();
    this.withdrawalApplyList();
  },
  methods: {
    withdrawalDelete (row) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          console.log(row);
          cart.DeletedMethod(row.id, (res) => {
            console.log('提款列表', res);
            this.tableData = res.data.data;
            this.SelectMethod();
          });
        })
        // eslint-disable-next-line dot-notation
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          });
        });

    },
    SelectMethod () {
      let bossId = store.getUser().BSid;
      cart.SelectMethod(bossId, (res) => {
        console.log('提款列表', res);
        this.tableData = res.data.data;
      });
    },
    withdrawalApplyList () {
      cart.withdrawalApplyList((res) => {
        console.log('申请列表', res);
        this.shendata = res.data.data;
      });
    },
    AddMethod () {
      this.form.bossId = store.getUser().BSid;
      cart.AddMethod(this.form, (res) => {
        this.dialogFormVisible = false;
        console.log(res);
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSelectionChange(val) {
      console.log('选中', val);
      this.amount = val.length;
      this.Batch = val;
    },
    chucang(row) {
      console.log(row);

      this.$confirm('是否同意此申请?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.Param.type = 'complete';
          this.Param.WithdrawalId = row.id;
          this.Param.userId = store.getUser().id;
          cart.disposeWithdrawalApply(this.Param, (res) => {
            console.log(res);

            this.$message({
              message: '已同意',
              type: 'success',
            });
            this.withdrawalApplyList();
          });
        })
        // eslint-disable-next-line dot-notation
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          });
        });
    },
    refuse(row) {
      console.log(row);

      this.$confirm('是否拒绝此申请?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.Param.type = 'cancel';
          this.Param.WithdrawalId = row.id;
          this.Param.userId = store.getUser().id;
          cart.disposeWithdrawalApply(this.Param, (res) => {
            this.$message({
              message: '已拒绝',
              type: 'warning',
            });
            this.withdrawalApplyList();
          });
        })
        // eslint-disable-next-line dot-notation
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.el-input {
  width: 320px;
}
</style>
