<template>
  <!---------------------------------- 精选 -------------------------------------------------- -->
  <el-container>
    <el-container>
      <el-aside class="abc" width="380px">
        <div>精选活动列表</div>

        <el-input placeholder="请输入内容排行名称" v-model="groupform.seniorityName" clearable></el-input>
        <!-- 上传图片 -->
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>

        <el-button @click="addGcommodity" type="success">添加</el-button>
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
          <el-table-column label="ID" width="120">
            <template slot-scope="scope">{{ scope.row.id }}</template>
          </el-table-column>
          <el-table-column label="榜名单" width="120">
            <template slot-scope="scope">{{ scope.row.seniorityName}}</template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="120"></el-table-column>
          <el-table-column prop="modifityTime" label="修改时间" show-overflow-tooltip></el-table-column>
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
import store from '@/store';
import serviceEvents from '@/service/eventsManage.js';
export default {
  data() {
    return {
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
      dialogImageUrl: '', // 添加图片上的
      dialogVisible: false, // 添加图片上的
      // 表单
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
    // 查询排行相关信息
    getselect() {
      serviceEvents.seniorityfindSeniorityInfo((res) => {
        console.log('精选商品', res.data);
        this.tableData = res.data.data;
      });
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
        serviceEvents.seniorityDelete(seniorityId, () => {
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
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
</style>
