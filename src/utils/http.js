// 网络请求工具库

/**
 *   5.1 封装网络请求工具
 * 		5.1.1 URL统一管理
 * 		5.1.2 满足不同的请求方式，GET POST
 * 		5.1.3 数据异常的时候，在网络层统一处理
 * 		5.1.4 增加request方法，减少重复代码
 */

const BASE_URL = 'https://api-hmugo-web.itheima.net/api/public/v1';

/**
 * url: 表示请求的地址
 * data: 表示请求参数
 * success: 请求成功回调
 */
const get = (url, data, success) => {
	request(url, data, success, 'GET');
}

const post = (url, data, success) => {
	request(url, data, success, 'POST');
}

const request = (url, data, success, method = 'GET') => {
	uni.request({
		url: BASE_URL + url,
		data,
		method,
		success: (res) => {
			// 异常逻辑的处理
			if (res.data.meta.status !== 200) {
				// toast提示
				uni.showToast({
					title: res.data.meta.msg,
					icon: 'none'
				})
			} else {
				success(res.data.message);
			}
			
		}
	})
}

const http = {
	get,
	post
}

export default http;
