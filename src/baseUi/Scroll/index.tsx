import React from 'react'
import Tips from '../../components/Tips/Tips'

interface Props{
    dropDownRefresh:boolean;
    refreshTips:boolean;
}

class Scroll extends React.Component<Props, any>{
    render() {
        const { children ,dropDownRefresh,refreshTips} = this.props
        return (
            <div className="list-box">
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