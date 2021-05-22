<template>
    <div style="padding: 46px">
        <div class="details">
            <div style="width: 100%">
                <div class="sumClass">
                    <div class="userClass">
                        <h5>门票订单总数</h5>
                        <div class="amount-box">
                            <div class="amount">{{ orderData.AdmissionOrderNum }}</div>
                            <!-- <img src="../../../assets/img/yh.png" alt="" /> -->
                        </div>
                    </div>
                    <div class="userClass">
                        <h5>门票订单总金额</h5>
                        <div class="amount-box">
                            <div class="amount">{{ numFilter(orderData.AdmissionAmounts / 100) }}</div>
                            <!-- <img src="../../../assets/img/yh.png" alt="" /> -->
                        </div>
                    </div>
                     <div class="userClass">
                        <h5>门票订单实际收入</h5>
                        <div class="amount-box">
                            <div class="amount">{{ numFilter(orderData.AdmissionAmountsReality / 100) }}</div>
                            <!-- <img src="../../../assets/img/yh.png" alt="" /> -->
                        </div>
                    </div>
                    <div class="userClass">
                        <h5>视频订单总数</h5>
                        <div class="amount-box">
                            <div class="amount">{{ orderData.VideoOrderNum }}</div>
                            <!-- <img src="../../../assets/img/yh.png" alt="" /> -->
                        </div>
                    </div>
                    <div class="userClass">
                        <h5>视频订单总金额</h5>
                        <div class="amount-box">
                            <div class="amount">{{ numFilter(orderData.VideoAmounts / 100) }}</div>
                            <!-- <img src="../../../assets/img/yh.png" alt="" /> -->
                        </div>
                    </div>
                     <div class="userClass">
                        <h5>视频订单实际收入</h5>
                        <div class="amount-box">
                            <div class="amount">{{ numFilter(orderData.VideoAmountsReality / 100) }}</div>
                            <!-- <img src="../../../assets/img/yh.png" alt="" /> -->
                        </div>
                    </div>
                </div>
                <!-- 详情统计 -->
                <div class="details-box">
                    <div class="item">
                        <h5>门票订单详情</h5>
                        <div class="contents">
                            <div class="head">
                                <span>状态</span>
                                <span>数量</span>
                            </div>
                            <div class="body">
                                <span>完成</span>
                                <span class="amount">{{ticketsComplete.length}}</span>
                            </div>
                            <div class="body">
                                <span>异常</span>
                                <span class="amount">{{ticketsException.length}}</span>
                            </div>
                            <div class="body">
                                <span>退款</span>
                                <span class="amount">{{ticketsControversial.length}}</span>
                            </div>
                            <div class="body">
                                <span>取消</span>
                                <span class="amount">{{ticketsCancel.length}}</span>
                            </div>
                        </div>
                    </div>

                    <div class="item">
                        <h5>视频订单详情</h5>
                        <div class="contents">
                            <div class="head">
                                <span>状态</span>
                                <span>数量</span>
                            </div>
                            <div class="body">
                                <span>成功</span>
                                <span class="amount">{{VideoSuccess.length}}</span>
                            </div>
                            <div class="body">
                                <span>异常</span>
                                <span class="amount">{{VideoFailed.length}}</span>
                            </div>
                            <!-- <div class="body">
                                <span>待付款</span>
                                <span class="amount">{{VideoPayment.length}}</span>
                            </div> -->
                            <div class="body">
                                <span>取消</span>
                                <span class="amount">{{VideoCancel.length}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="datum">
            <div id="myChart" style="height:369px; width: 100%;"></div>
            </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import orderApi from '@/service/order-api.js';
import userApi from '@/service/user-api.js';

import echarts from 'echarts';
export default {
    name: 'dashboard',
    data() {
        return {
            orderData: '',
            statistics: [],
            userData: '',
            tableData: [],
            VideoSuccess: [],
            VideoFailed: [],
            VideoPayment: [],
            VideoCancel: [],

            ticketsException:[],
            ticketsComplete:[],
            ticketsControversial:[],
            ticketsCancel:[],
        };
    },

    mounted() {
        // this.backendData();
        this.orderStatistics();
        // this.userStatistics();
        // this.sonTransactionAmount();
    },
    methods: {
                // 获取全部订单
        selectOrder(e) {
            let params = {
                orderStatus: e, //订单状态
                type: 'admission' //
                // showType: 'product',//商品展示类型
            };

            orderApi.selectAdmissionOrder(params, (res) => {
                this.tableData = res.data.data;
                this.tableData.forEach((item) => {
              
                    if (item.orderStatus == 'exception') {
                        // item.orderStatusUtf = '异常订单';
                       this.ticketsException.push(item);

                    } else if (item.orderStatus == 'complete') {
                        // item.orderStatusUtf = '完成';
                       this.ticketsComplete.push(item);

                    } else if (item.orderStatus == 'controversial') {
                        // item.orderStatusUtf = '交易纠纷';
                        this.ticketsControversial.push(item);

                    } else if (item.orderStatus == 'cancel') {
                        // item.orderStatusUtf = '取消';
                        this.ticketsCancel.push(item);
                    }
                });
                console.log('获取全部订单', res);
            });
        },
           // 获取全部订单
        VideoselectOrder(e) {
            let params = {
                orderStatus: 'all', //订单状态
                type: 'video' //
            };
            orderApi.selectVideoOrderr(params, (res) => {
                console.log('获取全部订单', res);
                let tableData = res.data.data;
                tableData.forEach((item) => {
                    
                    if (item.secondOrderVideo.orderStatus == 'success') {
                        // item.orderStatusUtf = '成功';
                       this.VideoSuccess.push(item);
                    } else if (item.secondOrderVideo.orderStatus == 'failed') {
                        // item.orderStatusUtf = '订单异常';
                       this.VideoFailed.push(item);
                    } else if (item.secondOrderVideo.orderStatus == 'payment') {
                        // item.orderStatusUtf = '待付款';
                       this.VideoPayment.push(item);
                    }else if (item.secondOrderVideo.orderStatus == 'cancel') {
                        // item.orderStatusUtf = '取消';
                       this.VideoCancel.push(item);

                    }
                });
            });
        },
        
        numFilter(value) {
            // 截取当前数据到小数点后两位
            let realVal = parseFloat(value).toFixed(2);
            return realVal;
        },
        // 表格数据

        //订单统计
        orderStatistics() {
            orderApi.statisticsOrder((res) => {
                console.log(res);
                this.orderData = res.data.data;
            });
        },

        //用户统计
        userStatistics() {
            orderApi.userStatistics((res) => {
                console.log(res);
                this.userData = res.data.data;
            });
        },

        //     //用户统计
        // userStatistics () {
        //     orderApi.userStatistics((res)=>{
        //         console.log(res)
        //         this.userData = res.data.data
        //     })
        // },
        // changeDate() {
        //     const now = new Date().getTime();
        //     this.data.forEach((item, index) => {
        //         const date = new Date(now - (6 - index) * 86400000);
        //         item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
        //     });
        // },
        category() {
            var myChart = echarts.init(document.getElementById('myChart'));
            var option = {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: this.statistics,
                        type: 'line',
                        areaStyle: {
                            normal: {
                                color: '#D3D3D3' //改变区域颜色
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#FFFFFF', //改变折线点的颜色
                                lineStyle: {
                                    color: '#818181' //改变折线颜色
                                }
                            }
                        }
                    }
                ]
            };
            myChart.setOption(option);
        }
    }
};
</script>


<style scoped lang="less">
img{
    width: 70px;
    height: 70px;
}
.sumClass {
    display: flex;
    justify-content: space-between;
    // margin-top: 47px;
    .userClass {
        padding: 8px 10px;
        width: 14%;
        background: #ffffff;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.02);
        border: 1px solid #ffffff;
        border-radius: 4px;
        .amount-box {
            display: flex;
            justify-content: space-between;
            height: 76px;
            .amount {
                font-size: 40px;
                font-family: Microsoft YaHei;
                font-weight: bold;
                color: #333333;
            }
        }
    }
}
.details {
    margin-top: 13px;
    display: flex;
    justify-content: space-between;
    .details-box {
        display: flex;
        justify-content: space-between;
        margin-top: 16px;
        .item {
            width: 47%;
            background: #ffffff;
            padding: 19px 14px;
            border-radius: 4px;

            .contents {
                .head {
                    display: flex;
                    justify-content: space-around;
                    height: 40px;
                    line-height: 40px;
                    background: #f8fbff;
                    font-size: 16px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: #333333;
                }
                .body {
                    display: flex;
                    justify-content: space-around;
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    font-family: Microsoft YaHei;
                    font-weight: 400;
                    color: #333333;
                    .amount {
                        font-size: 18px;
                        font-family: Microsoft YaHei;
                        font-weight: bold;
                    }
                }
            }
        }
    }
    .datum {
        margin-top: 15px;
        width: 100%;
        height: 369px;
        background: #ffffff;
        border-radius: 4px;
    }
}
.content {
    padding: 19px 14px;
    width: 28.4%;
    height: 804px;
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.02);
    border-radius: 4px;
    h5 {
        margin-bottom: 10px;
    }
}
</style>
