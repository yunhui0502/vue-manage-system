<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>商家管理</el-breadcrumb-item>
                    <el-breadcrumb-item>商家分类</el-breadcrumb-item>
                </el-breadcrumb>
                <el-button @click="addClassify" style="float: right; padding: 3px 0" class="text-black" type="text"
                    >+ 添加分类</el-button
                >
            </div>

            <div class="text item">
                <el-table
                    :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                    style="width: 100%;"
                    row-key="id"
                    stripe
                    :tree-props="{ children: 'categories', hasChildren: 'hasChildren' }"
                >
                    <!-- <el-table-column type="index" label="序号" :index="indexMethod"></el-table-column> -->
                    <el-table-column prop="secondName" label="分类名称"> </el-table-column>
                    <el-table-column prop="level" label="级别" align="center">
                        <template slot-scope="">
                            一级类目
                        </template>
                    </el-table-column>
                    <el-table-column label="图片">
                        <template slot-scope="scope">
                            <img class="fileurl" :src="scope.row.file" alt="" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column fixed="right" width="120" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button @click="handlexClick(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button type="text" @click="deletes(scope.row.id)" class="text-red" size="small">删除</el-button>
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

        <el-dialog title="分类" :visible.sync="dialogFormVisible">
            <el-form ref="ruleForm" :model="formData">
                <el-form-item label="分类名称" prop="categoryName" :label-width="formLabelWidth">
                    <el-input v-model="formData.categoryName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片" :label-width="formLabelWidth">
                    <el-upload
                        action="http://39.100.237.144:7004/user/File/fileUpLoad"
                        list-type="picture-card"
                        ref="upload"
                        name="file"
                        :limit="1"
                        :on-preview="handlePictureCardPreview"
                        :on-success="handleSuccess"
                        :on-remove="handleRemove"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt />
                    </el-dialog>
                </el-form-item>
                <!-- <el-form-item label="级别" :label-width="formLabelWidth">
                    <el-input v-model="formData.sellPrice" autocomplete="off"></el-input>
                </el-form-item> -->
                <el-form-item v-if="Classify" label="等级" prop="levelId" :label-width="formLabelWidth">
                    <el-select @change="categshijan" v-model="formData.levelId" placeholder="请选择" style="margin-left: 38px;">
                        <el-option
                            change="categshijan"
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item v-if="Classify" label="所属分类" :label-width="formLabelWidth">
                    <el-select prop="parentCategoryId" v-model="formData.parentCategoryId" placeholder="请选择一级目录" style="margin-left: 38px;">
                        <el-option v-for="item in onecatalogues" :key="item.id" :label="item.secondName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addCategory">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import api from '@/service/product.js';
export default {
    name: '',
    data() {
        return {
            options: [
                {
                    value: '0',
                    label: '一级目录'
                },
                {
                    value: '1',
                    label: '二级目录'
                },
                {
                    value: '2',
                    label: '三级目录'
                }
            ],
            Classify:true,
            // 所属目录
            onecatalogues: [],
            // 判断一级目录选择的东西控制2 3 目录显示隐藏
            controlCatalogue: '0',
            formData: {
                categoryName: '', //类目名称
                categoryType: 'video', //分类类型
                fileId: [], //文件id
                levelId: '0', //级别
                parentCategoryId: '' //上级类目id
            },
            dialogImageUrl: '',
            dialogVisible: false,
            tableData: [],
            dialogFormVisible: false,
            currentPage: 1,
            pagesize:10,
            formLabelWidth: '120px'
        };
    },
    created() {
        this.category();
    },
    methods: {
        addClassify () {
            this.dialogFormVisible = true
            this.Classify= true
            this.formData.fileId = []
            this.formData.parentCategoryId = ''
            this.formData.levelId = '0'
            this.formData.categoryName = ''

        },
        resetForm(formData) {
            console.log(this.$refs[formData].resetFields())
            this.$refs[formData].resetFields();
            this.formData.fileId = []
            this.formData.parentCategoryId = ''
            this.formData.levelId = '0'
            this.formData.categoryName = ''
            this.$refs.upload.clearFiles();
        },
        handlexClick(row) {
            console.log(row);
            this.formData.categoryId = row.id;
            this.formData.categoryName = row.name;

            this.Classify= false;
            this.dialogFormVisible = true;
        },
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
                        console.log('删除',res);
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.category();
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
        category() {
            let params = {
                categoryType: 'video',
                levelId: '0',
            };
            api.category(params, res => {
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
                    // this.formData.categoryName = '';
                    this.resetForm('ruleForm')
                     this.categoryList();

                });
            } else {
                console.log('修改');
                api.updateCategory(this.formData, res => {
                    console.log(res);
                    this.dialogFormVisible = false;
                    // this.formData.categoryName = '';
                    this.resetForm('ruleForm')
                    this.categoryList();
                });
            }
        },
        // 一级 下拉触发事件
        categshijan(e) {
            e--;
            console.log(e);
            let params = {
                categoryType: 'video',
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
    width: 45px;
    height: 45px;
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
