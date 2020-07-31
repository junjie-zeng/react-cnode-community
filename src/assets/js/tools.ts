import 'moment/locale/zh-cn'



export const getThemeType = (tab: string) => {
    // console.log(tab)
    switch (tab) {
        case 'ask':
            return '问答'
        case 'share':
            return '分享'
        case 'job':
            return '招聘'
        case 'good':
            return '精华'
        default:
            return ''
    }
}


export const getRelativeTime = (date: string) => {
    var moment = require('moment');
    return moment(date, "YYYYMMDD").fromNow().replace(/[\s]+/g, '')
}