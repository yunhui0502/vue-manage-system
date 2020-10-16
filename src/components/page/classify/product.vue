<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>商家管理</el-breadcrumb-item>
                    <el-breadcrumb-item>商品列表</el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <div class="text item">
               <el-table  :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="date" label="所属用户"> </el-table-column>
                    <el-table-column prop="name" label="用户商品"> </el-table-column>
                    <el-table-column prop="name" label="所在学校"> </el-table-column>
                    <el-table-column prop="name" label="价格"> </el-table-column>
                    <el-table-column prop="name" label="分类"> </el-table-column>
                    <el-table-column prop="name" label="发布时间"> </el-table-column>
                    <el-table-column prop="name" label="图片">
                          <template slot-scope="scope">
                            <img class="fileurl" :src="scope.row.fileId" alt="" />
                        </template>
                    </el-table-column>
                     <el-table-column fixed="right" width="120" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="deletes(scope.row.id)" class="text-red" size="small">删除</el-button>
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
export default {
    name: '',
    data() {
        return {
            tableData: [],
            currentPage3: 5
        };
    },
    created() {
        // this.categoryList();
    },
    methods: {
 
        deletes(id) {
            console.log(id);

            this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    let params = {
                        categoryId: id
                    };
                    api.deleteCategory(params, res => {
                        console.log(res);
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.categoryList();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        // 获取全部分类
        categoryList() {
            let params = {
                categoryType: 'store'
            };
            api.categoryList(params, res => {
                this.tableData = res.data.data;
                console.log('分类', res);
            });
        },

        // 添加分类
        addCategory() {
            console.log(this.formData.categoryId);
            if (this.formData.categoryId == undefined) {
                console.log('添加');
                api.addCategory(this.formData, res => {
                    console.log(res);
                    this.dialogFormVisible = false;
                });
            } else {
                console.log('修改');
                api.updateCategory(this.formData, res => {
                    console.log(res);
                    this.dialogFormVisible = false;
                });
            }
        },
        // 一级 下拉触发事件
        categshijan(e) {
            e--;
            console.log(e);
            let params = {
                categoryType: 'store',
                levelId: e
            };
            api.category(params, res => {
                this.onecatalogues = res.data.data;
                console.log('二级分类', res);
            });
        },
        indexMethod(index) {
            return index * 2;
        },
        // ----------------------------------------------------------------------
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleSuccess(esponse, file, fileList) {
            console.log('esponse', esponse), console.log('file', file), console.log('fileList', fileList);
            this.formData.fileId = esponse.data;
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
