<template>
<div>
  <el-row>
    <el-col :span="16" class="p50">
      <h3>基本信息管理</h3>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="昵称">
          <el-col :span="10">
            <el-input v-model="form.nickName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="用户名">
          <el-col :span="8">
            <el-input v-model="form.username"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="姓名">
          <el-col :span="10">
            <el-input v-model="form.realName"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="注册电话">
          <el-col :span="6">
            <el-input v-model="form.phone"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="设置邮箱">
          <el-col :span="8">
            <el-input v-model="form.email"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="出生日期">
          <el-col :span="16">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.birthDay" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="现居地址">
          <el-col :span="4">
            <el-input v-model="form.address1"></el-input>
          </el-col>
          <el-col :span="6">
            <el-input v-model="form.address2"></el-input>
          </el-col>
          <el-col :span="8">
            <el-input v-model="form.address3"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">更新信息</el-button>
          <el-button>取消更新</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="8" class="p50">
      <img src="https://avatars2.githubusercontent.com/u/20511539?s=460&v=4" width="300" height="300" class="head_pic" />
      <el-form>
        <el-form-item label="更换头像">
          <el-col>
            <el-input type="file" v-model="form.avator"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
  <h3>收货地址管理</h3>
  <el-table :data="tableData">
    <el-table-column label="品牌id"></el-table-column>
  </el-table>
</div>
</template>

<style lang="scss">
.p50 {
  padding-top: 50px;
}
</style>

<script>
export default {
  data() {
    return {
      form: {
        nickName: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      collapse: false,
      tableData: []
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>
