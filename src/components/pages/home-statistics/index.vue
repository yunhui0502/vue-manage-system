<template>
  <div class="box">
    <h2>概况</h2>
    <!-- 顶部 -->
    <div class="top-box">
      <div class="member-box member-image">
        <div class="member">会员数</div>
        <div class="quantity">26485</div>
        <div class="dateline">
          <span>日会员数：48687</span>
          <span>月会员数：486876</span>
        </div>
      </div>

      <div class="member-box visit-image">
        <div class="member">访问量</div>
        <div class="quantity">264888463</div>
        <div class="dateline">
          <span>日访问数：48687</span>
          <span>月访问数：486876</span>
        </div>
      </div>

      <div class="member-box order-image">
        <div class="member">订单量</div>
        <div class="quantity">894687</div>
        <div class="dateline">
          <span>日订单量：48687</span>
          <span>月订单量：486876</span>
        </div>
      </div>

      <div class="member-box member-image">
        <div class="member">总收入</div>
        <div class="quantity">8448648.89</div>
        <div class="dateline">
          <span>日收入：48687646.00</span>
          <span>月收入：48687646.00</span>
        </div>
      </div>
    </div>
    <!-- 用户 -->
    <div class="leftRight-box">
      <!-- 左 -->
      <div class="left-box">
        <div class="user-box">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>用户</span>
            </div>
            <div style="width: 100%;height: 220px;" id="main"></div>
          </el-card>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>产品概况</span>
            </div>
            <div style="width: 100%;height: 220px;" id="overview"></div>
          </el-card>
        </div>
        <el-card class="box-card classMarketing">
          <div slot="header" class="clearfix">
            <span>营销活动</span>
          </div>
          <div>
            <!-- 上 -->
            <div class="coupon">
              <div class="coupon-item">
                <img src="../img/youhuiquan.png" alt />
                <span>优惠券</span>
              </div>

              <div class="coupon-item">
                <span>1564</span>
                <span>总发行数量</span>
              </div>

              <div class="coupon-item">
                <span>1564</span>
                <span>上架数量</span>
              </div>

              <div class="coupon-item">
                <span>1564</span>
                <span>下架数量</span>
              </div>

              <div class="coupon-item">
                <span>1564</span>
                <span>当前已领取数量</span>
              </div>

              <div class="coupon-item">
                <span>1564</span>
                <span>已核销数量</span>
              </div>
            </div>
            <!-- 下 -->
            <div class="event">
              <div class="event-item">
                <img src="../img/youhuiquan.png" alt />
                <span>活动</span>
              </div>

              <div class="event-item">
                <span>1564</span>
                <span>当前活动</span>
              </div>

              <div class="event-item">
                <span>1564</span>
                <span>上架数量</span>
              </div>

              <div class="event-item">
                <span>1564</span>
                <span>下架数量</span>
              </div>

              <div class="event-item">
                <span>1564</span>
                <span>点击人数</span>
              </div>

              <div class="event-item">
                <span>1564</span>
                <span>参与人数</span>
              </div>
            </div>
          </div>
        </el-card>

        <el-card class="box-card classOrder">
          <div slot="header" class="clearfix">
            <span>订单详情</span>
          </div>
          <div class="order">
            <div class="order-item">
              <img src="../img/shouhou_1.png" alt />
              <div class="order-quantity">
                <span>50</span>
                <span>待付款</span>
              </div>
            </div>

            <div class="order-item">
              <img src="../img/daifahuo.png" alt />
              <div class="order-quantity">
                <span>50</span>
                <span>待发货</span>
              </div>
            </div>

            <div class="order-item">
              <img src="../img/shouhou.png" alt />
              <div class="order-quantity">
                <span>50</span>
                <span>待售后</span>
              </div>
            </div>

            <div class="order-item">
              <img src="../img/wancheng.png" alt />
              <div class="order-quantity">
                <span>50</span>
                <span>已完成</span>
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <!-- 右 -->
      <div class="right-box">
        <el-card class="box-card classCycle">
          <div slot="header" class="clearfix">
            <span>各品类占比</span>
          </div>
          <div class="classCycle-box">
            <el-progress type="circle" :stroke-width="10" width="60" :percentage="22">s</el-progress>
            <el-progress
              type="circle"
              :stroke-width="10"
              color="#4ECB73"
              width="60"
              :percentage="22"
            ></el-progress>
            <el-progress
              type="circle"
              :stroke-width="10"
              color="#FBD437"
              width="60"
              :percentage="22"
            ></el-progress>
          </div>
        </el-card>

        <el-card class="box-card classRanking">
          <div slot="header" class="clearfix">
            <span>销量排行</span>
          </div>
          <div class="classRanking-box">
            <el-table :data="tableData" stripe style="width: 100%">
              <el-table-column prop="date" label="排名"></el-table-column>
              <el-table-column prop="name" label="品名"></el-table-column>
              <el-table-column prop="address" label="销量"></el-table-column>
            </el-table>
            <el-button style="display:block;margin:0 auto;margin-top:10px;" round>圆角按钮</el-button>
          </div>
        </el-card>
      </div>
    </div>
    <!-- 店铺部分 -->
    <h2>店铺</h2>
    <!-- 顶部 -->
    <div class="top-box">
      <div class="member-box member-image">
        <div class="member">会员数</div>
        <div class="quantity">26485</div>
        <div class="dateline">
          <span>日会员数：48687</span>
          <span>月会员数：486876</span>
        </div>
      </div>

      <div class="member-box visit-image">
        <div class="member">访问量</div>
        <div class="quantity">264888463</div>
        <div class="dateline">
          <span>日访问数：48687</span>
          <span>月访问数：486876</span>
        </div>
      </div>

      <div class="member-box order-image">
        <div class="member">订单量</div>
        <div class="quantity">894687</div>
        <div class="dateline">
          <span>日订单量：48687</span>
          <span>月订单量：486876</span>
        </div>
      </div>

      <div class="member-box member-image">
        <div class="member">总收入</div>
        <div class="quantity">8448648.89</div>
        <div class="dateline">
          <span>日收入：48687646.00</span>
          <span>月收入：48687646.00</span>
        </div>
      </div>
    </div>
    <el-card class="box-card ShopsContent">
      <div class="ShopsContent-box">
        <div class="ShopsContent-item">
          <img src="../img/tx.png" alt />
          <div class="ShopsContent-quantity">
            <span>宝路旗舰店</span>
            <span class="ShopsContent-text">类型：宠物用品</span>
          </div>
        </div>
        <div class="ShopsContent-item">
          <img src="../img/tx.png" alt />
          <div class="ShopsContent-quantity">
            <span>宝路旗舰店</span>
            <span class="ShopsContent-text">类型：宠物用品</span>
          </div>
        </div>
        <div class="ShopsContent-item">
          <img src="../img/tx.png" alt />
          <div class="ShopsContent-quantity">
            <span>宝路旗舰店</span>
            <span class="ShopsContent-text">类型：宠物用品</span>
          </div>
        </div>
        <div class="ShopsContent-item">
          <img src="../img/tx.png" alt />
          <div class="ShopsContent-quantity">
            <span>宝路旗舰店</span>
            <span class="ShopsContent-text">类型：宠物用品</span>
          </div>
        </div>
        <div class="ShopsContent-item">
          <img src="../img/tx.png" alt />
          <div class="ShopsContent-quantity">
            <span>宝路旗舰店</span>
            <span class="ShopsContent-text">类型：宠物用品</span>
          </div>
        </div>
        <div class="ShopsContent-item">
          <img src="../img/tx.png" alt />
          <div class="ShopsContent-quantity">
            <span>宝路旗舰店</span>
            <span class="ShopsContent-text">类型：宠物用品</span>
          </div>
        </div>
        <div class="ShopsContent-item">
          <img src="../img/tx.png" alt />
          <div class="ShopsContent-quantity">
            <span>宝路旗舰店</span>
            <span class="ShopsContent-text">类型：宠物用品</span>
          </div>
        </div>
        <div class="ShopsContent-item">
          <img src="../img/tx.png" alt />
          <div class="ShopsContent-quantity">
            <span>宝路旗舰店</span>
            <span class="ShopsContent-text">类型：宠物用品</span>
          </div>
        </div>
      </div>

      <el-pagination
        style="text-align: center;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="100"
        layout="prev, pager, next, jumper"
        :total="1000"
      ></el-pagination>
    </el-card>
    <!-- 财务部分 -->
    <h2>财务</h2>
    <div class="finance-box">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>资产统计</span>
        </div>
        <div class="statistics-box">
          <div class="amount-box">
            <div class="amount-item amount-image">
              <div>营业额</div>
              <div>35664.00</div>
            </div>
            <div class="amount-item expense-image">
              <div>支出</div>
              <div>35664.00</div>
            </div>
            <div class="amount-item Profit-image">
              <div>利润</div>
              <div>35664.00</div>
            </div>
          </div>

          <div>
             <div style="width: 100%;height: 260px;" id="statistics"></div>
          </div>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>收入来源</span>
        </div>
        <div class="statistics-box">
          <div class="revenue-box">
            <div class="revenue-item amount-image">
              <div>营业额</div>
              <div>35664.00</div>
            </div>
            <div class="revenue-item expense-image">
              <div>支出</div>
              <div>35664.00</div>
            </div>
            <div class="revenue-item Profit-image">
              <div>利润</div>
              <div>35664.00</div>
            </div>

               <div class="revenue-item expense-image">
              <div>利润</div>
              <div>35664.00</div>
            </div>
          </div>

          <div>
              <div style="width: 100%;height: 260px;" id="revenue"></div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  name: '',
  data() {
    return {
      currentPage3: 5,
      tableData: [
        {
          date: '1',
          name: '商品名称',
          address: '2323',
        },
        {
          date: '2',
          name: '商品名称',
          address: '2323',
        },
        {
          date: '3',
          name: '商品名称',
          address: '2323',
        },
        {
          date: '4',
          name: '商品名称',
          address: '2323',
        },
        {
          date: '5',
          name: '商品名称',
          address: '2323',
        },
        {
          date: '6',
          name: '商品名称',
          address: '2323',
        },
        {
          date: '7',
          name: '商品名称',
          address: '2323',
        },
        {
          date: '8',
          name: '商品名称',
          address: '2323',
        },
        {
          date: '9',
          name: '商品名称',
          address: '2323',
        },
        {
          date: '10',
          name: '商品名称',
          address: '2323',
        },
        {
          date: '11',
          name: '商品名称',
          address: '2323',
        },
        {
          date: '12',
          name: '商品名称',
          address: '2323',
        },
        {
          date: '13',
          name: '商品名称',
          address: '2323',
        },
        {
          date: '14',
          name: '商品名称',
          address: '2323',
        },
      ],
    };
  },
  mounted() {
    this.admin();
    this.adminOverview();
    this.adminStatistics();
    this.adminRevenue();
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    adminOverview() {
      var myChart1 = echarts.init(document.getElementById('overview'));
      var option = {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ['product', '产品未审核数', '产品已下架数', '产品已上架数'],
            // eslint-disable-next-line no-magic-numbers
            ['Matcha Latte', 33.3, 85.8, 93.7],
            // eslint-disable-next-line no-magic-numbers
            ['Milk Tea', 83.1, 73.4, 55.1],
            // eslint-disable-next-line no-magic-numbers
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            // eslint-disable-next-line no-magic-numbers
            ['Walnut Brownie', 72.4, 53.9, 39.1],
          ],
        },
        xAxis: { type: 'category' },
        color: ['#A3A0FB', '#56D9FE', '#5FE3A1'],
        yAxis: {},
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
      };
      myChart1.setOption(option);
    },
    admin() {
      var myChart = echarts.init(document.getElementById('main'));
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          // eslint-disable-next-line standard/array-bracket-even-spacing
          data: ['用户', '会员'],
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            color: ['#FE8373', '#A3A0FB'],
            label: {
              normal: {
                show: false,
                position: 'center',
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold',
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              { value: 500, name: '用户' },
              { value: 500, name: '会员' },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
    adminStatistics() {
      var myChart = echarts.init(document.getElementById('statistics'));
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          // eslint-disable-next-line standard/array-bracket-even-spacing
          data: ['微信', '支付宝', '银行卡'],
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            color: ['#FE8474', '#A4A0FB', '#F9D042'],
            label: {
              normal: {
                show: false,
                position: 'center',
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold',
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              { value: 500, name: '微信' },
              { value: 500, name: '支付宝' },
              { value: 500, name: '银行卡' },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
    adminRevenue() {
      var myChart = echarts.init(document.getElementById('revenue'));
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          // eslint-disable-next-line standard/array-bracket-even-spacing
          data: ['充值余额', '到店支付', '线上订单'],
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            color: ['#FE8474', '#A4A0FB', '#F9D042'],
            label: {
              normal: {
                show: false,
                position: 'center',
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold',
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: [
              { value: 500, name: '充值余额' },
              { value: 500, name: '到店支付' },
              { value: 500, name: '线上订单' },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>

<style lang="less" scoped>
// 店铺
.ShopsContent {
  margin-top: 15px;
  .ShopsContent-box {
    display: flex;
    flex-wrap: wrap;
    .ShopsContent-item {
      display: flex;
      width: 20%;
      margin: 41px 35px;

      font-size: 26px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #0b0b0b;
      img {
        width: 106px;
        height: 83px;
      }
      .ShopsContent-quantity {
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
      }
      .ShopsContent-text {
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #0b0b0b;
      }
    }
  }
}
// 财务
.finance-box {
  display: flex;
  justify-content: space-between;
  .amount-image {
    background-image: url(../img/s1.png);
    background-size: 100% 100%;
  }
  .expense-image {
    background-image: url(../img/s3.png);
    background-size: 100% 100%;
  }
  .Profit-image {
    background-image: url(../img/s2.png);
    background-size: 100% 100%;
  }
  .box-card {
    width: 49.3%;
  }
  .statistics-box {
    // 左
    .amount-box {
      display: flex;
      justify-content: space-between;
      .amount-item {
        width: 220px;
        height: 150px;
        border: 1px solid #ffff;
        div:nth-child(1) {
          margin: 10px;
          font-size: 18px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #ffffff;
        }
        div:nth-child(2) {
          margin: 10px;
          font-size: 22px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #ffffff;
        }
      }
    }
    // 右
    .revenue-box {
      display: flex;
      justify-content: space-between;
      .revenue-item {
        width: 160px;
        height: 150px;
        border: 1px solid #ffff;
        div:nth-child(1) {
          margin: 10px;
          font-size: 18px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #ffffff;
        }
        div:nth-child(2) {
          margin: 10px;
          font-size: 22px;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: #ffffff;
        }
      }
    }
  }
}
// 中
.leftRight-box {
  display: flex;
  justify-content: space-between;
  // 右
  .right-box {
    width: 24%;
    .box-card {
      margin-top: 15px;
    }
    // 各品类占比
    .classCycle {
      height: 196px;
      .classCycle-box {
        display: flex;
        justify-content: space-between;
      }
    }
    .classRanking {
      height: 828px;
      /deep/.el-card__body {
        padding: 6px;
      }
      // .classRanking-box {

      // }
    }
  }
  // 左
  .left-box {
    width: 74.8%;
    .box-card {
      margin-top: 15px;
    }
    .user-box {
      display: flex;
      justify-content: space-between;
      .box-card {
        width: 49%;
        height: 370px;
      }
    }
    // 营销活动
    .classMarketing {
      height: 446px;
      /deep/.el-card__body {
        padding: 0;
      }
      .coupon {
        display: flex;
        border-bottom: 1px solid #e5e5e5;
        div:nth-child(-n + 5) {
          border-right: 1px solid #e5e5e5;
        }
        .coupon-item {
          text-align: center;
          width: 16.66%;
          height: 200px;
          // line-height: 100px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #333333;
          img {
            margin: 0 auto;
            vertical-align: middle;
            width: 49px;
            height: 49px;
          }
          span {
            padding: 10px;
          }
        }
      }
      .event {
        display: flex;
        border-bottom: 1px solid #e5e5e5;
        div:nth-child(-n + 5) {
          border-right: 1px solid #e5e5e5;
        }
        .event-item {
          text-align: center;
          width: 16.66%;
          height: 200px;
          // line-height: 100px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #333333;
          img {
            margin: 0 auto;
            vertical-align: middle;
            width: 49px;
            height: 49px;
          }
          span {
            padding: 10px;
          }
        }
      }
    }
    // 订单详情
    .classOrder {
      /deep/.el-card__body {
        padding: 0;
      }
      .order {
        display: flex;
        justify-content: space-around;
        .order-item {
          display: flex;
          margin: 41px;
          font-size: 14px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #333333;
          img {
            width: 50px;
            height: 50px;
          }
          .order-quantity {
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
          }
        }
      }
    }
  }
}
// 顶部样式
.box {
  padding: 0 50px;
}
.member-image {
  background-image: url(../img/21.png);
  background-size: 100% 100%;
}
.visit-image {
  background-image: url(../img/22.png);
  background-size: 100% 100%;
}
.order-image {
  background-image: url(../img/cc.png);
  background-size: 100% 100%;
}

.top-box {
  display: flex;
  justify-content: space-between;
}
.member-box {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 22%;
  height: 166px;
  padding: 0 17px;

  .member {
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
  }
  .quantity {
    font-size: 30px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: #ffffff;
  }
  .dateline {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #ffffff;
  }
}
</style>
