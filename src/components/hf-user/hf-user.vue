<template>
<div>

  <el-row>
    <el-col :span="16" class="p50">
      <h3 style="margin-left:40px;margin-top: -20px;">基本信息管理</h3>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="昵称" style="margin-top: 20px;">
          <el-col :span="10">
            <el-input v-model="form.nickName" ></el-input>
          </el-col>
        </el-form-item>
        </el-form-item>

        <el-form-item label="名字"  >
          <el-col :span="10">
            <el-input v-model="form.realName"></el-input>
          </el-col>
        </el-form-item>

       <el-form-item label="注册电话" style="width:1780px;">
          <el-col :span="6">
            <el-input v-model="form.phone"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="设置邮箱" style="width:1360px;">
          <el-col :span="8">
            <el-input v-model="form.email"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="出生日期" style="width:720px;">
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
          <el-col :span="4"  >
            <el-input v-model="form.address" title="市"></el-input>
          </el-col>
          <el-col :span="6" style="margin-left: 20px;">
            <el-input v-model="form.address1"></el-input>
          </el-col>
          <el-col :span="8" style="margin-left: 20px;">
            <el-input v-model="form.address2"></el-input>
          </el-col>
        </el-form-item>

     <!--   <el-form>
          <el-form-item label="更换头像" style="margin-left:15px;">
            <el-col>
              <el-input type="file" v-model="form.avator"></el-input>
            </el-col>
          </el-form-item>
        </el-form> -->

        <el-upload
          class="upload-demo" style="margin-left:80px;"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary" style="margin-top:70px;">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>



        <el-form-item style="margin-top: 20px;">
          <el-button type="primary" :plain="true" @click="onSubmit()">更新信息</el-button>
          <el-button>取消更新</el-button>
        </el-form-item>
        <el-button type="primary" style="margin-left: 80px;" @click="dialogVisible = true">添加收货地址</el-button>


      </el-form>
    </el-col>
    <el-col :span="8" class="p50">
      <!-- <img src="https://avatars2.githubusercontent.com/u/20511539?s=460&v=4" width="300" height="300" class="head_pic" /> -->

    </el-col>







  </el-row>
  <h3 style="margin-left:40px;margin-top: 20px;">收货地址管理</h3>
  <br>

    <el-dialog
    title="确定收获地址"
    :visible.sync="dialogVisible"
    width="60%" align="center"
     >

 <el-row>
    <el-col :span="16" class="p50">

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="联系人" style="margin-top: 20px;">
          <el-col :span="10">
            <el-input v-model="address.contact" ></el-input>
          </el-col>
        </el-form-item>
        </el-form-item>

       <el-form-item label="电话号码" style="width:1780px;">
          <el-col :span="6">
            <el-input v-model="address.phoneNumber"></el-input>
          </el-col>
        </el-form-item>

        <el-form-item label="国家" style="width:1360px;">
          <el-col :span="8">
            <el-input v-model="address.hfConty"></el-input>
          </el-col>
        </el-form-item>


        <el-form-item label="现居地址">
          <el-col :span="4"  >
            <el-input v-model="address.address" title="市"></el-input>
             <span style="margin-left:120px;display: block;margin-top: -40px;">省</span>
          </el-col>
          <el-col :span="6" style="margin-left:35px;">
            <el-input v-model="address.address1"></el-input>
            <span style="margin-left:175px;margin-top: -40px;display: block;">市</span>
          </el-col>
          <el-col :span="6" style="margin-left:30px;">
            <el-input v-model="address.address2"></el-input>
            <span style="margin-left:160px;width: 60px;display:block;margin-top: -40px;">街道</span>
          </el-col>
        </el-form-item>
         <el-form-item label="具体地址" style="width:1360px;">
           <el-col :span="8">
             <el-input v-model="address.queryaddrss"></el-input>
           </el-col>
         </el-form-item>

      </el-form>
    </el-col>



  </el-row>



    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="add()">添加</el-button>
    </span>




    </el-dialog>

 <!-- <el-table :data="tableData">
 </el-table> -->
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="250">
        <el-table-column
          fixed
          prop="date"
          label="联络人"
          width="150" align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="详细地址信息"
          width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="province"
          label="城市"
          width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="city"
          label="国家"
          width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="address"
          label="备注"
          width="300" align="center">
        </el-table-column>
        <el-table-column
          prop="zip"
          label="省"
          width="120" align="center">
        </el-table-column>

        <el-table-column
          prop="zip"
          label="手机号"
          width="120" align="center">
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="120" align="center">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>


</div>



</template>

<style lang="scss">
.p50 {
  padding-top: 50px;
}
</style>

<script>
import api from '@/apis/user-api.js';
export default {
  data() {
    return {
         dialogVisible:false,
         tableData: [{
                  date: '2016-05-03',
                  name: '王小虎',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 20033312
                }, {
                  date: '2016-05-02',
                  name: '王小虎',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333
                }, {
                  date: '2016-05-04',
                  name: '王小虎',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333
                }, {
                  date: '2016-05-01',
                  name: '王小虎',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333
                }, {
                  date: '2016-05-08',
                  name: '王小虎',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333
                }, {
                  date: '2016-05-06',
                  name: '王小虎',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333
                }, {
                  date: '2016-05-07',
                  name: '王小虎',
                  province: '上海',
                  city: '普陀区',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 200333
                }],
       fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
      form: {
        address:"1",
        email:"1",
        nickName: '1',
        realName:"1",
        region: '中国',
        requestId:"1",
        sex:1,
        timestamp:"1",
        token:"1",
        username:"1",
        userId:"1",
        phone:"12313132132",
        birthDay:"2019-10-15",

        address1:"1",
        address2:"1",
        // address3:"1",
        // date1: '',
        // date2: '',
        // delivery: false,
        // type: [],
        // resource: '',
        // desc: '',
        // phone:"1",/

      },
        collapse: false,
        // tableData: []
        address:{
          contact:"helloworld",
          phoneNumber:"12313132123",
          hfConty:"中国",
          address:"北京市",
          address1:"海淀区千里千寻教育",
          address2:"上地七街",
          queryaddrss:"北京市海淀区千峰教育"
        }
    }
  },
  methods: {
    onSubmit() {
       api.update(this.form).then(response => {
          console.log(response.data)
          if(response.data.status==200){
            this.$message({
             message: '用户更新成功',
             type: 'success',
             });
          }else{
            this.$message({
             message: '用户更新失败',
             type: 'success',
             });
              }
          });
        },
          handleRemove(file, fileList) {
            console.log(file, fileList);
          },

          handlePreview(file) {
            console.log(file);
          },

          handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
          },

          beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
          },
           deleteRow(index, rows) {
                  rows.splice(index, 1);
                }
                ,
                 message(){
                    this.dialogAddgsVisible = true;
                 },
                 add(){
                   api.address(this.address).then(response=>{
                     console.log(response)
                   })
                 }
  }
}
</script>
