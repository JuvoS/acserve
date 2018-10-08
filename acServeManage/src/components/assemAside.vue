<template>
  <div class="asidePage">

  	<el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
  	
  </div>
</template>

<script>
export default {
  name: 'asidePage',
  data () {
    return {
      data: [{
          label: '用户管理',
          url: '',
          children: [{
            label: '新增用户',
            url: '/user/create'
          }, {
            label: '管理用户',
            url: '/user/list'
          }]
        },{
          label: '设备管理',
          url: '/device/list',
          children: [{
            label: '品牌管理',
          	url: '/device/brand'
          },{
          	label: '类型管理',
          	url: '/device/mold'
          },{
          	label: '型号管理',
          	url: '/device/model'
          },{
          	label: '服务期管理',
          	url: '/device/time'
          }]
        },{
          label: '订单管理',
          url: '',
          children: [{
            label: '新增订单',
            url: '/bill/create'
          }, {
            label: '管理订单',
            url: '/bill/list'
          }]
        },{
          label: '问答管理',
          url: '',
          children: [{
            label: '新增问答',
            url: '/question/create'
          }, {
            label: '管理订单',
            url: '/question/list'
          }]
        },{
          label: '模块控制',
          url: '',
          children: [{
            label: '管理模块',
            url: '/module/list'
          }]
        }],
        defaultProps: {
          children: 'children',
          url: 'url',
          label: 'label'
        }
    }
  },
  methods: {
  	handleNodeClick(data) {
        console.log(data.url);
        this.$router.push(data.url);
     },
    getMenuInfo(){
    	this.$axios.get(this.$localUrl + 'bill/menu?code='+sessionStorage.userCode).then((response) => {
				console.log(response.data);
				this.menu = response.data.menu;
			}).catch((err) => {
				console.log(err);
			});
    },
    menuLink(val){
    	this.$router.push('/bill/list/'+val);
    }
  },
  mounted: function(){
//		this.getMenuInfo();
  }
  
}
</script>

<style>
.el-tree-node {
	margin-top: 20px;
	margin-bottom: 20px;
}
.el-tree-node__content {
	margin-top: 10px;
	margin-bottom: 10px;
	font-size: 16px;
}
</style>
