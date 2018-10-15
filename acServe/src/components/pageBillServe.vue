<template>
	<div class="billList">
		<el-header>
			<ass-Header class="header-panel"></ass-Header>
		</el-header>

		<ass-billserve></ass-billserve>
	</div>
</template>

<script>
	export default {
		name: 'billList',
		data() {
			return {
				billListFlag: true,
				billListData: []
			}
		},
		methods: {
			getBillList: function(type) {
				this.$axios.get(this.$localUrl + 'billserve/assignList?code=' + sessionStorage.userCode + '&type=' + type).then((response) => {
					var temp = response.data;
					this.billListFlag = true;
					if(!this.isOwnEmpty(temp)) this.billListFlag = false;
					this.billListData = temp;
				}).catch((err) => {
					console.log(err);
				});
			}
		},
		mounted: function() {
			
		}
	}
</script>
<style scoped="">
	.billList {
		width: 100%;
	}
	
	.el-header {
		padding: 0;
	}

</style>