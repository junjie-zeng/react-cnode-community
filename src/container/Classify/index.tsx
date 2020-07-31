import React, { Component } from 'react'
import Scroll from '../../baseUi/Scroll'
import Tab from '../../components/Tab'
import { connect } from 'react-redux'
import { getClassifyContent } from '../../store/action'
import { getThemeType, getRelativeTime } from '../../assets/js/tools'
interface Props {
    classifyContentList: Array<any>
    getClassifyContent: Function
    refreshTips:boolean
    history:any
}
interface State {
    Tablist: Array<any>
    limit: number
    tab: string
    page:number
   
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
                // { name: '测试', active: false, type: 'cs' },
            ],
            limit: 5,
            tab: 'good',
            page:1
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
    }

    _updateTabList(index: number) {
        const { Tablist } = this.state
        Tablist.forEach((item: any, i: number) => (index === i ? item.active = true : item.active = false))
        this.setState({
            Tablist
        })
    }

    handleTouchEnd = () => {
        let { page, limit } = this.state
        const { getClassifyContent } = this.props
        this.setState({
            page: ++page,
        })
        getClassifyContent(page, limit)
    }

    handleSeeComment(id:string){
        this.props.history.push(`/detail/${id}`)
    }


    render() {
        const { Tablist } = this.state
        const { classifyContentList,refreshTips } = this.props
        return (
            <div className="classif-box">
                <Tab Tablist={Tablist} switchTab={this.switchTab} />
                <Scroll handleTouchEnd={this.handleTouchEnd} refreshTips={refreshTips}>
                    {
                        classifyContentList.map((item: any, index: number) => (
                            <div className="list-item" key={index}>
                                <div className="item-top">
                                    <div className="top-portrait" style={{ backgroundImage: `url(${item.author.avatar_url})` }}></div>
                                    <h3>{item.author.loginname}</h3>
                                    <span className="top-time">{getRelativeTime(item.create_at)}</span>
                                    <span className="top-sizebox">{getThemeType(item.tab)}</span>
                                </div>
                                <div className="item-content" onClick = {()=>{this.handleSeeComment(item.id)}}>
                                    <p>{item.title}</p>
                                </div>
                                <ul className="item-operation">
                                    <li>
                                        <a href="javascript:;">
                                            <em className="iconfont icon-yanjing"></em>
                                            <em>{item.visit_count}</em>
                                        </a>
                                    </li>
                                    <li className="two">
                                        <a href="javascript:;">
                                            <em className="iconfont icon-dkw_xiaoxi"></em>
                                            <em>{item.reply_count}</em>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <em className="iconfont icon-shijian00"></em>
                                            <em>{getRelativeTime(item.last_reply_at)}</em>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        ))
                    }
                </Scroll>
            </div>
        )
    }
}
const mapStateToProps = (state: any) => {
    return {
        classifyContentList: state.content.classifyContentList,
        refreshTips:state.content.refreshTips
    }
}
export default connect(mapStateToProps, { getClassifyContent })(Classify)