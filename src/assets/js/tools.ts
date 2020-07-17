import 'moment/locale/zh-cn'



export const getThemeType = (type:string) => {
    console.log()
    return type == 'aks' ? '问答' : type == 'share' ? '分享' : type == 'job' ? '职位' : '满意'
}


export const getRelativeTime = (date:string) => {
    var moment = require('moment');
    return moment(date, "YYYYMMDD").fromNow().replace(/[\s]+/g,'')
}