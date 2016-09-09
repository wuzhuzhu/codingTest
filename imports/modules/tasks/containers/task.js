import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Task from '../components/task';
import { removeTask, onSelectPriority } from  '../actions';
import { PRIORITY_MAP } from '../constants/tasks'

const mapState = () => ({
  PRIORITY_MAP,
});

const mapDispatch = (dispatch, getState) => {
  return {
    removeTask: (taskId) => dispatch(removeTask(taskId)),
    onSelectPriority: (value, taskId) => dispatch(onSelectPriority(value, taskId))
  }
};

export default connect(
  mapState, mapDispatch
)(Task)
