/*
    发送ajax请求的函数模块
    函数的返回值是promise对象

*/
// axios
import axios from 'axios';
export default function ajax(url ,data={},method = "GET"){
    //大部分请求都是get所以默认为get
    if(method === "GET"){
    	var paramStr = ''
        Object.keys(data).forEach(key =>{
             paramStr += `${key}=${data[key]}&`
        })
        paramStr = paramStr && paramStr.substring(0,paramStr.length-1)
        url = paramStr ? `${url}?${paramStr}`:url
        return axios.get(url)
    }else{
    	return axios.post(url,data)
    }
}