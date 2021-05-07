<template>
    <div>
        <div class="head">
            <span @click="Tab(0)" class="head-item" :class="tabindex == 0 ? 'on' : ''">全部</span>
            <span @click="Tab(1)" class="head-item" :class="tabindex == 1 ? 'on' : ''">成功</span>
            <span @click="Tab(2)" class="head-item" :class="tabindex == 2 ? 'on' : ''">订单异常</span>
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
                    <el-table-column prop="orderCode" label="订单号"> </el-table-column>
                    <el-table-column prop="id" label="ID" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="modifyTime" label="时间" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="orderStatusUtf" label="订单状态" align="center" show-overflow-tooltip></el-table-column>
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
            }
        },
        // 获取全部订单
        selectOrder(e) {
            let params = {
                orderStatus: e, //订单状态
                type: 'video' //
            };
            orderApi.selectVideoOrderr(params, (res) => {
                this.tableData = res.data.data;
                this.tableData.forEach((item) => {
                    console.log('1', item);
                    // item.orderStatusUtf = item.orderStatus
                    if (item.orderStatus == 'success') {
                        item.orderStatusUtf = '待支付';
                    } else if (item.orderStatus == 'success') {
                        item.orderStatusUtf = '待发货';
                    }
                    item.orderProductLists.forEach((ProductItem) => {
                        //  value =
                        item.sellPrice = parseFloat(ProductItem.sellPrice / 100).toFixed(2);
                    });
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
