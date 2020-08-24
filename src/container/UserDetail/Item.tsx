import React from 'react'
import Scroll from './../../baseUi/Scroll'
import { getThemeType, getRelativeTime } from '../../assets/js/tools'
interface Props {
    dropDownRefresh: Function
    list?: any
}
interface State {

}

const Item = (props: Props) => {
    const { dropDownRefresh, list } = props
    return (
        <Scroll handleTouchEnd={dropDownRefresh} refreshTips={false}>
            {
                list && list.map((item: any, index: number) => (
                    <div className="comment-item" key={index}>
                        <div className="comment-wrap">
                            <div>
                                <div className="touxiang" style={{ backgroundImage: `url(${item.author.avatar_url})` }}></div>
                                <span className="name">{item.author.loginname}</span>
                            </div>
                            <div>
                                <em>{getRelativeTime(item.last_reply_at)}</em>
                            </div>
                        </div>
                        <div className="comment">
                            <p>{item.title}</p>
                        </div>
                    </div>
                ))
            }
        </Scroll>
    )
}

export default Item