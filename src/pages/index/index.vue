<template>
	<view class="container">
		<!-- 搜索栏 -->
		<view class="search_container">
			<view class="search_input">
				<text class="search_text">搜索</text>
			</view>
		</view>
		<!-- 首页轮播图 -->
		<view class="banner_container">
			<swiper indicator-active-color="#EA4350" :autoplay="true" :circular="true" :indicator-dots="true">
				<swiper-item v-for="item in banner" :key="item.goods_id">
					<image mode="widthFix" :src="item.image_src"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 导航栏 -->
		<view class="nav_container">
			<navigator :open-type="item.open_type" :url="item.navigator_url" v-for="item in navs" :key="item.name">
				<image :src="item.image_src"></image>
			</navigator>
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
 * 	2.1 布局
 *  2.2 获取远程数据，渲染
 * 	2.3 点击单个按钮要跳转到对应页面
 * 4、楼层信息
 * 	2.1 布局
 * 	2.2 点击卡片跳转到响应链接
 * 
 */
export default {
  data() {
    return {
		banner: [], // 页面轮播图数据
		navs: [], // 导航数据
	};
  },
  onLoad() {
	  this.fetchBanner();
	  this.fetchNav();
  },
  methods: {
	//   获取轮播图数据
	  fetchBanner() {
		  uni.request({
			  url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
			  success: (res) => {
				  this.banner = res.data.message;
			  } 
		  })
	  },
	//   获取导航栏数据
	fetchNav() {
		  uni.request({
			  url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
			  success: (res) => {
				  
				//   "navigator_url": "/pages/category/main"
				//  需要把navigator_url 改为 /pages/category/index
				const data = res.data.message;
				data.forEach(item => {
					if (item.navigator_url) {
						item.navigator_url = item.navigator_url.replace('main', 'index');
					}
				})
				this.navs = data;
			  } 
		  })
	}
  }
};
</script>

<style lang="less">
.search_container {
	background: #EA4350;
	width: 100%;
	height: 100rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	.search_input {
		width: 700rpx;
		height: 80rpx;
		background: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 5rpx;
		.search_text {
			font-size: 32rpx;
			color:#767676;
		}
	}
}
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
</style>
