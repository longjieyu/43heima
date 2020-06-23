<template>
		<!-- 搜索栏 -->
		<view class="search_container">
			<view class="search_input" @tap="jumpToSearchPage">
				<text class="search_text">搜索</text>
			</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			// 跳转到搜索页
			jumpToSearchPage() {
					// 调用跳转API
					uni.navigateTo({
						url: '/pages/search/index'
					})
			},
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
</style>
