<template>
  <!-- -----------------------------------------------------入驻商户----------------------------------------------------------------- -->
    <div>
        <el-card class="box-card ">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>商家管理</el-breadcrumb-item>
                    <el-breadcrumb-item>入驻商家</el-breadcrumb-item>
                </el-breadcrumb>
                <!-- <el-button @click="add" style="float: right; padding: 3px 0" class="text-black" type="text">+ 添加商品</el-button> -->
            </div>

            <div class="text item">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="storeId" label="用户ID"> </el-table-column>
                    <el-table-column prop="nickName" label="用户昵称"> </el-table-column>
                    <el-table-column prop="storeName" label="商家名称"> </el-table-column>
                    <el-table-column prop="storeAddress" label="商户地址"> </el-table-column>
                    <el-table-column prop="phone" label="联系方式"> </el-table-column>
                    <el-table-column label="营业执照">
                        <template slot-scope="scope">
                            <img class="fileurl" :src="scope.row.fileId" alt="" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="address" label="操作">
                        <template slot-scope="scope">
                            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button> -->
                            <el-button type="text" @click="deleteProduct(scope.row.storeId)" class="text-red" size="small">删除</el-button>
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

import api from '@/service/product.js';
import userApi from '@/service/user-api.js';

export default {
    name: '',

    data() {
        return {
    
            tableData: [],
            currentPage3: 5,
    
        };
    },
    created() {
        this.enterStoreList();
        // this.selectProduct();
    },
    methods: {
        // 删除
        deleteProduct(id) {
            this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    let params = {
                        storeId: id
                    };
                    api.enterStoreDelete(params, res => {
                        console.log(res);
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.enterStoreList();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        // 获取列表
        enterStoreList() {
            userApi.enterStoreList( res => {
                this.tableData = res.data.data;
                console.log(res);
            });
        },
        // ----------------------------------------------------------------------
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handleSuccess(esponse, file, fileList) {
            console.log('esponse', esponse), console.log('file', file), console.log('fileList', fileList);
            this.formData.file = esponse.data;
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // ----------------------------------------------------------------------
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
