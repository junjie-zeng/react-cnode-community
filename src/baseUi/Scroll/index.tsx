import React from 'react'
import Tips from '../../components/Tips/Tips'
import BScroll from 'better-scroll'

interface Props {
    refreshTips: boolean
    handleTouchEnd: Function
    children:any
}

interface State{
    dropDownRefresh:boolean
}
class Scroll extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)

        this.state = {
            dropDownRefresh: false
        }
    }
    // 第一次渲染后
    componentDidMount() {
        const wrapper = new BScroll('.BScroll', {
            scrollY: true,
            click: true,
            probeType: 2,
        })

        // 手指离开触发（模拟下拉刷新）
        wrapper.on('touchEnd', (ev: any) => {
            // 判断下拉动作
            if (ev.y > 30) {
                // console.log(ev.y)
                this.props.handleTouchEnd()
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
        const { children, refreshTips } = this.props
        const { dropDownRefresh } = this.state
        return (
            <div className="list-box BScroll">
                <div>
                    <Tips lei="refresh-tips" isShow={dropDownRefresh} >释放即可刷新</Tips>
                    <Tips lei="refresh-tips" isShow={refreshTips} >加载中...</Tips>
                    {children}
                </div>
            </div>
        )
    }

}

export default Scroll