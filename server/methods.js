import { Meteor } from 'meteor/meteor';
import { Todos } from '../imports/lib/collection';
import { check } from 'meteor/check'

export default function () {
  Meteor.methods({
    'addTask': (task) => {
      Todos.insert({...task, priorityValue: 200})
    },
    'tasks.update.priority': (priorityValue, taskId) => {  // should use name space
      check(priorityValue, Number); // should check every client side args
      check(taskId, String);
      Todos.update(taskId, {$set: {
        priorityValue,
      }})
    }
  })
  Meteor.methods({
    'removeTask': (taskId) => {
      Todos.remove({_id: taskId})
    }
  })
}
