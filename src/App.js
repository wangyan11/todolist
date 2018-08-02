import React, { Component,Fragment } from 'react';
import "bulma/css/bulma.css";
import {
  Counters,
  Header,
  InputAdd,
  ListItem,
  Loading
} from "./components"


const storage_key = "todo-lists";
if(!window.localStorage.getItem(storage_key)){
  window.localStorage.setItem(storage_key,JSON.stringify([]))
}
class App extends Component {
  constructor(){
    super();
    this.state = {
      isLoading:true,
      todos:[],
      currentId:1
    };
    this.handleTodoAdd = this.handleTodoAdd.bind(this);
    this.handleTodoItemChange = this.handleTodoItemChange.bind(this);
    this.getCounters = this.getCounters.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleSave(){
    window.localStorage.setItem(storage_key,JSON.stringify(this.state.todos))
  }

  componentDidMount(){
    setTimeout(()=>{
      const todos = JSON.parse(window.localStorage.getItem(storage_key));
      const currentId = todos.length;
      this.setState({
        isLoading:false,
        todos,
        currentId
      })
    },1000)
  }
  handleTodoAdd(text){
    const newTodoItem = {
      id:this.state.currentId + 1,
      text,
      hasDone:false
    }
    this.setState({
      todos:[
        ...this.state.todos,newTodoItem
      ],
      currentId:this.state.currentId + 1
    })
  }
  handleTodoItemChange(id){
    const {todos} = this.state;
    const newTodos = todos.map(todo=>{
      return (
        todo.id === id
        ?
        {
          ...todo,
          hasDone:!todo.hasDone
        }
        :
        todo
      )
    })
    this.setState({
      todos:newTodos
    })
  }
  getCounters(){
    const done = this.state.todos.filter(todo=>todo.hasDone).length;
    const active = this.state.todos.filter(todo=>!todo.hasDone).length;
    return {
      done,
      active
    }
  }
  
  render() {
    return (
      this.state.isLoading
      ?
      <Loading/>
      :
      <Fragment>
        <Header/>
        <div className="container section">
          <div className="panel">
            <p className="panel-heading">{new Date().toLocaleDateString()}</p>
            <div className="panel-block">
              <InputAdd onSubmit={this.handleTodoAdd}/>
            </div>
              {
                this.state.todos.map(item=>{
                  return (
                    <ListItem 
                    key={item.id}
                    wrappedClassName="panel-block"
                    checked={item.hasDone}
                    id={item.id}
                    onChange={this.handleTodoItemChange}
                    >
                    {item.text}
                    </ListItem>
                  )
                })
              }
              <Counters
                wrappedClassName="panel-block"
                counters={this.getCounters()}
              />
              <div className="panel-block  has-icons-right">
                <button 
                className="button is-primary"
                onClick={this.handleSave}
                >
                保存
                </button>
              </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default App;
