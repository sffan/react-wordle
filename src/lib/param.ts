

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

const validLangs = ['en', 'es', 'pt', 'it', 'de', 'fr'];

export var lang = getUrlParam("lang") || navigator.language.split('-')[0];

if (lang && validLangs.indexOf(lang) === -1) {
  lang = '';
}
if (!lang) {
  if (window.location.host === 'palora.me'){
    lang = 'es';
  } else if (window.location.host === 'voortle.com'){
    lang = 'de';
  } else {
    lang = 'en';
  }
}