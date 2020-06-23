<template>
	<view class="cate_container">
		<!-- 搜索栏 -->
		<SearchInput/>
		<!-- 分类 -->
		<view class="main_container">
			<!-- 左侧主分类 -->
			<view class="left_cate_container">
				<view @tap="cateSelect(index)" :class="curIndex === index ? 'active': ''" class="item" v-for="(item, index) in category" :key="item.cat_id">{{item.cat_name}}</view>
			</view>
			<!-- 右侧二级分类 -->
			<view class="right_cate_container">
				<view class="floor" v-for="item in category[curIndex].children" :key="item.cat_id">
					<view class="title">/ {{item.cat_name}} /</view>
					<view class="categories_container">
						<view class="category" v-for="cate in item.children" @tap="jumpToProductList(cate.cat_id)" :key="cate.cat_id">
							<image :src="cate.cat_icon"></image>
							<view class="name">{{cate.cat_name}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	/**
	 * 需求分析
	 * 1、布局 √
	 * 2、左侧主分类列表
	 * 	  2.1 列表需要根据API请求，并渲染 √
	 * 		2.1.1 API地址 https://api-hmugo-web.itheima.net/api/public/v1/categories
	 * 	  2.2 列表需要实现滚动 √
	 * 	  2.3 默认选择第一个分类，而且选中的分类需要显示红色，当用户点击不同分类，需要切换激活状态 √
	 *  	思路：在data中定义一个名为curIndex的变量，记录用户当前点击的位置
	 * 		思路：定义一个方法叫cateSelect(index)，用于记录用户点击的分类索引
	 * 	  2.4 点击切换分类后，右侧二级分类需要显示对应数据 √
	 *  	思路：category[curIndex] 获取到当前选择分类下的二级分类数据
	 * 3、右侧二级分类
	 *   3 布局 √
	 * 	 3.1 当左侧选择主分类后，二级分类显示数据列表 √
	 *   3.2 当点击具体类目时，需要跳转到相应链接（页面间数据的传递）√
	 * 		关键：参数在跳转URL通过?拼接，例如 /pages/goods_list/index?cid=1
	 * 			 在目标页面通过onLoad接收，接收到的是一个对象，{ cid: 1}
	 *   3.3 页面需要滚动 √
	 */
	import http from '@/utils/http.js';
	import SearchInput from '@/components/SearchInput.vue';
	export default {
		data() {
			return {
				category: [], // 分类数据
				curIndex: 0
			}
		},
		onLoad() {
			this.fetchCategory();
		},
		components: {
			SearchInput
		},
		methods: {
			// 获取分类数据
			async fetchCategory() {
				this.category = await http.get('/categories');
			},
			// 记录用户选择一级分类
			cateSelect(index) {
				this.curIndex = index;
			},
			// 跳转到商品列表
			jumpToProductList(cat_id) {
				// 传递参数给商品分类页 router.push('/pages/goods_list/index?cid=1')
				uni.navigateTo({
					url: '/pages/goods_list/index?cat_id=' + cat_id
				})
			}
		}
	}
</script>

<style lang="less">
.main_container {
	// 100 vh 表示一屏的高度， 100vw 表示一屏宽度
	// 样式的运算 calc(100vh - 100rpx) 表示减去搜索栏高度
	height: calc(100vh - 100rpx);
	display: flex;
	.left_cate_container {
		width: 182rpx;
		height: 100%;
		background-color: #F3F3F3;
		overflow: scroll;
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
	.right_cate_container {
		flex: 1;
		overflow: scroll;
		padding: 0 48rpx;
		.floor {
			margin: 18rpx 0;
			.title {
				font-size: 28rpx;
				color: #575757;
				text-align: center;
				font-weight: bold;
				margin-bottom: 30rpx;
			}
			.categories_container {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.category {
					display: flex;
					flex-direction: column;
					align-items: center;
					margin-bottom: 30rpx;
					.name {
						font-size: 24rpx;
						color:#2E2E2E;
						font-weight: 500;
					}
					image {
						width:120rpx;
						height: 120rpx;
					}
				}
			}
		}
	}
}
</style>
