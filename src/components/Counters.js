import React,{Component} from "react";
import PropTypes from "prop-types";

export default class Counters extends Component{
    static defaultProps = {
        wrappedClassName:''
    }
    static propTypes = {
        wrappedClassName:PropTypes.string,
        counters:PropTypes.shape({
            done:PropTypes.number.isRequired,
            active:PropTypes.number.isRequired
        }).isRequired
    }
    render(){
        const {wrappedClassName,counters} = this.props;
        return (
            <div className={wrappedClassName}>
                <div className="field is-grouped is-grouped-multiline">
                    <div className="control">
                        <div className="tags has-addons">
                            <span className="tag is-danger">已完成</span>
                            <span className="tag is-dark">{counters.done}</span>
                        </div>
                    </div>
                    <div className="control">
                        <div className="tags has-addons">
                            <span className="tag is-danger">未完成</span>
                            <span className="tag is-dark">{counters.active}</span>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}