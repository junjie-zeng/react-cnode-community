import React from 'react'
interface Props {
    commentSwitch?:any
    tabs:Array<any>
}
interface State {
}
class CommentTab extends React.Component<Props, State>{
    constructor(props: Props) {
        super(props)
       
    }

    handleSwitchTab = (i:number) => {
        const {commentSwitch,tabs} = this.props
        tabs.forEach((item:any,index:number)=> i == index ? item.active = true:item.active = false)
        commentSwitch(i,tabs)
        
    }


    render() {
        const { tabs } = this.props
        return (
            <div className="comment-tab">
                {
                    tabs.map((item: any, i: number) => (
                        <div className={item.active ? 'active' : ''} key={i} onClick={()=>{this.handleSwitchTab(i)}}>{item.title}</div>
                    ))
                }
            </div>
        )
    }
}

export default CommentTab