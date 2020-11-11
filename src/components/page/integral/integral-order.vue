<template>
    <div>
        <el-card class="box-card ">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>商家管理</el-breadcrumb-item>
                    <el-breadcrumb-item>积分商品订单</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="text item">
                <el-table :data="integralOrderData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%">
                    <el-table-column prop="integralId" label="订单号"> </el-table-column>
                    <el-table-column prop="integralName" label="积分商品"> </el-table-column>
                    <el-table-column prop="userName" label="兑换用户"> </el-table-column>
                    <el-table-column label="购买数量"> 1 </el-table-column>
                    <el-table-column prop="integralNeed" label="兑换积分"> </el-table-column>
                    <!-- <el-table-column prop="integralNeed" label="兑换积分"> </el-table-column> -->
                    <el-table-column prop="integralState" label="状态">
                        <template slot-scope="scope">
                            {{scope.row.integralState=='noUse'?'未使用':'已使用'}}
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
                        :total="integralOrderData.length"
                    >
                    </el-pagination>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import api from '@/service/product.js';
import userApi from '@/service/user-api.js';

export default {
    name: '',
    data() {
        return {
            integralOrderData: [],
            currentPage: 1,
            pagesize:10,
        };
    },
    created() {
        this.selectIntegralRecord();
    },
    methods: {
        selectIntegralRecord() {
            api.selectIntegralRecord({ IntegralType: 'product' }, res => {
                console.log('积分商品订单', res);
                this.integralOrderData = res.data.data;
                console.log(res);
            });
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
