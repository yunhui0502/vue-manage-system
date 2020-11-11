<template>
    <div>
        <div class="head">
            <span @click="Tab(0)" class="head-item" :class="tabindex == 0 ? 'on' : ''">普通用户</span>
            <span @click="Tab(1)" class="head-item" :class="tabindex == 1 ? 'on' : ''">学生认证</span>
        </div>

        <el-card class="box-card" v-if="tabindex == 0">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>商家管理</el-breadcrumb-item>
                    <el-breadcrumb-item>普通用户</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="text item">
                <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%">
                    <el-table-column prop="userId" label="用户ID"> </el-table-column>
                    <el-table-column prop="name" label="头像">
                        <template slot-scope="scope">
                            <img class="fileurl" :src="scope.row.fileId" alt="" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="nickName" label="用户昵称"> </el-table-column>
                    <el-table-column prop="phone" label="联系方式"> </el-table-column>
                    <el-table-column prop="createTime" label="提交时间"> </el-table-column>
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

        <el-card class="box-card" v-if="tabindex == 1">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>商家管理</el-breadcrumb-item>
                    <el-breadcrumb-item>学生认证</el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <div class="text item">
                <el-table :data="options.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%">
                    <el-table-column prop="userId" label="用户ID"> </el-table-column>
                    <el-table-column prop="productName" label="头像">
                        <template slot-scope="scope">
                            <img class="fileurl" :src="scope.row.fileId" alt="" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="nickName" label="用户昵称"> </el-table-column>
                    <el-table-column prop="college" label="认证学校"> </el-table-column>
                    <el-table-column prop="productNum" label="发布商品数量"> </el-table-column>
                    <el-table-column prop="buyProductNum" label="购买商品数量"> </el-table-column>
                    <el-table-column prop="phone" label="联系方式"> </el-table-column>
                    <el-table-column prop="createTime" label="注册时间"> </el-table-column>
                    <el-table-column prop="income" label="收入流水"> </el-table-column>
                    <el-table-column prop="expend" label="支出流水"> </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                        background
                        @size-change="handleSizeChange2"
                        @current-change="handleCurrentChange2"
                        :current-page.sync="currentPage2"
                        :page-size="pagesize2"
                        layout="prev, pager, next, jumper"
                        :total="options.length"
                    >
                    </el-pagination>
                </div>
            </div>
        </el-card>

    </div>
</template>

<script>
import store from '@/store';

import api from '@/service/product.js';
import userApi from '@/service/user-api.js';

export default {
    name: '',
    data() {
        return {
            options: [],
            tableData: [],
            tabindex: 0,
            currentPage: 1,
            pagesize:10,
            currentPage2: 1,
            pagesize2:10,
            formLabelWidth: '120px',
            title: '添加商品'
        };
    },
    created() {
        this.common();
        this.selectProduct();
    },
    methods: {
        // 学生认证
        selectProduct() {
            userApi.UserList(0, (res) => {
                this.options = res.data.data;
                console.log('学生认证',res);
            });
        },
          // 普通用户
        common() {
            userApi.UserList(1, (res) => {
                this.tableData = res.data.data;
                console.log('普通用户',res);
            });
        },
        Tab(e) {
            this.tabindex = e;
        },
        // ----------------------------------------------------------------------

        // ----------------------------------------------------------------------
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pagesize = val;
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
             this.currentPage = val;
        },
        handleSizeChange2(val) {
            console.log(`每页 ${val} 条`);
            this.pagesize2 = val;
        },
        handleCurrentChange2(val) {
            console.log(`当前页: ${val}`);
             this.currentPage2 = val;
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
