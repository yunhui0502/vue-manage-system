
<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">秒杀活动</el-menu-item>
      <el-menu-item index="2">团购商品</el-menu-item>
      <el-menu-item index="3">精选商品</el-menu-item>
      <el-menu-item index="4">商品分销</el-menu-item>
    </el-menu>
    <div v-if="Controlkill">
      <el-container>
        <el-container>
          <el-aside class="abc" width="380px">
            <div>秒杀活动列表</div>
            <el-table :data="addActivities" style="width: 100%">
              <el-table-column prop="id" label="活动编号"></el-table-column>
              <el-table-column prop="startTime" label="开始时间">
                <template slot-scope="scope">
                  <el-date-picker
                    v-model="scope.row.startTime"
                    type="datetime"
                    placeholder="开始时间"
                    align="right"
                  ></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column prop="stopTime" label="结束时间">
                <template slot-scope="scope">
                  <el-date-picker
                    v-model="scope.row.stopTime"
                    type="datetime"
                    placeholder="结束时间"
                    align="right"
                  ></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column prop="price" label="价格">
                <template slot-scope="scope">
                  <el-input placeholder="请输入内容" v-model="scope.row.price"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="repertory" label="库存">
                <template slot-scope="scope">
                  <el-input placeholder="请输入内容" v-model="scope.row.repertory"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="stopTime" label="操作">
                <template slot-scope="scope">
                  <el-button type="danger" @click="addGcommodity(scope)" size="mini">{{controlname}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-aside>
          <el-main class="qwe">
            <el-button @click="dialogTableVisible = true" type="primary">参与活动商品管理</el-button>
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              :select-all="dianji(selection)"
              @selection-change="eventsSelectionChange"
            >
              <el-table-column checked type="selection" width="55"></el-table-column>
              <el-table-column label="物品ID" width="120">
                <template slot-scope="scope">{{ scope.row.id }}</template>
              </el-table-column>
              <el-table-column label="商品描述" width="120">
                <template slot-scope="scope">{{ scope.row.hfGoods.goodsDesc}}</template>
              </el-table-column>
              <el-table-column prop="startTime" label="开始时间" show-overflow-tooltip></el-table-column>
              <el-table-column prop="stopTime" label="结束时间" show-overflow-tooltip></el-table-column>
              <el-table-column prop="price" label="剩余数量" show-overflow-tooltip></el-table-column>
              <el-table-column prop="address" label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button type="danger" @click="deleteEvent(scope.row.id)" size="mini">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>

        <el-dialog title="所有商品" :visible.sync="dialogTableVisible">
          <el-table
            ref="multipleTable"
            :data="gridData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="商品ID">
              <template slot-scope="scope">{{ scope.row.id}}</template>
            </el-table-column>
            <el-table-column label="商品描述">
              <template slot-scope="scope">{{ scope.row.goodsDesc}}</template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </el-container>
    </div>
    <!-- 团购 -->
    <div v-if="Controlgroup">
      <groupbuying></groupbuying>
    </div>
    <!-- 精选 -->
    <div v-if="Controlselection">
      <selection></selection>
    </div>
    <div></div>
  </div>
</template>

<script>
import serviceEvents from '@/service/eventsManage.js';
import groupbuying from './groupbuying.vue';
import selection from './selection.vue';
export default {
  components: {
    groupbuying,
    selection,
  },
  data() {
    return {
      controlname: '添加',
      Controlkill: true, // 秒杀
      Controlgroup: false, // 团购
      Controlselection: false, // 精选
      // Control: '',
      dialogTableVisible: false,
      selection: [],
      activeIndex: '1',
      // 添加秒杀
      groupform: {
        goodsId: '', // 商品id
        id: '',
        price: '12', // 团购价格
        repertory: '12', // 库存
        startTime: '', // 团购开始时间
        stopTime: '', // 团购结束时间
      },
      // 第一个表单
      addActivities: [],
      // 第二个表单
      tableData: [],
      // 弹窗数据
      gridData: [],
    };
  },
  created() {
    this.getselect();
    this.setProducts();
  },
  methods: {
    // 获取秒杀商品
    getselect() {
      serviceEvents.select((res) => {
        console.log('秒杀商品', res.data);
        this.tableData = res.data;
      });
    },
    // 添加秒杀商品 repertory
    addGcommodity(scope) {
      this.groupform.goodsId = scope.row.id;
      this.groupform.id = scope.row.id;
      this.groupform.price = scope.row.price;
      this.groupform.startTime = scope.row.startTime;
      this.groupform.stopTime = scope.row.stopTime;
      this.groupform.repertory = scope.row.repertory;
      // console.log('params', params);
      if (this.controlname === '添加') {
        console.log('添加');
        serviceEvents.ceateInsert(this.groupform, (res) => {
          console.log('秒杀商品', res);
          this.$message({
            showClose: true,
            message: '恭喜你，添加成功',
            type: 'success',
          });
          this.getselect();
        });
      } else {
        console.log('修改');
        serviceEvents.killupdate(this.groupform, (res) => {
          console.log('秒杀商品', res);
          this.$message({
            showClose: true,
            message: '恭喜你，修改成功',
            type: 'success',
          });
          this.getselect();
        });
      }
      console.log('scope', scope);
    },
    // 获取所有商品
    setProducts() {
      serviceEvents.selectAll((res) => {
        console.log('所有商品', res);
        this.gridData = res.data;
      });
    },
    // 单个删除活动商品
    deleteEvent(id) {
      this.$confirm('此操作将会删除该活动, 是否继续?', '提示', {}).then(() => {
        console.log(id);
        serviceEvents.killDelete(id, () => {
          this.$message({
            showClose: true,
            message: '恭喜你，删除成功',
            type: 'success',
          });
        });
        this.getselect();
      });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      if (key === '1') {
        console.log('秒杀');
        this.Controlgroup = false; // 团购
        this.Controlkill = true; // 秒杀
        this.Controlselection = false; // 精选
      } else if (key === '2') {
        console.log('团购');
        this.Controlgroup = true; // 团购
        this.Controlkill = false; // 秒杀
        this.Controlselection = false; // 精选
      } else if (key === '3') {
        console.log('精选');
        this.Controlgroup = false; // 团购
        this.Controlkill = false; // 秒杀
        this.Controlselection = true; // 精选
      } else if (key === '4') {
        console.log('分销');
      }
    },
    dianji(selection) {
      console.log(selection);
    },
    handleSelectionChange(val) {
      // console.log(1112112312)
      // this.multipleTable = val //  this.multipleTable 选中的值
      this.addActivities = [];
      console.log('选中的值', val);
      let arr = val;
      for (let i = 0; i < arr.length; i++) {
        this.addActivities.push(val[i]);
      }
      this.controlname = '添加';
      console.log(this.addActivities);
    },
    eventsSelectionChange(val) {
      console.log('活动', val);
      this.addActivities = [];
      console.log('选中的值', val);
      let arr = val;
      for (let i = 0; i < arr.length; i++) {
        this.addActivities.push(val[i]);
      }
      this.controlname = '修改';
    },
  },
};
</script>

<style lang="less" scoped>
.abc {
  color: #000;
}
.qwe {
  color: #ccc;
}
</style>
