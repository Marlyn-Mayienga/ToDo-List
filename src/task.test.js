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
  describe('addTask', () => {
    // add task to tasks
    it('should add a task to the tasks array', () => {
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
      const newTask = {
        index: 3,
        title: 'Task 3',
        description: 'Description 3',
        completed: false,
      };
      TaskStore.addTask(newTask);
      expect(TaskStore.getTasks()).toEqual([...tasks, newTask]);
    });
  });
  // Test removeTask
  describe('removeTask', () => {
    // remove task from tasks
    it('should remove a task from the tasks array', () => {
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
      const newTask = [{
        index: 1,
        title: 'Task 1',
        description: 'Description 1',
        completed: false,
      }];
      TaskStore.removeTask(2);
      expect(TaskStore.getTasks()).toEqual(newTask);
    });
  });

});
