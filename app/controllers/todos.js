import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';
import { set } from '@ember/object';

export default class TodosController extends Controller {
    @tracked todo = '';
    @tracked noneOfTheTaskCompleted = true;
    todos = [];
    format = 'dddd Do MMMM, YYYY';

    @action
    updateClearBtnStatus(index) {
        set(this.todos[index], 'checked', !this.todos[index].checked);
        this.checkForTodosCompletionStatus();
    }

    @action
    addTodo() {
        if (this.todo != '') {
            this.appendDateToTodo();
            this.todos.pushObject({
                checked: false,
                task: this.todo
            });
            this.todo = '';    
        }
    }

    @action
    clearCompletedTodos() {
        let tempArr = this.todos.filter((todo) => todo.checked);
        this.todos.removeObjects(tempArr);

        this.checkForTodosCompletionStatus();
    }

    checkForTodosCompletionStatus() {
        this.noneOfTheTaskCompleted = this.todos.every(todo => !todo.checked);
    }

    appendDateToTodo() {
        let date = moment(new Date()).format(this.format);
        this.todo += ' - ' + date;
    }
}
