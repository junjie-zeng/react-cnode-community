import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getContent } from '../../store/action'
import Tips from '../../components/Tips/Tips'
import Header from '../../components/Header'
import Scroll from '../../baseUi/Scroll'
// 工具
import { getThemeType, getRelativeTime ,getThemeColor} from '../../assets/js/tools'

interface Props {
    getContent: Function,
    loading: boolean,
    refreshTips: boolean,
    contentList: any,
    msgTips: boolean,
    history: any
}

interface State {
    page: number,
    limit: number,
}

class Home extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            page: 1,
            limit: 5,
        }
    }


    // 渲染前
    componentWillMount() {
        const { getContent } = this.props
        const { limit, page } = this.state
        // todo传参
        getContent(page, limit)

    }


    handleTouchEnd = () => {
        let { page, limit } = this.state
        const { getContent } = this.props
        this.setState({
            page: ++page,
        })
        getContent(page, limit)
    }


    handleSeeComment(id: string) {
        this.props.history.push(`/detail/${id}`)
    }



    render() {
        const { loading, refreshTips, contentList, msgTips, history } = this.props
        const { limit } = this.state
        return (
            <div>
                <Header title='CNode.js中文社区' icon2="icon-github" />
                <Tips lei="msg-tips" isShow={msgTips} >新增 {limit} 条主题请查收！</Tips>
                <section className="main-content">
                    <Scroll handleTouchEnd={this.handleTouchEnd} refreshTips={refreshTips}>
                        {
                            contentList.map((item: any, i: number) => (
                                <div className="list-item" key={i}>
                                    <div className="item-header">
                                        <div>
                                            <span className="portrait" style={{ backgroundImage: `url(${item.author.avatar_url})` }} onClick={() => { history.push(`/user/${item.author.loginname}`) }}></span>
                                            <span className="name">{item.author.loginname}</span>
                                        </div>
                                        <div>
                                            <span className="classify" style={{background:getThemeColor(item)}}>{getThemeType(item)}</span>
                                            <span className="release-date">{getRelativeTime(item.create_at)}</span>
                                        </div>
                                    </div>
                                    <div className="item-content" onClick={() => { this.handleSeeComment(item.id) }}>
                                        <p>{item.title}</p>
                                    </div>
                                    <div className="item-nav">
                                        <div className="item-n-chakan">
                                            <span className="iconfont icon-yanjing"></span>
                                            <span>{item.visit_count}</span>
                                        </div>
                                        <div className="item-n-msg">
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
                </section>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        loading: state.content.loading,
        refreshTips: state.content.refreshTips,
        contentList: state.content.contentList,
        msgTips: state.content.msgTips
    }
}

export default connect(mapStateToProps, { getContent })(Home)