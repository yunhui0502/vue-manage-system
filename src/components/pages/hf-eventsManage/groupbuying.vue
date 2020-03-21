<template>
  <!----------------------------------团购-------------------------------------------------- -->
  <el-container>
    <el-container>
      <el-aside class="abc" width="40%">
        <hfaddevents></hfaddevents>
        <!-- 活动列表展示 -->
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          @current-change="handleCurrentChange"
          @row-click="rowChange"
          @selection-change="eventsSelectionChange"
          style="width: 100%"
        >
          <el-table-column checked type="selection" width="55"></el-table-column>
          <el-table-column label="物品ID">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column label="商品描述">
            <template slot-scope="scope">{{ scope.row.hfGoods.goodsDesc}}</template>
          </el-table-column>
          <el-table-column prop="startTime" label="开始时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="stopTime" label="结束时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="danger" @click="editEvent(scope.row)" size="mini">编辑</el-button>
            </template>
          </el-table-column>>
        </el-table>
      </el-aside>
      <el-main class="qwe">
        <el-button @click="dialogTableVisible = true" type="primary">参与活动商品管理</el-button>
        <el-table
          ref="multipleTable"
          :data="eventsGoods"
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

    <el-dialog title="编辑" :visible.sync="editboxVisible">
      <el-table :data="addActivities" style="width: 100%">
        <el-table-column prop="hfName" label="活动名称">
          <template slot-scope="scope">
            <el-input placeholder="请输入内容" v-model="scope.row.activityName"></el-input>
          </template>
        </el-table-column>
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
        <el-table-column prop="endTime" label="结束时间">
          <template slot-scope="scope">
            <el-date-picker
              v-model="scope.row.endTime"
              type="datetime"
              placeholder="结束时间"
              align="right"
            ></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="stopTime" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click="addGcommodity(scope)" size="mini">保存修改</el-button>
            <el-button type="danger" @click="deleteEvent(scope.row.id)" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 6px;">给活动添加商品部分</div>
      <el-form width="40%" :inline="true" :model="transfedata" class="demo-form-inline">
        <el-form-item label="商品ID">
          <el-input v-model="transfedata.goodsId" placeholder="商品ID"></el-input>
        </el-form-item>
        <el-form-item label="活动ID">
          <el-input v-model="transfedata.seniorityId" placeholder="活动ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>

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
        <el-table-column label="商品名字">
          <template slot-scope="scope">{{ scope.row.productName}}</template>
        </el-table-column>
        <el-table-column label="商品描述">
          <template slot-scope="scope">{{ scope.row.productDesc}}</template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-container>
</template>

<script>
import serviceEvents from '@/service/eventsManage.js';
import hfaddevents from './hf-addevents.vue';
export default {
  components: {
    hfaddevents,
  },
  data() {
    return {
      dialogTableVisible: false,
      editboxVisible: false, // 编辑
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
      transfedata: {
        goodsId: '',
        seniorityId: '',
      },
      // 第一个表单
      addActivities: [],
      // 第二个表单
      tableData: [],
      // 活动下物品列表
      eventsGoods: [],
      // 弹窗数据
      gridData: [],
    };
  },
  created() {
    this.getselect();
    this.setProducts();
  },
  methods: {
    // 弹窗里 绑定 里的确定按钮
    onSubmit() {
      console.log('submit!');
    },
    // 获取团购商品
    getselect() {
      serviceEvents.groupSelete((res) => {
        console.log('团购商品', res.data);
        this.tableData = res.data.data;
      });
    },
    // 添加一行商品规格
    addGoodsSpecificationList() {
      let row = {
        activityName: '', // 活动名称
        activityType: '', // 活动类型
        startTime: '', // 开始时间
        endTime: '', // 结束时间
      };
      this.addActivities.push(row);
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
      if (this.controlname === '保存') {
        console.log('保存');
        serviceEvents.groupInsert(this.groupform, (res) => {
          console.log('团购商品', res);
          this.$message({
            showClose: true,
            message: '恭喜你，保存成功',
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
      console.log(id);
      this.$confirm('此操作将会删除该活动, 是否继续?', '提示', {}).then(() => {
        console.log(id);
        serviceEvents.eventsDelete(id, () => {
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
    // 编辑
    editEvent(row) {
      console.log(row);
      this.addActivities = [];
      this.editboxVisible = true;
      this.addActivities.push(row);
    },
    // 点击一行触发
    rowChange(row) {
      console.log(row);
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },

    handleSelectionChange(val) {
      this.transfedata.goodsId = [];
      console.log('选中的值', val);
      let arr = val;
      for (let i = 0; i < arr.length; i++) {
        this.transfedata.goodsId = val[i].id;
      }
      console.log(this.addActivities);
    },
    eventsSelectionChange(val) {
      console.log('活动', val);
      this.transfedata.seniorityId = [];
      console.log('选中的值', val);
      let arr = val;
      for (let i = 0; i < arr.length; i++) {
        this.transfedata.seniorityId = val[i].id;
      }
    },
  },
};
</script>

<style lang="less" scoped>
</style>
