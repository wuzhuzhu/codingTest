import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import {
  Button,
  ButtonToolbar,
  FormGroup,
  InputGroup,
  FormControl
} from 'react-bootstrap';
import { Field } from 'react-redux-form';
import Task from '../containers/task';

const styles = {
  input: {
    height: '34px',
    padding: '6px 12px',
    fontSize: '14px',
    color: '#555',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    // border-radius: 4px
    // -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075)
    // box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075)
    // -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s
    // -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s
    // transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s
    display: 'table-cell',
    position: 'relative',
    zIndex: 2,
    float: 'left',
    width: '100%',
    marginBottom: 0,
  },
}

const App = class extends Component {
  render() {
    const { tasks, addTask } = this.props
    const renderTasks = () => {
      return (tasks||[]).map((task) => (
        <Task key={task._id} task={task} />
      ));
    }

    return (
      <div className="container">
        <header>
          <h1>Todo List ({(tasks ||[] ).length})</h1>
        </header>
        <FormGroup>
          <InputGroup>
            <Field model="task.text">
              <input type="text" style={styles.input} />
            </Field>
            {/*<FormControl type="text" ref="taskInput"/>*/}
            <InputGroup.Button>
              <Button bsStyle="info" onClick={addTask}> Add Task </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
        <ul>
          {renderTasks()}
        </ul>
      </div>
    );
  }
}

export default App
