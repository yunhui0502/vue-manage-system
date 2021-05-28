<template>
    <div>
        <div class="head">
            <span @click="Tab(0)" class="head-item" :class="tabindex == 0 ? 'on' : ''">全部</span>
            <span @click="Tab(1)" class="head-item" :class="tabindex == 1 ? 'on' : ''">成功</span>
            <span @click="Tab(2)" class="head-item" :class="tabindex == 2 ? 'on' : ''">订单异常</span>
            <span @click="Tab(3)" class="head-item" :class="tabindex == 3 ? 'on' : ''">已取消</span>
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
                    <el-table-column prop="orderCode" label="订单号">
                        <template slot-scope="scope">
                            {{ scope.row.secondOrderVideo.orderCode }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="orderCode" label="充值账号">
                        <template slot-scope="scope">
                            {{ scope.row.secondOrderVideo.uid }}
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="id" label="ID" align="center" show-overflow-tooltip></el-table-column> -->
                    <el-table-column prop="modifyTime" label="创建时间" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ scope.row.secondOrderVideo.createTime }}
                        </template>
                    </el-table-column>
                    <!-- <el-table-column prop="modifyTime" label="用户ID" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ scope.row.secondOrderVideo.userId }}
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="orderStatusUtf" label="交易状态" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ scope.row.secondOrderVideo.codeDesc }}
                        </template>
                    </el-table-column>payStatus
                    <el-table-column prop="orderStatusUtf" label="订单状态" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column  label="支付状态" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{ scope.row.secondOrderVideo.payStatus==0?'未付款':'已付款' }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="orderStatusUtf" label="操作" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                v-if="scope.row.secondOrderVideo.orderStatus == 'failed'"
                                @click="unusual(scope.row)"
                                class="text-red"
                                size="small"
                                >(异常)订单退款</el-button
                            >
                            <el-button
                                type="text"
                                v-if="scope.row.secondOrderVideo.payStatus == '1'"
                                @click="unusual(scope.row)"
                                class="text-red"
                                size="small"
                                >订单退款</el-button
                            >
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
    </div>
</template>

<script>
import orderApi from '@/service/order-api.js';
import paymentApi from '@/service/payment-api.js';

import store from '@/store';

// import procss from './procss.vue';
export default {
    name: '',
    components: {
        // procss
    },
    data() {
        return {
            text: '全部',
            tabindex: '',
            tableData: [],
            currentPage: 1,
            pagesize: 10,
            formLabelWidth: '120px'
        };
    },
    created() {
        this.selectOrder('all');
    },
    methods: {
        unusual(item) {
            //    let item = this.item;
            console.log(item);
            this.$confirm(`是否确定退款此退款会直接退回给客户?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    let paras = {
                        payOrderId: item.secondOrderVideo.payOrderId,
                        orderCode: item.secondOrderVideo.orderCode,
                        userId: item.secondOrderVideo.userId
                    };
                    paymentApi.refundVideo(paras, (res) => {
                        console.log(res);
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
        },
        Tab(e) {
            this.tabindex = e;
            if (e == '0') {
                this.selectOrder('all');
                this.text = '全部';
            } else if (e == '1') {
                this.selectOrder('success');
                this.text = '成功';
            } else if (e == '2') {
                this.selectOrder('failed');
                this.text = '订单异常';
            } else if (e == '3') {
                this.selectOrder('cancel');
                this.text = '已取消';
            }
        },
        // 获取全部订单
        selectOrder(e) {
            let params = {
                orderStatus: e, //订单状态
                type: 'video' //
            };
            orderApi.selectVideoOrderr(params, (res) => {
                console.log('获取全部订单', res);
                this.tableData = res.data.data;
                this.tableData.forEach((item) => {
                    // console.log('1', item);
                    // item.orderStatusUtf = item.orderStatus
                    if (item.secondOrderVideo.orderStatus == 'success') {
                        item.orderStatusUtf = '成功';
                    } else if (item.secondOrderVideo.orderStatus == 'failed') {
                        item.orderStatusUtf = '订单异常';
                    } else if (item.secondOrderVideo.orderStatus == 'payment') {
                        item.orderStatusUtf = '待付款';
                    }else if (item.secondOrderVideo.orderStatus == 'cancel') {
                        item.orderStatusUtf = '取消';
                    }
                });
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
