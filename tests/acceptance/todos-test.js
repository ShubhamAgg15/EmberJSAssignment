import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | todos', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /todos', async function(assert) {
    await visit('/todos');
    assert.equal(currentURL(), '/todos');
  });

  test(`visiting /todos should have minimum of input field and buttons`, async function(assert){
    await visit('/todos');

    const todoInput = this.element.querySelector('[data-test-todo-input] input');
    const todoInputPlaceholder = todoInput.attributes.getNamedItem('placeholder').value;

    const saveBtn = this.element.querySelector('[data-test-todo-input] button');
    const clearCompletedTodosBtn = this.element.querySelector('[data-test-clear-todos]');

    assert.dom(todoInput).exists();
    assert.equal(todoInputPlaceholder, 'Enter Todo');

    assert.dom(saveBtn).exists();
    assert.dom(saveBtn).isDisabled();
    assert.dom(saveBtn).containsText('Save');

    assert.dom(clearCompletedTodosBtn).exists();
    assert.dom(clearCompletedTodosBtn).isDisabled();
    assert.dom(clearCompletedTodosBtn).containsText('Clear completed Todos');
  });

  test('should add todo on enter press', async function(assert) {
    await visit('/todos');

    let evt = new KeyboardEvent('keyup', {  
      keyCode: 13,
      bubbles: true,
      cancelable: false
    });

    const todoInput = this.element.querySelector('[data-test-todo-input] input');
    await fillIn(todoInput, 'Todo 1');
    await todoInput.dispatchEvent(evt);

    const todoCheckBox = this.element.querySelector('[data-test-todo-display] input');
    const todoSpan = this.element.querySelector('[data-test-todo-display] span');

    assert.dom(todoCheckBox).exists();
    assert.dom(todoSpan).exists();
  });

  test('should clear the text field after todo is added', async function(assert) {
    await visit('/todos');

    const todoInput = this.element.querySelector('[data-test-todo-input] input');
    await fillIn(todoInput, 'Todo 1');
    await click('[data-test-todo-input] button');

    assert.dom(todoInput).hasNoText();
  });

  test('should be able to add todo on Save button', async function(assert) {
    await visit('/todos');

    const todoInput = this.element.querySelector('[data-test-todo-input] input');
    await fillIn(todoInput, 'Todo 1');
    await click('[data-test-todo-input] button');

    const todoCheckBox = this.element.querySelector('[data-test-todo-display] input');
    const todoSpan = this.element.querySelector('[data-test-todo-display] span');

    assert.dom(todoCheckBox).exists();
    assert.dom(todoSpan).exists();
  });

  test(`should have Save button disabled/enabled depending on data availability
   in text field`, async function(assert) {
    await visit('/todos');

    const todoInput = this.element.querySelector('[data-test-todo-input] input');
    const todoSaveButton = this.element.querySelector('[data-test-todo-input] button');
    
    assert.dom(todoSaveButton).isDisabled();
    await fillIn(todoInput, 'Todo 1');
    assert.dom(todoSaveButton).isEnabled();
  });

  test(`should have Clear Completed Todos button disabled/enabled based on
  task completion status`, async function(assert) {
    await visit('/todos');

    const todoInput = this.element.querySelector('[data-test-todo-input] input');
    const saveButton = this.element.querySelector('[data-test-todo-input] button');
    const clearCompletedTodosButton = this.element.querySelector('[data-test-clear-todos]');

    await fillIn(todoInput, 'Todo 1');
    await click(saveButton);

    await fillIn(todoInput, 'Todo 2');
    await click(saveButton);

    assert.dom(clearCompletedTodosButton).isDisabled();

    const todoCheckBox = this.element.querySelector('[data-test-todo-display] input');
    await click(todoCheckBox);

    assert.dom(clearCompletedTodosButton).isEnabled();
  });
});
