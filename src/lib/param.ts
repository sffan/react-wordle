

export const getUrlParam = (name: string) => {
    // 获取URL参数
    const url = window.location.href;
    const query = url.split('?')[1];
    if (!query){
      return null
    }
    const param_arr = query.split('&');
    var value = null;
    for(let element of param_arr) {
        if(element.split('=')[0] === name){
          value = element.split('=')[1];
          break
        }
    }
    return value
}

export var lang = getUrlParam("lang");
if (!lang) {
  if (window.location.host === 'palora.me'){
    lang = 'pt';
  } else if (window.location.host === 'voortle.com'){
    lang = 'de';
  } else {
    lang = 'en';
  }
}