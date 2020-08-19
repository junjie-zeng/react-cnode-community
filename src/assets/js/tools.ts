import 'moment/locale/zh-cn'



export const getThemeType = (post: any) => {
    // console.log(tab)
    if (post.good == true) {
        return '精华'
    } else if (post.top == true) {
        return '置顶'
    } else if (post.tab == 'ask') {
        return '问答'
    } else if (post.tab == 'share') {
        return '分享'
    } else {
        return '招聘'
    }
}

export const getThemeColor = (post: any) => {
    // console.log(tab)
    if (post.good == true) {
        return '#3388ff'
    } else if (post.top == true) {
        return '#ff8855'
    } else {
        return '#666666'
    }
}


export const getRelativeTime = (date: string) => {
    var moment = require('moment');
    return moment(date, "YYYYMMDD").fromNow().replace(/[\s]+/g, '')
}