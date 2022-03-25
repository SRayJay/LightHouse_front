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

// 图片上传预览
// function getBase64(file: File) {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = error => reject(error);
//     });
//   }
  function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result as string));
    reader.readAsDataURL(img);
}

export { 
    simplifyCountry,
    getBase64
}