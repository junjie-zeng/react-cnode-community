import React, { Component } from 'react'
import CommentTab from '../../components/CommentTab'

interface Props{

}
interface State{
    tabs:Array<any>
}
class Msg extends Component<Props,State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            tabs: [
                { title: '未读消息', active: true },
                { title: '已读消息', active: false }
            ]
        }
    }
    
    _commentSwitch = (index: number,tabs:Array<any>) => {
        // let { isRecentTopics } = this.state
         // 0 最近主题 1 最近评论
        // isRecentTopics = index ?false : true
        this.setState({tabs})
        
    }

    render() {
        const {tabs} = this.state
        return (
            <div className="msg-box">
                <CommentTab tabs ={tabs} commentSwitch = {this._commentSwitch}/>
                <div className="comment-tab-box">
                    <div className="scroll-box wrapper">
                        <div className="scroll-wrap-list">
                            <div className="comment-item">
                                <div className="comment-wrap">
                                    <div>
                                        <div className="touxiang"></div>
                                        <span className="name">junjie-zeng</span>
                                    </div>
                                    <div>
                                        <em>1年前</em>
                                    </div>
                                </div>
                                <div className="comment">
                                    <p>我和我的小伙伴都惊呆了</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Msg