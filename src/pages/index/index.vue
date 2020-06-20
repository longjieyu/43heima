<template>
	<view class="container">
		<!-- 搜索栏 -->
		<view class="search_container">
			<view class="search_input">
				<text class="search_text">搜索</text>
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
 * 	2.1 按设计图进行布局
 * 	2.2 要实现自动轮播
 * 	2.3 轮播到最后一页自动跳转到第一页
 * 	2.4 指示器颜色需要按设计图颜色设置
 * 3、分类导航
 * 	2.1 布局
 * 	2.2 点击单个按钮要跳转到对应页面
 * 4、楼层信息
 * 	2.1 布局
 * 	2.2 点击卡片跳转到响应链接
 * 
 */
export default {
  data() {
    return {};
  },
  onLoad() {},
  methods: {}
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
</style>
