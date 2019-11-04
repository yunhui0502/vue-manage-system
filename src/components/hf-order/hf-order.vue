<template>
  <div>
    <!-- <el-button type="primary" style="margin: 20px;" @click="createorde">创建订单</el-button> -->
<!--    <template>
      <el-dialog title="创建订单" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </template> -->
    <el-table stripe :data="scope.tableData" :height="tableHeight" style="width: 100%;font-size: 15px;" size="mini"
     >
      <el-table-column label="订单编号" align="center" width="150" fixed>
        <template slot-scope="scope">
          <span>{{ scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单类型" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.orderType}}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付金额" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.amount}}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付状态" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.payStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.orderDetailStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column label="支付方式" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.payMethodType}}</span>
        </template>
      </el-table-column>

      <el-table-column label="商品单价" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.purchasePrice}}</span>
        </template>
      </el-table-column>
      <el-table-column label="购买数量" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.purchaseQuantity}}</span>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.hfName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单描述" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.hfDesc}}</span>
        </template>
      </el-table-column>
      <el-table-column label="收获地址" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column label="物流单号" align="center"  width="400">
        <template slot-scope="scope">
          <span>{{ scope.row.logisticsOrdersId}}</span>
        </template>
      </el-table-column>
      <el-table-column label="物流公司" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.logisticsCompany}}</span>
        </template>
      </el-table-column>
      <el-table-column label="物流订单名称" align="center" width="120px">
        <template slot-scope="scope">
          <span>{{ scope.row.logisticsOrderName}}</span>
        </template>
      </el-table-column>

      <el-table-column label="订单创建人" align="center" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.realName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" width="170">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" align="center" width="170">
        <template slot-scope="scope">
          <span>{{ scope.row.modifyTime}}</span>
        </template>
      </el-table-column>


      <el-table-column align="center" label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button @click="TellMeId(scope.row)" size="small" type="text">订单详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template>
      <elDrawer title="订单详情" :v-if="drawer" :before-close="handleClose" :visible.sync="drawer" custom-class="demo-drawer"
         :loading.sync="loading" close-on-click-modal ref="selectedItem">
        <div class="demo-drawer__content">
          <el-form :model="form" style="margin-top: 30px;margin-left: 20px;">
            <el-form-item label="订单编号" label-width="70px">
              <el-input v-model="form.id" autocomplete="off" :disabled="true" style="width:200px;"></el-input>
            </el-form-item>
          <!--  <el-form-item label="订单类型">
              <el-input v-model="form.orderType" autocomplete="off" disabled="true" style="width: 200px;"></el-input>
            </el-form-item> -->
            <el-form-item label="商品名称" label-width="70px">
              <el-input v-model="form.hfName" autocomplete="off" :disabled="true" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="订单状态" label-width="70px" >
              <!-- <el-input v-model="form.orderDetailStatus" autocomplete="off" disabled="true" style="width: 200px;"></el-input> -->
            <el-select v-model="form.orderDetailStatus" placeholder="订单状态" @change="checkMulist">
              <el-option v-for="item in status" :key="item.hfName" :label="item.hfName" :value="item.hfName">
              </el-option>
            </el-select>
            </el-form-item>

            <!-- <el-form-item label="支付金额">
              <el-input v-model="form.amount" autocomplete="off" disabled="true" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="支付状态">
              <el-input v-model="form.payStatus" autocomplete="off" disabled="true" style="width: 200px;"></el-input>
            </el-form-item>-->

            <!--<el-form-item label="订单描述" :label-width="formLabelWidth">
              <el-input v-model="form.hfDesc" autocomplete="off" disabled="true" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="收获地址" :label-width="formLabelWidth">
              <el-input v-model="form.address" autocomplete="off" disabled="true" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="物流单号" :label-width="formLabelWidth">
              <el-input v-model="form.logisticsOrdersId" autocomplete="off" disabled="true" style="width: 400px;"></el-input>
            </el-form-item>
            <el-form-item label="物流公司" :label-width="formLabelWidth">
              <el-input v-model="form.logisticsCompany" autocomplete="off" disabled="true" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="物流订单名称" :label-width="formLabelWidth">
              <el-input v-model="form.logisticsOrderName" autocomplete="off" disabled="true" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="订单创建人" :label-width="formLabelWidth">
              <el-input v-model="form.realName" autocomplete="off" disabled="true" style="width: 200px;"></el-input>
            </el-form-item>

            <el-form-item label="创建时间" :label-width="formLabelWidth">
              <el-input v-model="form.createTime" autocomplete="off" disabled="true" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="支付方式" :label-width="formLabelWidth">
              <el-input v-model="form.payMethodType" autocomplete="off" disabled="true" style="width: 200px;"></el-input>
            </el-form-item> -->


          </el-form>

          <el-table stripe :data="goodsData" :height="tableHeight" style="width: 100%;font-size: 15px;" size="mini"
           >

            </el-table-column>
            <el-table-column label="订单类型" align="center" width="150">
              <template slot-scope="scope">
                <span>{{ goodsData.orderType}}</span>
              </template>
            </el-table-column>
            <el-table-column label="支付金额" align="center" width="150">
              <template slot-scope="scope">
                <span>{{ goodsData.amount}}</span>
              </template>
            </el-table-column>
            <el-table-column label="支付状态" align="center" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.payStatus}}</span>
              </template>
            </el-table-column>
            <el-table-column label="订单状态" align="center" width="150">
              <template slot-scope="scope">
                <span>{{ goodsData.orderDetailStatus}}</span>
              </template>
            </el-table-column>
            <el-table-column label="支付方式" align="center" width="150">
              <template slot-scope="scope">
                <span>{{ goodsData.payMethodType}}</span>
              </template>
            </el-table-column>

            <el-table-column label="商品单价" align="center" width="150">
              <template slot-scope="scope">
                <span>{{ goodsData.purchasePrice}}</span>
              </template>
            </el-table-column>
            <el-table-column label="购买数量" align="center" width="150">
              <template slot-scope="scope">
                <span>{{ goodsData.purchaseQuantity}}</span>
              </template>
            </el-table-column>
            <el-table-column label="商品名称" align="center" width="150">
              <template slot-scope="scope">
                <span>{{ goodsData.hfName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="订单描述" align="center" width="150">
              <template slot-scope="scope">
                <span>{{ goodsData.hfDesc}}</span>
              </template>
            </el-table-column>
            <el-table-column label="收获地址" align="center" width="150">
              <template slot-scope="scope">
                <span>{{ goodsData.address}}</span>
              </template>
            </el-table-column>
            <el-table-column label="物流单号" align="center"  width="400">
              <template slot-scope="scope">
                <span>{{ goodsData.logisticsOrdersId}}</span>
              </template>
            </el-table-column>
            <el-table-column label="物流公司" align="center" width="150">
              <template slot-scope="scope">
                <span>{{ goodsData.logisticsCompany}}</span>
              </template>
            </el-table-column>
            <el-table-column label="物流订单名称" align="center" width="120px">
              <template slot-scope="scope">
                <span>{{ goodsData.logisticsOrderName}}</span>
              </template>
            </el-table-column>

            <el-table-column label="订单创建人" align="center" width="150">
              <template slot-scope="scope">
                <span>{{ goodsData.realName}}</span>
              </template>
            </el-table-column>
            <el-table-column label="创建时间" align="center" width="170">
              <template slot-scope="scope">
                <span>{{ goodsData.createTime}}</span>
              </template>
            </el-table-column>
            <el-table-column label="修改时间" align="center" width="170">
              <template slot-scope="scope">
                <span>{{ goodsData.modifyTime}}</span>
              </template>
            </el-table-column>

          </el-table>



          <div class="demo-drawer__footer"  style="margin-left: 20px;">
            <el-button @click="drawer = false">取 消</el-button>
            <el-button type="primary" @click="updateStatus()" > 确定</el-button>
          </div>
        </div>
      </elDrawer>
    </template>

  </div>
</template>

<script>
  import api from '@/apis/order-api.js';
  import elDrawer from '@/components/drawer';
  export default {
    name: "hf-order",
    components: {
      elDrawer
    },
    data() {
      return {
        goodsData:[],
        tableHeight: window.innerHeight -70,
        leiMuId:'',
        status:{},
        options: [],
        value: '',
        drawer: false,
        loading: false,
        dialogVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '80px',
        scope: {
          tableData: [],

        }
      }
    },
    methods: {
      // 修改订单状态
      // updateSytatus
      updateStatus :function(){
        let param={
          id:this.leiMuId,
          orderId:this.form.orderDetailId
        }
        api.updateSytatus(param).then(resp => {
         console.log('11111111111121',resp)
            // this.status=resp.data.data;
            this.drawer = false;
            this.$message({
              message: "提交成功",
              type: "success"
            });
            this.listOrder();
        });
      },
      // 通过类目查询商品列表
      checkMulist: function() {
        let obj = {};
        obj = this.status.find((item) => {
          //这里的selectList就是上面遍历的数据源
          //筛选出匹配数据
          if (item.hfName == this.form.orderDetailStatus) {
            return item
          }
        });

        this.leiMuId = obj.id;

        console.log(this.leiMuId);

      },
      // 创建订单
     getAllStatus() {
        api.getstatus().then(resp => {
         console.log('1111111',resp)
            this.status=resp.data.data;
        });
      },
      // 创建订单
      createorde() {
        api.create().then(resp => {
          let orderId = resp.data.data[0].ordersId;
          api.createorder(orderId).then(resp => {
            console.log(resp)

          });

        });
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      TellMeId(num) {
        console.log(num)
        this.drawer = true;
        this.form = num;
        api.orderDetail(this.form.orderDetailId).then(resp => {
         console.log('订单详情',resp)
          this.goodsData= resp.data.data;
        });
      },
      listOrder() {
        api.checkOrderList(1).then(resp => {
          if (resp.status == 200) {
            console.log(resp.data);
            if (resp.data.status == 200) {
              this.scope.tableData = resp.data.data;
              for(var i=0;i<this.scope.tableData.length;i++){
                    let date = new Date(this.scope.tableData[i].createTime)
                    let Str=date.getFullYear() + '-' +
                    (date.getMonth() + 1) + '-' +
                    date.getDate() + ' ' +
                    (date.getHours()+8)%24 + ':' +
                    date.getMinutes() + ':' +
                    date.getSeconds()
                    this.scope.tableData[i].createTime= Str;


                    let date1 = new Date(this.scope.tableData[i].modifyTime)
                    let Str1=date1.getFullYear() + '-' +
                    (date1.getMonth() + 1) + '-' +
                    date1.getDate() + ' ' +
                    (date1.getHours()+8)%24 + ':' +
                    date1.getMinutes() + ':' +
                    date1.getSeconds()
                    this.scope.tableData[i].modifyTime= Str1;
                    // var date = new Date(this.tableData[i].createTime);
                    // Calendar cal = Calendar.getInstance();
                    // var localeString = date.toLocaleString();
                    // console.log(localeString);
                    // this.tableData[i].createTime=this.tableData[i].createTime.split('T');
                    // this.tableData[i].createTime=this.tableData[i].createTime[0]+''+this.tableData[i].createTime[1];
              }
            }
          }
        });
      }
    },
    mounted() {
      this.listOrder();
      this.getAllStatus();
    }
  }
</script>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }

</style>
