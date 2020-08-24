import React from 'react'
import Tips from '../../components/Tips/Tips'
import RefreshLoading from '../Refresh-loading'
import BScroll from 'better-scroll'

interface Props {
    refreshTips: boolean
    handleTouchEnd: Function
    children: any
}

interface State {
    dropDownRefresh: boolean
}
class Scroll extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)

        this.state = {
            dropDownRefresh: false
        }

    }

    wrapper: any

    // 第一次渲染后
    componentDidMount() {
        const _wrapper: any = this.refs.wrapper
        // console.log(this)
        this.wrapper = new BScroll(_wrapper, {
            scrollY: true,
            click: true,
            probeType: 2,
        })

        // 手指离开触发（模拟下拉刷新）
        this.wrapper.on('touchEnd', (ev: any) => {
            // 判断下拉动作
            if (ev.y > 30) {
                // console.log(ev.y)
                this.props.handleTouchEnd()
            }
            this.setState({
                dropDownRefresh: false
            })
            // console.log(ev)
        })

        this.wrapper.on('scroll', (ev: any) => {
            // console.log(ev)
            this.setState({
                dropDownRefresh: true
            })
        })
    }

    // 在组件接收到新的props或者state但还没有render时被调用
    componentWillReceiveProps() {
        this._setScrollTo()
    }

    // 数据更新滚动条重置
    _setScrollTo() {
        this.wrapper.scrollTo(0, 0)
        this.setState({
            dropDownRefresh: false
        })
    }

    render() {
        const { children, refreshTips } = this.props
        const { dropDownRefresh } = this.state
        const _style = { paddingBottom: '2rem' }
        return (
            <div className="scroll-box" ref="wrapper">
                <div className="scroll-wrap-list" style={_style}>
                    <Tips lei="refresh-tips" isShow={dropDownRefresh} >释放即可刷新</Tips>
                    {/* <Tips lei="refresh-tips" isShow={refreshTips} >加载中...</Tips> */}
                    <RefreshLoading isShow={refreshTips} />
                    {children}
                </div>
            </div>
        )
    }

}

export default Scroll