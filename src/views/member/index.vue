<template>
  <div class="member">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>会员管理</span>
      </div>
      <el-form :model="form" label-width="80px">
        <el-form-item label="套餐设置" style="marginLeft:50px">
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
              月卡
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <br>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-input v-model="form.month" placeholder="使用期限（月）"></el-input>
            </el-col>
            <el-form-item label="设置金额">
                <el-col :span="6">
                    <el-input v-model="form.money1" placeholder="请输入购买需要的金额（元）"></el-input>
                </el-col>
            </el-form-item>
          </el-row>
        </el-form-item>
      </el-form>

      <el-form :model="form" label-width="80px">
        <el-form-item label="充值活动" style="marginLeft:50px">
            <el-col :span="6">
              <el-input v-model="form.money2" placeholder="请输入金额"></el-input>
            </el-col>
            <el-form-item label="送" label-width='40px'>
                <el-col :span="6">
                    <el-input v-model="form.tiem1" placeholder="请输入会员时间（月）"></el-input>
                </el-col>
            </el-form-item>
        </el-form-item>
        <el-form-item label="    " style="marginLeft:50px">
            <el-col :span="6">
              <el-input v-model="form.money3" placeholder="请输入金额"></el-input>
            </el-col>
            <el-form-item label="送" label-width='40px'>
                <el-col :span="6">
                    <el-input v-model="form.time2" placeholder="请输入会员时间（月）"></el-input>
                </el-col>
            </el-form-item>
        </el-form-item>
      </el-form>

      <el-form :model="form" label-width="80px">
        <el-form-item label="    ">
            <el-link href="https://element.eleme.io" target="_blank" style="marginLeft:50px">新建</el-link>
        </el-form-item>
      </el-form>

      <el-row style="marginLeft:600px">
        <el-button type="primary" size="small">默认</el-button>
        <el-button  size="small">重置</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'member',
  data () {
    return {
      form: {
        month: '', // 使用期限
        money1: '', // 购买需要的金额
        money2: '', // 购买需要的金额
        money3: '', // 购买需要的金额
        time1: '', // 会员时间1
        time2: '' // 会员时间2
      }
    }
  },
  methods: {}
}
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #000;
}
.el-icon-arrow-down {
  font-size: 12px;
}

</style>
