<template>
<div>
  <div class="pagepath">

  </div>
  <div>
    <div>详情页</div>
    <div>
      <el-form>
        <el-form-item label="上传banner" prop="logo"> <span>支持扩展名：.png \ .jpg \ .jpeg；文件大小为：1920*676 px</span>
          <el-upload class="avatar-uploader" ref="upload" accept="image/png,image/jpg,image/jpeg" action="/as" multiple :show-file-list="true" :http-request="handleUpload" :auto-upload="false" :limit="20">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handlePush">发布</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  <img  ref="selectlogoPictureImg" :src="updateFiles(38)"  />
  <!-- <div :v-for="(item, index) in fileIds">
    <img :src="fileIds" />
  </div> --> 
</div>
</template>

<style>

</style>

<script>
import axios from 'axios';
import {
  mapGetters
} from 'vuex';
export default {
  name: 'testIndex',
  methods: {
    handleUpload(raw) {
      this.files.push(raw.file);
    },
    async handlePush() {
      this.$refs.upload.submit();
      let fd = new FormData();
      fd.append('goodsId', 1);
      fd.append('pictureName', "ddd");
      fd.append("prictureDesc", 'sss');
      fd.append("username", 'ddd');
      fd.append("userId", 1);
      fd.append("requestId", "dsaaa");
      fd.append("token", 'sss');
      fd.append("timestamp", 'dd');
      this.files.forEach(function (file) {
        fd.append('fileInfo', file, file.name);
      });
      axios.post('api/goods/addPicture', fd, { responseType: 'arraybuffer' }).then(res => {
        console.log(res);
      });
    },
    updateFiles(fileId) {
      axios.get('api/goods/getFile', {
        params: {
          'fileId': fileId
        },
        responseType: 'arraybuffer'
      }).then(res => {
        console.log(res);
        return res.data
      }).then(data => {
        console.log(data);
        data = 'data:image/png;base64,' + btoa(new Uint8Array(data.data).reduce((item, byte) => item + String.fromCharCode(byte), ''))
        console.log(this);
        this.$refs.selectlogoPictureImg.src = data;
      });
    }
  },
  computed: {
    ...mapGetters(['taxno', 'username'])
  },
  data() {
    return {
      files: [],
      fileIds: []
    }
  },
  init() {
    Vue.component('element-block', {
      template: '<div>子组件</div>'
    });
  }
}
</script>
