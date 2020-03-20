<template>
  <!----------------------------------团购-------------------------------------------------- -->
  <el-container>
    <el-container>
      <el-aside class="abc" width="380px">
        <div>团购活动列表</div>
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
          <el-table-column prop="number" label="成团人数">
            <template slot-scope="scope">
              <el-input placeholder="请输入内容" v-model="scope.row.number"></el-input>
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
          <el-table-column prop="startTime" label="开始时间"  show-overflow-tooltip></el-table-column>
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
</template>

<script>
import serviceEvents from '@/service/eventsManage.js';
export default {
  data() {
    return {
      controlname: '添加',
      dialogTableVisible: false,
      selection: [],
      activeIndex: '1',
      // 添加秒杀
      groupform: {
        goodsId: '', // 商品id
        groupId: '', // 团购ID
        price: '12', // 团购价格
        repertory: '12', // 库存
        number: '4', // 团购人数
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
    // 获取团购商品
    getselect() {
      serviceEvents.groupSelete((res) => {
        console.log('团购商品', res.data);
        this.tableData = res.data;
      });
    },
    // 添加团购商品 scope.row.id
    addGcommodity(scope) {
      this.groupform.goodsId = scope.row.id;
      this.groupform.price = scope.row.price;
      this.groupform.repertory = scope.row.repertory;
      this.groupform.number = scope.row.number;
      this.groupform.startTime = scope.row.startTime;
      this.groupform.stopTime = scope.row.stopTime;
      // console.log('params', params);
      if (this.controlname === '添加') {
        console.log('添加');
        serviceEvents.groupInsert(this.groupform, (res) => {
          console.log('团购商品', res);
          this.$message({
            showClose: true,
            message: '恭喜你，添加成功',
            type: 'success',
          });
          this.getselect();
        });
      } else {
        console.log('修改');
        serviceEvents.groupupdate(this.groupform, (res) => {
          console.log('团购商品', res);
          this.$message({
            showClose: true,
            message: '恭喜你，添加成功',
            type: 'success',
          });
          this.getselect();
        });
      }
      console.log('scope', scope.row.id);
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
        serviceEvents.groupDelete(id, () => {
          this.$message({
            showClose: true,
            message: '恭喜你，删除成功',
            type: 'success',
          });
        });
        this.getselect();
      });
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
</style>
