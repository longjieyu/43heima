<template>
	<view class="container">
		<!-- 搜索栏 -->
		<SearchInput/>
		<!-- 首页轮播图 -->
		<view class="banner_container">
			<swiper indicator-active-color="#EA4350" :autoplay="true" :circular="true" :indicator-dots="true">
				<swiper-item v-for="item in banner" :key="item.goods_id">
					<image mode="widthFix" :src="item.image_src"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 导航栏 -->
<!-- 		<view class="nav_container">
			<navigator :open-type="item.open_type" :url="item.navigator_url" v-for="item in navs" :key="item.name">
				<image :src="item.image_src"></image>
			</navigator>
		</view> -->
		<view class="nav_container">
			<image @tap="jumpToNavPage(item.navigator_url, item.open_type)" v-for="item in navs" :key="item.name" :src="item.image_src"></image>
		</view>
		<!-- 商品楼层 -->
		<view class="floor_container">
			<view class="floor" v-for="(floor, index) in floors" :key="index">
				<view class="floor_title">
					<image :src="floor.floor_title.image_src"></image>
				</view>
				<view class="floor_products">
					<navigator class="product" :url="product.navigator_url" :open-type="product.open_type" v-for="(product, idx) in floor.product_list" :key="idx" >
						<image :src="product.image_src"></image>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * 首页的需求
 * 1、搜索栏需求
 * 	1.1 布局
 * 	1.2 点击搜索栏需要跳转到搜索界面
 * 2、首页轮播图
 * 	2.1 按设计图进行布局 √
 * 	2.2 要实现自动轮播 autoplay √
 * 	2.3 轮播到最后一页自动跳转到第一页 circular √
 * 	2.4 指示器颜色需要按设计图颜色设置 indicator-dots √
 *  2.5 根据后端返回数据渲染页面
 * 		2.5.1 在onLoad生命周期请求数据
 * 		2.5.2 把返回的数据放到data里
 * 		2.5.3 用循环渲染数据
 * 3、分类导航
 * 	3.1 布局 
 *  3.2 获取远程数据，渲染
 * 	3.3 点击单个按钮要跳转到对应页面
 * 4、楼层信息
 * 	4.1 布局，关键技术:通过浮动布局或者使用左右布局
 * 	4.2 请求数据、渲染数据（涉及到嵌套循环，第一层循环楼层、第二层循环商品信息）
 * 	4.2 点击卡片跳转到相应链接
 *  4.3 返回的导航url需要调整
 * 
 * 5、技术优化需求
 * 	5.1 封装网络请求工具
 * 		5.1.1 URL统一管理
 * 		5.1.2 满足不同的请求方式，GET POST
 * 		5.1.3 数据异常的时候，在网络层统一处理
 * 6、页面跳转的两个方法
 * 		第一种方法：使用navigator
 * 		第二种方法：使用API: uni.navigateTo({ url })
 * 7、下拉刷新
 *    7.1 打开下拉刷新
 *    7.2 在回调函数中重新请求数据
 * 	  7.3 收回加载状态 uni.stopPullDownRefresh();
 *    7.4 显示loading状态，uni.showLoading({ title })
 * 	  7.5 隐藏loading状态 uni.hideLoading()  
 * 8、使用async await 改造网络层
 * 	 await Promise()
 */
import http from '@/utils/http.js';
import SearchInput from '@/components/SearchInput.vue';

export default {
  data() {
    return {
		banner: [], // 页面轮播图数据
		navs: [], // 导航数据
		floors: [], // 楼层数据
	};
  },
  onLoad() {
	  console.log('onLoad')
	  this.fetchBanner();
	  this.fetchNav();
	  this.fetchFloor();
  },
  async onPullDownRefresh() {
	  console.log('页面被刷新')
	  // this.fetchBanner();
	  // this.fetchNav();
	  // this.fetchFloor();
	  uni.showLoading({ title: '数据拼命加载中...'})
	  await Promise.all([this.fetchBanner(), this.fetchNav(), this.fetchFloor()]);
	  uni.hideLoading();
	  uni.stopPullDownRefresh();
  },
  mounted() {
	  console.log('mounted')
  },
  components: {
	SearchInput  
  },
  methods: {
	  jumpToNavPage(url, open_type) {
		  if (open_type === 'switchTab') {
			  uni.switchTab({
			  	url
			  })
		  } else if (open_type === 'navigate') {
			  uni.navigateTo({
			  	url
			  })
		  } else {
			  uni.redirectTo({
			  	url
			  })
		  }

	  },
	//   获取轮播图数据
	  async fetchBanner() {
		  // uni.request({
			 //  url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
			 //  success: (res) => {
				//   this.banner = res.data.message;
			 //  } 
		  // })
		 //  http.get('/home/swiperdata', {}, (data) => {
			// this.banner = data;
		 //  })
		  // http.get返回一个promise
		   this.banner = await http.get('/home/swiperdata');
	  },
	//   获取导航栏数据
	async fetchNav() {
		  // uni.request({
			 //  url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
			 //  success: (res) => {
				  
				// //   "navigator_url": "/pages/category/main"
				// //  需要把navigator_url 改为 /pages/category/index
				// const data = res.data.message;
				// data.forEach(item => {
				// 	if (item.navigator_url) {
				// 		item.navigator_url = item.navigator_url.replace('main', 'index');
				// 	}
				// })
				// this.navs = data;
			 //  } 
		  // })
		  // http.get('/home/catitems', {}, (data) => {
				// data.forEach(item => {
				// 	if (item.navigator_url) {
				// 		item.navigator_url = item.navigator_url.replace('main', 'index');
				// 	}
				// })
				// this.navs = data;
		  // })
		  const data = await http.get('/home/catitems');
		  data.forEach(item => {
		  	if (item.navigator_url) {
		  		item.navigator_url = item.navigator_url.replace('main', 'index');
		  	}
		  })
		  this.navs = data;
	},
	// 获取楼层数据
	async fetchFloor() {
		 //  uni.request({
		 //  	url: "https://api-hmugo-web.itheima.net/api/public/v1/home/floordata",
			// success: (res) => {
			// 	const data = res.data.message;
			// 	//   "navigator_url": "/pages/goods_list?query='内容'"
			// 	//  需要把navigator_url 改为 /pages/goods_list/index?query='内容'
			// 	// 注意，需要两层的循环
			// 	// 第一层循环，获取单个楼层，第二层循环，获取商品
			// 	data.forEach(floor => {
			// 		// 第二层
			// 		floor.product_list.forEach( product => {
			// 			if (product.navigator_url) {
			// 				product.navigator_url = product.navigator_url.replace('goods_list', 'goods_list/index');
			// 			}
			// 		})
			// 	})
			// 	// 把数据赋值给data
			// 	this.floors = data;
			// }
		 //  })
		 // http.get('/home/floordata', {}, (data) => {
			//  	data.forEach(floor => {
			//  		floor.product_list.forEach( product => {
			//  			if (product.navigator_url) {
			//  				product.navigator_url = product.navigator_url.replace('goods_list', 'goods_list/index');
			//  			}
			//  		})
			//  	})
			//  	this.floors = data;
		 // })
		 const data = await http.get('/home/floordata');
		 data.forEach(floor => {
		 	floor.product_list.forEach( product => {
		 		if (product.navigator_url) {
		 			product.navigator_url = product.navigator_url.replace('goods_list', 'goods_list/index');
		 		}
		 	})
		 })
		 this.floors = data;
	}
  },

};
</script>

<style lang="less">
.banner_container {
	width: 100%;
	height: 340rpx;
	swiper {
		height: 100%;
	}
	swiper-item {
		height: 100%;
		image {
			width: 100%;
		}
	}
}
.nav_container {
	display: flex;
	justify-content: space-around;
	margin: 12rpx 0 43rpx 0rpx;
	image {
		width: 128rpx;
		height: 140rpx;
	}
}
// 楼层样式
.floor_container {
	.floor {
		.floor_title {
			height: 59rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.floor_products {
			height: 386rpx;
			padding: 12rpx;
			.product {
				width: 233rpx;
				height: 188rpx;
				display: inline-block;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.product:first-child {
				width: 232rpx;
				height: 100%;
				float: left;
				margin-right: 15rpx;
			}
			.product:nth-child(even) {
				margin-right: 15rpx;
			}
		}
	}
}
</style>
