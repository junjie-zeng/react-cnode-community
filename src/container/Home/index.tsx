import React, { Component } from 'react'
import { connect } from 'react-redux'
import BScroll from 'better-scroll'
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
    msgTips: boolean
}

interface State {
    page: number,
    limit: number,
    dropDownRefresh: boolean
}

class Home extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            page: 1,
            limit: 5,
            dropDownRefresh: false
        }
    }


    // 渲染前
    componentWillMount() {
        const { getContent } = this.props
        const { limit } = this.state
        // todo传参
        getContent(1, limit)

    }
    // 第一次渲染后
    componentDidMount() {
        const wrapper = new BScroll('.list-box', {
            scrollY: true,
            click: true,
            probeType: 2,
        })
        const { getContent } = this.props
        let { page, limit } = this.state

        // 手指离开触发（模拟下拉刷新）
        wrapper.on('touchEnd', (ev: any) => {
            // 判断下拉动作
            if (ev.y > 30) {
                this.setState({
                    page: ++page,
                })
                getContent(page, limit)
            }
            this.setState({
                dropDownRefresh: false
            })
        })

        wrapper.on('scroll', (ev) => {
            // console.log("test")
            this.setState({
                dropDownRefresh: true
            })
        })

    }



    render() {
        const { loading, refreshTips, contentList, msgTips } = this.props
        const { dropDownRefresh } = this.state
        // console.log(loading)
        // console.log(refreshTips)
        // console.log(contentList)
        return (

            <div className="main-box">
                <Header left="" right="" center='标题'></Header>
                <Tips lei="msg-tips" isShow={msgTips} >新增10条主题请查收！</Tips>
                <Scroll dropDownRefresh={dropDownRefresh} refreshTips={refreshTips}>
                    {
                        contentList.map((item: any, i: number) => (
                            <div className="list-item" key={item.id} >
                                <div className="item-top">
                                    <div className="top-portrait">
                                        <img src={item.author.avatar_url} />
                                    </div>
                                    <h3>{item.author.loginname}</h3>
                                    <span className="top-time">{getRelativeTime(item.create_at)}</span>
                                    <span className="top-sizebox">{getThemeType(item.tab)}</span>
                                </div>
                                <div className="item-content">
                                    <p>{item.title}</p>
                                </div>
                                <ul className="item-operation">
                                    <li>
                                        <a href="">
                                            <em>xx</em>
                                            <em>{item.visit_count}</em>
                                        </a></li>
                                    <li className="two">
                                        <a href="">
                                            <em>xx</em>
                                            <em>{item.reply_count}</em>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="">
                                            <em>xx</em>
                                            <em>{getRelativeTime(item.last_reply_at)}</em>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        ))
                    }
                </Scroll>
               
                <div className="nav">
                    <div className="active">
                        <span>1</span>
                        <span>首页</span>
                    </div>
                    <div>
                        <span>1</span>
                        <span>分类</span>
                    </div>
                    <div>
                        <span>1</span>
                        <span>消息</span>
                    </div>
                    <div>
                        <span>1</span>
                        <span>我的</span>
                    </div>
                </div>
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