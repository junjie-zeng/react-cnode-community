import React from 'react'

interface Props {
    Tablist: Array<any>
    switchTab: Function
}

class Tab extends React.Component<Props> {
    render() {
        const { Tablist, switchTab } = this.props
        return (
            <div className="tab-box">
                <ul>
                    {
                        Tablist.map((item: any, index: number) => (
                            <li key={index} >
                                <a href="javascript:void(0);" className={item.active ? 'active' : ''} onClick={()=>switchTab(index,item.type)}>{item.name}</a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

export default Tab