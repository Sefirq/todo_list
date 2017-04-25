import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodoItem from './TodoItem.jsx';

// Root of our app
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: "Niet",
      undoneCounter: 0 ,
      show: "All",
      tasksList: [{
        isDone: false,
        text: 'Buy groceries',
      }, {
        isDone: true,
        text: 'Solve homework',
      }, {
          isDone: true,
          text: 'Do what you want because pirate is free xD',
      }],
    };
      this.onCompletenessChange = this.onCompletenessChange.bind(this);
      this.onDelete = this.onDelete.bind(this);
      this.saveItem = this.saveItem.bind(this);
      this.clearCompleted = this.clearCompleted.bind(this)
      this.countUndoneTasks = this.countUndoneTasks.bind(this);
      this.printUndoneTasks = this.printUndoneTasks.bind(this);
      this.showClearCompletedIfAnyCompleted = this.showClearCompletedIfAnyCompleted.bind(this)
      this.state.undoneCounter = this.countUndoneTasks();
  }

  addNewTask = (e) => {
      if(e.which == 13 || e.keyCode == 13) {
          const taskText = e.target.value;
          let newArray = this.state.tasksList.slice();
          newArray.push({isDone: false, text: taskText});
          this.setState({tasksList: newArray});
          e.target.value = "";
          this.setState({undoneCounter: this.state.undoneCounter + 1})
      }
  }
    saveItem(e, previousName) {
        if (e.which == 13 || e.keyCode == 13) {
          alert(previousName);
            let name = e.target.value;
            let tasks = this.state.tasksList;
            for (let task in tasks) {
                if (tasks[task].text === previousName) {
                    tasks[task].text = name;
                }
            }
            let undoneTasks = this.countUndoneTasks();
            this.setState({undoneCounter: undoneTasks, tasksList: tasks})
            return true;
        }
        return false;
    }

    onCompletenessChange(event, name) {
      let tasks = this.state.tasksList;
      for (let task in tasks) {
          if(tasks[task].text === name) {
              tasks[task].isDone = !tasks[task].isDone;
          }
          //alert(task.isDone);
      }
      let undoneTasks = this.countUndoneTasks();
      let state = { undoneCounter: undoneTasks,
          tasksList: tasks
      };

      this.setState(state)
    }

    onDelete(event, name) {
        let tasks = this.state.tasksList;
        for (let task in tasks) {
            if (tasks[task].text === name) {
                tasks.splice(parseInt(task), 1)
            }
        }
        let undoneTasks = this.countUndoneTasks();
        this.setState({undoneCounter: undoneTasks, tasksList: tasks})
    }

    clearCompleted(event) {
        let tasks = [];
        for (let task in this.state.tasksList) {
            if (!this.state.tasksList[task].isDone) {
                tasks[task] = this.state.tasksList[task];
            }
        }
        let undoneTasks = this.countUndoneTasks();
        this.setState({undoneCounter: undoneTasks, tasksList: tasks})
    }


    countUndoneTasks() {
        let tasks = this.state.tasksList;
        let undoneTasks = 0;
        for (let task in tasks) {
            if(!tasks[task].isDone) {
                undoneTasks += 1;
            }
            //alert(task.isDone);
        }
        return undoneTasks;
    }

    printUndoneTasks() {
      if(this.state.undoneCounter !== 1) {
          return <p> I've got { this.state.undoneCounter} undone tasks to do.</p>
      }
      return <p> I've got { this.state.undoneCounter} undone task to do.</p>
    }

    showClearCompletedIfAnyCompleted() {
        let tasks = this.state.tasksList;
        for (let task in tasks) {
            if(tasks[task].isDone) {
                return <td><button onClick={(e) => this.clearCompleted(e)}>Clear completed</button></td>
            }
            //alert(task.isDone);
        }
    }

    makeAllDone = (event) => {
        let tasks = this.state.tasksList;
        for (let task in tasks) {
            tasks[task].isDone = true;

        }
        let undoneTasks = this.countUndoneTasks();
        this.setState({undoneCounter: undoneTasks, tasksList: tasks})
    }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>To do list</h2>
        </div>
        <div className="task-box">
            <table>
                <tr>
                    <td>
                        <button className="delete-button" onClick={(e) => this.makeAllDone(e)}>Make all done</button>
                    </td>
                    <td>
                        <input type="text" onKeyPress={(e) => this.addNewTask(e)}/>
                    </td>
                </tr>
            </table>
            <hr/>
          {
              this.state.show}
              {
            this.state.tasksList
              .filter(task => (this.state.show === "Done" ? task.isDone : this.state.show === "Active" ? !task.isDone : true))
              .map(task => <TodoItem name={task.text} isDone={task.isDone} onCompletenessChange={this.onCompletenessChange} onDelete={this.onDelete} saveItem={this.saveItem}/>)
          }
          <hr/>
          <div className="choose-menu">
              <tr>
                  <td><button onClick={() => this.setState({show: "All"})}>All</button></td>
                  <td><button onClick={() => this.setState({show: "Active"})}>Active</button></td>
                  <td><button onClick={() => this.setState({show: "Done"})}>Completed</button></td>
                  {this.showClearCompletedIfAnyCompleted()}
              </tr>
          </div>
        </div>
        <div className="todo-list__undone-tasks-count">
            { this.printUndoneTasks()}
        </div>
      </div>
    );
  }
}

export default App;
