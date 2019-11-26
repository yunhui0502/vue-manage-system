<template>
  <div style="width: 95%;height: 90%;background:#ffffff;margin:  0 auto;">
    <div style="width: 25%;height:100%;background:#ffffff;float: left;margin-top: 50px;">

      <img src="../img/6.jpg" style="width: 80px;height: 80px;border-radius: 50%;margin-left:20px;margin-top: 20px;">
      <div style="margin-left: 120px;margin-top: -60px;">商家昵称</div>
      <div style="margin-left: 120px;">状态：在线</div>
        <div style="width: 80%;height: 25px;margin: 0 auto ;margin-top:40px;">
          <i class="el-icon-search" style=" z-index: 99999;position: absolute;margin-left:10px;margin-top:5px;"></i>
          <input type="text" style="width: 100%;height: 20px;margin: 0 auto;border-radius:15px;outline: none;">
          </div>

            <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-top:40px; ">
              <el-tab-pane label="用户管理" name="first" style="margin-left: 60px;">
                  <div><img src="../img/6.jpg" style="width: 60px;height: 60px;"></div>
                    <div style="margin-left:80px;margin-top: -60px;">订单消息</div>
                    <div style="margin-left: 80px;">消息内容消息内容...</div><br><br>
                     <div><img src="../img/6.jpg" style="width: 60px;height: 60px;"></div>
                       <div style="margin-left:80px;margin-top: -60px;">订单消息</div>
                       <div style="margin-left: 80px;">消息内容消息内容...</div><br><br>
                         <div><img src="../img/6.jpg" style="width: 60px;height: 60px;"></div>
                           <div style="margin-left:80px;margin-top: -60px;">订单消息</div>
                           <div style="margin-left: 80px;">消息内容消息内容...</div><br><br>

              </el-tab-pane>
              <el-tab-pane label="配置管理" name="second" style="margin-left: 60px;">
                <div><img src="../img/6.jpg" style="width: 60px;height: 60px;"></div>
                  <div style="margin-left:80px;margin-top: -60px;">订单消息</div>
                  <div style="margin-left: 80px;">消息内容消息内容...</div><br><br>
                   <div><img src="../img/6.jpg" style="width: 60px;height: 60px;"></div>
                     <div style="margin-left:80px;margin-top: -60px;">订单消息</div>
                     <div style="margin-left: 80px;">消息内容消息内容...</div><br><br>
                       <div><img src="../img/6.jpg" style="width: 60px;height: 60px;"></div>
                         <div style="margin-left:80px;margin-top: -60px;">订单消息</div>
                         <div style="margin-left: 80px;">消息内容消息内容...</div><br><br>

              </el-tab-pane>

            </el-tabs>

    </div>
  </div>
</template>

<script>

  export default {
      data() {
        return {
          activeName: 'second'
        };
      },
      methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        }
      }
    };
</script>

<style>

  body{
    width: 100%;
    height: 100%;
    background:#cccccc;
  }

</style>
