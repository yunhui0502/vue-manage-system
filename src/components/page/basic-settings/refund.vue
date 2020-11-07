<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>卡片名称</span>
                <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
            </div>
            <div style="display: flex" class="text item">
                <div class="list-box">
                    <div class="item-notice" v-for="(item, i) in tableData" :key="i">
                        <div class="img-box">
                            <img :src="item.secondMessage.file" alt="" />
                        </div>

                        <div class="text-box">
                            <span>{{ item.secondMessage.headline }}</span>
                            <div class="butt-box">
                                <span>{{ item.createTime }}</span>
                                <div>
                                    <el-button @click="updateMessage(item.secondMessage)" style="color: #4a8af9" type="text"
                                        >编辑</el-button
                                    >
                                    <el-button @click="deletedMessage(item.secondMessage)" style="color: #f94a84" type="text"
                                        >删除</el-button
                                    >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="editor-box">
                    <el-form ref="form" :model="form" label-width="60px">
                        <el-form-item style="" label="展示图">
                            <el-upload
                                action="http://swcloud.tjsichuang.cn:1444/second/user/File/fileUpLoad"
                                list-type="picture-card"
                                ref="upload"
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
                        <el-form-item label="标题">
                            <el-input v-model="form.headline"></el-input>
                        </el-form-item>
                    </el-form>
                    <tinymce @fatherMethod="fatherMethod" style="margin: 10px" ref="blc" :id="'tinymceBzlc'"></tinymce>
                </div>
            </div>
            <!-- <el-button @click="send" style="display: block; margin: 0 auto" type="info">确定</el-button> -->
            <el-button @click="addMessage" style="display: block; margin: 0 auto" type="info">确定</el-button>
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
            compile: false,
            tableData: '',
            dialogVisible: false,
            dialogImageUrl: '',
            form: {
                file: '',
                headline: '',
                secondDesc: '',
                img: false
            }
        };
    },
    created() {
        this.selectMiniMessage();
        this.websocket();
    },
    methods: {
        websocket() {
            this.websocket = new WebSocket('wss://www.tjsichuang.cn:1443/second/user/websocket/' + localStorage.getItem('userId'));
            //连接发生错误的回调方法
            this.websocket.onerror = function () {
                console.log('WebSocket连接发生错误');
            };

            //连接成功建立的回调方法
            this.websocket.onopen = function () {
                 console.log('WebSocket连接成功');
            };

            //接收到消息的回调方法
            this.websocket.onmessage = function (event) {
                 console.log(event.data);
            };

            //连接关闭的回调方法
            this.websocket.onclose = function () {
                 console.log('WebSocket连接关闭');
            };

            //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
            // this.window.onbeforeunload = function () {
            //     closeWebSocket();
            // };
        },
        closeWebSocket() {
        websocket.close();
             },
        send() {
            let fon = {
                userId: localStorage.getItem('userId'),
                byUserId: 0,
                type: 'group',
                message: {
                    userId: localStorage.getItem('userId'),
                    byUserId: 0,
                    message: this.form.headline,
                    type: 'Announcement',
                    time: '2020-9-9 00:00:00'
                }
            };
            let arr = [];
            arr.push(fon);
            this.websocket.send(JSON.stringify(arr));
            console.log(JSON.stringify(arr));
        },
        updateMessage(item) {
            this.compile = true;
            this.form.headline = item.headline;
            setTimeout(() => {
                this.$refs.blc.setData(item.secondDesc);
            }, 10);
            this.form.id = item.id;
            // this.dialogImageUrl = item.file
        },
        //删除
        deletedMessage(e) {
            this.$confirm('是否删除该照片?', '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    let param = {
                        id: e.id
                    };
                    userApi.deletedMessage(param, (res) => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.selectMiniMessage();
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        selectMiniMessage() {
            userApi.selectMiniMessage((res) => {
                console.log(res);
                this.tableData = res.data.data;
            });
        },
        addMessage() {
            if (this.compile) {
                console.log('修改');
                this.form.secondDesc = this.$refs.blc.release();
                userApi.updateMessage(this.form, (res) => {
                    this.send();
                    console.log(res);
                    this.compile = false;
                    this.form = { file: '', headline: '', secondDesc: '', img: true };
                    setTimeout(() => {
                        this.$refs.blc.setData('');
                    }, 10);
                    this.$refs.upload.clearFiles();
                });
            } else {
                console.log('添加');
                this.form.secondDesc = this.$refs.blc.release();
                userApi.addMessage(this.form, (res) => {
                    this.send();
                    console.log(res);
                    this.compile = false;
                    this.form = { file: '', headline: '', secondDesc: '', img: true };
                    setTimeout(() => {
                        this.$refs.blc.setData('');
                    }, 10);
                    this.$refs.upload.clearFiles();
                });
            }
        },
        fatherMethod() {
            // this.dialogshow = true;
        },
        // --------------------------------
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
            this.form.img = true;
        }
        // --------------------------------
    }
};
</script>

<style lang="less" scoped>
// .clearfix {
//     display: flex;
//     justify-content: space-between;
// }
.list-box {
    width: 48%;
    background: #ffffff;
    .item-notice {
        display: flex;
        margin: 10px;
        width: 100%;
        .img-box {
            img {
                width: 144px;
                height: 100px;
                // background: #ba2014;
            }
        }
        .text-box {
            width: 80%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #333333;
            margin-left: 16px;
            .butt-box {
                width: 80%;
                display: flex;
                justify-content: space-between;
                line-height: 32px;
                font-size: 12px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #999999;
            }
        }
    }
}
.editor-box {
    width: 48%;
    background: #ffffff;
}
</style>
