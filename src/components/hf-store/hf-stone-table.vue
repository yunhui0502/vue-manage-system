<template>
  <div style="width: 100%;">
    <div style="overflow: hidden; height: 80px;display: flex;align-items: center;justify-content: flex-end;width: 100%;background: #fff;">
      <el-button style="margin-right: 4%;border-radius: 3px;" type="success" icon="el-icon-circle-plus-outline" @click="handleAdd"
        size="mini" round>新增店铺</el-button>
    </div>
    <div style="margin-top: 10px;width: 100%;  padding-top:10px; background: #fff;   ">
      <!--表格数据及操作-->
      <el-table  :data="tableData" style="margin-top: 10px;  " size="mini" highlight-current-row border class="el-tb-edit "
        ref="multipleTable" tooltip-effect="dark" v-loading="listLoading" @selection-change="selectChange">
        <el-table-column type="index" :index="indexMethod" label="序号" width="50px" align="center">
        </el-table-column>
        <el-table-column prop="hfName" label="店铺名称" align="center">
        </el-table-column>
        <el-table-column prop="hfDesc" label="店铺描述" align="center">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center">
        </el-table-column>
        <el-table-column prop="hfStatus" label="店铺状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.hfStatus =='1'">营业中</span>
            <span v-if="scope.row.hfStatus == '2'">未营业</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="250" align="center">
          <template slot-scope="scope">
            <!-- <el-button type="primary" plain size="small" @click="handleRole(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="delecteDian(scope.row)">删除</el-button> -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleRole(scope.row)">编辑</el-button>
             <el-button type="danger" icon="el-icon-delete" @click="delecteDian(scope.row)" size="mini">删除</el-button>
          </template>
        </el-table-column>

      </el-table>

          <el-pagination style="padding-top:30px; display: flex;justify-content: flex-end; width: 100%; background: #fff;height: 40px;float:right;" @size-change="3" @current-change="3" :current-page="2" :page-size="3" layout="total, prev, pager, next"
            :total="tableData.length">
          </el-pagination>

      <!--新增界面-->
      <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
        <el-form :inline="true" :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
          <el-form-item label="店铺名称" prop="hfName">
            <el-input v-model="addForm.hfName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="店铺描述" prop="hfDesc" label-width="150px">
            <el-input v-model="addForm.hfDesc" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取消</el-button>
          <el-button type="primary" @click="addSubmit" :loading="addLoading">提交</el-button>
        </div>
      </el-dialog>
    </div>

  </div>

</template>

<script>
  import api from '@/apis/hf-api.js';
  export default {
    name: 'productTable',
    props: ['selectedStone'],
    data() {
      return {
        addFormRules: {
          hfName: [{
            required: true,
            message: "请输入店铺名称",
            trigger: "blur"
          }],
          stoneDesc: [{
            required: true,
            message: "请输入店铺名称",
            trigger: "blur"
          }],
          stoneStatus: [{
            required: true,
            message: "请输入店铺状态",
            trigger: "blur"
          }]

        },
        addLoading: false,
        //新增界面数据
        addForm: {
          hfName: '',
          hfDesc: '',
          stoneStatus: 2,
          userId: 1,
          stoneManagerId: 1,
          bossId: 1
        },
        addFormVisible: false,
        listLoading: false,
        tableData: [],
        selectList: [],
      }
    },
    methods: {
      // 删除店铺
      delecteDian: function(row) {
        this.$confirm("删除店铺？", "提示", {}).then(() => {
          var _this = this;
          console.log(row.id);
          api.deleteStore(row.id).then(response => {
            console.log(response)
            if (response.data.status === 200) {
              this.listStore();
              this.$message({
                message: "删除成功",
                type: "success"
              });

            } else {
              this.$message({
                message: "删除失败",
                type: "success"
              });

            }
          });

        });
      },
      //新增店铺
      addSubmit: function() {
        this.$refs.addForm.validate(valid => {
          if (valid) {
            this.$confirm("确认提交吗？", "提示", {}).then(() => {
              this.addLoading = true;
              console.log(this.addForm);
              api.addStore(this.addForm).then(response => {
                console.log(response)
                if (response.status === 200) {
                  this.listStore();
                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                  this.addLoading = false;
                  this.addFormVisible = false;
                } else {
                  this.$message({
                    message: "提交失败",
                    type: "success"
                  });
                  this.addLoading = false;
                  this.addFormVisible = false;
                }
              });

            });
          }
        });
      },
      handleAdd: function() {
        this.addFormVisible = true;
      },
      TellMeId(num) {
        this.$emit('selectedStoneHandler', num);
      },
      indexMethod(index) {
        return index + 1;
      },
      selectChange: function(val) {
        console.log(val);
        this.selectList = val;
      },

      // 店铺列表
      listStore() {
        api.getStoreList(1).then(response => {
          console.log(response);
          if (response.status == 200) {
            if (response.data.status === 200) {
              this.tableData = response.data.data;
              for (var i = 0; i < this.tableData.length; i++) {
                let date = new Date(this.tableData[i].createTime)
                let Str = date.getFullYear() + '-' +
                  (date.getMonth() + 1) + '-' +
                  date.getDate() + ' ' +
                  (date.getHours() + 8) % 24 + ':' +
                  date.getMinutes() + ':' +
                  date.getSeconds()
                this.tableData[i].createTime = Str;
                // this.tableData[i].createTime=this.tableData[i].createTime.split('T');
                // this.tableData[i].createTime=this.tableData[i].createTime[0]+''+this.tableData[i].createTime[1];
              }
            }
          }

        });
      },
      //查看角色
      handleRole: function(row) {



        // this.roleFormVisible = true;
        // this.rowcheck = row;
        // this.ruletable.stoneId = row.id;
        // this.getmu();


        // this.$ajax({
        //   method: "get",
        //   url: "/api/product/byStoneId",
        //   params: {
        //     stoneId: row.id
        //   }
        // }).then(function(resultData) {

        //   console.log('已选物品', resultData);
        // });
        var arr = JSON.stringify(row);
        // this.$router.push('/formpage/'+encodeURIComponent(arr))
        // this.$router.push({path: 'formpage', query: {}})
        this.$router.push({
          path: 'hf-store',
          query: {
            id: row.id,
            row: arr
          }
        })
      },
      init() {
        this.listStore();
      }
    },
    mounted() {
      this.init()
    }
  }
</script>
