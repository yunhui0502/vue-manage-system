<template>
    <div style="padding: 46px;">
      

       <div class="details">
           
           
        <div style="width: 70.6%;">
             <div class="sumClass">
           <div class="userClass">
               <h5>用户总数</h5>
               <div class="amount-box">
                   <div class="amount">{{userData.userNumber}}</div>
                   <img src="../../assets/img/yh.png" alt="">
               </div>
           </div>
           <!-- <div class="userClass">
               <h5>用户商品总数</h5>
               <div class="amount-box">
                   <div class="amount">6935</div>
                   <img src="../../assets/img/yh.png" alt="">
               </div>
           </div> -->
           <div class="userClass">
               <h5>订单总数</h5>
               <div class="amount-box"> 
                   <div class="amount">{{orderData.orderNumber}}</div>
                   <img src="../../assets/img/yh.png" alt="">
               </div>
           </div>
           <div class="userClass">
               <h5>收入总额</h5>
               <div class="amount-box">
                   <div class="amount">{{numFilter(orderData.total/100)}}</div>
                   <img src="../../assets/img/yh.png" alt="">
               </div>
           </div>
      
       </div>
<!-- 详情统计 -->
            <div class="details-box">
                <div class="item">
                    <h5>用户详情</h5>
                        <div class="contents">
                            <div class="head">
                                <span>分类</span>
                                <span>数量</span>
                            </div>
                            <div class="body">
                                <span>普通用户</span>
                                <span class="amount">{{userData.userGeneral}}</span>
                            </div>
                            <div class="body">
                                <span>认证学生</span>
                                <span class="amount">{{userData.userAuthentication}}</span>
                            </div>
                            <div class="body">
                                <span>商家用户</span>
                                <span class="amount">{{userData.userStore}}</span>
                            </div>
                        </div>
                </div>
           
                <div class="item">
                    <h5>订单详情</h5>
                    <div class="contents">
                        <div class="head">
                            <span>状态</span>
                            <span>数量</span>
                        </div>
                        <div class="body">
                            <span>待发货</span>
                            <span class="amount">{{orderData.process}}</span>
                        </div>
                        <div class="body">
                            <span>待收货</span>
                            <span class="amount">{{orderData.pickUp}}</span>
                        </div>
                        <div class="body">
                            <span>待评价</span>
                            <span class="amount">{{orderData.evaluate}}</span>
                        </div>
                        <div class="body">
                            <span>已完成</span>
                            <span class="amount">{{orderData.complete}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="datum">
            <div id="myChart" style="height:369px; width: 100%;"></div>
            </div>
        </div>
        <!-- 收入总额 -->
        <div class="content">
            <h5>站点收入</h5>
             <el-table
                :data="tableData">
                 <el-table-column
                type="index"
                label="序号">
                </el-table-column>
                <el-table-column
                prop="sonName"
                label="站点名称">
                </el-table-column>
                <el-table-column
                prop="money"
                label="金额">
                </el-table-column>
                <el-table-column
                prop="userNum"
                label="认证人数">
                </el-table-column>
            </el-table>
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
        orderData:'',
        statistics :[],
        userData:'',
        tableData: []
        };
    },

    mounted () { 
        this.backendData();
        this.orderStatistics();
        this.userStatistics();
        this.sonTransactionAmount();

    },
    methods: {
        numFilter(value) {
			// 截取当前数据到小数点后两位
			let realVal = parseFloat(value).toFixed(2)
			return realVal
		},
        // 表格数据
        backendData () {
            orderApi.backendData((res)=>{
                this.statistics=[]
                let data = res.data.data[0]
                console.log(data)
                this.statistics.push(data.january/100)
                this.statistics.push(data.february/100)
                this.statistics.push(data.march/100)
                this.statistics.push(data.april/100)
                this.statistics.push(data.may/100)
                this.statistics.push(data.june/100)
                this.statistics.push(data.july/100)
                this.statistics.push(data.august/100)
                this.statistics.push(data.september/100)
                this.statistics.push(data.october/100)
                this.statistics.push(data.november/100)
                this.statistics.push(data.december/100)
                 this.category();

            })
        },
        //订单统计
        orderStatistics () {
            orderApi.orderStatistics((res)=>{
                console.log(res)
                this.orderData = res.data.data
            })
        },
          //用户统计
        userStatistics () {
            orderApi.userStatistics((res)=>{
                console.log(res)
                this.userData = res.data.data
            })
        },
        //每个子站点交易金额
        sonTransactionAmount () {
            userApi.sonTransactionAmount((res)=>{
                console.log('每个子站点交易金额',res)
                this.tableData = res.data.data
                this.tableData.forEach(item=>{
                    item.money =  parseFloat(item.money/100).toFixed(2)
                })
            })
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
        category () {
            var myChart = echarts.init(document.getElementById('myChart'));
           var option = {
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月']

                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
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
                        },
                    }]
                };
            myChart.setOption(option);
        }
        
  
    }
};
</script>


<style scoped lang="less">
    .sumClass {
        display:flex;
        justify-content: space-between;
        // margin-top: 47px;
        .userClass {
            padding: 16px 30px;
            width: 25%;
            background: #FFFFFF;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.02);
            border: 1px solid #FFFFFF;
            border-radius: 4px;
            .amount-box {
                display:flex;
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
        display:flex;
        justify-content : space-between;
        .details-box {
            display:flex;
            justify-content: space-between;
            margin-top: 16px;
            .item {
                width: 45.8%;
                background: #FFFFFF;
                padding: 19px 14px;
                border-radius: 4px;

            .contents {
                .head {
                    display:flex;
                    justify-content: space-around;
                    height: 40px;
                    line-height: 40px;
                    background: #F8FBFF;
                    font-size: 16px;
                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    color: #333333;
                }
                .body {
                    display:flex;
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
            background: #FFFFFF;
            border-radius: 4px;
        }
    }
    .content {
        padding: 19px 14px;
        width: 28.4%;
        height: 804px;
        background: #FFFFFF;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.02);
        border-radius: 4px;
        h5 {
            margin-bottom: 10px;
        }
    }
</style>
