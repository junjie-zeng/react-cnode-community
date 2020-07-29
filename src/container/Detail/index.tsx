import React from 'react'
import { connect } from 'react-redux'
import Scroll from '../../baseUi/Scroll'
import { getDetail } from './../../store/action'
interface Props {
    match: any
    getDetail: Function
    detail: any
}

interface State {
    isContent: boolean
    commentContent: string
    [x: string]: any
}
class Detail extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            // 默认展示内容
            isContent: false,
            commentContent: ''
        }
    }
    // 渲染前
    componentWillMount() {
        const { getDetail } = this.props
        const { match } = this.props


        const id = match.params.id
        getDetail(id)
        console.log(id)

    }

    handleDetailSwitch(flag: boolean) {
        let { isContent, commentContent } = this.state
        // 输入框有内容则发布
        if (commentContent) {
            // 调用发布函数

            return
        }

        isContent = flag ? false : true

        this.setState({
            isContent,
            commentContent: ''
        })

    }

    handleChange(name: string, value: any) {
        // console.log(name)
        // console.log(value)
        this.setState({
            [name]: value
        })
    }


    render() {
        const { isContent, commentContent } = this.state
        const { detail } = this.props
        console.log(detail)
        return (
            <div className={isContent ? ' detail-box' : 'comment-box detail-box detail-rotate'}>
                {
                    isContent ?
                        <div className="detail-content">
                            <div className="header">
                                <div className="header-left" ><em className="iconfont icon-fanhui"></em></div>
                                <div className="header-center">内容</div>
                                <div className="header-right"><em className="iconfont icon-shoucang"></em></div>
                            </div>
                            <Scroll handleTouchEnd={() => { }} refreshTips={true}>
                                <div style={{ padding: '10px' }} dangerouslySetInnerHTML={{ __html: detail.content }}></div>
                            </Scroll>
                            <div className="comment-release">
                                <input type="text" placeholder="快来评论" value={commentContent} onChange={(event) => { this.handleChange('commentContent', event.target.value) }} />
                                <button onClick={() => { this.handleDetailSwitch(true) }}>
                                    {commentContent ? '发布评论' : '查看评论'}
                                </button>
                            </div>
                        </div>
                        :
                        <div className="detail-comment">
                            <div className="header">
                                <div className="header-left" ><em className="iconfont icon-fanhui"></em></div>
                                <div className="header-center">评论</div>
                                <div className="header-right" style={{ visibility: 'hidden' }}><em className="iconfont icon-shoucang"></em></div>
                            </div>
                            <Scroll handleTouchEnd={() => { }} refreshTips={true}>
                                <div className="comment-title">
                                    <div>
                                        <span>评论.11</span>
                                    </div>
                                </div>
                                <div className="comment-list" >
                                    {
                                        detail.replies && detail.replies.map((item: any, index: number) => (

                                            <div className="comment-item" key={item.id}>
                                                <div className="item-wrapper">
                                                    <div className="wrapper-portrait" style={{ backgroundImage: `url(${item.author.avatar_url})` }}></div>
                                                    <div className="wrapper-name">
                                                        <span>{item.author.loginname}</span>
                                                    </div>
                                                    <div className="wrapper-give ">
                                                        <em className="iconfont icon-ziyuan"></em>
                                                        <em>1</em>
                                                    </div>
                                                </div>
                                                <div className="item-content">
                                                    <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
                                                </div>
                                            </div>

                                        ))
                                    }
                                </div>

                            </Scroll>
                            <div className="comment-release">
                                <input type="text" placeholder="快来评论" value={commentContent} onChange={(event) => { this.handleChange('commentContent', event.target.value) }} />
                                <button onClick={() => { this.handleDetailSwitch(false) }}>
                                    {commentContent ? '发布评论' : '去到主题'}
                                </button>
                            </div>
                        </div>
                }



            </div>

        )
    }
}



const mapStateToProps = (state: any) => {
    return {
        detail: state.content.detail
    }
}

export default connect(mapStateToProps, { getDetail })(Detail)