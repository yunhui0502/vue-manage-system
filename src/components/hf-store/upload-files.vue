<template>
  <el-form  :ref="form" :rules="rules" :model="form" label-width="110px" style="overflow: hidden;margin-left: 300px;margin-top: 30px">
      <el-col :span="12">
        <el-form-item label="印章类型：" prop="seal_type">
          <el-select v-model="form.seal_type" placeholder="请选择" @change="queryApprove">
            <el-option v-for="item in typeOptions" :key="item.Value" :label="item.Text" :value="item.Value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请理由：" prop="apply_reason">
          <el-input type="textarea" :rows="3" v-model.trim="form.apply_reason" placeholder="请输入申请理由"></el-input>
        </el-form-item>
        <el-form-item label="上传材料：" prop="files">
          <el-upload
            v-model="form.files"
            ref="upload"
            class="upload-poster"
            :limit='4'
            accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.GIF,.BMP"
            :action='uploadAction'
            list-type="picture-card"
            :show-file-list="true"
            :on-change="imgPreview"
            :http-request="uploadFile"
            :auto-upload="false">
            <i class="el-icon-plus"></i>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="picUrl" alt="">
            </el-dialog>
          </el-upload>
        </el-form-item>
        <el-form-item label="审批人：" prop="approve_person" >
          <el-select v-model="form.approve_person" placeholder="请选择" style="display: block">
            <el-option v-for="item in approveOptions" :key="item.PersonId" :label="item.Name" :value="item.PersonId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
        <el-button class="submit-button"  @click="submitUpload(form)">提交</el-button>
        </el-form-item>
      </el-col>
    </el-form>
</template>
<script>
export default {
  name: 'uploadFiles',
  props: ['goods'],
  data() {
    return {
      dialogVisible: false,
        picUrl:'',
        uploadForm: new FormData(),
        files: [],
        form: {
          files:[],
          seal_type:'',
          apply_reason:'',
          approve_person:'',
        },
    }
  },
  methods: {
    uploadAction() {
      console.log(this);
    },
     uploadFile(file) {
       this.files.append(file);
      },
      submitUpload(form) {
        if(this.files.length>0){
          this.$refs[form].validate((valid) => {
            if (valid) {
              // this.$refs.upload.submit();
              let fd = new FormData();
              fd.append('goodsId', 1);
              fd.append("username", 'ddd');
              fd.append("userId", 1);
              fd.append("requestId", "dsaaa");
              fd.append("token", 'sss');
              fd.append("timestamp", 'dd');
              fd.append('fileInfo', this.files[0]);
              fd.methods="POST";
              fd.enctype="multipart/form-data";
              console.log(fd);
              axios.post('api/goods/addPicture', fd, { responseType: 'arraybuffer' }).then(res => {
                console.log(res);
              });
            }else {
              return false;
            }
          })
        }else{
          this.$message({type: 'error', message: '请上传申请材料!'});
        }
      },
      imgPreview (file, fileList) {
        let fileName = file.name;
        let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
        if (regex.test(fileName.toLowerCase())) {
          this.picUrl = URL.createObjectURL(file.raw);
          this.form.files=fileList;
        } else {
          //移除最后一个元素
          fileList.pop();
          this.$message.error('请选择图片文件');
        }
      },
      

  }
}
</script>