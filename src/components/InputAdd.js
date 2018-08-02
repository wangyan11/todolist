import React,{Component,createRef} from "react";

export default class InputAdd extends Component{
    state = {
        value:''
    }
    constructor(){
        super();
        this.inputRef = createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleAddClick = this.handleAddClick.bind(this);
    }
    handleInputChange(e){
        this.setState({
            value:e.target.value
        })
    }
    handleAddClick(){
        this.state.value && this.props.onSubmit(this.state.value)
        this.setState({
            value:''
        },()=>{
            this.inputRef.current.focus()
        })
    }
    render(){
        return (
            <div className="field has-addons">
                <div className="control">
                    <input 
                    className="input is-primary"
                    type="text"
                    value={this.state.value}
                    onChange={this.handleInputChange}
                    placeholder="添加一个任务"
                    ref={this.inputRef}
                    />
                </div>
                <div className="control">
                    <button 
                    className="button is-primary"
                    onClick={this.handleAddClick}
                    >
                    添加
                    </button>
                </div>
            </div>  
        )
    }
}