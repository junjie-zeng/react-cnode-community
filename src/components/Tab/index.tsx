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
                        <li key={index} className={item.active ? 'active' : ''} onClick={() => switchTab(index, item.type)}>
                            {item.name}
                        </li>
                    ))
                }

            </ul>

        )
    }
}

export default Tab