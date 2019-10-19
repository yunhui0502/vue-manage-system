<template>
  <div class="table">
    <!-- 页面表格begin -->
    <div class="crumbs">
      <!-- 页面标题begin -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-tickets"></i> 角色资源管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 页面标题end-->
    <div style="background: #f0f0f0;">
      <el-form style="background: #fff;padding: 20px;padding-top: 30px;" :inline="true" :model="editRow" label-width="80px"
        :rules="bianaddFormRules" ref="bianinfoForms">
        <el-form-item label="店铺名称" prop="hfName">
          <el-input v-model="editRow.hfName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺描述" prop="hfDesc" label-width="150px">
          <el-input v-model="editRow.hfDesc" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺状态 (输入0为营业状态/1未营业状态)" prop="hfStatus" label-width="300px">
          <el-input v-model="editRow.hfStatus" auto-complete="off"></el-input>
        </el-form-item>
        <el-button type="primary" @click="bianSubmit" :loading="addLoading">提交</el-button>
      </el-form>

      <!-- 页面内容区begin -->
      <div id="app" style="padding: 20px;background: #fff; margin-top: 10px;">
        <div style=" width:98%;float:left;">

          <el-form :model="ruletable" ref="infoForms" :inline="true" :rules="addRules" style="margin-bottom: 20px;">
            <el-form-item prop="positionName" label-width="200px" :show-overflow-tooltip="true">
              <el style="display: flex;">

                <el-form-item prop="productId" label-width="200px" label="输入商品编号添加店铺物品:">
                  <el-input auto-complete="off" v-model="ruletable.productId"></el-input>
                </el-form-item>
                <el-button style="margin-left: 10px;" @click="addGoods">添加</el-button>
              </el>
            </el-form-item>
          </el-form>

          <el-dialog title="编辑" :visible.sync="editFormVisiblebian" :close-on-click-modal="false">
            <el-form :inline="true" :model="bianrow" label-width="80px" :rules="bianRules" ref="bianForm">
              <el-form-item label="物品名称" prop="goodName">
                <el-input v-model="bianrow.goodName" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="物品描述" prop="goodsDesc">
                <el-input v-model="bianrow.goodsDesc" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="物品分类">
                <el-select v-model="value4" placeholder="请选择" @change="changeQuentitySubject1(index)">
                  <el-option v-for="(item,index) in leiMu" :key="index" :label="item.hfName" :value="item.hfName">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="库存数量" prop="goodsDesc">
                <el-input v-model="bianrow.quantity" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="价格" prop="goodsDesc">
                <el-input v-model="bianrow.sellPrice" auto-complete="off"></el-input>
              </el-form-item>
              <div style="display: flex;align-items: center;">
                <div style="margin: 15px 0;margin-right: 15px;">物品规格:</div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange"  label="">
                  <el-checkbox v-for="city in cities" :label="city" :key="city">{{city.specValue}}</el-checkbox>
                </el-checkbox-group>
              </div>



            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editFormVisiblebian=false">取消</el-button>
              <el-button type="primary" @click="bianjiSubmit" :loading="addLoading">提交</el-button>
            </div>
          </el-dialog>
          <template>
            <!--表格数据及操作-->
            <el-table :data="resultData" highlight-current-row border ref="multipleTable" style="margin-bottom: 40px;"
              tooltip-effect="dark" v-loading="listLoading">

              <el-table-column label="物品id" align="center" prop="id">
              </el-table-column>
              <el-table-column prop="goodName" label="物品名称" align="center">
              </el-table-column>
              <el-table-column prop="goodsDesc" label="物品描述" align="center">
              </el-table-column>
              <el-table-column prop="productCategoryName" label="物品类目" align="center">
              </el-table-column>
              <el-table-column prop="quantity" label="库存数量" align="center">
              </el-table-column>
              <el-table-column prop="sellPrice" label="价格" align="center">
              </el-table-column>
              <!--   <el-table-column prop="specValue" label="规格" align="center">
            </el-table-column> -->

              <el-table-column label="物品图片" align="center">
                <template slot-scope="scope">
                  　　　　<img src="https://img2018.cnblogs.com/blog/1170749/201810/1170749-20181011114946113-918123992.png"
                    width="40" height="40" class="head_pic" />
                  　　</template>
              </el-table-column>
              <el-table-column label="操作" align="center" width="270px">
                <template slot-scope="scope">
                  <el-button size="small" @click="deletegoods(scope.row)">删除</el-button>
                  <el-button size="small" @click="bianji(scope.row)">编辑</el-button>
                  <el-button size="small" @click="upLoadPic(scope.row)">上传图片</el-button>
                </template>
              </el-table-column>
            </el-table>

          </template>
          <!--分页条total, sizes, prev, pager, next, jumper-->
          <el-pagination @size-change="handleSizeChange" @current-change="getResult" :current-page="currentPage"
            :page-size="pageSize" layout="total, prev, pager, next" :total="roletotal">
          </el-pagination>
        </div>

      </div>
    </div>
    <!-- 页面内容区end-->
    <!-- 上传图片 -->
    <el-dialog title="上传图片" :visible.sync="picOpen" :close-on-click-modal="false">
      <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-success="handleAvatarSuccess"
        :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <div slot="footer" class="dialog-footer">
        <el-button @click="picOpen = false">取消</el-button>
        <el-button type="primary" @click="add" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
  </div>
  <!-- 页面表格end -->
</template>
<script>
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
    data() {
      return {

        checkAll: false,
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
        isIndeterminate: true,
        bianaddFormRules: {
          goodName: [{
            required: true,
            message: "请输入规格名称",
            trigger: "blur"
          }],
          hfDesc: [{
            required: true,
            message: "请输入规格描述",
            trigger: "blur"
          }],
          hfStatus: [{
            required: true,
            message: "请输入规格状态",
            trigger: "blur"
          }]

        },
        editRow: '',
        bianRules: {
          productName: [{
            required: true,
            message: "请输入商品名称",
            trigger: "blur"
          }],
          goodDesc: [{
            required: true,
            message: "请输入商品描述",
            trigger: "blur"
          }],
          value4: [{
            required: true,
            message: "请选择商品分类",
            trigger: "blur"
          }]
        },
        leiMu: '',
        value4: '',
        bianrow: '',
        biandata: '',
        editFormVisiblebian: false,
        goodId: '',
        picOpen: false,

        ruletable: {
          productId: '',
          stoneId: ''
        },
        addRules: {
          productId: [{
            required: true,
            message: "请输入商品id",
            trigger: "blur"
          }]


        },
        resultData: '',
        result: '',
        tableData: [],
        roleTypeData: [],
        treeData: [],
        input: "",
        curentroleid: "",
        curentrow: null,
        //列表Loading加载
        listLoading: false,
        //添加按钮Loading加载
        addLoading: false,
        roletotal: 0,
        currentPage: 1,
        pageSize: 10,
        //检索字段
        s_rolename: "",
        s_rolecode: "",
        //     s_roleType:"",
        defaultProps: {
          children: 'children',
          label: 'name'
        },

      }
    },

    methods: {
      handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        console.log(value);
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
      },
      bianSubmit: function() {
        console.log(this.editRow)
        // this.$refs.bianinfoForms.validate(valid => {
        //   if (valid) {
        this.$confirm("确认提交？", "提示", {}).then(() => {
          this.addLoading = true;
          let param = this.editRow;

          console.log(param);
          this.$ajax({
            method: "post",
            url: "/api/stone/updateStone",
            params: param
          }).then(res => {
            console.log('编辑店铺', res);
            this.addLoading = false;
            this.getList();
            // this.editFormVisible1 = false;
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.$router.push({
              path: 'sysResource'
            })
          }).catch(res => {
            this.$message({
              message: "提交失败",

            });

          });
        });
        //   }
        // });
      },
      // 编辑物品
      bianjiSubmit: function() {
        var _this = this;
        _this.$refs.bianForm.validate(valid => {
          if (valid) {
            _this.$confirm("确认提交吗？", "提示", {}).then(() => {
              _this.addLoading = true;
              let param = Object.assign({}, this.bianrow);

              console.log('11', this.bianrow);
              _this.$ajax({
                method: "post",
                url: "/api/goods/updategood",
                params: param
              }).then(res => {
                _this.editFormVisiblebian = false;
                _this.addLoading = false;
                _this.getList();
                _this.$message({
                  message: "提交成功",
                  type: "success"
                });
                _this.$refs["bianForm"].resetFields();
              }).catch(res => {
                _this.addLoading = false;
                _this.getList();
                _this.$message({
                  message: "提交失败",

                });
              });
            });
          }
        });

      },
      changeQuentitySubject1: function() {
        let obj = {};
        obj = this.leiMu.find((item) => { //这里的selectList就是上面遍历的数据源
          //筛选出匹配数据
          if (item.hfName == this.value4) {
            return item
          }
        });

        this.bianrow.categoryId = obj.id;
        this.bianrow.productCategoryName = this.value4
        console.log(this.bianrow.categoryId);

      },
      // 查询类目
      checkType: function(val) {
        var _this = this;
        this.$ajax({
          method: "get",
          url: "/api/product/category",

        }).then(
          function(resultData) {
            console.log('查询类目', resultData);
            _this.leiMu = resultData.data.data;
            console.log(_this.leiMu);
            // _this.tableData = resultData.data.data;
            // _this.roletotal = resultData.data.count;
            // _this.listLoading = false;
          }
        );
      },
      bianji: function(row) {
        console.log(row);
        this.bianrow = row;
        this.value4 = row.productCategoryName;
        this.editFormVisiblebian = true;
        var _this=this;
        this.$ajax({
          method: "get",
          url: "/api/product/specifies",
          params: {
            productId: this.bianrow.productId
          }
        }).then(
          function(resultData) {
            console.log('查询规格', resultData);
            _this.cities=resultData.data.data;
             _this.checkedCities=resultData.data.data;
            console.log(_this.cities);
            // _this.leiMu = resultData.data.data;
            // console.log(_this.leiMu);
            // _this.tableData = resultData.data.data;
            // _this.roletotal = resultData.data.count;
            // _this.listLoading = false;
          }
        );
      },
      handleAvatarSuccess: function(response, file, fileList) {
        console.log(response, file, fileList, fileList[0].name, fileList[0].raw, fileList[0].url);

        var _this = this;
        _this.$ajax({
          method: "post",
          url: "/api/goods/addPicture",
          params: {
            pictureName: fileList[0].name,
            goodsId: this.goodId,
            username: 1,
            pictureDesc: '111',
            fileInfo: fileList[0].url

          }
        }).then(res => {
          console.log('11', res);
        });

      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 上传图片
      upLoadPic: function(row) {
        this.goodId = row.id;
        this.picOpen = true;
      },
      //新增物品
      addGoods: function() {
        this.$refs.infoForms.validate(valid => {
          if (valid) {
            this.$confirm("确认添加吗？", "提示", {}).then(() => {
              this.addLoading = true;
              let param = this.ruletable;
              console.log(param);
              this.$ajax({
                method: "get",
                url: "/api/product/addToStone",
                params: param
              }).then(res => {
                console.log('新增物品', res);
                this.addLoading = false;
                this.getList();
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                // this.$refs["addForm"].resetFields();
                // this.addFormVisible = false;
                // this.getResult(1);
              }).catch(res=>{

                this.$message({
                  message: "提交失败",
                });
              });
            });
          }
        });
      },
      // 删除物品


      deletegoods: function(row) {
        this.$confirm("确认删除吗？", "提示", {}).then(() => {
          var _this = this;
          _this.$ajax({

            method: "get",
            url: "/api/product/deleteStone",
            params: {
              // id:[row.id,_this.ruletable.stoneId]
              hfGoodsId: row.id,
              // stoneId:_this.$route.query.id
              // d:[1,2]
            }
          }).then(res => {
            console.log('删除物品', res);
            _this.getList();
            _this.$message({
              message: "提交成功",
              type: "success"
            });

          });
        });

      },

      // 获取店铺列表
      getList: function(val) {
        //     console.log();
        // this.roleFormVisible = true;
        // this.rowcheck = row;
        // this.ruletable.stoneId = row.id;
        // this.getmu();
        console.log(this.$route.query.id)
        var _this = this;
        this.$ajax({
          method: "get",
          url: "/api/product/byStoneId",
          params: {
            stoneId: this.$route.query.id
          }
        }).then(function(resultData) {
          _this.resultData = resultData.data.data;
          console.log('已选物品', resultData);
          console.log(_this.resultData);
        });
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      indexMethod(index) {
        return index;
      },
      //获取角色列表
      getResult: function(val) {

        var _this = this;
        this.listLoading = true;
        let param = Object.assign({}, {
          currentPage: val,
          pageSize: 10,
          roleName: this.s_rolename,
          roleCode: this.s_rolecode
        });
        this.$ajax({
          method: "post",
          url: "/api/sysrole-api/querySysRoleList",
          data: param
        }).then(
          function(resultData) {

            _this.tableData = resultData.data.data;
            _this.roletotal = resultData.data.count;
            _this.listLoading = false;
          },
          function(resultData) {
            // _this.tableData.message = "Local Reeuest Error!";
            //console.log(resultData);
          }
        );

      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getResult(1);

      },
      getresourceData() {
        var _this = this;
        //this.listLoading = true;

        let param = Object.assign({}, {});
        this.$ajax({
          method: "post",
          url: "/api/sysResource_api/getSysResourceList",
          data: param
        }).then(
          function(resultData) {
            _this.treeData = resultData.data.data;
            // console.log(JSON.stringify(_this.treeData));

          },
          function(resultData) {
            // _this.tableData.message = "Local Reeuest Error!";
            //console.log(resultData);
          }
        );
      },
      clickRow: function(row) {
        var _this = this;
        _this.roleuserSelect = [];
        _this.curentroleid = row.id;
        _this.curentrow = row;
        let param = Object.assign({}, {
          roleId: _this.curentroleid
        });
        this.$ajax({
          method: "post",
          url: "/api/sysAcl-api/getSysAclList",
          data: param
        }).then(
          function(resultData) {
            let list = [];

            resultData.data.data.forEach(item => {
              list.push(item.resoureId);
            });
            //alert(list);
            console.log(JSON.stringify(list))
            _this.$refs.tree.setCheckedKeys(list);

          },
          function(resultData) {
            // _this.tableData.message = "Local Reeuest Error!";
            //console.log(resultData);
          }
        );


      },

      saveRoleacl: function() {
        var _this = this;
        if (this.curentroleid == "") {
          alert("请选择要添加的角色，单击选择行。");
        }
        var sellist = this.$refs.tree.getCheckedKeys();
        //    var treeNodes = this.$refs.tree.getCheckedNodes(true);
        //    for(var i = 0; i < treeNodes.length; i++) {
        //    if(sellist.indexOf(treeNodes[i].parentId)<0){
        //     sellist.push(treeNodes[i].parentId);
        //    }
        //    }
        var roleid = this.curentroleid;
        if (sellist.length > 0) {

          this.listLoading = true;
          let param = Object.assign({}, {
            id: 0,
            roleId: roleid,
            resourceids: sellist
          });
          this.$ajax({
            method: "post",
            url: "/api/sysAcl-api/insertSysAcl",
            data: param
          }).then(
            function(resultData) {
              alert(resultData.data.message);
              _this.clickRow(_this.curentrow);

            }
          );
        }

      }

    },
    mounted() {
      //获取列表
      var list = decodeURIComponent(this.$route.query.row);
      this.editRow = JSON.parse(list);
      this.ruletable.stoneId = this.$route.query.id;
      this.checkType();
      this.getList();
      // this.getmu();
      // this.getresourceData();


    }
  };
</script>
<style>
  /* #app {
        font-family: Helvetica, sans-serif;
        text-align: center;
    } */

  #roleuser {
    font-family: Helvetica, sans-serif;
    text-align: center;
  }

  el-input {
    width: 200px;
    height: 50px;
  }
</style>
