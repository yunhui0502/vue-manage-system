<template>
  <div>
    <!-- ------------------------------------------------电子邮件编辑----------------------------------------------------------- -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>电子邮件</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="消息类型">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="标签说明">
          <!-- <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
          </el-select>-->
        </el-form-item>
        <el-form-item label="邮件标题">
          <el-input style="width:36%;" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="内容模板">
          <edito></edito>
        </el-form-item>
        <el-form-item>
          <el-button style="display:block;margin:0 auto;width:26%;" type="primary">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import edito from '@/components/components/edito.vue';
export default {
  components: { edito },
  name: '',
  data() {
    return {
      activeName: 'messages',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
    };
  },
};
</script>

<style lang="less" scoped>
.el-form-item {
  margin-bottom: 60px;

}
.el-form  {
padding-right: 230px;

}
</style>
