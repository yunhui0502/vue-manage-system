<template>
<div class="wrapper">
  <v-head></v-head>
  <v-sidebar></v-sidebar>
  <div class="content-box" :class="{'content-collapse':collapse}">
    <div>dddccccccccccccccccccccccccccccccccccccccccccccccc</div>
    <el-table :data="tableData">
      <el-table-column label="物品名称">
        <template slot-scope="scope">
          <span>{{ scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属商品">
        <template slot-scope="scope">
          <span>{{ scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属类目">
        <template slot-scope="scope">
          <span>{{ scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="物品描述">
        <template slot-scope="scope">
          <span>{{ scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属商家">
        <template slot-scope="scope">
          <span>{{ scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column label="编辑物品">
        <template slot-scope="scope">
          <span>{{ scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="TellMeId(scope.row.id)">TellMe</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</div>
</template>

<script>
import vSidebar from '@/components/common/sidebar.vue';
import vHead from '@/components/common/header.vue';
export default {
  name: 'store',
  components: {
    vHead,
    vSidebar
  },
  data() {
    return {
      collapse: false,
      tableData: []
    }
  },
  methods: {
    TellMeId(num) {
      console.log(num)
    }
  }

}
</script>
