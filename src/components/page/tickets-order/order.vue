<template>
    <div>
        <div class="head">
            <span @click="Tab(0)" class="head-item" :class="tabindex == 0 ? 'on' : ''">全部</span>
            <span @click="Tab(1)" class="head-item" :class="tabindex == 1 ? 'on' : ''">待发货</span>
            <span @click="Tab(2)" class="head-item" :class="tabindex == 2 ? 'on' : ''">待收货</span>
            <span @click="Tab(3)" class="head-item" :class="tabindex == 3 ? 'on' : ''">待评价</span>
            <span @click="Tab(4)" class="head-item" :class="tabindex == 4 ? 'on' : ''">已完成</span>
            <span @click="Tab(5)" class="head-item" :class="tabindex == 5 ? 'on' : ''">退款中</span>
        </div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>商家管理</el-breadcrumb-item>
                    <el-breadcrumb-item>{{ text }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <div class="text item">
                <el-table :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)" style="width: 100%" stripe>
                    <!-- <el-table-column type="index" label="序号" :index="indexMethod"></el-table-column> -->
                    <el-table-column prop="orderCode" label="订单号"> </el-table-column>
                    <el-table-column prop="id" label="ID" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="outTradeNo" label="门票订单号" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="modifyTime" label="时间" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="orderStatusUtf" label="订单状态" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button type="text" @click="ImageURLList(scope.row)" class="text-red" size="small">退款明细</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage"
                        :page-size="pagesize"
                        layout="prev, pager, next, jumper"
                        :total="tableData.length"
                    >
                    </el-pagination>
                </div>
            </div>
        </el-card>

        <el-dialog title="携程退款明细" :visible.sync="dialogVisible" width="30%">
            <!-- <span>携程退款明细</span> -->
            <div v-for="item in RefundDetailList" :key="item.RefundID">
                <div>
                    分销商单价：<span>{{ item.Price }}</span>
                </div>
                <div>
                    下单携程单价：<span>{{ item.CtripPrice }}</span>
                </div>
                <div>
                    退款类型：<span>{{
                        item.OperateType == 1
                            ? '全部退订'
                            : item.OperateType == 2
                            ? '部分退订'
                            : item.OperateType == 3
                            ? '数量未变化退'
                            : '退押金'
                    }}</span>
                </div>
                <div>
                    退款份数：<span>{{ item.RefundQuantity }}</span>
                </div>
                <div>
                    退订金额：<span>{{ item.RefundAmount }}</span>
                </div>
                <!-- <div>退改有损金额：<text>{{item.RefundCost}}</text></div> -->
                <div>
                    退款原因：<span>{{ item.RefundReason }}</span>
                </div>
                <div>
                    退订状态：<span>{{ item.OperateType == 1 ? '退订中' : item.OperateType == 2 ? '退订成功' : '退订失败' }}</span>
                </div>
                <div>
                    退订失败原因：<span>{{ item.FailReason }}</span>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button @click="countRefund">退款</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import orderApi from '@/service/order-api.js';
import paymentApi from '@/service/payment-api.js';
import ctripApi from '@/api/ctrip.js';
import store from '@/store';

// import procss from './procss.vue';
export default {
    name: '',
    components: {
        // procss
    },
    data() {
        return {
            dialogVisible: false,
            RefundDetailList: [],
            text: '全部',
            tabindex: '',
            tableData: [],
            currentPage: 1,
            pagesize: 10,
            formLabelWidth: '120px',

            refundCostType: '',
            refundCostValue: '',
            refundQuantity: '',
            refundType: '0'
        };
    },
    created() {
        this.selectOrder('all');
        this.authorize();
    },
    methods: {
         numFilter(value) {
            // 截取当前数据到小数点后两位
            let realVal = parseFloat(value).toFixed(2);
            return realVal;
        },
        // t
        handlexClick() {
            let item = this.item;
            console.log(item);

            let paras = {
                outTradeNo: item.outTradeNo,
                payOrderId: item.payOrderId,
                orderCode: item.orderCode,
                userId: item.userId,

                refundCostType: this.refundCostType,
                refundCostValue: this.refundCostValue,
                refundQuantity: this.refundQuantity,
                refundType: this.refundType
            };
            paymentApi.refundVideo(paras, (res) => {
                console.log(res);
            });
        },
        countRefund() {
            let _this = this;
            let item = this.item;
            let paras = {
                refundCostType: this.refundCostType,
                refundCostValue: this.refundCostValue,
                refundQuantity: this.refundQuantity,
                outTradeNo: item.outTradeNo
            };

            paymentApi.countRefund(paras, (res) => {
                console.log(res);
                this.$confirm(`退款金额${this.numFilter(res.data/100)}确定要退款吗?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                    .then(() => {
                        _this.handlexClick();
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
            });
        },
        authorize() {
            ctripApi
                .authorize({
                    AID: 1723148,
                    KEY: '3bdcdea67e244b8790ceb6771c4bee9f',
                    SID: 4798174
                })
                .then((res) => {
                    console.log('获取身份', res.data);
                    localStorage.setItem('tokenData', JSON.stringify(res.data));

                    // localStorage.getItem('tokenData')
                });
        },
        ImageURLList(item) {
            this.item = item;
            console.log(item);
            let tokenData = JSON.parse(localStorage.getItem('tokenData'));
            console.log('惨数', tokenData.AID);
            let paras = {
                ICODE: '7fd4cffe6b964b76944a65b8a4325819',

                SID: tokenData.SID,
                DistributionChannelID: '9',

                AllianceID: tokenData.AID,
                OrderID: item.outTradeNo
            };

            ctripApi.ServiceProxy(paras).then((res) => {
                console.log('2.17门票退订明细', res);
                
                if (res.data.ErrCode == 232) {
                    this.$message({
                        message: 'Token失效,重新访问',
                        type: 'warning'
                    });
                    this.authorize();
                    return;
                }
                 if (res.data.ErrCode == 230) {
                    this.$message({
                        message: 'Token失效,重新访问',
                        type: 'warning'
                    });
                    this.authorize();
                    return;
                }
                 if (res.data.ErrCode == 231) {
                    this.$message({
                        message: 'Token失效,重新访问',
                        type: 'warning'
                    });
                    this.authorize();
                    return;
                }
                if (res.data.ResultStatus.ErrorMessage == '无退款信息') {
                    this.$message({
                        message: res.data.ResultStatus.ErrorMessage,
                        type: 'success'
                    });
                    return;
                }
                this.dialogVisible = true;
                this.RefundDetailList = res.data.RefundDetails;
                console.log('退订明细', this.RefundDetailList);

                this.refundCostType = res.data.RefundDetails[0].RefundCostType;
                this.refundCostValue = res.data.RefundDetails[0].RefundCostValue;
                this.refundQuantity = res.data.RefundDetails[0].RefundQuantity;
            });
        },
        Tab(e) {
            this.tabindex = e;
            if (e == '0') {
                this.selectOrder('all');
                this.text = '全部';
            } else if (e == '1') {
                this.selectOrder('process');
                this.text = '待发货';
            } else if (e == '2') {
                this.selectOrder('pickUp');
                this.text = '待收货';
            } else if (e == '3') {
                this.selectOrder('evaluate');
                this.text = '待评价';
            } else if (e == '4') {
                this.selectOrder('complete');
                this.text = '已完成';
            } else {
                this.selectOrder('controversial');
                this.text = '退款中';
            }
        },
        // 获取全部订单
        selectOrder(e) {
            let params = {
                orderStatus: e, //订单状态
                type: 'admission' //
                // showType: 'product',//商品展示类型
            };

            orderApi.selectAdmissionOrder(params, (res) => {
                this.tableData = res.data.data;
                this.tableData.forEach((item) => {
                    console.log('1', item);
                    // item.orderStatusUtf = item.orderStatus
                    if (item.orderStatus == 'payment') {
                        item.orderStatusUtf = '待支付';
                    } else if (item.orderStatus == 'process') {
                        item.orderStatusUtf = '待发货';
                    } else if (item.orderStatus == 'pickUp') {
                        item.orderStatusUtf = '待提货';
                    } else if (item.orderStatus == 'evaluate') {
                        item.orderStatusUtf = '待评价';
                    } else if (item.orderStatus == 'complete') {
                        item.orderStatusUtf = '完成';
                    } else if (item.orderStatus == 'controversial') {
                        item.orderStatusUtf = '交易纠纷';
                    } else if (item.orderStatus == 'cancel') {
                        item.orderStatusUtf = '取消';
                    }
                    // item.orderProductLists.forEach((ProductItem) => {
                    //     //  value =
                    //     item.sellPrice = parseFloat(ProductItem.sellPrice / 100).toFixed(2);
                    // });
                });
                console.log('获取全部订单', res);
            });
        },

        indexMethod(index) {
            return index * 2;
        },

        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pagesize = val;
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
        }
    }
};
</script>

<style lang="less" scoped>
.head {
    display: flex;
    width: 98%;
    height: 57px;
    background: #ffffff;
    border: 1px solid #ffffff;

    .head-item {
        margin-left: 40px;
        padding: 0px 18px;
        margin-top: 16px;
        height: 29px;
        line-height: 29px;

        font-size: 11px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #333333;
    }
    .on {
        border: 1px solid #333333;

        font-size: 11px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: #333333;
    }
}
.fileurl {
    width: 35px;
    height: 35px;
    background: #dcdcdc;
    border-radius: 14px;
}
.clearfix {
    display: flex;
    justify-content: space-between;
}
/deep/.el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 100px;
}
</style>
