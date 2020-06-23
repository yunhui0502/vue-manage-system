<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>消息提醒</span>
      </div>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="Type" label="消息类型"></el-table-column>
        <el-table-column prop="name" label="电子邮件">
          <template slot-scope="scope">
            <el-link @click="dialog(scope)" type="info">是否发送</el-link>
            <el-link @click="hreftwo('电子邮件',scope)" type="primary">编辑内容</el-link>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="name" label="站内消息">
          <el-link  @click="dialogVisible = true" type="info">是否发送</el-link>
          <el-link  @click="hreftwo('站内消息')" type="primary">编辑内容</el-link>
        </el-table-column>-->
        <el-table-column prop="address" label="手机短信">
          <template slot-scope="scope">
            <el-link @click="dialog(scope)" type="info">是否发送</el-link>
            <el-link @click="hreftwo('手机短信',scope)" type="primary">编辑内容</el-link>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="address" label="APP推送消息">
          <el-link @click="dialogVisible = true" type="info">是否发送</el-link>
          <el-link @click="hreftwo('APP推送消息')" type="primary">编辑内容</el-link>
        </el-table-column>-->
      </el-table>
    </el-card>
    <!-- ----------------------------------公告------------------------------------------------------- -->
    <el-card class="box-card">
      <div id="box">
        <ul id="con1" ref="con1" :class="{anim:animate==true}">
          <li v-for="(item,i) in items" :key="i">{{item.content}}</li>
        </ul>
      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="4">
            <el-input placeholder="请输入搜索内容" v-model="input" clearable></el-input>
          </el-col>
        </el-row>

        <el-row style="margin-top: 10px;" :gutter="20">
          <el-col :span="12">
            <el-input v-model="content" placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :span="12">
            <el-button @click="addAnnouncement" type="primary" round>添加公告</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-dialog title="是否开启" :visible.sync="dialogVisible" width="30%">
      <el-switch @change="switchChange" name="1" v-model="value1" active-text="是" inactive-text="否"></el-switch>
    </el-dialog>
  </div>
</template>

<script>
import news from '@/service/news.js';
import store from '@/store';
export default {
  name: '',
  data() {
    return {
      content: '',
      input: '',
      animate: false,
      items: [],

      dialogVisible: false,
      value1: true,
      value1ID: '',
      tableData: [],
      messageType: [],
    };
  },
  created() {
    this.getAnnouncement();
    this.getMessageContentType();
    // eslint-disable-next-line no-magic-numbers
    setInterval(this.scroll, 1000);
  },
  methods: {
    // 公告
    scroll() {
      this.animate = true; // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
      setTimeout(() => {
        //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
        this.items.push(this.items[0]); // 将数组的第一个元素添加到数组的
        this.items.shift(); // 删除数组的第一个元素
        this.animate = false; // margin-top 为0 的时候取消过渡动画，实现无缝滚动
        // eslint-disable-next-line no-magic-numbers
      }, 500);
    },
    addAnnouncement(e) {
      let params = {
        content: this.content,
        userId: store.getUser().id,
      };
      news.addAnnouncement(params, (res) => {
        console.log(res);
        this.$message({
          message: '添加公告成功',
          type: 'success',
        });
        this.dialogVisible = false;
      });
    },
    getAnnouncement(e) {
      news.getAnnouncement((res) => {
        console.log('公告', res);
        this.items = res.data.data;
      });
    },
    // --------------------------------------------------------------------------------
    switchChange(e) {
      console.log(e);
      console.log(this.value1ID);
      let params = {
        id: this.value1ID,
      };
      if (e === false) {
        params.isUse = 0;
      } else {
        params.isUse = 1;
      }
      news.updateIsUse(params, (res) => {
        console.log(res);
        this.$message({
          message: '操作成功',
          type: 'success',
        });
        this.dialogVisible = false;
      });
    },
    dialog(scope) {
      console.log(scope);
      let params = {
        contentType: scope.row.Type,
      };
      if (scope.column.label === '电子邮件') {
        params.messageType = 'email';
      } else {
        params.messageType = 'shortBreath';
      }
      news.getMessageContent(params, (res) => {
        console.log(res);
        this.value1ID = res.data.data.id;
        this.dialogVisible = true;
      });
    },
    getMessageContentType() {
      news.getMessageContentType((res) => {
        console.log(res);
        // this.tableData = res.data.data.contentObject;
        let data = res.data.data;
        this.tableData = data.map((item) => ({ Type: item }));
        console.log(this.tableData);
      });
    },
    hreftwo(e, row) {
      console.log(row);
      let Type = row.row.Type;
      // console.log(Type);
      if (e === '手机短信') {
        this.$router.push({ path: '/news/phone', query: { Type: Type } });
      } else if (e === '电子邮件') {
        this.$router.push({ path: '/news/email', query: { Type: Type } });
      } else {
        this.$router.push({ path: '*' });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cell {
  a:nth-child(2) {
    margin-left: 10px;
  }
}

// 公告
*{
    margin: 0 ;
    padding: 0;
}
#box{
  width: 300px;
  height: 32px;
  overflow: hidden;
  padding-left: 30px;
  // border: 1px solid black;
}
.anim{
  transition: all 0.8s;
  margin-top: -30px;
}
#con1 li{
  list-style: none;
  line-height: 30px;
  height: 30px;
}
</style>
