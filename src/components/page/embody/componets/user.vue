<template>
  <!-- -----------------------------------------------------用户----------------------------------------------------------------- -->
    <div>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>商家管理</el-breadcrumb-item>
                    <el-breadcrumb-item>商家商品</el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <div class="text item">
                 <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="name" label="站点名称"> </el-table-column>
                    <el-table-column prop="realityMoney" label="提现金额"> </el-table-column>
                    <el-table-column prop="withdrawalMethod" label="提现方式"> </el-table-column>
                    <el-table-column prop="account" label="账号"> </el-table-column>
                    <el-table-column prop="createTime" label="申请时间"> </el-table-column>
                    <el-table-column prop="address" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">同意</el-button>
                            <el-button type="text" @click="deleteProduct(scope.row)" class="text-red" size="small">拒绝</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page.sync="currentPage3"
                        :page-size="100"
                        layout="prev, pager, next, jumper"
                        :total="1000"
                    >
                </el-pagination>
                </div>
            </div>
         </el-card>

    </div>
</template>

<script>
import api from '@/service/payment-api.js';


export default {
  name: '',
    data() {
        return {
            tabindex: 0,
            tableData: [],
            currentPage3:5,
    
        };
    },
    created() {
        this.selectWithdrawal();
    },
    methods: {
        Tab(e) {
            this.tabindex = e;
        },
              // 同意
        handleClick(row) {
            console.log(row);
              let params = {
                WithdrawalId: row.secondWithdrawal,
                originalType: 'check',
                type: 'complete',
                userId: '2'
            };
            api.disposeWithdrawalApply(params, (res) => {
                console.log(res);
                this.$message({
                    message: '已同意',
                    type: 'success'
                });
            });
        },
         // 拒绝
        deleteProduct(row) {
            let params = {
                WithdrawalId: row.secondWithdrawal,
                originalType: 'check',
                type: 'cancel',
                userId: '2'
            };
            api.disposeWithdrawalApply(params, (res) => {
                console.log(res);
                this.$message({
                    message: '已拒绝',
                    type: 'success'
                });
            });
        },

        // 查看提现列表
        selectWithdrawal() {
            api.selectWithdrawal('user', res => {
                this.tableData = res.data.data;
                console.log('查看提现列表',res);
            });
        },
        // -----------------------------------------------------------------------------------------------------------------------------------
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    }
};
</script>

<style lang="less" scoped>
.fileurl {
    width: 35px;
    height: 35px;
    background: #dcdcdc;
    border-radius: 14px;
}
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
.clearfix {
    display: flex;
    justify-content: space-between;
}
/deep/.el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 100px;
}

.abow_dialog {
    display: flex;
    justify-content: center;
    align-items: Center;
    overflow: hidden;
    /deep/.el-dialog {
        margin: 0 auto !important;
        height: 90%;
        overflow: hidden;
        /deep/.el-dialog__body {
            position: absolute;
            left: 0;
            top: 54px;
            bottom: 0;
            right: 0;
            padding: 0;
            z-index: 1;
            overflow: hidden;
            overflow-y: auto;
        }
    }
}
</style>
