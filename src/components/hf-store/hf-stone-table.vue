<template>
  <div>
    <!--表格数据及操作-->
    <el-table :data="tableData" size="mini" highlight-current-row border class="el-tb-edit mgt20" ref="multipleTable"
      tooltip-effect="dark" v-loading="listLoading" @selection-change="selectChange">
      <el-table-column type="index" :index="indexMethod" label="序号" width="50px" align="center">
      </el-table-column>
      <el-table-column prop="hfName" label="店铺名称" align="center">
      </el-table-column>
      <el-table-column prop="hfDesc" label="店铺描述" align="center">
      </el-table-column>
      <el-table-column prop="hfStatus" label="店铺状态" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.hfStatus == 0">营业中</span>
          <span v-else>未营业</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="250" align="center">
        <template slot-scope="scope">
          <el-button type="primary" plain size="small" @click="handleRole(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="delecteDian(scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
  import api from '@/apis/hf-api.js';
  export default {
    name: 'productTable',
    props: ['selectedStone'],
    data() {
      return {
        listLoading: false,
        tableData: [],
        selectList: [],
      }
    },
    methods: {
      TellMeId(num) {
        this.$emit('selectedStoneHandler', num);
      },
      indexMethod(index) {
        return index + 1;
      },
      selectChange: function(val) {
        console.log(val);
        this.selectList = val;
      },
      // 店铺列表
      listStore() {
        api.getStoreList(1).then(response => {
          if (response.status == 200) {
            if (response.data.status === 200) {
              this.tableData = response.data.data;
            }
          }

        });
      },
      //查看角色
      handleRole: function(row) {



        // this.roleFormVisible = true;
        // this.rowcheck = row;
        // this.ruletable.stoneId = row.id;
        // this.getmu();


        // this.$ajax({
        //   method: "get",
        //   url: "/api/product/byStoneId",
        //   params: {
        //     stoneId: row.id
        //   }
        // }).then(function(resultData) {

        //   console.log('已选物品', resultData);
        // });
        var arr=JSON.stringify(row);
        // this.$router.push('/formpage/'+encodeURIComponent(arr))
        // this.$router.push({path: 'formpage', query: {}})
        this.$router.push({path: 'hf-store', query: {id: row.id,row: arr}})
      },
      init() {
        this.listStore();
      }
    },
    mounted() {
      this.init()
    }
  }
</script>
