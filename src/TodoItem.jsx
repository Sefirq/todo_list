import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Represents each item in tasks to do collection
class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            span: true,
        }
        this.inputOrSpan = this.inputOrSpan.bind(this)
        this.tryToSaveItemAndChangeToSpan = this.tryToSaveItemAndChangeToSpan.bind(this)
    }

    tryToSaveItemAndChangeToSpan(e) {
        if(this.props.saveItem(e, this.props.name)){
            this.setState({span: true})
        }
    }

    inputOrSpan() {
        if (this.props.isDone){
            if(this.state.span) {
                return <span className="done" onClick={(e) => {
                    this.setState({span: false})
                }}> {this.props.name}</span>
            }
            else {
                return <input type="text" onKeyPress={(e) => this.tryToSaveItemAndChangeToSpan(e)} onBlur={(e) => {this.setState({span: true})}}/>
            }
        }
        else{
            if(this.state.span) {
                return <span onClick={(e) => {
                    this.setState({span: false})
                }}> {this.props.name}</span>
            }
            else {
                return <input type="text" onKeyPress={(e) => this.tryToSaveItemAndChangeToSpan(e)} onBlur={(e) => {this.setState({span: true})}}/>
            }
        }
    }
    render() {
        // Here define how every todo item should look like.
        // You can use {this.props.name} to display name.
        // You can also use {this.props.isDone} to conditionally render some elements, like checkmark
        // You may also need to implement onClick function on checkmark to mark item as done/undone
        // For example:
        // { this.props.isDone ? <div className="todo_done"></div> : null}

        return (
            <div className="item">
                <input type="checkbox" checked={this.props.isDone}
                       onChange={(e) => this.props.onCompletenessChange(e, this.props.name)}/>
                {this.inputOrSpan()}
                <button className="delete-button" onClick={(e) => this.props.onDelete(e, this.props.name)}>Delete</button>
            </div>
        )
    }
}

// PropTypes define expected parameters passed down to component.
// These are only suggestions.
TodoItem.propTypes = {
    name: PropTypes.string.isRequired,
    isDone: PropTypes.bool.isRequired,
    onCompletenessChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    saveItem: PropTypes.func.isRequired,
};

export default TodoItem;
