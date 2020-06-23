<template>
  <div>
    <!-- ------------------------------------------------手机短信编辑----------------------------------------------------------- -->
    <el-table :data="tableData" stripe style="width: 100%">
      <!-- <el-table-column
        prop="date"
        label="邮件标题">
      </el-table-column>
      <el-table-column
        prop="templateParam"
        label="模板参数">
      </el-table-column>-->
      <el-table-column prop="content" label="内容模板" show-overflow-tooltip>

      </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status==1" type="text" size="small">未审核</el-button>
          <el-button v-if="scope.row.status==2" type="text" size="small">同意</el-button>
          <el-button
            v-if="scope.row.status==3"
            @click="open(scope.row)"
            type="text"
            size="small"
          >拒绝</el-button>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.isDeleted==0"
            @click="handleClick(scope.row)"
            type="text"
            size="small"
          >选择</el-button>
          <el-button v-if="scope.row.isDeleted==1" type="text" size="small">已选择</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-card style="margin-top: 20px;" class="box-card">
      <div slot="header" class="clearfix">
        <span>手机短信</span>
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
        <el-form-item label="短信内容">
          <el-input :rows="8" type="textarea" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="addTemplateMessage"
            style="display:block;margin:0 auto;width:26%;"
            type="primary"
          >保存</el-button>
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
      tableData: [],
      activeName: 'messages',
      form: {
        content: '',
      },
    };
  },
  created() {
    // console.log(this.$route.query);
    this.getTemplateParam();
    this.getMessageInstanceList();
  },
  methods: {
    open(row) {
      this.$alert('这是一段内容', '拒绝原因', {
        // confirmButtonText: '确定',
        callback: (action) => {
          this.$message({
            type: 'info',
            message: `action: ${action}`,
          });
        },
      });
    },
    handleClick(row) {
      console.log(row.status);
      // eslint-disable-next-line no-magic-numbers
      if (row.status === 1 || row.status === 3) {
        this.$message.error('请选择审核通过的模板');
      } else {
        let params = {
          contentType: this.$route.query.Type,
          id: row.id,
          messageType: 'shortBreath',
        };
        news.updateMessageInstance(params, (res) => {
          this.getMessageInstanceList();
        });
      }
    },
    getMessageInstanceList() {
      let params = {
        contentType: this.$route.query.Type,
        messageType: 'shortBreath',
      };
      news.getMessageInstanceList(params, (res) => {
        console.log(res.data.data);
        this.tableData = res.data.data;
      });
    },
    clicklabel(e) {
      console.log(e);

      this.form.content = this.form.content + e.name + ':' + e.paramName;
    },
    addTemplateMessage() {
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
  opacity: 0;
}
.span {
  margin: 10px;
}
/deep/.el-table th > .cell {
  text-align: center;
}
/deep/.el-table .cell {
  text-align: center;
}
</style>
