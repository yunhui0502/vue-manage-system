<template>
  <!---------------------------------- 精选 -------------------------------------------------- -->
  <el-container>
    <el-container>
      <el-aside class="abc" width="40%">
        <hfaddevents></hfaddevents>
        <!-- 上传图片 -->

        <el-upload
          class="upload-demo"
          action="/api/api/product/seniority/updateSeniorityInfo"
          :on-preview="handlePreview"
          name="fileInfo"
          :data="transfedata.seniorityId"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

        <!-- 活动列表展示 -->
        <el-table
          ref="singleTable"
          :data="tableData"
          highlight-current-row
          @current-change="handleCurrentChange"
          @row-click="rowChange"
          @selection-change="eventsSelectionChange"
          style="width: 100%;margin-top: 16px;"
        >
          <el-table-column checked type="selection" width="55"></el-table-column>
          <el-table-column label="ID" width="120">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column label="榜名单" width="120">
            <template slot-scope="scope">{{ scope.row.seniorityName}}</template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="modifityTime" label="修改时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="danger" @click="editEvent(scope.row)" size="mini">编辑</el-button>
            </template>
          </el-table-column>
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
          <el-table-column label="ID" width="120">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column label="榜名单" width="120">
            <template slot-scope="scope">{{ scope.row.seniorityName}}</template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="modifityTime" label="修改时间" show-overflow-tooltip></el-table-column>
          <el-table-column prop="address" label="操作" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="danger" @click="deleteEvent(scope.row.id)" size="mini">删除</el-button>
              <el-button type="info" @click="view(scope.row.id)" size="mini">查看</el-button>
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
import store from '@/store';
import serviceEvents from '@/service/eventsManage.js';
import hfaddevents from './hf-addevents.vue';
export default {
  components: {
    hfaddevents,
  },
  data() {
    return {
      imageUrl: '',
      fileList: [], // 图片
      dialogTableVisible: false,
      selection: [],
      activeIndex: '1',
      // 添加精选
      groupform: {
        id: '',
        fileId: '', // 文件id
        fileInfo: '', // fileInfo图片
        repertory: '', // 请求id, 发起请求的随机数
        seniorityName: '', // 排行名称
        timestamp: '', // 发起请求的当前时间
        userId: '123', // 登录的用户id
        token: '123', // 登录成功后返回的token
      },
      transfedata: {
        goodsId: '',
        seniorityId: '',
      },
      // eventsId: [], // 保存活动ID
      // goodsId: [], // 保存商品ID
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
  },
  methods: {
    // 绑定 里的确定按钮
    onSubmit() {
      console.log('submit!');
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
    // 查询排行相关信息
    getselect() {
      serviceEvents.seniorityfindSeniorityInfo((res) => {
        console.log('精选商品', res.data);
        this.tableData = res.data.data;
      });
    },
    submitUpload() {
      this.$refs.upload.submit();
      console.log(this.fileList);
      console.log(this.$refs.upload);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`,
      );
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    //  添加排行相关信息 timestamp  repertory
    addGcommodity() {
      this.groupform.repertory = Date.now();
      this.groupform.timestamp = JSON.stringify(store.getNowDate());
      console.log('groupform', this.groupform);
      serviceEvents.seniorityEvent(this.groupform, (res) => {
        console.log('精选商品', res);
        this.$message({
          showClose: true,
          message: '恭喜你，添加成功',
          type: 'success',
        });
        this.getselect();
      });
    },
    // 获取所有商品
    setProducts() {
      serviceEvents.selectAll((res) => {
        console.log('所有商品', res);
        this.gridData = res.data;
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
      console.log('所有', val);
      this.transfedata.goodsId = [];
      for (let i = 0; i < val.length; i++) {
        // this.transfedata.goodsId = val[i].id;
      }
      console.log('this.goodsId', this.transfedata.goodsId);
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
