<template>
  <div>
    <!-- ------------------------------------------------手机短信编辑----------------------------------------------------------- -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>手机短信</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="消息类型">
          <span>{{this.$route.query.Type}}</span>
        </el-form-item>
        <el-form-item  label="标签说明">
          <div style="display:flex;flex-wrap: wrap;justify-content : space-between;width=100%">
            <div @click="clicklabel(item)" v-for="item in list" :key="item.id">
              <span>{{item.name}}</span>
              <span class="span">:</span>
              <span>{{item.paramName}}</span>
            </div>
            <div class="item holder" v-for="i in holder" :key="i">

            </div>
          </div>
        </el-form-item>
        <el-form-item label="短信内容">
          <el-input :rows="8" type="textarea" v-model="form.content"></el-input>
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
export default {
  name: '',
  data() {
    return {
      list: [],
      activeName: 'messages',
      form: {
        content: '',
      },
    };
  },
  created() {
    // console.log(this.$route.query);
    this.getTemplateParam();
  },
  methods: {
    clicklabel (e) {
      console.log(e);
      this.form.content = this.form.content + e.name + ':' + e.paramName;
    },
    addTemplateMessage () {
      let params = {
        type: 2,
        bossId: store.getUser().BSid,
        content: this.form.content,
        contentType: this.$route.query.Type,
        messageType: 'shortBreath',
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
  opacity:0
}
.span {
  margin: 10px;
}
</style>
