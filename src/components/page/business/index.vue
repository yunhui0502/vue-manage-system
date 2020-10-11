<template>
    <div>
        <div class="head">
            <span @click="Tab(0)" class="head-item" :class="tabindex == 0 ? 'on' : ''">商家商品</span>
            <span @click="Tab(1)" class="head-item" :class="tabindex == 1 ? 'on' : ''">商家商品订单</span>
            <span @click="Tab(2)" class="head-item" :class="tabindex == 2 ? 'on' : ''">入驻商户</span>
            <span @click="Tab(3)" class="head-item" :class="tabindex == 3 ? 'on' : ''">待审核</span>
        </div>

        <el-card class="box-card" v-if="tabindex == 0">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>商家管理</el-breadcrumb-item>
                    <el-breadcrumb-item>商家商品</el-breadcrumb-item>
                </el-breadcrumb>
                <el-button @click="add" style="float: right; padding: 3px 0" class="text-black" type="text">+ 添加商品</el-button>
            </div>

            <div class="text item">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="nickName" label="商家名称"> </el-table-column>
                    <el-table-column prop="productName" label="商家商品"> </el-table-column>
                    <el-table-column prop="price" label="价格"> </el-table-column>
                    <el-table-column prop="createTime" label="上架时间"> </el-table-column>
                    <el-table-column prop="sellNumber" label="已售件数"> </el-table-column>
                    <el-table-column prop="address" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                            <el-button type="text" @click="deleteProduct(scope.row.id)" class="text-red" size="small">删除</el-button>
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

        <el-dialog :title="title" :visible.sync="dialogFormVisible">
            <el-form :model="formData">
                <el-form-item label="商品名称" :label-width="formLabelWidth">
                    <el-input v-model="formData.productName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品照片" :label-width="formLabelWidth">
                    <el-upload
                        action="http://39.100.237.144:7004/user/File/fileUpLoad"
                        list-type="picture-card"
                        name="file"
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
                <el-form-item label="分类" :label-width="formLabelWidth">
                    <el-select v-model="formData.categoryId" placeholder="请选择活动区域">
                        <el-option v-for="item in tertiaryClassify" :key="item.id" :label="item.secondName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="title !== '编辑商品'" label="商品库存" :label-width="formLabelWidth">
                    <el-input v-model="formData.goodsResp" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" :label-width="formLabelWidth">
                    <el-input v-model="formData.sellPrice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商家" :label-width="formLabelWidth">
                    <el-select v-model="formData.storeId" placeholder="请选择活动区域">
                        <el-option v-for="item in options" :key="item.storeId" :label="item.nickName" :value="item.storeId"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <!-- 富文本 -->
            <tinymce @fatherMethod="fatherMethod" style="margin: 10px;" ref="blc" :id="'tinymceBzlc'"></tinymce>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addProduct">确 定</el-button>
            </div>
        </el-dialog>

        <el-card class="box-card " v-if="tabindex == 1">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>商家管理</el-breadcrumb-item>
                    <el-breadcrumb-item>商家订单</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="text item">
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="date" label="订单号"> </el-table-column>
                    <el-table-column prop="name" label="商家名称"> </el-table-column>
                    <el-table-column prop="name" label="商家商品"> </el-table-column>
                    <el-table-column prop="name" label="买家"> </el-table-column>
                    <el-table-column prop="name" label="购买数量"> </el-table-column>
                    <el-table-column prop="name" label="价格"> </el-table-column>
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
import tinymce from '@/components/common/tinymce.vue';

import api from '@/service/product.js';
import userApi from '@/service/user-api.js';

export default {
    name: '',
    components: {
        tinymce
    },
    data() {
        return {
            editorOption: {
                placeholder: '这里是标题'
            },
            tertiaryClassify: [], //三级分类列表
            content: '', //富文本
            formData: {
                categoryId: '0', //类目
                file: [],
                goodsResp: '', //库存
                isPutaway: '0', //是否上架
                // linePrice: '200', //划线价格
                productDesc: '', //富文本
                productName: '', //商品名字
                sellPrice: '100', //售卖价格
                showType: 'coupon', //商品类型
                storeType: 'store',
                storeId: '' // 店铺id
            },
            tabindex: 0,
            dialogImageUrl: '',
            dialogVisible: false,
            options: [],
            tableData: [],
            dialogFormVisible: false,
            currentPage3: 5,
            formLabelWidth: '120px',
            title: '添加商品'
        };
    },
    created() {
        this.gitClassify();
        this.enterStoreList();
        this.selectProduct();
    },
    methods: {
        add() {
            this.dialogFormVisible = true;
            this.title = '添加商品';
            setTimeout(() => {
                this.$refs.blc.setData('');
            }, 10);

            this.formData = {
                categoryId: '0', //类目
                file: [],
                goodsResp: '', //库存
                isPutaway: '0', //是否上架
                // linePrice: '200', //划线价格
                productDesc: '', //富文本
                productName: '', //商品名字
                sellPrice: '100', //售卖价格
                showType: 'coupon', //商品类型
                storeType: 'store',
                storeId: '' // 店铺id
            };
        },
        handleClick(row) {
            this.title = '编辑商品';
            this.dialogFormVisible = true;
            this.formData = row;
            this.formData.sellPrice = row.price;
            console.log(row);
            setTimeout(() => {
                this.$refs.blc.setData(row.productDesc);
            }, 10);
        },
        fatherMethod() {
            // this.dialogshow = true;
        },
        // 删除
        deleteProduct(id) {
            this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    let params = {
                        productId: id
                    };
                    api.deleteProduct(params, res => {
                        console.log(res);
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.selectProduct();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        // 添加商品
        addProduct() {
            if (this.title == '添加商品') {
                console.log('添加商品');
                this.formData.productDesc = this.$refs.blc.release();
                api.addProduct(this.formData, res => {
                    console.log(res);
                    this.dialogFormVisible = false;
                });
            } else {
                console.log('编辑商品');
                this.formData.productDesc = this.$refs.blc.release();
                api.updateProduct(this.formData, res => {
                    console.log(res);
                    this.dialogFormVisible = false;
                });
            }
        },
        // 获取商家
        enterStoreList() {
            userApi.enterStoreList(res => {
                this.options = res.data.data;
                console.log(res);
            });
        },
        // 获取列表
        selectProduct() {
            api.selectProduct({ showType: 'coupon' }, res => {
                this.tableData = res.data.data.list;
                console.log(res);
            });
        },
        Tab(e) {
            this.tabindex = e;
        },
        // 获取三级分类
        gitClassify() {
            let params = {
                categoryType: 'store',
                levelId: '2'
            };
            api.category(params, res => {
                this.tertiaryClassify = res.data.data;
                this.formData.categoryId = res.data.data[0].id;
                console.log('三级分类', res);
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
