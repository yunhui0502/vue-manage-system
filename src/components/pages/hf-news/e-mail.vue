<template>
  <div>
    <!-- ------------------------------------------------电子邮件编辑----------------------------------------------------------- -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>电子邮件</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="消息类型">
          <span>{{this.$route.query.Type}}</span>
        </el-form-item>
        <el-form-item label="标签说明">
          <div style="display:flex;flex-wrap: wrap;justify-content : space-between;width=100%">
            <div @click="clicklabel(item)" v-for="item in list" :key="item.id">
              <span>{{item.name}}</span>
              <span class="span">:</span>
              <span>{{item.paramName}}</span>
            </div>
            <div class="item holder" v-for="i in holder" :key="i"></div>
          </div>
        </el-form-item>
        <el-form-item label="邮件标题">
          <el-input style="width:36%;" v-model="form.subject"></el-input>
        </el-form-item>
        <el-form-item label="内容模板">
          <edito :catchData="catchData" :val="val"></edito>
        </el-form-item>
        <el-form-item>
          <el-button @click="addTemplateMessage" style="display:block;margin:0 auto;width:26%;" type="primary">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import store from '@/store';
import news from '@/service/news.js';
import edito from '@/components/components/edito.vue';
export default {
  components: { edito },
  name: '',
  data() {
    return {
      activeName: 'messages',
      val: '',
      list: [],
      form: {
        subject: '',
        content: '',
      },
    };
  },
  methods: {
    catchData(value) {
      this.form.content = value; // 在这里接受子组件传过来的参数，赋值给data里的参数
      this.form.content = encodeURI(
        this.form.content
          .replace(/&quot;|&#39;|&lt;|&gt;/g, '‘')
          .replace(/&nbsp;/g, '')
          .replace(/《/g, '《')
          .replace(/》/g, '》'),
      );
      console.log('this.form.content', this.form.content);
      console.log('value', value);
    },

    clicklabel(e) {
      console.log(e);

      this.val = this.form.content + e.name + ':' + e.paramName;
    },
    addTemplateMessage() {
      let params = {
        type: 2,
        bossId: store.getUser().BSid,
        content: this.form.content,
        contentType: this.$route.query.Type,
        messageType: 'shortBreath',
        subject: this.form.subject,
      };
      news.addTemplateMessage(params, (res) => {
        console.log(res.data.data);
        this.$message({
          message: '保存成功',
          type: 'success',
        });
      });
    },
    holder() {
      // eslint-disable-next-line no-magic-numbers
      return 4 - (this.list.length % 4);
    },
    getTemplateParam() {
      let params = {
        type: this.$route.query.Type,
      };
      news.getTemplateParam(params, (res) => {
        console.log(res.data.data);
        this.list = res.data.data;
      });
    },
  },
  created() {
    // console.log(this.$route.query);
    this.getTemplateParam();
  },
};
</script>

<style lang="less" scoped>
.el-form-item {
  margin-bottom: 60px;
}
.el-form {
  padding-right: 230px;
}
.holder {
  opacity: 0;
}
</style>
