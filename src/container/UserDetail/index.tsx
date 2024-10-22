import React from 'react'
import { connect } from 'react-redux'
import { getUserDetail, setAssist, getUserCollect } from './../../store/action'
import Header from '../../components/Header'
import UserCollect from '../../components/UserCollect'
import CommentTab from '../../components/CommentTab'
import See from '../../components/See'
import { MASK, PANEL } from './../../store/action-type'
import Toast from './../../baseUi/Toast'
import Item from './Item'
interface Props {
    userInfo: any
    match: any
    getUserDetail: Function
    getUserCollect: Function
    history: any
    mask: boolean
    panel: boolean
    setAssist: Function
    userCollect: any
}
interface State {
    isRecentTopics: boolean
    tabs: Array<any>,
    isShow: boolean
}
class UserDetail extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = {
            isRecentTopics: true,
            tabs: [
                { title: '最近主题', active: true },
                { title: '最近评论', active: false }
            ],
            isShow: false
        }
    }
    // 渲染前
    componentWillMount() {
        this._init()

    }
    // 初始化
    _init() {
        const { getUserDetail } = this.props
        const { match } = this.props
        const username = match.params.username
        getUserDetail(username)

    }
    // 下拉刷新
    _dropDownRefresh = () => {
        this._init()
    }


    _commentSwitch = (index: number, tabs: Array<any>) => {
        let { isRecentTopics } = this.state
        // 0 最近主题 1 最近评论
        isRecentTopics = index ? false : true
        this.setState({ isRecentTopics, tabs })

    }

    _setAssist = () => {
        const { setAssist } = this.props
        // 设置遮罩与面板
        setAssist(MASK, true)
        setAssist(PANEL, true)

    }

    // 查看收藏
    _getCollect = () => {
        const { getUserCollect, userInfo, setAssist } = this.props
        const loginname = userInfo.loginname
        const loadCallback = Toast.loading()

        // 设置遮罩与面板
        getUserCollect(loginname, () => {
            loadCallback()
            setAssist(MASK, false)
            setAssist(PANEL, false)
            this.setState({
                isShow: true
            })
        })
    }
    // 收藏刷新回调
    _handleCollectDropDownRefresh = () => {
        const { getUserCollect, userInfo } = this.props
        const loginname = userInfo.loginname
        getUserCollect(loginname)
        console.log('loginname', loginname)

    }

    _collectPageBack = () => {
        this.setState({
            isShow: false
        })
    }

    render() {
        const { userInfo, panel, userCollect } = this.props
        const { isRecentTopics, tabs, isShow } = this.state
        return (
            <div>
                <Header backFun={() => { this.props.history.go(-1) }} title={userInfo.loginname} icon2='icon-qita' iconFun={this._setAssist} />
                <div className="user-his-comment">
                    <div className="user-wrap">
                        <div className = "user-bg" style={{ backgroundImage: `url(${userInfo.avatar_url})` }}></div>
                        <div className="user-touxiang" style={{ backgroundImage: `url(${userInfo.avatar_url})` }}></div>
                    </div>
                    <CommentTab tabs={tabs} commentSwitch={this._commentSwitch} />
                    <div className="comment-tab-box">
                        {
                            isRecentTopics ?

                                <Item dropDownRefresh={this._dropDownRefresh} list={userInfo.recent_topics} />
                                :
                                <Item dropDownRefresh={this._dropDownRefresh} list={userInfo.recent_replies} />

                        }

                    </div>
                </div>
                <See op={panel} githubUsername={userInfo.githubUsername} getCollect={this._getCollect} />
                <UserCollect loginname={userInfo.loginname} collect={userCollect} isShow={isShow} collectPageBack={this._collectPageBack} handleCollectDropDownRefresh={this._handleCollectDropDownRefresh} />
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        userInfo: state.user.userInfo,
        userCollect: state.user.userCollect,
        mask: state.assist.mask,
        panel: state.assist.panel
    }
}

export default connect(mapStateToProps, { getUserDetail, setAssist, getUserCollect })(UserDetail)