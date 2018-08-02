import React,{Component} from "react";
import classNames from "classnames";

export default class ListItem extends Component{
    constructor(){
        super();
        this.handleCheckedChange = this.handleCheckedChange.bind(this);
    }
    handleCheckedChange(){
        const {onChange,id} = this.props;
        onChange(id);
    }
    render(){
        const {wrappedClassName,checked,children} = this.props;
        return (
            <label className={classNames(wrappedClassName,{
                "has-text-primary":checked,
                "has-text-danger":!checked
            })}>
                <input 
                type="checkbox"
                checked={checked}
                onChange={this.handleCheckedChange}/>
                {children}
            </label>
        )
    }
}