import React from 'react'

interface Props {
    Tablist: Array<any>
    switchTab: Function
}

class Tab extends React.Component<Props> {
    render() {
        const { Tablist, switchTab } = this.props
        return (
            <ul className="tab">
                {
                    Tablist.map((item: any, index: number) => (
                        <li key={index}  onClick={() => switchTab(index, item.type)}>
                            <div className={item.active ? 'active' : ''}>{item.name}</div>
                        </li>
                    ))
                }

            </ul>

        )
    }
}

export default Tab