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
          label: '设备管理',
          url: '/bill/list',
          children: [{
            label: '添加设备',
          	url: ''
          },{
          	label: '管理设备',
          	url: ''
          }]
        }, {
          label: '订单管理',
          url: '',
          children: [{
            label: '新增订单',
            url: '/bill/create'
          }, {
            label: '管理订单',
            url: '/bill/list'
          }]
        }, {
          label: '用户管理',
          url: '',
          children: [{
            label: '新增用户',
            url: '/user/create'
          }, {
            label: '管理用户',
            url: '/user/list'
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

<style scoped>

</style>
