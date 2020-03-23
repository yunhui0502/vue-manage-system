<template>
  <!---------------------------------- 分销 -------------------------------------------------- -->
  <el-container>
    <el-container>
      <el-aside class="abc" width="46%">
        <el-button style="margin: 8px;" @click="addGoodsSpecificationList" type="primary">添加活动</el-button>
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
          <el-table-column label="活动名称" width="120">
            <template slot-scope="scope">
              <el-input placeholder="请输入内容" v-model="scope.row.activityName"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="活动类型" prop="activityType">
            <span>分销</span>
          </el-table-column>
          <el-table-column prop="startTime" label="开始时间" width="170">
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.startTime"
                type="datetime"
                placeholder="开始时间"
                align="right"
              ></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column prop="endtime" label="结束时间" width="170">
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.endTime"
                type="datetime"
                placeholder="结束时间"
                align="right"
              ></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="addGcommodity(scope)" size="mini">保存</el-button>
              <el-button type="text" @click="editEvent(scope.row)" size="mini">查看</el-button>
            </template>
          </el-table-column>>
        </el-table>
      </el-aside>
      <el-main class="qwe">
        <!-- <el-button @click="dialogTableVisible = true" type="primary">参与活动商品管理</el-button> -->
        <el-table
          ref="multipleTable"
          :data="eventsGoods"
          stripe
          tooltip-effect="dark"
          style="width: 100%;margin-top: 30px;"
          :select-all="dianji(selection)"
          @selection-change="eventsSelectionChange"
        >
          <el-table-column label="序列号" type="index" width="70"></el-table-column>
          <el-table-column label="商品名称">
            <template slot-scope="scope">{{ scope.row.productName}}</template>
          </el-table-column>
          <el-table-column prop="distributionRatio" label="一级比例">
            <template slot-scope="scope">
              <el-input placeholder="请输入内容" v-model="scope.row.distributionRatio"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="distributionRatio1" label="二级比例">
            <template slot-scope="scope">
              <el-input placeholder="请输入内容" v-model="scope.row.distributionRatio1"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="SettingPrice(scope.row)" size="mini">保存</el-button>
              <el-button type="text" @click="deleteArticle(scope.row.id)" size="mini">删除</el-button>
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
            <el-button type="danger" @click="preserveModify(scope)" size="mini">保存修改</el-button>
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
// import store from '@/store';
import serviceEvents from '@/service/eventsManage.js';
export default {
  data() {
    return {
      imageUrl: '',
      fileList: [], // 图片
      dialogTableVisible: false,
      editboxVisible: false, // 编辑
      selection: [],
      activeIndex: '1',
      // 添加精选
      groupform: {
        activityName: '', // 活动名称
        activityType: 'distributionActivity', // 活动类型
        startTime: '', // 开始时间
        endTime: '', // 结束时间
        timestamp: '2', // 当前时间
        token: '1',
        userId: '1',
        requestId: '2', // 随机数
      },
      // options: [], // 下拉框
      transfedata: {
        goodsId: '',
        seniorityId: '',
        id: '',
        distributionRatio: '',
        timestamp: '2', // 当前时间
        token: '1',
        userId: '1',
        requestId: '2', // 随机数
      },
      // eventsId: [], // 保存活动ID
      // goodsId: [], // 保存商品ID
      // 第一个表单
      addActivities: [],
      // 表单
      tableData: [],
      // 弹窗数据
      gridData: [],
      // 活动下物品列表
      eventsGoods: [],
    };
  },
  created() {
    this.getselect();
    this.setProducts();
    this.geteventType();
  },
  methods: {
    // 获取商品活动类型
    geteventType() {
      serviceEvents.getProdcutActivityType((res) => {
        console.log('获取商品活动类型', res.data.data);
        this.options = res.data.data;
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
      this.tableData.push(row);
    },
    // 绑定 里的确定按钮
    onSubmit() {
      serviceEvents.seniorityBinding(this.transfedata, (res) => {
        console.log('绑定商品', res);
        this.$message({
          showClose: true,
          message: '恭喜你，添加成功',
          type: 'success',
        });
        serviceEvents.getActivityProductList(
          this.transfedata.seniorityId,
          (res) => {
            console.log('活动商品列表信息', res);
            // this.eventsGoods = res.data.data;
            let ventsGood = res.data.data;
            for (let vaents of ventsGood) {
              console.log(vaents);
              if (typeof vaents.distributionRatio !== 'undefined') {
                vaents.distribut = JSON.parse(vaents.distributionRatio);
                console.log(vaents.distribut);
              }
            }
            this.eventsGoods = res.data.data;
          },
        );
      });
    },
    // 保存价格比例
    SettingPrice(row) {
      console.log(row);
      this.transfedata.distributionRatio =
        row.distributionRatio + ',' + row.distributionRatio1;
      this.transfedata.id = row.id;
      serviceEvents.updateActivityProduct(this.transfedata, (res) => {
        console.log('添加价格', res);
      });
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
      this.transfedata.seniorityId = row.id;
      if (row.id !== undefined) {
        console.log('阻止');
        serviceEvents.getActivityProductList(row.id, (res) => {
          console.log('活动商品列表信息', res);
          // this.eventsGoods = res.data.data;
          let ventsGood = res.data.data;
          for (let vaents of ventsGood) {
            console.log(vaents);
            if (typeof vaents.distributionRatio !== 'undefined') {
              vaents.distribut = JSON.parse(vaents.distributionRatio);
              console.log(vaents.distribut);
            }
          }
          this.eventsGoods = res.data.data;
        });
      }
    },

    handleCurrentChange(val) {
      this.currentRow = val;
    },
    // 查询排行相关信息
    getselect() {
      serviceEvents.findProdcutActivity((res) => {
        console.log('分销商品', res.data.data);
        this.tableData = res.data.data;
        if (res.data.data.length !== 0) {
          this.transfedata.seniorityId = res.data.data[0].id;
          if (this.transfedata.seniorityId !== undefined) {
            serviceEvents.getActivityProductList(
              this.transfedata.seniorityId,
              (res) => {
                console.log('活动商品列表信息', res);
                let ventsGood = res.data.data;
                for (let vaents of ventsGood) {
                  console.log(vaents);
                  if (typeof vaents.distributionRatio !== 'undefined') {
                    vaents.distribut = JSON.parse(vaents.distributionRatio);
                    console.log(vaents.distribut);
                  }
                }
                this.eventsGoods = res.data.data;
              },
            );
          }
        }
      });
    },

    //  添加排行相关信息 timestamp  repertory
    addGcommodity(scope) {
      this.groupform.activityName = scope.row.activityName;
      this.groupform.activityType = scope.row.activityType;
      this.groupform.startTime = scope.row.startTime;
      this.groupform.endTime = scope.row.endTime;
      console.log('parathis.groupformms', this.groupform);
      console.log('保存');
      serviceEvents.ceateInsert(this.groupform, (res) => {
        console.log('精选', res);
        this.$message({
          showClose: true,
          message: '恭喜你，添加成功',
          type: 'success',
        });
        this.getselect();
      });
      console.log('scope', scope);
    },
    // 获取所有商品
    setProducts() {
      serviceEvents.selectAll((res) => {
        console.log('所有商品', res);
        this.gridData = res.data.data;
      });
    },
    // 单个删除活动商品
    deleteEvent(seniorityId) {
      this.$confirm('此操作将会删除该活动, 是否继续?', '提示', {}).then(() => {
        console.log(seniorityId);
        serviceEvents.eventsDelete(seniorityId, () => {
          this.$message({
            showClose: true,
            message: '恭喜你，删除成功',
            type: 'success',
          });
        });
        this.getselect();
      });
    },
    // 修改活动名称
    preserveModify(scope) {
      this.groupform.activityName = scope.row.activityName;
      this.groupform.id = scope.row.id;
      serviceEvents.updateProdcutActivity(this.groupform, (res) => {
        console.log('修改活动', res);
        this.$message({
          showClose: true,
          message: '恭喜你，修改成功',
          type: 'success',
        });
        this.getselect();
      });
    },
    // 删除活动里的商品
    deleteArticle(id) {
      this.$confirm('此操作将会删除该活动, 是否继续?', '提示', {}).then(() => {
        console.log(id);
        serviceEvents.deleteGoods(id, () => {
          this.$message({
            showClose: true,
            message: '恭喜你，删除成功',
            type: 'success',
          });
        });
        this.getselect();
      });
    },
    // 查看
    view(seniorityId) {
      console.log(seniorityId);
      serviceEvents.seniorityfindSeniorityContent(seniorityId, (res) => {
        console.log(res);
      });
    },
    dianji(selection) {
      console.log(selection);
    },

    eventsSelectionChange(val) {
      console.log('活动', val);
      this.transfedata.seniorityId = [];
      for (let i = 0; i < val.length; i++) {
        // this.transfedata.seniorityId = val[i].id;
      }
      console.log('this.eventsId', this.transfedata.seniorityId);
    },
    handleSelectionChange(val) {
      this.transfedata.goodsId = [];
      console.log('选中的值', val);
      let arr = val;
      for (let i = 0; i < arr.length; i++) {
        this.transfedata.goodsId = val[i].id;
      }
      console.log(this.transfedata.goodsId);
    },

    changeFile(file, fileList) {
      this.fileInfo = file.raw;
      console.log(file.raw);
    },
  },
};
</script>

<style lang="less" scoped>
.el-input__inner {
  width: 50%;
}
</style>
