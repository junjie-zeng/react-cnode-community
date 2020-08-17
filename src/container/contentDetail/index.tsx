import React from 'react'
import { connect } from 'react-redux'
import Scroll from '../../baseUi/Scroll'
import { getDetail } from '../../store/action'
interface Props {
    match: any
    history: any
    getDetail: Function
    detail: any
    refreshTips: boolean

}

interface State {
    isContent: boolean
    commentContent: string
    [x: string]: any
}
class ContentDetail extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            // 默认展示内容
            isContent: true,
            commentContent: ''
        }
    }
    // 渲染前
    componentWillMount() {
        this._loadingDetail()
    }

    _loadingDetail() {
        const { getDetail } = this.props
        const { match } = this.props
        const id = match.params.id
        getDetail(id)
        //console.log(id)
    }

    handleDetailSwitch(flag: boolean) {
        let { isContent, commentContent } = this.state
        // 输入框有内容则发布
        if (commentContent) {
            // 调用发布函数

            return
        }

        isContent = flag ? true : false

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
        const { detail, refreshTips } = this.props
        console.log(isContent)
        return (
            <div className = {isContent ?'detail-wrapper':'detail-rotate detail-wrapper'} >
                {
                    isContent ?
                        <div >
                            <header className="header">
                                <div className="back" onClick={() => { this.props.history.go(-1) }}>
                                    <em className="iconfont icon-fanhui"></em>
                                </div>
                                <div className="wrap">
                                    <span style={{ background: 'goldenrod' }}></span>
                                    <em>评论</em>
                                </div>
                                <div className="other">
                                    <em className="iconfont icon-shoucang"></em>
                                </div>
                            </header>
                            <div className='detail'>
                                <div className="comment-content">
                                    <Scroll handleTouchEnd={this._loadingDetail.bind(this)} refreshTips={refreshTips}>
                                        <div className="comment-count">
                                            <h4>评论. 4</h4>
                                        </div>
                                        {
                                            detail.replies && detail.replies.map((item: any, index: number) => (
                                                <div className="comment-item" key={item.id}>
                                                    <div className="comment-wrap">
                                                        <div>
                                                            <div className="touxiang" style={{ backgroundImage: `url(${item.author.avatar_url})` }}></div>
                                                            <span className="name">{item.author.loginname}</span>
                                                        </div>
                                                        <div>
                                                            <em className="iconfont icon-shoucang"></em>
                                                            <em>0</em>
                                                        </div>
                                                    </div>
                                                    <div className="comment">
                                                        <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </Scroll>

                                    <div className="operation">
                                        <div>
                                            <input type="text" value={commentContent} onChange={(event) => { this.handleChange('commentContent', event.target.value) }} placeholder="快来评论" />
                                        </div>
                                        <div>
                                            <button onClick={() => { this.handleDetailSwitch(false) }}>
                                                {commentContent ? '发布评论' : '去到主题'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        :
                        <div className="content-box" >
                            <header className="header">
                                <div className="back" onClick={() => { this.props.history.go(-1) }}>
                                    <em className="iconfont icon-fanhui"></em>
                                </div>
                                <div className="wrap">
                                    <span style={{ background: 'goldenrod' }}></span>
                                    <em>内容</em>
                                </div>
                                <div className="other">
                                    <em className="iconfont icon-shoucang"></em>
                                </div>
                            </header>
                            <div className='detail'>
                                <div className="detail-content">
                                    <Scroll handleTouchEnd={this._loadingDetail.bind(this)} refreshTips={refreshTips}>
                                        <div style={{ padding: '10px' }} dangerouslySetInnerHTML={{ __html: detail.content }}></div>
                                    </Scroll>

                                    <div className="operation">
                                        <div>
                                            <input type="text" value={commentContent} onChange={(event) => { this.handleChange('commentContent', event.target.value) }} placeholder="快来评论" />
                                        </div>
                                        <div>
                                            <button onClick={() => { this.handleDetailSwitch(true) }}>
                                                {commentContent ? '发布评论' : '查看评论'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                }
            </div>
        )
    }
}



const mapStateToProps = (state: any) => {
    return {
        detail: state.content.detail,
        refreshTips: state.content.refreshTips
    }
}

export default connect(mapStateToProps, { getDetail })(ContentDetail)