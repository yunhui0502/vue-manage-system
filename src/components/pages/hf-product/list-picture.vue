<template>
<div>
  <el-form>
    <el-form-item>
      <el-upload ref="upload" action="/as" multiple :http-request="handleUpload" :auto-upload="false" :limit="20">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handlePush">发布</el-button>
    </el-form-item>
  </el-form>

</div>
</template>

<script>
import axios from 'axios';
import {
  mapGetters,
} from 'vuex';
export default {
  data() {
    return {
      files: [],
    };
  },
  computed: {
    ...mapGetters([
      'taxno',
      'username',
    ]),
  },
  methods: {
    handleUpload(raw) {
      this.files.push(raw.file);
    },
    async handlePush() {
      this.$refs.upload.submit(); // 这里是执行文件上传的函数，其实也就是获取我们要上传的文件
      let fd = new FormData();
      fd.append('operator', this.username);
      fd.append('reimment', '倪楚楚');
      fd.append('deptname', '技术部');
      fd.append('taxno', this.taxno);
      this.files.forEach(function (file) {
        fd.append('file', file, file.name); // 因为要上传多个文件，所以需要遍历一下才行
        // 不要直接使用我们的文件数组进行上传，你会发现传给后台的是两个Object
      });
      axios.post(process.env.BASE_API + '/file/moreFileUpload', fd).then((res) => {
        if (res.data.status === 'OK') {
          console.log(res);
        }
      });
    },
  },
};
</script>
