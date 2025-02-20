import React, { Component } from 'react'
import Scroll from '../../baseUi/Scroll'
import Tab from '../../components/Tab'
import { connect } from 'react-redux'
import { getClassifyContent } from '../../store/action'
import { getThemeType, getRelativeTime,getThemeColor } from '../../assets/js/tools'
interface Props {
    classifyContentList: Array<any>
    getClassifyContent: Function
    refreshTips: boolean
    history: any
}
interface State {
    Tablist: Array<any>
    limit: number
    tab: string
    page: number

}
class Classify extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            Tablist: [
                { name: '精华', active: true, type: 'good' },
                { name: '问答', active: false, type: 'ask' },
                { name: '分享', active: false, type: 'share' },
                { name: '招聘', active: false, type: 'job' },
                { name: '测试', active: false, type: 'dev' },
            ],
            limit: 5,
            tab: 'good',
            page: 1
        }
    }

    // 渲染前
    componentWillMount() {
        const { getClassifyContent } = this.props
        const { limit, tab } = this.state
        getClassifyContent(1, limit, tab)

    }


    switchTab = (index: number, tab: string) => {
        const { getClassifyContent } = this.props
        const { limit } = this.state
        // console.log('tab..', tab)
        getClassifyContent(1, limit, tab)
        this._updateTabList(index)
        this.setState({tab})
    }

    _updateTabList(index: number) {
        const { Tablist } = this.state
        Tablist.forEach((item: any, i: number) => (index === i ? item.active = true : item.active = false))
        this.setState({
            Tablist
        })
    }

    // 下拉结束
    handleTouchEnd = () => {
        let { page, limit,tab } = this.state
        const { getClassifyContent } = this.props
        this.setState({
            page: ++page,
        })
        getClassifyContent(page, limit,tab)
    }
    // 查看评论
    handleSeeComment(id: string,isComment:boolean) {
        this.props.history.push(`/detail/${id}/${isComment}`)
    }


    render() {
        const { Tablist } = this.state
        const { classifyContentList, refreshTips ,history} = this.props
        return (
            <div className="classify-box">
                <Tab Tablist={Tablist} switchTab={this.switchTab} />
                <div className="classify-wrap">
                    <Scroll handleTouchEnd={this.handleTouchEnd} refreshTips={refreshTips}>
                        {
                            classifyContentList.map((item: any, index: number) => (
                                <div className="list-item swing" key = {index}>
                                    <div className="item-header">
                                        <div onClick={() => { history.push(`/user/${item.author.loginname}`) }}>
                                            <span className="portrait" style={{ backgroundImage: `url(${item.author.avatar_url})` }}></span>
                                            <span className="name">{item.author.loginname}</span>
                                        </div>
                                        <div>
                                            <span className="classify" style={{background:getThemeColor(item)}}>{getThemeType(item)}</span>
                                            <span className="release-date">{getRelativeTime(item.create_at)}</span>
                                        </div>
                                    </div>
                                    <div className="item-content" onClick={() => { this.handleSeeComment(item.id,false) }}>
                                        <p>{item.title}</p>
                                    </div>
                                    <div className="item-nav">
                                        <div className="item-n-chakan">
                                            <span className="iconfont icon-yanjing"></span>
                                            <span>{item.visit_count}</span>
                                        </div>
                                        <div className="item-n-msg" onClick={() => { this.handleSeeComment(item.id,true) }}>
                                            <span className="iconfont icon-dkw_xiaoxi"></span>
                                            <span>{item.reply_count}</span>
                                        </div>
                                        <div className="item-n-date">
                                            <span className="iconfont icon-shijian00"></span>
                                            <span>{getRelativeTime(item.last_reply_at)}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </Scroll>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state: any) => {
    return {
        classifyContentList: state.content.classifyContentList,
        refreshTips: state.assist.refreshTips
    }
}
export default connect(mapStateToProps, { getClassifyContent })(Classify)