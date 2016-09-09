import * as types from '../constants/tasks';
import { get } from 'lodash';
import { actions } from 'react-redux-form';

export const subscribe = () => {
  return (dispatch, getState, { Meteor, Tracker, Collections }) => {
    let subs = Meteor.subscribe('allTodos');
    let computation = Tracker.autorun(() => {
      if (subs.ready()) {
        dispatch({
          type: types.UPDATE_TASK,
          tasks: Collections.Todos.find({},{sort: {priorityValue: -1}}).fetch(),
        })
      }
    })
    return computation
  }
}

export const addTask = () => {
  return (dispatch, getState, { Meteor }) => {
    const state = getState()
    const task = get(state, 'task')
    const text = get(state, 'task.text')
    const isValid = text && get(state, 'taskForm.fields.text.valid') && textIsValid(text)

    if (isValid) {
      Meteor.call("addTask", task, (err, res) => {
        if (err) {
          return console.error(err)
        }
        else dispatch(actions.reset('task.text'))
      });
    } else {
      return
    }
  }
}

export const removeTask = (taskId) => {
  return (dispatch, getState, { Meteor }) => {
    Meteor.call("removeTask", taskId, (err, res) => {
      if (err) return console.error(err)
    });
  }
}

function textIsValid(text) {
  return text && text.length > 5;
}

export const onBlur = () => {
  return actions.validate('task.text', textIsValid)
}

export const onSelectPriority = (priorityValue, taskId) => {
  return (dispatch, getState, { Meteor }) => {
    Meteor.call('tasks.update.priority', priorityValue, taskId, (e,r) => {
      if (e) {
        return console.error(e)
      }
    })
  }
}