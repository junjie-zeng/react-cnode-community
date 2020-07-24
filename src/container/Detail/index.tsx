import React from 'react'
import Scroll from '../../baseUi/Scroll'
interface Props {
    match: any
}
class Detail extends React.Component<Props>{

    // 渲染前
    componentWillMount() {
        const { match } = this.props
        const id = match.params.id
        console.log(id)

    }

    render() {
        return (
            <div className="main-box detail-box">
                {/* <div className="header">
                        <div className="header-left" ><em className="iconfont icon-fanhui"></em></div>
                        <div className="header-center">显示头像</div>
                        <div className="header-right"><em className="iconfont icon-shoucang"></em></div>
                    </div>
                    <Scroll handleTouchEnd={() => { }} refreshTips={true}>
                        <div>test</div>
                    </Scroll>
                    <div className="comment-release">
                        <input type="text" />
                        <button>查看评论</button>
                    </div> */}
                <div className="detail-content">
                    test
                </div>

                <div className="detail-comment">
                    <div className="header">
                        <div className="header-left" ><em className="iconfont icon-fanhui"></em></div>
                        <div className="header-center">显示头像</div>
                        <div className="header-right"><em className="iconfont icon-shoucang"></em></div>
                    </div>
                    <Scroll handleTouchEnd={() => { }} refreshTips={true}>
                        <div>哈哈哈哈</div>
                    </Scroll>
                    <div className="comment-release">
                        <input type="text" />
                        <button>查看评论</button>
                    </div>
                </div>
            </div>

        )
    }
}

export default Detail