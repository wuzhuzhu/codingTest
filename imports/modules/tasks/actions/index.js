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
          tasks: Collections.Todos.find().fetch(),
        })
      }
    })
    return computation
  }
}

export const addTask = (task) => {
  return (dispatch, getState, { Meteor }) => {
    const state = getState()
    const text = get(state, 'task')
    const isValid = get(state, 'taskForm.fields.text.valid')

    if (isValid) {
      Meteor.call("addTask", text, (err, res) => {
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
