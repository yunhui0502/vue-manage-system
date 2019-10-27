<template>
<div>
  <el-button type="text" @click="dialogVisible = true">创建订单</el-button>
  <template>
    <el-dialog title="创建订单" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </template>
  <el-table stripe :data="scope.tableData">
    <el-table-column label="订单编号">
      <template slot-scope="scope">
        <span>{{ scope.row.id}}</span>
      </template>
    </el-table-column>
    <el-table-column label="订单类型">
      <template slot-scope="scope">
        <span>{{ scope.row.orderType}}</span>
      </template>
    </el-table-column>
    <el-table-column label="支付金额">
      <template slot-scope="scope">
        <span>{{ scope.row.amount}}</span>
      </template>
    </el-table-column>
    <el-table-column label="支付状态">
      <template slot-scope="scope">
        <span>{{ scope.row.payStatus}}</span>
      </template>
    </el-table-column>
    <el-table-column label="支付方式">
      <template slot-scope="scope">
        <span>{{ scope.row.payType}}</span>
      </template>
    </el-table-column>

    <el-table-column label="订单创建人">
      <template slot-scope="scope">
        <span>{{ scope.row.username}}</span>
      </template>
    </el-table-column>
    <el-table-column label="创建时间">
      <template slot-scope="scope">
        <span>{{ scope.row.createTime}}</span>
      </template>
    </el-table-column>
    <el-table-column label="修改时间">
      <template slot-scope="scope">
        <span>{{ scope.row.modifyTime}}</span>
      </template>
    </el-table-column>
    <el-table-column>
      <template slot-scope="scope">
        <el-button @click="TellMeId(scope.row.id)">查看订单详情</el-button>
      </template>
    </el-table-column>
  </el-table>
  <template>
    <elDrawer title="订单详情" :v-if="drawer" :before-close="handleClose" :visible.sync="drawer" custom-class="demo-drawer" width="50%" :loading.sync="loading" close-on-click-modal ref="selectedItem">
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="活动名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="活动区域" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="drawer = false">取 消</el-button>
          <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </div>
    </elDrawer>
  </template>

</div>
</template>

<script>
import api from '@/apis/order-api.js';
import elDrawer from '@/components/drawer';
export default {
  name: "hf-order",
  components: {
    elDrawer
  },
  data() {
    return {
      drawer: false,
      loading: false,
      dialogVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '80px',
      scope: {
        tableData: [],

      }
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    TellMeId(num) {
      console.log(num)
      this.drawer = true;
    },
    listOrder() {
      api.checkOrderList(1).then(resp => {
        if (resp.status == 200) {
          console.log(resp.data);
          if (resp.data.status == 200) {
            this.scope.tableData = resp.data.data;
          }
        }
      });
    }
  },
  mounted() {
    this.listOrder();
  }
}
</script>

<style>
</style>
