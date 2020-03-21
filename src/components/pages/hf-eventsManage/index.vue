
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
          <el-aside class="abc" width="40%">
            <hfaddevents></hfaddevents>
            <!-- <el-button style="margin: 8px;" @click="addGoodsSpecificationList" type="primary">添加活动</el-button>
            <el-table :data="addActivities" style="width: 100%">
              <el-table-column prop="activityName" label="活动名称">
                <template slot-scope="scope">
                  <el-input placeholder="请输入内容" v-model="scope.row.activityName"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="activityType" label="活动类型">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.activityType" placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.activityType"
                      :label="item.activityDesc"
                      :value="item.activityType"
                    ></el-option>
                  </el-select>
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
                  <el-button type="danger" @click="addGcommodity(scope)" size="mini">保存</el-button>
                </template>
              </el-table-column>
            </el-table> -->
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
              <el-table-column label="活动名称">
                <template slot-scope="scope">{{ scope.row.activityName }}</template>
              </el-table-column>
              <el-table-column label="活动类型">
                <template slot-scope="scope">{{ scope.row.activityType}}</template>
              </el-table-column>
              <el-table-column prop="startTime" label="开始时间" show-overflow-tooltip></el-table-column>
              <el-table-column prop="endtime" label="结束时间" show-overflow-tooltip></el-table-column>
              <el-table-column prop="address" label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-button type="danger" @click="editEvent(scope.row)" size="mini">编辑</el-button>
                </template>
              </el-table-column>>
            </el-table>
          </el-aside>
          <el-main class="qwe">
            <el-button type="primary">参与活动商品管理</el-button>
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
              <el-table-column prop="repertory" label="库存">
                <template slot-scope="scope">
                  <el-input placeholder="请输入内容" v-model="scope.row.repertory"></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="address" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="mini">保存</el-button>
                  <el-button
                    type="text"
                    style=" color: red;"
                    @click="deleteEvent(scope.row.id)"
                    size="mini"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>

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
import hfaddevents from './hf-addevents.vue';
export default {
  components: {
    groupbuying,
    selection,
    hfaddevents,
  },
  data() {
    return {
      value: '',
      Controlkill: true, // 秒杀
      Controlgroup: false, // 团购
      Controlselection: false, // 精选
      // Control: '',
      editboxVisible: false, // 编辑
      selection: [],
      activeIndex: '1',
      // 添加秒杀
      groupform: {
        activityName: '', // 活动名称
        activityType: '', // 活动类型
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        timestamp: '2', // 当前时间
        token: '1',
        userId: '1',
        requestId: '2', // 随机数
      },
      options: [], // 下拉框
      transfedata: {
        goodsId: '',
        seniorityId: '',
        price: '12', // 团购价格
        repertory: '12', // 库存
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
    this.geteventType();
  },
  methods: {
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
    // 添加秒杀商品 value
    addGcommodity(scope) {
      this.groupform.activityName = scope.row.activityName;
      this.groupform.activityType = scope.row.activityType;
      this.groupform.startTime = scope.row.startTime;
      this.groupform.endTime = scope.row.endTime;
      // console.log('parathis.groupformms', this.groupform);

      console.log('保存');
      serviceEvents.ceateInsert(this.groupform, (res) => {
        console.log('秒杀商品', res);
        this.$message({
          showClose: true,
          message: '恭喜你，添加成功',
          type: 'success',
        });
        this.getselect();
      });
      // console.log('修改');
      // serviceEvents.killupdate(this.groupform, (res) => {
      //   console.log('秒杀商品', res);
      //   this.$message({
      //     showClose: true,
      //     message: '恭喜你，修改成功',
      //     type: 'success',
      //   });
      //   this.getselect();
      // });

      console.log('scope', scope);
    },
    // 获取秒杀商品
    getselect() {
      serviceEvents.select((res) => {
        console.log('秒杀商品', res.data.data);
        this.tableData = res.data.data;
      });
    },


    // 获取所有商品
    setProducts() {
      serviceEvents.selectAll((res) => {
        console.log('所有商品', res.data.data);
        this.gridData = res.data.data;
      });
    },
    // 单个删除活动商品
    deleteEvent(id) {
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
    // 弹窗里 给活动绑定商品 里的确定按钮
    onSubmit() {
      serviceEvents.seniorityBinding(this.transfedata, (res) => {
        console.log('绑定商品', res);
      });
    },
    // 编辑
    editEvent(row) {
      console.log(row);
      this.transfedata.seniorityId = row.id;
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
.abc {
  color: red;
}
.qwe {
  color: #ccc;
}
</style>
