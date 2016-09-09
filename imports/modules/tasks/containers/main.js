import React, { Component } from 'react';
import { connect } from 'react-redux';
import Main from '../components/main';
import { subscribe, addTask, onBlur } from  '../actions';
import { get } from 'lodash'

// dummy
class container extends Component {
  componentDidMount() {
    this.computation = this.props.subscribe();
  }
  componentWillUnmount() {
    this.computation.stop()
  }
  render() {
    return <Main {...this.props} />
  }
}

// container
const mapState = (state) => {
  const tasks = get(state, 'Tasks.tasks')
  const count = get(state, 'Tasks.count')
  const isValid = get(state, 'taskForm.fields.text.valid')
  return {
    tasks, count, isValid
  }
}
const mapDispatch = (dispatch, getState) => {
  return {
    subscribe: () => dispatch(subscribe()),
    addTask: () => dispatch(addTask()),
    onBlur: () => dispatch(onBlur()),
  }
}
export default connect(mapState, mapDispatch)(container)
