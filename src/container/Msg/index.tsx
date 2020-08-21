import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentTab from '../../components/CommentTab'
import { getMsg } from '../../store/action'
import { Link } from 'react-router-dom'
import Scroll from '../../baseUi/Scroll'
import {  getRelativeTime } from '../../assets/js/tools'
interface Props {
    getMsg: Function
    msgInfo: any
}
interface State {
    tabs: Array<any>
    ishasReadMessage: boolean
    hasnot_read_messages: Array<any>
}
class Msg extends Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            tabs: [
                { title: '未读消息', active: true },
                { title: '已读消息', active: false }
            ],
            ishasReadMessage: true,
            hasnot_read_messages: [
                {
                    id: "543fb7abae523bbc80412b26",
                    type: "at",
                    has_read: false,
                    author: {
                        loginname: "alsotang",
                        avatar_url: "https://avatars.githubusercontent.com/u/1147375?v=2"
                    },
                    topic: {
                        id: "542d6ecb9ecb3db94b2b3d0f",
                        title: "adfadfadfasdf",
                        last_reply_at: "2014-10-18T07:47:22.563Z"
                    },
                    reply: {
                        id: "543fb7abae523bbc80412b24",
                        content: "[@alsotang](/user/alsotang) 哈哈",
                        ups: [],
                        create_at: "2014-10-16T12:18:51.566Z"
                    }
                },
            ]
        }

    }

    componentWillMount() {
        this._init()

    }

    _init() {
        const { getMsg } = this.props
        const token = localStorage.getItem('token')
        if (token) {
            getMsg(token)
        }
    }

    _commentSwitch = (index: number, tabs: Array<any>) => {
        let { ishasReadMessage } = this.state
        // 0 未读 1 已读
        ishasReadMessage = index ? false : true
        this.setState({ tabs, ishasReadMessage })

    }

    render() {
        const { tabs, ishasReadMessage } = this.state
        const { msgInfo } = this.props
        const { has_read_messages, hasnot_read_messages } = msgInfo
        const token = localStorage.getItem('token')
        const msg:any = this.state.hasnot_read_messages
        console.log('msgInfo...', msgInfo)
        return (
            <div className="msg-box">
                <CommentTab tabs={tabs} commentSwitch={this._commentSwitch} />
                <div className="comment-tab-box">
                    {
                        (token && has_read_messages && !has_read_messages.length && ishasReadMessage) ||
                            (token && hasnot_read_messages && !hasnot_read_messages.length && !ishasReadMessage) ?
                            <div className="msg">暂无消息</div> : ''
                    }
                    {

                        token ?
                            ''
                            :

                            <div className="msg">未登录请 <Link to='/login'>登录</Link></div>
                    }

                    {/* <Scroll handleTouchEnd={() => { }} refreshTips={false}>
                        {
                            hasnot_read_messages && hasnot_read_messages.map((item: any, index: number) => (
                                <div className="comment-item" key = {item.id}>
                                    <div className="comment-wrap">
                                        <div>
                                            <div className="touxiang" style={{ backgroundImage: `url(${item.author.avatar_url})` }}></div>
                                            <span className="name">{item.author.loginname}</span>
                                        </div>
                                        <div>
                                        <em>{getRelativeTime(item.topic.last_reply_at)}</em>
                                        </div>
                                    </div>
                                    <div className="comment">
                                        <p>{item.topic.title}</p>
                                    </div>
                                </div>

                            ))
                        }
                    </Scroll> */}

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        msgInfo: state.msg.msgInfo
    }
}

export default connect(mapStateToProps, { getMsg })(Msg)