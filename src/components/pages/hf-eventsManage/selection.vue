<template>
  <!---------------------------------- 精选 -------------------------------------------------- -->
  <el-container>
    <el-container>
      <el-aside class="abc" width="380px">
        <div style="margin: 6px;">精选活动列表</div>

        <el-input placeholder="请输入内容排行名称" v-model="groupform.seniorityName" clearable></el-input>
        <!-- 上传图片 -->
        <div style="text-align: center;">
          <el-button @click="addGcommodity" type="success">添加</el-button>
       </div>
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


        <div style="margin-top: 16px;">
          <div style="margin: 10px;">绑定商品</div>
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
        </div>
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
  </el-container>
</template>

<script>
import store from '@/store';
import serviceEvents from '@/service/eventsManage.js';
export default {
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
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
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
