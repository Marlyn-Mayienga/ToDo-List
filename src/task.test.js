/* eslint-disable no-unused-expressions, padded-blocks */
const TaskStore = require('./modules/taskstore.js');

localStorage.setItem('tasks', JSON.stringify([]));
// Test TasksStore
describe('TaskStore', () => {
  // Test getTasks
  describe('getTasks', () => {
    // if empty, return empty array
    it('should return an empty array if there are no tasks', () => {

      expect(TaskStore.getTasks()).toEqual([]);
    });
    // if there are tasks, return tasks
    it('should return an array of tasks if there are tasks', () => {
      const tasks = [{
        index: 1,
        title: 'Task 1',
        description: 'Description 1',
        completed: false,
      }, {
        index: 2,
        title: 'Task 2',
        description: 'Description 2',
        completed: false,
      }];
      localStorage.setItem('tasks', JSON.stringify(tasks));
      expect(TaskStore.getTasks()).toEqual(tasks);
    });
  });
  // Test getTaskByIndex
  describe('getTaskByIndex', () => {
    // return task if index is found
    it('should return a task with the given index', () => {
      const tasks = [{
        index: 1,
        title: 'Task 1',
        description: 'Description 1',
        completed: false,
      }, {
        index: 2,
        title: 'Task 2',
        description: 'Description 2',
        completed: false,
      }];
      localStorage.setItem('tasks', JSON.stringify(tasks));
      expect(TaskStore.getTaskByIndex(1)).toEqual(tasks[0]);
    });
    // return null if index is not found
    it('should return undefined if there is no task with the given index', () => {
      const tasks = [{
        index: 1,
        title: 'Task 1',
        description: 'Description 1',
        completed: false,
      }, {
        index: 2,
        title: 'Task 2',
        description: 'Description 2',
        completed: false,
      }];
      localStorage.setItem('tasks', JSON.stringify(tasks));
      expect(TaskStore.getTaskByIndex(3)).toBeUndefined();
    });
  });
  // Test addTask

  // Test removeTask

});
