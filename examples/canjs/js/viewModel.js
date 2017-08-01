'use strict';
import DefineMap from 'can-define/map/map';
import route from 'can-route';
import Todo from './model';

const ESCAPE_KEY = 27;

function trim(val){
	if(typeof val === 'string'){
		return val.trim();
	}
	return '';
}

export default DefineMap.extend({
	// Store the Todo model in the scope
	Todo: Todo,
	// A list of all Todos retrieved from LocalStorage
	todos: Todo.List,
	// Edit a Todo
	edit: function (todo, el) {
		todo.attr('editing', true);
		el.parents('.todo').find('.edit').focus();
	},
	cancelEditing: function (todo, el, ev) {
		if (ev.which === ESCAPE_KEY) {
			el.val(todo.attr('text'));
			todo.attr('editing', false);
		}
	},
	// Returns a list of Todos filtered based on the route
	displayList: function () {
		let filter = route.attr('filter');
		return this.todos.filter(function (todo) {
			if (filter === 'completed') {
				return todo.attr('complete');
			}

			if (filter === 'active') {
				return !todo.attr('complete');
			}

			return true;
		});
	},
	updateTodo: function (todo, el) {
		let value = trim(el.val());

		if (value === '') {
			todo.destroy();
		} else {
			todo.attr({
				editing: false,
				text: value
			});
		}
	},
	createTodo: function (context, el) {
		let value = trim(el.val());
		let TodoModel = this.Todo;

		if (value !== '') {
			new TodoModel({
				text: value,
				complete: false
			}).save();

			route.removeAttr('filter');
			el.val('');
		}
	},
	toggleAll: function (scope, el) {
		let toggle = el.prop('checked');
		this.attr('todos').each(function (todo) {
			todo.attr('complete', toggle);
		});
	},
	clearCompleted: function () {
		this.attr('todos').completed().forEach(function (todo) {
			todo.destroy();
		});
	}
});
