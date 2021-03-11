const baseUrl = 'http://jl.jingyunlv.com/index.php'// 原来的域名http://lvz.maike-docker.com/index.php
const request = (url = '', date = {}, header = {
	'Content-Type': 'application/x-www-form-urlencoded'
}, type = 'POST') => {
    return new Promise((resolve, reject) => {
        uni.request({
            method: type,
            url: baseUrl + url,
            data: date,
            header: header,
        }).then((response) => {
            setTimeout(function() {
                uni.hideLoading();
            }, 200);
            let [error, res] = response;        
            resolve(res);
        }).catch(error => {
            let [err, res] = error;
            reject(err)
        })
    });
}
export default request