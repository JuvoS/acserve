<template>
  <div>
		<div class="address-list-panel">
				<ul class="address-list">
							<li class="list-item" v-show="noAddresss">
								<div class="item-add" style="font-size: 12px;color: #CCCCCC;">
									暂无数据
								</div>
							</li>
							<li class="list-item"  v-for="item in addressList">
								<div class="list-item-row">
									<div class="item-row-left" >地址名称:{{ item.name }}</div>
									<a class="item-row-right" @click="getAdr(item.addressCode,item.info,item.tel)">选择</a>
								</div>
								<div class="list-item-row">
									<div class="item-row-left">地址信息:{{ item.info }}</div>
								</div>
								<div class="list-item-row">
									<div class="item-row-left">联系电话:{{ item.tel }}</div>
								</div>
							</li>
							<li class="list-item">
								<div class="item-add">
									<router-link to="/addresslist">
										<i class="el-icon-plus"></i>
									</router-link>
								</div>
							</li>
					</ul>
		</div>
		
  </div>
</template>

<script>
export default {
  name: 'address-list',
  data () {
    return {
      msg: 'Welcome to AC',
	    userCode: '',
      addressList: [{}],
	    changeAddressCode: '',
	    noAddresss: true,
	    address: {
	    	addressCode: '',
    		info: '',
    		tel: ''
	    }
    }
  },
  methods: {
  	getAddressList(){
  		this.$axios.get(this.$localUrl + 'address/list?code='+this.userCode).then((response) => {
				this.addressList = response.data;
				
				if(response.data !==null && response.data.length !==0){
					this.noAddresss = false;
				}
			}).catch((err) => {
				console.log(err);
			});
  	},
  	getAdr(code,info,tel){
  		this.address.addressCode = code;
  		this.address.info = info;
  		this.address.tel = tel;
  		var obj = this.address;
  		this.$emit('adrByNow', obj);
  	}
  },
  mounted: function(){	
  	this.userCode = sessionStorage.userCode;
  	this.getAddressList();
  }
  
}
</script>

<style scoped>
	.address-list-panel {
		width: 100%;
	}
	.address-list-panel ul{
		list-style: none;
		margin: 0;
		padding-left: 0;
		font-size: 12px;
	}
	.address-list {
		padding-bottom: 10px;
	}
.list-item {
	width: 96%;
	height: 80px;
	overflow: hidden;
	background: #FFFFFF;
	
}
.list-item-row {
	height: 20px;
	line-height: 20px;
	margin-top: 3px;
	display: flex;
	flex-direction: row;
	justify-content: initial;
}
.item-row-left {
	flex: 1;
	padding-left: 15px;
	text-align: left;
}
.item-row-right {
	text-align: right;
	padding-right: 15px;
	color: #409eff;
}
.item-add {
	text-align: center;
	width: 100%;
	line-height: 100px;
	font-size: 40px;
}
.address-list{
	z-index: 1;
}

</style>
