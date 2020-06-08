<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="部门管理" name="first">
        <el-card class="box-card">
          <div class="text item">用户管理</div>
        </el-card>
      </el-tab-pane>
      <!-- ---------------------------------------------------------------------------------------------------------------- -->
      <el-tab-pane label="成员管理" name="second">
        <el-card class="box-card">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="当前部门">
              <el-select v-model="formInline.region" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="当前成员">
              <el-select v-model="formInline.region1" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="当前角色">
              <el-select @change="determine2" v-model="formInline.rId" placeholder="请选择">
               <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.roleName"
                :value="item.id"
              ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">添加角色</el-button>
            </el-form-item>
          </el-form>

          <el-row :gutter="20">
            <el-col :span="2">
              <h5 style="margin-block-end:0;margin-block-start:0; ">商品管理</h5>
            </el-col>
            <el-col :span="16">
              <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
              >全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox  @change="handleCheckedCitiesChange3(city.id)" border v-for="city in cities" :label="city.id" :key="city.id">{{city.hfModel}}</el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-row>
          <!-- 模块下的权限 -->
          <el-row :gutter="20">
            <el-col :span="2">
              <h5 style="margin-block-end:0;margin-block-start:0; ">商品管理</h5>
            </el-col>
            <el-col :span="16">
              <el-checkbox
                :indeterminate="isIndeterminate2"
                v-model="checkAll2"
                @change="handleCheckAllChange2"
              >全选</el-checkbox>
              <div style="margin: 15px 0;"></div>
              <el-checkbox-group v-model="checkedCities2" @change="handleCheckedCitiesChange2">
                <el-checkbox border v-for="city in cities2" :label="city.id" :key="city.id">{{city.jurisdictionName}}</el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-row>
           <!-- <el-button style="display:block;margin:0 auto" type="primary" plain>保存</el-button> -->
        </el-card>
      </el-tab-pane>
      <!-- -------------------------------------------------------------------------------------------------------------- -->
      <el-tab-pane label="客服管理" name="third">
        <el-card class="box-card">
          <div class="text item">角色管理</div>
        </el-card>
      </el-tab-pane>
      <!-- -------------------------------------------------------------------------------------------------------------------- -->
      <el-tab-pane label="数据库管理" name="fourth">
        <el-card class="box-card">
          <div class="text item">定时任务补偿</div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import store from '@/store';
import juris from '@/service/jurisdiction.js';
export default {
  name: '',
  data() {
    return {
      Selected: [],
      roleList: [], // 角色列表
      activeName: 'second',
      checkAll: false,
      checkedCities: [],
      cityOptions: '',
      cities: '',
      isIndeterminate: true,
      checkAll2: false,
      checkedCities2: [],
      cityOptions2: '',
      cities2: '',
      isIndeterminate2: true,
      formInline: {
        region: '',
        region1: '',
        rId: '',
      },
    };
  },
  created () {
    this.determine();
    this.findAdminHasModel();
  },
  methods: {
    enter (e) {
      console.log('进入', e);
    },
    determine2() {

      let params = {
        id: store.getUser().accountId,
        rId: this.formInline.rId,
      };
      juris.findAdminHasModel(params, (res) => {
        console.log('角色下已选择模块', res.data.data);
        let data = res.data.data;
        this.checkedCities = [];
        for (var i = 0;i < data.length;i++) {
          this.checkedCities.push(data[i].id);
          // console.log(data[i].id);
        }
      });
    },
    determine() {
      juris.selectRole((res) => {
        console.log('角色', res);
        this.roleList = res.data.data;
      });
    },
    findAdminHasModel () {
      let id = store.getUser().accountId;
      juris.findAdminHasModel({id: id}, (res) => {
        console.log('模块', res);
        this.cities = res.data.data;
        this.cityOptions = res.data.data;
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleCheckAllChange(val) {
      console.log(val);

      if (val) {
        let data = this.cityOptions;
        for (var i = 0;i < data.length;i++) {
          this.Selected.push(data[i].id);
          // console.log(data[i].id);
        }
      }
      this.checkedCities = val ? this.Selected : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange3(value) {
      console.log('handleCheckedCitiesChange3', value);
      let params = {
        modelId: value,
        roleId: this.formInline.rId,
      };
      juris.roleDeleteModel(params, (res) => {
        console.log('取消模块', res);

      });
    },
    handleCheckedCitiesChange(value) {
      console.log(value);
      let checkedCount = value.length;
      let i = value.length - 1;
      // console.log(i);
      let params = {
        modelId: value[i],
        id: store.getUser().accountId,
      };
      juris.findAdminHasJusInModel(params, (res) => {
        console.log('模块下权限', res);
        this.cities2 = res.data.data;
        this.cityOptions2 = res.data.data;
      });

      if (this.formInline.rId !== '') {
        let selected = {
          modelId: value[i],
          id: store.getUser().accountId,
          rId: this.formInline.rId,
          roleId: this.formInline.rId, // 绑定模块
        };
        juris.findAdminHasJusInModel(selected, (res) => {
          console.log('模块下选中的权限', res);
          let data = res.data.data;
          this.checkedCities2 = [];
          for (var i = 0;i < data.length;i++) {
            this.checkedCities2.push(data[i].id);
          // console.log(data[i].id);
          }
        });

        juris.roleAddModel(selected, (res) => {
          console.log('绑定模块', res);
          let data = res.data.data;
          this.checkedCities2 = [];
          for (var i = 0;i < data.length;i++) {
            this.checkedCities2.push(data[i].id);
          // console.log(data[i].id);
          }
        });
      }
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    handleCheckAllChange2(val) {
      this.checkedCities2 = val ? this.cityOptions2 : [];
      this.isIndeterminate2 = false;
    },
    handleCheckedCitiesChange2(value) {
      console.log(value);
      let checkedCount = value.length;
      this.checkAll2 = checkedCount === this.cities2.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities2.length;
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.is-bordered {
  margin-left: 0 !important;
  margin-bottom: 40px;
}
</style>
