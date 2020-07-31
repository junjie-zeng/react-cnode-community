import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getContent } from '../../store/action'
import Tips from '../../components/Tips/Tips'
import Header from '../../components/Header'
import Scroll from '../../baseUi/Scroll'
// 工具
import { getThemeType, getRelativeTime } from '../../assets/js/tools'

interface Props {
    getContent: Function,
    loading: boolean,
    refreshTips: boolean,
    contentList: any,
    msgTips: boolean,
    history:any
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
        const { limit ,page} = this.state
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


    handleSeeComment(id:string){
        this.props.history.push(`/detail/${id}`)
    }



    render() {
        const { loading, refreshTips, contentList, msgTips } = this.props
        return (

            <div className="main-box">
                <div className="header">
                    <div className="header-left" style={{ visibility: 'hidden' }}><em className="iconfont icon-fanhui"></em></div>
                    <div className="header-center">CNode.js中文社区</div>
                    <div className="header-right"><em className="iconfont icon-qita"></em></div>
                </div>
                <Tips lei="msg-tips" isShow={msgTips} >新增10条主题请查收！</Tips>
                <Scroll handleTouchEnd={this.handleTouchEnd} refreshTips={refreshTips}>
                    {
                        contentList.map((item: any, i: number) => (
                            <div className="list-item" key={i} >
                                <div className="item-top">
                                    <div className="top-portrait" style={{ backgroundImage: `url(${item.author.avatar_url})`}}></div>
                                    <h3>{item.author.loginname}</h3>
                                    <span className="top-time">{getRelativeTime(item.create_at)}</span>
                                    <span className="top-sizebox">{getThemeType(item.tab)}</span>
                                </div>
                                <div className="item-content" onClick = {()=>{this.handleSeeComment(item.id)}}>
                                    <p>{item.title}</p>
                                </div>
                                <ul className="item-operation">
                                    <li>
                                        <a href="">
                                            <em className="iconfont icon-yanjing"></em>
                                            <em>{item.visit_count}</em>
                                        </a></li>
                                    <li className="two">
                                        <a href="">
                                            <em className="iconfont icon-dkw_xiaoxi"></em>
                                            <em>{item.reply_count}</em>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
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
        loading: state.content.loading,
        refreshTips: state.content.refreshTips,
        contentList: state.content.contentList,
        msgTips: state.content.msgTips
    }
}

export default connect(mapStateToProps, { getContent })(Home)