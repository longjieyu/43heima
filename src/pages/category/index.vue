<template>
	<view class="cate_container">
		<!-- 搜索栏 -->
		<view class="search_container">
			<view class="search_input" @tap="jumpToSearchPage">
				<text class="search_text">搜索</text>
			</view>
		</view>
		<!-- 分类 -->
		<view class="main_container">
			<!-- 左侧主分类 -->
			<view class="left_cate_container">
				<view class="item active">热门推荐</view>
				<view class="item">热门推荐</view>
				<view class="item">热门推荐</view>
				<view class="item">热门推荐</view>
				<view class="item">热门推荐</view>
				<view class="item">热门推荐</view>
				<view class="item">热门推荐</view>
				<view class="item">热门推荐</view>
				<view class="item">热门推荐</view>
				<view class="item">热门推荐</view>
				<view class="item">热门推荐</view>
			</view>
			<!-- 右侧二级分类 -->
			<view class="right_cate_container">
				
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * 需求分析
	 * 1、布局
	 * 2、左侧主分类列表
	 * 	  2.1 列表需要根据API请求，并渲染
	 * 	  2.2 列表需要实现滚动
	 * 	  2.3 默认选择第一个分类，而且选中的分类需要显示红色
	 * 	  2.4 点击切换分类后，右侧二级分类需要显示对应数据
	 * 3、右侧二级分类
	 * 	 3.1 当左侧选择主分类后，二级分类显示数据列表
	 *   3.2 当点击具体类目时，需要跳转到相应链接（页面间数据的传递）
	 *   3.3 页面需要滚动
	 */
	export default {
		data() {
			return {
			}
		},
		onLoad() {
		},
		methods: {

		}
	}
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
.main_container {
	// 100 vh 表示一屏的高度， 100vw 表示一屏宽度
	// 样式的运算 calc(100vh - 100rpx) 表示减去搜索栏高度
	height: calc(100vh - 100rpx);
	.left_cate_container {
		width: 182rpx;
		height: 100%;
		background-color: #F3F3F3;
		.item {
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28rpx;
			color: #585858;
		}
		.item.active {
			position: relative;
			font-weight: 550;
			color: #EA4350;
		}
		.item.active::before{
			content: '';
			position: absolute;
			top: 20rpx;
			left: 0;
			width: 4rpx;
			height: 43rpx;
			background-color: #EA4350;
		}
	}
}
</style>
