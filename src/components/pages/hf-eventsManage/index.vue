
<template>
  <el-container>
    <el-header>
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
    </el-header>
    <el-container>
      <el-aside class="abc" width="380px">
        <div>活动列表</div>
        <el-table :data="addActivities" style="width: 100%">
          <el-table-column prop="id" label="活动编号"></el-table-column>
          <el-table-column prop="startTime" label="开始时间">
            <el-date-picker
              v-model="groupform.startTime"
              type="datetime"
              placeholder="开始时间"
              align="right"
            ></el-date-picker>
          </el-table-column>
          <el-table-column prop="stopTime" label="结束时间">
            <el-date-picker
              v-model="groupform.stopTime"
              type="datetime"
              placeholder="结束时间"
              align="right"
            ></el-date-picker>
          </el-table-column>
          <el-table-column prop="price" label="价格">
            <template slot-scope="scope">
              <el-input  placeholder="请输入内容" v-model="scope.row.price"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="stopTime" label="操作">
            <template slot-scope="scope">
              <el-button type="danger" @click="addGcommodity(scope)" size="mini">添加</el-button>
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
        >
          <el-table-column checked type="selection" width="55"></el-table-column>
          <el-table-column label="商品ID" width="120">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column label="商品描述" width="120">
            <template slot-scope="scope">{{ scope.row.hfGoods.goodsDesc}}</template>
          </el-table-column>
          <el-table-column prop="startTime" label="开始时间" width="120"></el-table-column>
          <el-table-column prop="stopTime" label="结束时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="price" label="剩余数量" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="操作" show-overflow-tooltip>
            <el-button type="danger" size="mini">删除</el-button>
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
      dialogTableVisible: false,
      selection: [],
      activeIndex: '1',
      // 添加秒杀
      groupform: {
        goodsId: '', // 商品id
        // number: '', // 成团人数
        price: '12', // 团购价格
        repertory: '12', // 库存
        startTime: '2019-3-18 19:45:00', // 团购开始时间
        stopTime: '2019-3-18 19:45:00', // 团购结束时间
      },
      // 第一个表单
      addActivities: [
       
      ],
      // 第二个表单
      tableData: [
        {
          id: '1',
          startTime: '2016-05-02',
          stopTime: '2016-05-02',
        },
        {
          id: '2',
          startTime: '2016-05-02',
          stopTime: '2016-05-02',
        },
        {
          id: '3',
          startTime: '2016-05-02',
          stopTime: '2016-05-02',
        },
      ],
      // 弹窗数据
      gridData: [
        {
          date: '2016-05-02',
          id: '32',
          goodsDesc: '描述信息',
        },
        {
          date: '2016-05-04',
          id: '1',
          goodsDesc: '描述信息23',
        },
        {
          date: '2016-05-01',
          id: '23',
          goodsDesc: '描述信息1518',
        },
      ],
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
    // 添加秒杀商品 scope.row.id
    addGcommodity(scope) {
      this.groupform.goodsId = scope.row.id;
      this.groupform.price = scope.row.price;
      // console.log('params', params);
      console.log('scope', scope.row.id);
      serviceEvents.ceateInsert(this.groupform, (res) => {
        console.log('秒杀商品', res);
        this.$message({
          showClose: true,
          message: '恭喜你，添加成功',
          type: 'success',
        });
      });
    },
    // 获取所有商品
    setProducts() {
      serviceEvents.selectAll((res) => {
        console.log('所有商品', res);
        this.gridData = res.data;
      });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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

      console.log(this.addActivities);
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
