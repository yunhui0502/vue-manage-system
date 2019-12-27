<template>
  <div class="member">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>会员管理</span>
      </div>
      <el-form :inline="true" :model="form" style="margin-bottom: 60px" label-width="80px">
        <el-form-item label="套餐设置" style="marginLeft:50px">
          <el-dropdown style="margin-left:20px" @command="handleCommand">
            <span class="el-dropdown-link">
              {{membershipCard}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="月卡">月卡</el-dropdown-item>
              <el-dropdown-item command="季卡">季卡</el-dropdown-item>
              <el-dropdown-item command="年卡">年卡</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <br />
        </el-form-item>
         <br />
          <el-form-item style="margin-left:135px">
            <el-input v-model="form.month"  placeholder="使用期限（月）"></el-input>
          </el-form-item>
          <el-form-item label="设置金额">
            <el-input v-model="form.money1" placeholder="请输入购买需要的金额（元）"></el-input>
          </el-form-item>

      </el-form>

      <el-form :inline="true" :model="form" label-width="80px">
        <el-form-item label="充值活动" style="marginLeft:50px">
          <el-form-item>
            <el-input v-model="form.money2" placeholder="请输入金额"></el-input>
          </el-form-item>
          <el-form-item label="送" label-width="40px">
              <el-input v-model="form.tiem1" placeholder="请输入会员时间（月）"></el-input>
          </el-form-item>
        </el-form-item>
        <br/>
        <el-form-item label="" style="marginLeft:50px;margin-left:130px">
            <el-input v-model="form.money3" placeholder="请输入金额"></el-input>
          </el-form-item>
          <el-form-item label="送" label-width="40px">
              <el-input v-model="form.time2" placeholder="请输入会员时间（月）"></el-input>
          </el-form-item>

      </el-form>

      <el-form :model="form" label-width="80px">
        <el-form-item label="    ">
          <el-link href="https://element.eleme.io" target="_blank" style="marginLeft:50px">新建</el-link>
        </el-form-item>
      </el-form>

      <el-row style="marginLeft:600px">
        <el-button type="primary" size="small">确认</el-button>
        <el-button size="small">重置</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'member',
  data () {
    return {
      // 年卡月卡
      membershipCard: '月卡',
      form: {
        month: '1', // 使用期限
        money1: '', // 购买需要的金额
        money2: '', // 购买需要的金额
        money3: '', // 购买需要的金额
        time1: '', // 会员时间1
        time2: '' // 会员时间2
      }
    }
  },
  methods: {
    handleCommand (command) {
      // this.$message('click on item ' + command)
      console.log(this.month)
      this.membershipCard = command
      if (command === '月卡') {
        this.form.month = 1
      } else if (command === '季卡') {
        this.form.month = 3
      } else {
        this.form.month = 12
      }
    }
  },
  computed: {

  }
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
.el-form {
  margin-left: 197px;
}
</style>
