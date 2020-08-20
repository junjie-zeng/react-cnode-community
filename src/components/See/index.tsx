import React from 'react'
import { setAssist } from '../../store/action'
import { connect } from 'react-redux'
import { PANEL } from './../../store/action-type'
interface Props {
    op?: boolean
    setAssist: Function
    githubUsername?: string
    getCollect:any
}
interface State {

}
class See extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)

    }

    // handleSwitch = () => {
    //     this.props.setAssist(PANEL,false)
    // }


    render() {
        const { op, githubUsername ,getCollect} = this.props
        const _bottom = { bottom: op ? '0' : '-8rem' }
        const _isShow = { display: op ? 'block' : 'none' }
        return (

            <ul className="see-opertion" style={_bottom}>
                <li onClick = {getCollect}>查看收藏</li>
                <li>
                    <a href = {`https://github.com/${githubUsername}`}>
                        查看GitHub
                    </a>
                </li>
            </ul>


        )
    }
}


export default connect(null, { setAssist })(See)