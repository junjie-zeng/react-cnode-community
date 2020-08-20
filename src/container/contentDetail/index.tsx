import React from 'react'
import { connect } from 'react-redux'
import Scroll from '../../baseUi/Scroll'
import { getDetail, setCollect } from '../../store/action'
import Header from '../../components/Header'
interface Props {
    match: any
    history: any
    getDetail: Function
    setCollect: Function
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
            isContent: false,
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
        const token = localStorage.getItem('token')
        getDetail(id, token)
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

    handleCollect = async () => {
        const { detail,setCollect } = this.props
        const is_collect = detail && detail.is_collect
        const id = detail && detail.id
        const token = localStorage.getItem('token')
        setCollect(id,token,is_collect)
    }


    render() {
        const { isContent, commentContent } = this.state
        const { detail, refreshTips } = this.props
        const { author } = detail
        const loginname = author && author.loginname
        const avatar_url = author && author.avatar_url
        const is_collect = detail && detail.is_collect
        console.log(detail)
        return (
            <div className={isContent ? 'detail-wrapper' : 'detail-rotate detail-wrapper'} >
                {
                    isContent ?
                        <div >

                            <Header backFun={() => { this.props.history.go(-1) }} title="评论" />
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
                            <Header backFun={() => { this.props.history.go(-1) }} iconFun={this.handleCollect} title={loginname} portrait={avatar_url} icon2={is_collect ? 'icon-shoucang2' : 'icon-shoucang'} />
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

export default connect(mapStateToProps, { getDetail, setCollect })(ContentDetail)