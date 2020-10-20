<template>
    <div>
        <div class="head">
            <span @click="Tab(0)" class="head-item" :class="tabindex == 0 ? 'on' : ''">站点列表</span>
            <span @click="Tab(1)" class="head-item" :class="tabindex == 1 ? 'on' : ''">添加站点</span>
        </div>

        <el-card class="box-card" v-if="tabindex == 0">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>商家管理</el-breadcrumb-item>
                    <el-breadcrumb-item>站点列表</el-breadcrumb-item>
                </el-breadcrumb>
                <!-- <el-button @click="add" style="float: right; padding: 3px 0" class="text-black" type="text">+ 新建积分商品</el-button> -->
            </div>

            <div class="text item">
                <el-table :data="tableData" style="width: 100%" stripe>
                    <!-- <el-table-column type="index" label="序号" :index="indexMethod"></el-table-column> -->
                    <el-table-column prop="sonName" label="站点名称 "> </el-table-column>
                    <el-table-column prop="collegoryName" label="站点地址 "> </el-table-column>
                    <el-table-column prop="integralQuantity" label="站点状态">
                        <el-switch v-model="value" active-color="#343434" inactive-color="#DCDCDC"></el-switch>
                    </el-table-column>
                    <el-table-column prop="createTime" label="站点创建时间" align="center" show-overflow-tooltip></el-table-column>
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
                        :current-page.sync="currentPage3"
                        :page-size="100"
                        layout="prev, pager, next, jumper"
                        :total="1000"
                    >
                    </el-pagination>
                </div>
            </div>
        </el-card>

        <el-dialog title="站点编辑" :visible.sync="dialogFormVisible">
            <el-form :model="formData">
                <el-form-item label="站点名称" :label-width="formLabelWidth">
                    <el-input v-model="form1.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="站点地址" :label-width="formLabelWidth">
                    <el-select v-model="form1.collegoryId" placeholder="请选择活动区域">
                        <el-option
                            v-for="item in options"
                            :key="item.collegesId"
                            :label="item.collegesName"
                            :value="item.collegesId"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="管理员账号" :label-width="formLabelWidth">
                    <el-input v-model="form1.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="管理员密码" :label-width="formLabelWidth">
                    <el-input v-model="form1.password" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addIntegralProduct">确 定</el-button>
            </div>
        </el-dialog>

        <el-card class="box-card" v-if="tabindex == 1">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item>商家管理</el-breadcrumb-item>
                    <el-breadcrumb-item>添加站点</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="text item">
                <el-form ref="form" :model="form" label-width="140px">
                    <el-form-item label="站点logo">
                        <el-upload
                            action="http://39.100.237.144:7004/user/File/fileUpLoad"
                            list-type="picture-card"
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
                    <el-form-item label="站点名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="站点地址">
                        <el-select v-model="form.collegoryId" placeholder="请选择活动区域">
                            <el-option
                                v-for="item in options"
                                :key="item.collegesId"
                                :label="item.collegesName"
                                :value="item.collegesId"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="站点地址">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item> -->
                    <el-form-item label="管理员账号">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="管理员密码">
                        <el-input v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item label="站点客服">
                        <el-input v-model="form.service"></el-input>
                    </el-form-item>
                    <el-form-item label="客服微信">
                        <el-input v-model="form.WeChat"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="addSon" type="primary">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
import api from '@/service/product.js';
import userApi from '@/service/user-api.js';

// import withdraw from './withdraw.vue';
export default {
    name: '',
    components: {
        // withdraw
    },
    data() {
        return {
            value: true,
            form: {
                collegoryId: '', //学校id
                file: '', //file
                name: '', //子站点名称
                password: '', //登录密码
                userId: '', //用户id
                username: '', //登录用户名
                WeChat: '',
                service: ''
            },
            form1: {
                collegoryId: '', //学校id
                name: '', //子站点名称
                password: '', //登录密码
                sonId: '', //
                username: '', //登录用户名
            },
            tableData: [],
            options: '',
            formData: {
                file1: '',
                productName: '',
                limit: '',
                quantity: '',
                sellPrice: '',
                storeId: '',
                type: 'product'
            },
            tabindex: 0,
            dialogImageUrl: '',
            dialogVisible: false,
            tableDataEmbody: [],
            integralOrderData: [],
            dialogFormVisible: false,
            currentPage3: 5,
            formLabelWidth: '120px'
        };
    },
    created() {
        this.ListSon();
        this.colleges();
        // this.selectIntegralRecord();
    },
    methods: {
        // 子站点列表
        ListSon() {
            userApi.ListSon((res) => {
                this.tableData = res.data.data;
                console.log('子站点列表', res);
            });
        },
        // 学校查询
        colleges() {
            userApi.colleges((res) => {
                this.options = res.data.data;
                console.log(res);
            });
        },
        addSon() {
            console.log(1);
            console.log(this.form);
            userApi.addSon(this.form, (res) => {
                console.log(res);
            });
        },
         handlexClick(row) {
            console.log(row);
            this.form1.collegoryId = row.collegoryId;
            this.form1.name = row.sonName;
            this.form1.sonId = row.id;
            this.dialogFormVisible = true;
        },
        // 添加积分商品
        addIntegralProduct() {
            console.log('修改');
            userApi.updateSon(this.form1, (res) => {
                console.log(res);
                this.dialogFormVisible = false;
            });
        },
        deletes(id) {
            console.log(id);
            
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    userApi.deleteSon({id: id}, (res) => {
                        console.log(res);
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.ListSon();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },

        add() {
            this.dialogFormVisible = true;
            this.formData = {
                file1: '',
                productName: '',
                limit: '',
                quantity: '',
                sellPrice: '',
                storeId: '',
                type: 'product'
            };
        },
        selectIntegralRecord() {
            api.selectIntegralRecord({ IntegralType: 'product' }, (res) => {
                this.integralOrderData = res.data.data;
                console.log(res);
            });
        },



        indexMethod(index) {
            return index * 2;
        },
        Tab(e) {
            this.tabindex = e;
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
            this.form.file = esponse.data;
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
.el-input {
    width: 302px;
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
