<template>
    <div>
        <div class="head">
            <span @click="Tab(0)" class="head-item" :class="tabindex == 0 ? 'on' : ''">视频商品</span>
            <span @click="Tab(4)" class="head-item" :class="tabindex == 4 ? 'on' : ''">视频分类</span>
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
                <el-table :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)" stripe style="width: 100%">
                    <!-- <el-table-column prop="nickName" label="商家名称"> </el-table-column> -->
                    <el-table-column prop="productName" label="视频名称"> </el-table-column>
                    <el-table-column prop="price" label="价格">
                        <template slot-scope="scope">
                            {{ numFilter(scope.row.price / 100) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="createTime" label="上架时间"> </el-table-column>
                    <!-- <el-table-column prop="sellNumber" label="已售件数"> </el-table-column> -->
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
                        :current-page.sync="currentPage"
                        :page-size="pagesize"
                        layout="prev, pager, next, jumper"
                        :total="tableData.length"
                    >
                    </el-pagination>
                </div>
            </div>
        </el-card>

        <!-- 现在添加视频 -->
        <el-dialog :title="title" :visible.sync="dialogFormVisible">
            <el-form ref="ruleForm" :model="formData">
                <el-form-item label="商品名称" prop="productName" :label-width="formLabelWidth">
                    <el-input v-model="formData.productName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品照片" :label-width="formLabelWidth">
                    <el-upload
                        action="https://swcloud.tjsichuang.cn:1444/second/user/File/fileUpLoad"
                        list-type="picture-card"
                        name="file"
                        ref="upload"
                        :file-list="fileList"
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
                <el-form-item label="分类" prop="categoryId" :label-width="formLabelWidth">
                    <el-select v-model="formData.CategoryId" placeholder="请选择活动区域">
                        <el-option v-for="item in tertiaryClassify" :key="item.id" :label="item.secondName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="itemId" label="商品编号" :label-width="formLabelWidth">
                    <el-input v-model="formData.itemId" placeholder="充值平台方提供" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item  prop="quantity" label="商品库存" :label-width="formLabelWidth">
                    <el-input v-model="formData.quantity" placeholder="请输入商品库存" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品面值" prop="sellPrice" :label-width="formLabelWidth">
                    <el-input
                        v-model="checkItemFacePrice"
                        placeholder="用于验证上传面值是否跟系统itemId的面值一致"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="成本价格" prop="sellPrice" :label-width="formLabelWidth">
                    <el-input v-model="itemPrice" placeholder="对于代理方而言，就是成本价格" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="划线价格" prop="sellPrice" :label-width="formLabelWidth">
                    <el-input v-model="linePrice" placeholder="请输入划线" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="销售价格" prop="sellPrice" :label-width="formLabelWidth">
                    <el-input v-model="price" placeholder="销售价格" autocomplete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item label="商家" prop="storeId" :label-width="formLabelWidth">
                    <el-select v-model="formData.storeId" placeholder="请选择活动区域">
                        <el-option v-for="item in options" :key="item.storeId" :label="item.nickName" :value="item.storeId"></el-option>
                    </el-select>
                </el-form-item> -->
            </el-form>
            <!-- 富文本 -->
            <tinymce @fatherMethod="fatherMethod" style="margin: 10px" ref="blc" :id="'tinymceBzlc'"></tinymce>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addProduct">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 原先添加商品 -->
        <!-- <el-dialog :title="title" :visible.sync="dialogFormVisible">
            <el-form  ref="ruleForm" :model="formData">
                <el-form-item label="商品名称" prop="productName" :label-width="formLabelWidth">
                    <el-input v-model="formData.productName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品照片" :label-width="formLabelWidth">
                    <el-upload
                        action="https://swcloud.tjsichuang.cn:1444/second/user/File/fileUpLoad"
                        list-type="picture-card"
                        name="file"
                        ref="upload"
                        :file-list="fileList"
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
                <el-form-item label="分类" prop="categoryId" :label-width="formLabelWidth">
                    <el-select v-model="categoryId" placeholder="请选择活动区域">
                        <el-option v-for="item in tertiaryClassify" :key="item.id" :label="item.secondName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item v-if="title !== '编辑商品'" prop="goodsResp" label="商品库存" :label-width="formLabelWidth">
                    <el-input v-model="formData.goodsResp" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop="sellPrice" :label-width="formLabelWidth">
                    <el-input v-model="sellPrice" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="商家" prop="storeId" :label-width="formLabelWidth">
                    <el-select v-model="formData.storeId" placeholder="请选择活动区域">
                        <el-option v-for="item in options" :key="item.storeId" :label="item.nickName" :value="item.storeId"></el-option>
                    </el-select>
                </el-form-item>
            </el-form> -->
        <!-- 富文本 -->
        <!-- <tinymce @fatherMethod="fatherMethod" style="margin: 10px" ref="blc" :id="'tinymceBzlc'"></tinymce>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addProduct">确 定</el-button>
            </div>
        </el-dialog> -->

        <div v-if="tabindex == 1">
            <order></order>
        </div>
        <div v-if="tabindex == 4">
            <category></category>
        </div>
        <div v-if="tabindex == 2">
            <settled></settled>
        </div>
        <div v-if="tabindex == 3">
            <audit></audit>
        </div>
    </div>
</template>

<script>
import tinymce from '@/components/common/tinymce.vue';

import category from './components/Item-category.vue';
import settled from './components/Settled.vue';
import audit from './components/audit.vue';
import order from './components/order.vue';

import api from '@/service/product.js';
import userApi from '@/service/user-api.js';

export default {
    name: '',
    components: {
        tinymce,
        category,
        settled,
        audit,
        order
    },
    data() {
        return {
            editorOption: {
                placeholder: '这里是标题'
            },
            tertiaryClassify: [], //三级分类列表
            content: '', //富文本
            sellPrice: '',
            categoryId: '',
            fileList: [],
            // formData: {
            //     categoryId: 86, //类目
            //     file: [],
            //     file1: '',
            //     goodsResp: '', //库存
            //     isPutaway: '0', //是否上架
            //     // linePrice: '200', //划线价格
            //     productDesc: '', //富文本
            //     productName: '', //商品名字
            //     sellPrice: '100', //售卖价格
            //     showType: 'coupon', //商品类型
            //     storeType: 'store',
            //     storeId: '' // 店铺id
            // },
            itemPrice: '', // 商品销售价格，单位厘；1元=1000厘（对于代理方而言，就是成本价格）
            linePrice: '', // 划线价格,单位分
            price: '', // 销售价格,单位分
            checkItemFacePrice: '', // 商品面值(单位厘:1元=1000厘，用于验证上传面值是否跟系统itemId的面值一致)
            formData: {
                checkItemFacePrice: '', // 商品面值(单位厘:1元=1000厘，用于验证上传面值是否跟系统itemId的面值一致)
                file: '', // 商品展示图
                quantity: '', // 库存数量
                isPutaway: '0', // 是否上架
                itemId: '', // 商品编号(充值平台方提供)
                itemPrice: '', // 商品销售价格，单位厘；1元=1000厘（对于代理方而言，就是成本价格）
                linePrice: '', // 划线价格,单位分
                price: '', // 销售价格,单位分
                CategoryId: '',
                productDesc: '', // 商品描述
                productName: '' // 商品名称
            },
            tabindex: 0,
            dialogImageUrl: '',
            dialogVisible: false,
            options: [],
            tableData: [],
            dialogFormVisible: false,
            currentPage: 1,
            pagesize: 10,
            formLabelWidth: '120px',
            title: '添加商品'
        };
    },
    created() {
        this.gitClassify();
        // this.enterStoreList();
        this.selectVideoProduct();
    },
    methods: {
        numFilter(value) {
            // 截取当前数据到小数点后两位
            let realVal = parseFloat(value).toFixed(2);
            return realVal;
        },
        // 获取列表
        selectVideoProduct() {
            api.selectVideoProduct((res) => {
                this.tableData = res.data.data;
                // this.tableData.forEach((item) => {
                //     item.price = parseFloat(item.price / 100).toFixed(2);
                // });
                console.log(res);
            });
        },
        resetForm(formData) {
            console.log(this.$refs[formData].resetFields());
            this.$refs[formData].resetFields();
            this.categoryId = '';
            this.sellPrice = '';
            this.$refs.upload.clearFiles();
        },
        add() {
            this.dialogFormVisible = true;
            this.title = '添加商品';
            setTimeout(() => {
                this.$refs.blc.setData('');
            }, 10);
             this.$refs.upload.clearFiles();
            this.formData = {
                checkItemFacePrice: '', // 商品面值(单位厘:1元=1000厘，用于验证上传面值是否跟系统itemId的面值一致)
                file: '', // 商品展示图
                quantity: '', // 库存数量
                isPutaway: '0', // 是否上架
                itemId: '', // 商品编号(充值平台方提供)
                itemPrice: '', // 商品销售价格，单位厘；1元=1000厘（对于代理方而言，就是成本价格）
                linePrice: '', // 划线价格,单位分
                price: '', // 销售价格,单位分
                CategoryId:'',
                productDesc: '', // 商品描述
                productName: '' // 商品名称
            };
            this.itemPrice ='' // 商品销售价格，单位厘；1元=1000厘（对于代理方而言，就是成本价格）
            this.linePrice = '' // 划线价格,单位分
            this.price = '' // 销售价格,单位分
            this.checkItemFacePrice ='' // 商品面值(单位厘:1元=1000厘，用于验证上传面值是否跟系统itemId的面值一致)
        },
        // 鼠标移入图片
        mouseoverImg() {
            if (this.$refs.img.src === this.uploadImage) {
                // this.$refs.imgDelete.style.display = 'none'
            } else {
                // this.$refs.imgDelete.style.display = 'block'
            }
        },
        // 鼠标移出图片
        mouseoutImg() {
            // this.$refs.imgDelete.style.display = 'none'
        },
        deleteImg2(e) {
            console.log(e);

            this.$confirm('是否删除该照片?', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    api.deleteRatation(e.id, (res) => {
                        this.getRatation();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },

        handleClick(row) {
            this.title = '编辑商品';
            this.dialogFormVisible = true;
            this.fileList = [];
            this.formData = row;
            this.formData.CategoryId = row.categoryId;
            
            this.price = row.price / 100;
            this.linePrice = row.linePrice / 100;
            this.itemPrice = row.itemPrice / 1000;
            this.checkItemFacePrice = row.checkItemFacePrice / 1000;
            // this.sellPrice = row.price;
            
            this.fileList.push({ url: row.file });
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
                    api.deleteVideoProduct(params, (res) => {
                        console.log(res);
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.selectVideoProduct();
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
                if (this.itemPrice == '') {
                    this.$message({
                        message: '销售价',
                        type: 'warning'
                    });
                    return;
                }
                 if (this.linePrice == '') {
                    this.$message({
                        message: '请输入划线价格',
                        type: 'warning'
                    });
                    return;
                }
                 if (this.price == '') {
                    this.$message({
                        message: '请输入价格',
                        type: 'warning'
                    });
                    return;
                }
                if (this.checkItemFacePrice == '') {
                    this.$message({
                        message: '请输入商品面值',
                        type: 'warning'
                    });
                    return;
                }
                this.formData.productDesc = this.$refs.blc.release();
                this.formData.price = (this.price * 10000) / 100;
                this.formData.linePrice = (this.linePrice * 10000) / 100;
                this.formData.itemPrice = this.itemPrice * 1000;
                this.formData.checkItemFacePrice = this.checkItemFacePrice * 1000;
                console.log(this.formData)
                api.addVideoProduct(this.formData, (res) => {
                    console.log(res);
                    this.selectVideoProduct();
                    this.dialogFormVisible = false;
                    this.resetForm('ruleForm');
                });
                // this.formData.categoryId = this.categoryId;
                // api.addProduct(this.formData, (res) => {
                //     console.log(res);
                //     this.selectVideoProduct();
                //     this.dialogFormVisible = false;
                //     this.resetForm('ruleForm');
                // });
            } else {
                console.log('编辑商品');
                this.formData.productDesc = this.$refs.blc.release();
                this.formData.price = (this.price * 10000) / 100;
                this.formData.linePrice = (this.linePrice * 10000) / 100;
                this.formData.itemPrice = this.itemPrice * 1000;
                this.formData.checkItemFacePrice = this.checkItemFacePrice * 1000;
                this.formData.productId = this.formData.id;
                console.log(this.formData);
                api.updateVideoProduct(this.formData, (res) => {
                    console.log(res);
                    this.dialogFormVisible = false;
                    this.$refs.upload.clearFiles();
                    this.selectVideoProduct();
                });
                // api.updateProduct(this.formData, (res) => {
                //     console.log(res);
                //     this.dialogFormVisible = false;
                //     this.$refs.upload.clearFiles();
                //     this.selectProduct();
                // });
            }
        },
        // 获取商家
        enterStoreList() {
            userApi.enterStoreList((res) => {
                this.options = res.data.data;
                console.log(res);
            });
        },

        Tab(e) {
            this.tabindex = e;
            if (e == 0) {
                this.gitClassify();
                this.enterStoreList();
                this.selectVideoProduct();
            }
        },
        // 获取三级分类
        gitClassify() {
            let params = {
                categoryType: 'video',
                levelId: '0'
            };
            api.category(params, (res) => {
                this.tertiaryClassify = res.data.data;
                // this.formData.categoryId = res.data.data[0].id;
                console.log('yi级分类', res);
            });
        },
        // ----------------------------------------------------------------------
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handleSuccess(esponse, file, fileList) {
            console.log('esponse', esponse), console.log('file', file), console.log('fileList', fileList);
            this.formData.file = esponse.data;
            // this.formData.file1 = esponse.data;
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
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
