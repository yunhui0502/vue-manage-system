<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <el-button
          style="float: right;margin: 8px;"
          class="unification"
          @click="addGoodsSpecificationList"
          type="primary"
        >添加活动</el-button>
      </div>

      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column checked type="selection" width="55"></el-table-column>
        <el-table-column prop="iconName" label="名称">
          <!-- <template slot-scope="scope">
          </template>-->
        </el-table-column>
        <el-table-column label="活动类型" prop="activityType" width>
          <template slot-scope="scope">
            <img :src="'/api/api/product/goods/getFile?fileId='+scope.row.fileId"/>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editEvent(scope.row)" size="mini">编辑</el-button>
            <el-button class="ff3" type="text" @click="deleteEvent(scope.row.id)" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="添加" width="20%" :visible.sync="editboxVisible">
        <el-input v-model="form.iconName" placeholder="请输入名称"></el-input>
        <div class="upload">
          <!-- 上传图片 -->
          <el-upload
           ref="upload"
            action="/api/api/product/goods/addIconAndUrl"
            list-type="picture-card"
            multiple
            :data="form"
            name="file"
            :auto-upload="false"
            :limit="2"
            :file-list="fileList"
            :on-change="imgUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </div>
        <el-input v-model="form.url" placeholder="请输入URL"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editboxVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitUpload">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="编辑" width="20%" :visible.sync="dialogVisible">
        <el-input v-model="form.iconName" placeholder="请输入名称"></el-input>
        <div class="upload">
          <!-- 上传图片 -->
          <el-upload
           ref="upload"
            action="/api/api/product/goods/updateIconAndUrl"
            list-type="picture-card"
            multiple
            :data="form"
            name="file"
            :auto-upload="false"
            :limit="2"
            :file-list="fileList"
            :on-change="changeUpload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </div>
        <el-input v-model="form.url" placeholder="请输入URL"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible= false">取 消</el-button>
          <el-button type="primary" @click="compileUpload">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import serviceEvents from '@/service/eventsManage.js';
import store from '@/store';
export default {
  name: '',
  data() {
    return {
      form: {
        bossId: '',
        iconName: '',
        url: '',
        id: '',
      },
      tableData: [],
      fileList: [], // 图片
      dialogVisible: false,
      editboxVisible: false,
      ifUpload: false,
    };
  },
  created() {
    this.selectIconAndUrl();
  },
  methods: {
    changeUpload (file) {
      this.ifUpload = true;
    },
    compileUpload() {
      if (this.ifUpload) {
        this.$refs.upload.submit();
      } else {
        serviceEvents.updateIconAndUrl(this.form, () => {
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success',
          });
          this.dialogVisible = false;
          this.selectIconAndUrl();
        });
      }
    },
    // 编辑
    editEvent(row) {
      console.log(row.id);
      this.form.id = row.id;
      this.form.iconName = row.iconName;
      this.form.url = row.url;
      this.dialogVisible = true;
    },
    // 单个删除分类导航
    deleteEvent(id) {
      this.$confirm('此操作将会删除该活动, 是否继续?', '提示', {}).then(() => {
        console.log(id);
        serviceEvents.deleteIconAndUrl({id: id}, () => {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success',
          });
        });
        this.selectIconAndUrl();
      });
    },
    // 获取l分类导航列表
    selectIconAndUrl () {
      serviceEvents.selectIconAndUrl(store.getUser().BSid, (res) => {
        console.log('分类导航列表', res);
        this.tableData = res.data.data;
      });
    },
    submitUpload() {
      this.form.bossId = store.getUser().BSid;
      this.$refs.upload.submit();
      this.editboxVisible = false;
    },
    imgUpload(file) {
      let fileName = file.name;
      let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
      if (regex.test(fileName.toLowerCase())) {
        this.picUrl = URL.createObjectURL(file.raw);
      } else {
        this.$message.error('请选择图片文件');
      }
    },

    addGoodsSpecificationList() {
      this.editboxVisible = true;
    },

  },
};
</script>

<style lang="less" scoped>
.upload {
  padding: 10px;
  text-align: center;
}
</style>
