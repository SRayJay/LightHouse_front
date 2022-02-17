/**
 * 各种工具函数
 */


/**
 * 
 * @param {string} country
 * @returns {string} 
 */
function simplifyCountry(country:string){
    
    let countrys = ['美国','日本','中国','韩国','马来西亚','哥伦比亚','智利','德国','法国','英国','波兰','意大利','俄国',]
    let simples = ['美','日','','韩','马来西亚','哥伦比亚','智利','德','法','英','波兰','意','俄']
    let n = countrys.findIndex((item)=>{
        return item==country
    })

    return simples[n];
}

export { simplifyCountry}