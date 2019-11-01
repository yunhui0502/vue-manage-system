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



 <!-- <el-dialog title="上传图片"  :visible.sync="picOpen" :close-on-click-modal="false">
          <el-upload list-type="picture-card" ref="fileUpload"  action="" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :auto-upload="false">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <div slot="footer" class="dialog-footer">
            <el-button @click="picOpen = false">取消</el-button>
            <el-button type="primary" :loading="editLoading" @click="uploadFiles">提交</el-button>
          </div>
        </el-dialog>
 -->


          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-success="handleAvatarSuccess"
            :on-remove="handleRemove" style="margin-left:80px;">
            <i class="el-icon-plus"></i>
          </el-upload>

          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>




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
            <el-input v-model="address.hfProvince" title="市"></el-input>
             <span style="margin-left:120px;display: block;margin-top: -40px;">省</span>
          </el-col>
          <el-col :span="6" style="margin-left:35px;">
            <el-input v-model="address.hfCity"></el-input>
            <span style="margin-left:175px;margin-top: -40px;display: block;">市</span>
          </el-col>
          <el-col :span="6" style="margin-left:30px;">
            <el-input v-model="address.trees"></el-input>
            <span style="margin-left:160px;width: 60px;display:block;margin-top: -40px;">街道</span>
          </el-col>
        </el-form-item>
         <el-form-item label="具体地址" style="width:1360px;">
           <el-col :span="8">
             <el-input v-model="address.hfAddressDetail"></el-input>
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
        :data="arr"
        style="width: 100%"
        max-height="250">
        <el-table-column
          fixed
          prop="contact"
          label="联络人"
          width="150" align="center"  >
        </el-table-column>
        <el-table-column
          prop="hfAddressDetail"
          label="详细地址信息"
          width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="hfConty"
          label="城市"
          width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="hfDesc"
          label="国家"
          width="120" align="center">
        </el-table-column>
        <el-table-column
          prop="hfCity"
          label="备注"
          width="300" align="center">
        </el-table-column>
        <el-table-column
          prop="hfCity"
          label="省"
          width="120" align="center">
        </el-table-column>

        <el-table-column
          prop="hfDesc"
          label="手机号"
          width="120" align="center">
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="120" align="center">
          <template slot-scope="scope">
            <el-button
              @click="deleteRow(scope)"
              type="text"
              size="small">
              删除
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


  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }


</style>

<script>
import Axios from "axios";
import api from '@/apis/user-api.js';
export default {
  data() {
    return {
         dialogVisible:false,
         tableData: [{
                  date: '1',
                  name: '王小虎',
                  province: '上海',
                  city: '中国',
                  address: '上海市普陀区金沙江路 1518 弄',
                  zip: 15688108250,
                  zips: "河北"
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

        list:[],
        dialogImageUrl:"",
        id:1,

        dialogVisible: false,
         address1:1,
         address2:2,
        list:[],


        imageUrl: '',

      },
        collapse: false,

         rows:{
           id:1
         },


        address:{
          contact:"王博鹏",
          phoneNumber:"13837774547",
          hfConty:"中国",
          hfCity:"北京",
          hfProvince:"河北",
          trees:"上地七街",
          hfAddressDetail:"上地七街九头鸟"
        },
         lists:{
         token:1,
         userId:1
         },
        arr:[],
        arr1:[],

    }
  },

  created(){
     api.list(this.lists).then(res=>{
     this.arr=res.data.data

     console.log(res.data.data)


     })


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
         //头像上传
         handleAvatarSuccess:function(response, file, fileList){
          console.log(FileList)
          let fd=new FormData()

          fd.append("userId",1)
          this.list=fileList;

          fileList.forEach((item)=>{
          console.log(item,item.name)
           fd.append("fileInfo",item,item.name)
          })

          Axios.post("/user/user/update",fd,{
           reponseType:"arraybuffer"

          }).then(res=>{
                 console.log("上传图片",res)
          })

         },
          handleRemove(file, fileList) {
          console.log(file, fileList);
          },
          handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
          },




                deleteRow(index) {
                 console.log(index)
                 api.remove(index.row.id).then(res=>{
                   
                  this.$message({
                   message: '删除成功',
                   type: 'success',
                   });

                 })
                }
                ,


                message(){
                 this.dialogAddgsVisible = true;
                 },
                 add(){
                   this.dialogVisible = false
                   api.address(this.address).then(response=>{
                   console.log(response)

                   })
                 },

  }
}
</script>
