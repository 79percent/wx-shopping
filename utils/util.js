// 默认图片
export const defalutImage = 'https://images.669pic.com/element_pic/37/55/95/48/266a88a841b630f15d07678b9035d65f.jpg'

/**
 * 将obj转换成url的形式
 * @param {
 *  name: 'gcf',
 *  age: 11,
 *  sex: 'male'
 * } obj 
 * @return name=gcf&age=11&sex=male
 */
export const stringify = (obj = {}) => {
  const keys = Object.keys(obj);
  const keysLen = keys.length;
  let str = '';
  let i = 0;
  for (const key in obj) {
    i++;
    const value = obj[key];
    str = `${str}${key}=${value}`;
    if(i !== keysLen){
      str = `${str}&`
    }
  }
  return str;
}

/**
 * 将url转换成obj
 * @param { name=gcf&age=11&sex=male }
 * @returns {
 *  name: 'gcf',
 *  age: 11,
 *  sex: 'male'
 * } 
 */
export const parse = (str = '') => {
  const paramsArr = str.split('&');
  const obj = {};
  paramsArr.forEach(item => {
    const [key, value] = item.split('=');
    obj[key] = value;
  })
  return obj;
}