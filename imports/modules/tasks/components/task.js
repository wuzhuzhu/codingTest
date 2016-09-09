import React, { Component, PropTypes } from 'react';
import {
  Button, ButtonGroup, DropdownButton, MenuItem
} from 'react-bootstrap';

const Task = (props) => {
  const { onSelectPriority, removeTask, PRIORITY_MAP } = props
  const handleRemoveTask = (taskId, e) => {
    e.preventDefault();
    removeTask(taskId);
  }
  const {text, _id, priorityValue} = props.task;
  return (
    <li>
      {text}
      <ButtonGroup style={{float: "right", marginBottom: 15}}>
        <Button bsStyle="danger" onClick={handleRemoveTask.bind(this, _id)}>Remove</Button>
        <DropdownButton
          bsStyle="warning"
          title={priorityValue===200 ? "Priority" : PRIORITY_MAP[priorityValue]}
          id="bg-nested-dropdown"
          onSelect={(eventKey, event) => onSelectPriority(eventKey, _id)}>
          {Object.keys(PRIORITY_MAP).map((key) => {
            return <MenuItem eventKey={parseInt(key)}>{PRIORITY_MAP[key]}</MenuItem>
          })}
        </DropdownButton>
      </ButtonGroup>
    </li>
  );
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
};

export default Task
