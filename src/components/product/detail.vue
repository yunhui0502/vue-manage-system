<template>
  <el-dialog title="" :visible.sync="editFormVisible1" :close-on-click-modal="false">
    <div style="font-size: 17px;margin-bottom: 30px;">
      规格:
    </div>
    <el-table :data="guigelist" size="mini" highlight-current-row border class="el-tb-edit mgt20" ref="multipleTable" style="margin-bottom: 40px;" tooltip-effect="dark" v-loading="listLoading" @selection-change="selectChange">
      <el-table-column type="index" label="序号" header-align="center" align="center">
      </el-table-column>
      <el-table-column label="规格名称" align="center" prop="hfName">
      </el-table-column>
      <el-table-column prop="specType" label="规格类型" align="center">
      </el-table-column>

      <el-table-column prop="specValue" label="规格值" align="center">
      </el-table-column>
      <el-table-column prop="specUnit" label="规格单位" align="center">
      </el-table-column>
    </el-table>
    <el-form :inline="true" :model="guiform" label-width="80px" :rules="guigerulue" ref="guiform1">
      <div style="font-size: 17px;margin-bottom: 30px;">
        添加规格:
      </div>

      <el-form-item label="规格名称:" prop="hfName" label-width="100px">
        <el-input v-model="guiform.hfName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="规格类型:" prop="specType" label-width="100px">
        <el-input auto-complete="off" v-model="guiform.specType"></el-input>
      </el-form-item>
      <el-form-item label="规格值:" prop="specValue" label-width="100px">
        <el-input auto-complete="off" v-model="guiform.specValue "></el-input>
      </el-form-item>
      <el-form-item label="规格单位:" prop="specUnit" label-width="100px">
        <el-input auto-complete="off" v-model="guiform.specUnit"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="editFormVisible1 = false">取消</el-button>
      <el-button type="primary" @click="add" :loading="editLoading">提交</el-button>
    </div>
  </el-dialog>
</template>