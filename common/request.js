const baseUrl = 'http://lvz.maike-docker.com/index.php'   
const request = (url = '', date = {}, type = 'POST', header = {
}) => {
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