import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import moment from 'moment';

module('Unit | Controller | todos', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:todos');
    assert.ok(controller);
  });

  test('should add todo in todos array when addTask method is called', function(assert) {
    let controller = this.owner.lookup('controller:todos');
    controller.todos = [];
    controller.todo = 'Todo 1';
    const expectedOutput = {
      checked : false,
      task : 'Todo 1'
    }

    let originalAppendDateImp = controller.appendDateToTodo;
    controller.appendDateToTodo = function() {};

    controller.addTodo();
    assert.deepEqual(controller.todos[0], expectedOutput, 'should add todo');

    controller.appendDateToTodo = originalAppendDateImp;
  });

  test('should remove only completed tasks if clearCompletedTodos method is called', function(assert) {
    let controller = this.owner.lookup('controller:todos');
    controller.todos = [
      {checked: false, task: "Todo 1"}, 
      {checked: true, task: "Todo 1"}, 
      {checked: false, task: "Todo 1"}
    ];

    controller.clearCompletedTodos();
    assert.equal(controller.todos.length, 2);
  });

  test('should append date to task in a given format', function(assert) {
    let controller = this.owner.lookup('controller:todos');
    controller.todo = 'Todo 1';

    const format = 'dddd Do MMMM, YYYY';
    const date = moment(new Date()).format(format);
    const expectedOutput = controller.todo + ' - ' + date;

    controller.appendDateToTodo();
    assert.equal(controller.todo, expectedOutput);
  });
});
