<template>
  <div>
    <v-head></v-head>
    <v-sidebar></v-sidebar>

    <div class="content-box" :class="{'content-collapse':collapse}">
      <div>
        <!-- 页面标题end-->
        <div style="background: #f0f0f0;">
          <el-form style="background: #fff;padding: 20px;padding-top: 30px;" :inline='true' :model="editRow"
            label-width="80px" :rules="bianaddFormRules" ref="bianinfoForms">
            <el-form-item label="店铺名称" prop="hfName" >
              <el-input v-model="editRow.hfName" auto-complete="off" :disabled='true' ></el-input>
            </el-form-item>
            <br>
            <el-form-item label="店铺描述" prop="hfDesc">
              <el-input v-model="editRow.hfDesc" auto-complete="off" type="textarea" resize="none" style="width:550px;"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="店铺状态" prop="hfStatus">
              <el-radio v-model="editRow.hfStatus" label="1">营业中</el-radio>
              <el-radio v-model="editRow.hfStatus" label="2">未营业</el-radio>
              <!-- <el-input v-model="editRow.hfStatus" auto-complete="off"></el-input> -->
            </el-form-item>
            <!-- <br> -->
            <!-- <el-button type="primary" icon="el-icon-edit" size="mini" @click="biangui(scope.row)">编辑</el-button> -->
            <el-button style="margin-left: 20px;float:right;overflow: hidden;" type="primary" @click="bianSubmit" :loading="addLoading">提交</el-button>
          </el-form>

          <!-- 页面内容区begin -->
          <div id="app" style="padding: 20px;background: #fff; margin-top: 10px;">
            <div style=" width:98%;">
              <el-form :model="ruletable" ref="infoForms" :inline="true" :rules="addRules" style="margin-bottom: 20px;overflow: hidden;">
                <!-- <el-button style="margin-left: 10px;" ></el-button> -->
                <!-- <el-button type="primary" icon="el-icon-edit" size="mini" @click="biangui(scope.row)">编辑</el-button> -->
                  <el-button style="margin-left: 20px;float:right;" type="primary"@click="addGoods" :loading="addLoading">添加物品</el-button>
              </el-form>
              <el-dialog title="添加物品" :visible.sync="addeditFormVisible" :close-on-click-modal="false">
                <el-form :inline="true" :model='addWu' label-width="80px" :rules="bianRules" ref="bianForm">
                  <el-form-item label="物品名称" prop="goodName">
                    <el-input v-model='addWu.goodName' auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="物品描述" prop="goodsDesc">
                    <el-input v-model='addWu.goodsDesc' auto-complete="off"></el-input>
                  </el-form-item>
                  <el-form-item prop="positionName" label-width="200px" :show-overflow-tooltip="true">
                    <el style="display: flex;">
                      <el-form-item prop="productId" label-width="200px" label="输入商品编号添加店铺物品:">
                        <el-input auto-complete="off" v-model='addWu.productId'></el-input>
                      </el-form-item>
                    </el>
                  </el-form-item>

                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="editFormVisible=false">取消</el-button>
                  <el-button type="primary" @click="addjiSubmit" :loading="addLoading">提交</el-button>
                </div>
              </el-dialog>

              <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
                <el-form :inline="true" :model="bianrowwu" label-width="80px" :rules="bianRules" ref="bianForm">
                  <div style="font-size: 17px;margin-bottom: 30px;">基础信息</div>
                  <el-form-item label="物品名称" prop="goodName">
                    <el-input v-model="bianrowwu.goodName" auto-complete="off" :disabled="true"></el-input>
                  </el-form-item>
                  <br>
                  <el-form-item label="物品描述" prop="goodsDesc">
                    <div style="display: flex;align-items: center;">
                      <el-input v-model="bianrowwu.goodsDesc" auto-complete="off" type="textarea" resize="none" style="width: 400px;"></el-input>
                      <div @click="bianjiSubmit1" style="margin-left: 13px; border-radius: 2px; color: #fff; background-color: #00D1B2;
                  justify-content: center;width: 60px;height: 30px;  display: flex;align-items: center;">提交</div>
                    </div>
                  </el-form-item>
                  <div style="width: 100%;height: 1px;border-bottom: 1px solid #E4E4E4;margin-top: 20px;"></div>
                  <br>

                  <br>
                  <div style="font-size: 17px;margin-bottom: 30px;">库存信息</div>
                  <el-form-item label="库存数量" prop="quantity">

                    <div style="display: flex;align-items: center;">
                      <el-input v-model="quantity" auto-complete="off" type="number"></el-input>
                    </div>
                  </el-form-item>

                  <el-form-item label="仓库位置">
                    <div style="display: flex;align-items: center;">
                      <el-select v-model="value4" placeholder="请选择" @change="changeQuentitySubject1(index)">
                        <el-option v-for="(item,index) in tableDataku" :key="index" :label="item.hfName" :value="item.hfName">
                        </el-option>
                      </el-select>
                      <div @click="addku" style="margin-left: 13px; border-radius: 2px; color: #fff; background-color: #00D1B2; justify-content: center; width: 23px;height: 23px; display: flex;align-items: center;">+</div>
                    </div>

                  </el-form-item>
                  <div style="width: 100%;height: 1px;border-bottom: 1px solid #E4E4E4;margin-top: 20px;"></div>
                  <br>
                  <div style="font-size: 17px;margin-bottom: 30px;">价格信息</div>
                  <el-form-item label="售卖价格" prop="sellPrice">
                    <div style="display: flex;align-items: center;">
                      <el-input v-model="sellPrice" auto-complete="off" placeholder="以分为单位"></el-input>
                      <div @click="setPrice" style="margin-left: 13px; border-radius: 2px; color: #fff; background-color: #00D1B2; justify-content: center; width: 23px;height: 23px; display: flex;align-items: center;">+</div>
                    </div>
                  </el-form-item>
                  <div style="width: 100%;height: 1px;border-bottom: 1px solid #E4E4E4;margin-bottom: 30px;margin-top: 20px;"></div>
                  <div style="font-size: 17px;margin-bottom: 30px;">规格信息</div>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="editFormVisible=false">关闭</el-button>
                </div>

                <el-table :data='guigelist' size="mini" highlight-current-row border class="el-tb-edit mgt20" ref="multipleTable" stripe
                  style="margin-bottom: 40px;" tooltip-effect="dark" v-loading="listLoading">
                  <el-table-column type="index" label="序号" header-align="center" align="center">
                  </el-table-column>
                  <el-table-column label="规格名称" align="center" prop="hfName">
                  </el-table-column>
                  <el-table-column prop="specType" label="规格类型" align="center">
                  </el-table-column>
                  <el-table-column prop="specValue" label="规格值" align="center">
                  </el-table-column>
                  <el-table-column prop="specUnit" label="规格单位" align="center">
                  </el-table-column>
                </el-table>
              </el-dialog>
              <template>
                <!--表格数据及操作-->
                <el-table :data='wupin' size="mini" highlight-current-row border ref="multipleTable" border style="margin-bottom: 40px;font-size: 15px;"
                  tooltip-effect="dark" v-loading="listLoading">
                  <el-table-column type="index" :index="indexMethod" label="序号" width="59px" align="center">
                  </el-table-column>
                  <el-table-column prop="goodName" label="物品名称" align="center">
                  </el-table-column>
                  <el-table-column prop="goodsDesc" label="物品描述" align="center">
                  </el-table-column>
                  <el-table-column prop="productCategoryName" label="物品类目" align="center">
                  </el-table-column>
                  <el-table-column label="创建时间" prop="createTime" align="center">
                  </el-table-column>

                  <el-table-column label="操作" align="center" width="290px">
                    <template slot-scope="scope">
                      <el-button type="danger" icon="el-icon-delete" @click="deletegoods(scope.row)"  size="mini">删除</el-button>
                      <!-- <el-button size="small" type="danger">删除</el-button> -->
                      <!-- <el-button size="small" >编辑</el-button> -->
                      <el-button type="primary" icon="el-icon-edit" size="mini"@click="bianji(scope.row)">编辑</el-button>
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
          <el-upload action="/as" list-type="picture-card" :on-success="handleAvatarSuccess" :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove" :auto-upload="true">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <div slot="footer" class="dialog-footer">
            <el-button @click="picOpen = false">取消</el-button>
            <el-button type="primary" :loading="editLoading">提交</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
  <!-- 页面表格end -->
</template>
<script>
  import Axios from "axios";
  import vSidebar from '@/components/common/sidebar.vue';
  import vHead from '@/components/common/header.vue';
  import api from '@/apis/hf-api.js';
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default {
    name: 'hf-store',
    data() {
      return {
        editLoading: false,
        dialogImageUrl: '',
        dialogVisible: false,
        tableDataku: [],
        bianrowwu: '',
        wupin: [],
        collapse: false,
        guigelist: [],
        kuid: '',
        sellPrice: '',
        quantity: '',
        editFormVisible: false,
        addWu: {
          bossId: 1,
          requestId: 1,
          timestamp: 1,
          token: 1,
          userId: 1
        },
        addeditFormVisible: false,
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
        editRow: {

        },
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
        bianrow: {},
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
        resultData: {},
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


      }
    },
    components: {
      vHead,
      vSidebar
    },
    computed: {

    },
    methods: {
      //新增物品
      //新增物品
      addGoods: function() {
        this.addeditFormVisible = true;

      },
      // 查看规格
      checkguige: function(row) {
        var _this = this;
        _this.$ajax({
          method: "get",
          url: "/api/product/specifies",
          params: {
            productId: row.productId
          }
        }).then(res => {
          _this.guigelist = res.data.data;
          _this.editRow.bossId = 1;
          console.log('查询规格', res);
        });
      },
      addku: function() {
        let obj = {};
        obj = this.tableDataku.find((item) => { //这里的selectList就是上面遍历的数据源
          //筛选出匹配数据
          if (item.hfName == this.value4) {
            this.kuid = item.id
          }
        });
        let goodsId = this.bianrowwu.id;
        var _this = this;
        console.log(goodsId, this.kuid, _this.quantity);
        this.$ajax({
          method: "post",
          url: "/api/goods/setGoodsQuantity",
          params: {
            wareHouseId: _this.kuid,
            quantity: _this.quantity,
            hfGoodsId: goodsId,
            requestId: 1,
            timestamp: 1,
            token: 1,
            userId: 1
          }
        }).then(res => {
          console.log('添加物品规格', res);

          // this.editFormVisible1 = false;
          _this.$message({
            message: "提交成功",
            type: "success"
          });
          // this.$router.push({
          //   path: 'sysResource'
          // })
        }).catch(res => {
          _this.$message({
            message: "提交失败",

          });

        });
        // });

      },

      setGoodsQuantity: function() {

        let goodsId = this.bianrowwu.id;
        console.log(this.hfPrice, goodsId);
        this.$ajax({
          method: "post",
          url: "/api/goods/setPrice",
          params: {
            quantity: this.hfPrice,
            hfGoodsId: goodsId,
            requestId: 1,
            timestamp: 1,
            token: 1,
            userId: 1
          }
        }).then(res => {
          console.log('添加物品价格', res);
          this.$message({
            message: "提交成功",
            type: "success"
          });
        }).catch(res => {
          this.$message({
            message: "提交失败",

          });

        });


      },
      setPrice: function() {

        if (this.sellPrice == '') {
          return;
        }
        let goodsId = this.bianrowwu.id;
        console.log(this.sellPrice, goodsId);
        this.$ajax({
          method: "post",
          url: "/api/goods/setPrice",
          params: {
            sellPrice: this.sellPrice,
            hfGoodsId: goodsId,
            requestId: 1,
            timestamp: 1,
            token: 1,
            userId: 1
          }
        }).then(res => {
          console.log('添加物品价格', res);
          this.$message({
            message: "提交成功",
            type: "success"
          });

        }).catch(res => {
          this.$message({
            message: "提交失败",

          });

        });
        // });

      },
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
      // 添加物品
      addjiSubmit: function() {
        console.log('添加物品', this.addWu)
        this.$confirm("确认添加吗？", "提示", {}).then(() => {
          this.addLoading = true;
          let param = this.addWu;
          console.log(param);
          this.$ajax({
            method: "post",
            url: "/api/goods/create",
            params: param
          }).then(res => {
            console.log('添加物品', res);
            this.addLoading = false;
            this.addeditFormVisible = false;
            this.getList();
            // this.editFormVisible1 = false;
            this.$message({
              message: "提交成功",
              type: "success"
            });
            // this.$router.push({
            //   path: 'sysResource'
            // })
          }).catch(res => {
            this.$message({
              message: "系统错误"
            });

          });
        });
        //   }
        // });
      },
      // 查询仓库
      checkCang: function(val) {
        var _this = this;
        this.listLoading = true;
        api.checkWarehouse(1).then(response => {
          console.log('查询仓库', response)
          this.listLoading = false;
          _this.tableDataku = response.data.data;
          _this.listLoading = false;
        });
      },
      // 编辑店铺
      bianSubmit: function() {
        console.log('dianpu', this.editRow)
        this.$confirm("确认提交？", "提示", {}).then(() => {
          api.updateStore(this.editRow).then(response => {
            console.log(response)
            if (response.status === 200) {
              this.$message({
                message: "修改成功",
                type: "success"
              });

              this.$router.push({
                path: 'store'
              })
            } else {
              this.$message({
                message: "修改失败",
                type: "success"
              });
            }
          });
        });
      },
      // // 编辑物品
      bianjiSubmit1: function() {
        var _this = this;
        _this.$refs.bianForm.validate(valid => {
          if (valid) {
            _this.$confirm("确认提交吗？", "提示", {}).then(() => {
              _this.addLoading = true;
              let param = Object.assign({}, this.bianrowwu);
              console.log('11', this.bianrowwu);

              api.updateGood(this.bianrowwu).then(response => {
                console.log(response)
                if (response.status === 200) {
                  this.$message({
                    message: "修改成功",
                    type: "success"
                  });
                  this.editFormVisible = false;
                  _this.addLoading = false;
                  _this.getList();
                } else {
                  this.$message({
                    message: "修改失败",
                    type: "success"
                  });
                }
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
          }
        );
      },
      bianji: function(row) {
        this.editFormVisible = true;
        console.log(row);
        this.bianrowwu = row;
        this.checkguige(row)
        // this.value4 = row.productCategoryName;

        var _this = this;
        console.log("物品id", this.bianrowwu.productId);
        this.$ajax({
          method: "get",
          url: "/api/goods/byGoodsId",
          params: {
            goodsId: _this.bianrowwu.id
          }
        }).then(
          function(resultData) {
            console.log('查询物品详情', resultData);

            _this.sellPrice = resultData.data.data.sellPrice;
            _this.quantity = resultData.data.data.quantity;
            _this.value4 = resultData.data.data.warehouseName;
          }
        );
      },
      handleAvatarSuccess: function(response, file, fileList) {
        console.log(fileList)
        let fd = new FormData();

        fd.append('goodsId', 1);
        fd.append("username", 1);
        fd.append("userId", 1);
        console.log('打印', fd)
        fd.append("requestId", "dsaaa");
        fd.append("token", 'sss');
        fd.append("timestamp", 'dd');
        this.list = fileList;

        fileList.forEach((item) => {
          console.log(item, item.name)
          fd.append('fileInfo', item, item.name);
        });

        Axios.post('/api/goods/addPicture', fd, {
          responseType: 'arraybuffer'
        }).then(res => {
          console.log('上传图片', res);
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
      // 删除物品
      deletegoods: function(row) {
        this.$confirm("确认删除吗？", "提示", {}).then(() => {
          var _this = this;

          api.deleteGood(row.id).then(response => {
            _this.getList();
            _this.$message({
              message: "提交成功",
              type: "success"
            });
          });

        });
      },

      // 获取店铺物品
      getList: function(val) {
        var _this = this;
        api.getGood(this.$route.query.id).then(response => {
          console.log(response);
          _this.wupin = response.data.data;
          for (var i = 0; i < _this.wupin.length; i++) {
            // _this.wupin[i].createTime=_this.wupin[i].createTime.split('T');
            // _this.wupin[i].createTime=_this.wupin[i].createTime[0]+'  '+_this.wupin[i].createTime[1];


            let date = new Date(_this.wupin[i].createTime)
            let Str = date.getFullYear() + '-' +
              (date.getMonth() + 1) + '-' +
              date.getDate() + ' ' +
              (date.getHours() + 8) % 24 + ':' +
              date.getMinutes() + ':' +
              date.getSeconds()
            _this.wupin[i].createTime = Str;
          }
          console.log('已选物品', response);
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

            _this.resultData = resultData.data.data;
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
      console.log(this.editRow);
      console.log(this.editRow.hfStatus);
      if (this.editRow.hfStatus == 1) {
        this.editRow.hfStatus = "1"
      } else {
        this.editRow.hfStatus = "2"
      }
      console.log(this.editRow.hfStatus)

      // console.log(this.editRow.hfStatus)
      this.ruletable.stoneId = this.$route.query.id;
      this.addWu.hfStoreId = this.$route.query.id;
      this.checkType();
      this.getList();
      // this.getmu();
      // this.getresourceData();

      this.checkCang();

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
