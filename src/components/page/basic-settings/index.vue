<template>
    <div>
        <div class="head">
            <span @click="Tab(0)" class="head-item" :class="tabindex == 0 ? 'on' : ''">基础信息</span>
            <!-- <span @click="Tab(1)" class="head-item" :class="tabindex == 1 ? 'on' : ''">用户端小程序设置</span>
            <span @click="Tab(2)" class="head-item" :class="tabindex == 2 ? 'on' : ''">商家端小程序设置</span>
            <span @click="Tab(3)" class="head-item" :class="tabindex == 3 ? 'on' : ''">支付设置</span>
            <span @click="Tab(4)" class="head-item" :class="tabindex == 4 ? 'on' : ''">退款设置</span> -->
            <span @click="Tab(5)" class="head-item" :class="tabindex == 5 ? 'on' : ''">消息通知</span>
        </div>

        <el-card class="box-card" v-if="tabindex == 0">
            <div slot="header" class="clearfix">
                <span>基础设置 > 基础信息</span>
            </div>
            <div class="text item">
                <el-form ref="form" :model="form" label-width="140px">
                    <el-form-item style="" label="首页轮播图">
                        <el-upload
                            action="https://www.tjsichuang.cn:1443/second/user/File/fileUpLoad"
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
                        <div class="personal">
                            <div class="content">
                                <!-- 1.标题及图像说明 -->
                                <!-- 2.图像区域 -->
                                <div class="content-image">
                                    <div v-for="(item, i) in tableDataUrl2" :key="i" class="upload-photo">
                                        <li v-on:mouseover="mouseoverImg()" v-on:mouseout="mouseoutImg()">
                                            <img ref="img" :src="item.file" />
                                            <div ref="imgDelete" class="delete-img">
                                                <i class="el-icon-delete" @click="deleteImg2(item)"></i>
                                            </div>
                                        </li>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                    <!-- <el-form-item label="平台客服">
                        <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                        >
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt />
                        </el-dialog>
                    </el-form-item> -->
                    <el-form-item label="平台客服">
                        <el-input v-model="form.service"></el-input>
                    </el-form-item>
                    <el-form-item label="客服微信">
                        <el-input v-model="form.weChat"></el-input>
                    </el-form-item>
                    <el-form-item label="新用户学生认证">
                        <el-input v-model="form.newUserIntegral"></el-input>
                        <span>积分</span>
                    </el-form-item>
                    <el-form-item label="站点提现费率">
                        <el-input v-model="form.sonWithdrawalCommission"></el-input>
                        <span>%</span>
                    </el-form-item>
                    <el-form-item label="商家提现费率">
                        <el-input v-model="form.storeWithdrawalCommission"></el-input>
                        <span>%</span>
                    </el-form-item>
                    <el-form-item label="用户提现费率">
                        <el-input v-model="form.userWithdrawalCommission"></el-input>
                        <span>%</span>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="AddBasics" type="primary">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>

        <el-card class="box-card" v-if="tabindex == 1">
            <div slot="header" class="clearfix">
                <span>基础设置 > 用户端小程序设置</span>
            </div>
            <div class="text item">
                <el-form ref="form" :model="form" label-width="140px">
                    <el-form-item label="平台客服">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="客服微信">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="新用户学生认证">
                        <el-input v-model="form.name"></el-input>
                        <span>积分</span>
                    </el-form-item>

                    <el-form-item label="用户提现费率">
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="3"
                            :on-exceed="handleExceed"
                            :file-list="fileList"
                        >
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary">确定</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>

        <div v-if="tabindex == 5">
            <refund></refund>
        </div>
    </div>
</template>

<script>
import userApi from '@/service/user-api.js';
import refund from './refund.vue';
export default {
    name: '',
    components: {
        refund
    },
    data() {
        return {
            tableDataUrl2: '',
            tabindex: 0,
            fileList: ['https://www.tjsichuang.cn:1443/second/user/File/getPicture?id=213'],
            dialogImageUrl: '',
            dialogVisible: false,
            websocket: '',
            form: {
                newUserIntegral: '', //新用户认证加的积分
                service: '', //客服
                slideshow: ['https://www.tjsichuang.cn:1443/second/user/File/getPicture?id=213'], //轮播图
                sonWithdrawalCommission: '', //子站点提现手续费率
                storeWithdrawalCommission: '', //商家提现手续费率
                userWithdrawalCommission: '', //用户提现手续费率
                weChat: '' //微信
            }
        };
    },
    created() {
        this.select();
    },
    methods: {
        select() {
            userApi.select((res) => {
                console.log(res);
                this.tableDataUrl2 = res.data.data;
            });
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
                    let param = {
                        file: e.file,
                        type: e.fileType
                    };
                    userApi.deleted(param, (res) => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.select();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        AddBasics() {
            userApi.AddBasics(this.form, (res) => {
                console.log(res);
            });
        },
        Tab(e) {
            this.tabindex = e;
        },
        // -----------------第1个上传--------------------
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // -------------------------------------

        // -----------------第2个上传--------------------
        // handleRemove(file, fileList) {
        //     console.log(file, fileList);
        // },
        handleSuccess(esponse, file, fileList) {
            console.log('esponse', esponse), console.log('file', file), console.log('fileList', fileList);
            this.form.slideshow.push(esponse.data);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(
                `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
            );
        },
        // eslint-disable-next-line no-unused-vars
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        }
        // -------------------------------------
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

/deep/.el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 100px;
}
.el-input {
    width: 302px;
}
.personal {
    margin: 10px 0;
    padding: 10px;
    // background: #f0f0f0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow-y: hidden;
    border-radius: 3px;
    padding-bottom: 20px;
    .content {
        background-color: #fff;
        width: 100%;
        height: 100%;
        border-radius: 6px;
        padding: 10px;
        // overflow-y: scroll;
        overflow: hidden;
        display: flex;
        padding: 10px 0;
        flex-direction: column;
        //  1.标题及图像说明
        .content-desc {
            margin: 0px 10px;
            .title {
                font-size: 16px;
                border-left: 5px solid #2d8cf0;
                padding-left: 10px;
                margin-bottom: 16px;
            }
            .desc {
                margin-left: 18px;
            }
        }
        // 2.图像区域
        .content-image {
            display: flex;
            flex-wrap: wrap;
            margin: 25px 0px;
            .upload-photo {
                width: 120px;
                height: 120px;
                box-sizing: border-box;
                border-radius: 5px;
                cursor: pointer;
                margin-left: 20px;
                margin-top: 0px;
                padding-top: 0px;
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                li {
                    width: 120px;
                    height: 120px;
                    margin-right: 15px;
                    position: relative;
                    .delete-img {
                        display: block;
                        position: absolute;
                        width: 120px;
                        height: 30px;
                        line-height: 30px;
                        left: 0px;
                        top: 120px;
                        background: rgba(59, 60, 61, 0.5);
                        // box-sizing: content-box;
                        z-index: 999;
                        cursor: pointer;
                        text-align: right;
                        i {
                            margin: 8px 10px 0 0;
                            display: block;
                            font-size: 17px;
                            color: white;
                        }
                    }
                    img {
                        border: 1px dashed #d9d9d9;
                        border-radius: 5px;
                        box-sizing: border-box;
                        width: 119px;
                        height: 120px;
                        margin-top: 0px;
                        &:hover {
                            border: 1px dashed #409eff;
                        }
                    }
                }
            }
        }
    }
}
</style>
