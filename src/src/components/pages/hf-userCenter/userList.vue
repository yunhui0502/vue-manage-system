<template>
	<div>
		<!-- 添加用户 -->
		<el-dialog title="添加用户" :visible.sync="addUserVisible" width="30%">
			<el-form label-width="80px" :model="addUserForm">
				<el-form-item label="用户名">
					<el-input v-model="addUserForm.name"></el-input>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="addUserForm.phone"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addUserVisible = false">取 消</el-button>
				<el-button type="primary" @click="addUserSubmit()">确 定</el-button>
			</span>
		</el-dialog>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>用户列表</span>
				<el-button size="mini" style="float: right;" type="primary" @click="addUser()">添加用户</el-button>
			</div>
			<el-table :data="userData" stripe style="width: 100%">
				<el-table-column prop="createDate" label="日期" width="180">
				</el-table-column>
				<el-table-column prop="username" label="姓名" width="180">
				</el-table-column>
				<el-table-column prop="phone" label="手机号">
				</el-table-column>
				<el-table-column label="头像">
					<template slot-scope="scope">
						<img :src="scope.row.image" v-if="scope.row.image"
						 min-width="70" height="70" />
						<el-upload v-else class="upload-demo" 
						action=""
						:auto-upload="true"
						:limit="1"
						:on-change="handleChange" 
						>
							<el-button size="small" type="primary">上传头像</el-button>
						</el-upload>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button @click="deleteUser(scope.row)" type="text" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>
<script>
	import userCenterService from '@/service/userCenter.js';
	export default {
		data() {
			return {
				
				addUserForm: {
					name: '杨莹',
					phone: '15022209253'
				},
				userData: [],
				addUserVisible: false,
				tableData: [{
					createDate: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}]
			}
		},
		methods: {
			addUser: function() {
				this.addUserVisible = true;
			},
			handleChange(file, fileList) {
				console.log(file);
			},
			addUserSubmit: function() {
				userCenterService.addUser(this.addUserForm, (res) => {
					console.log(res);
					if (res.data.data == '该用户已经存在') {
						this.$message.error('该用户已经存在');
					} else {
						this.$message({
							message: '添加成功',
							type: 'success'
						});
						this.addUserVisible = false;
						this.checkUser();
					}
				});
			},
			checkUser: function() {
				userCenterService.checkUser((res) => {
					console.log(res);
					this.userData = res.data.data
				});
			},
			deleteUser: function(row) {
				console.log(row);
				userCenterService.deleteUser(row.id, (res) => {
					console.log(res);
					if (res.data.data == '删除成功') {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.checkUser();
					} else {
						this.$message.error('删除失败');
					}
				});
			},
			// /hf-auth/findAdminUser
		},
		mounted() {
			this.checkUser();
		}
	}
</script>
<style>
	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}
</style>
