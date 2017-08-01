'use strict';
import DefineMap from 'can-define/map/map';
import DefineList from 'can-define/list/list';

// Basic Todo entry model
const Todo = DefineMap.extend({
	id: 'string',
	name: 'string',
	complete: {
		type: 'boolean',
		value: false
	},
	toggleComplete: function() {
		this.complete = !this.complete;
	},
	// save: function () {
	// 	// Autosave when changing the text or completing the todo
	// 	this.on('change', function (ev, prop) {
	// 		if (prop === 'text' || prop === 'complete') {
	// 			ev.target.save();
	// 		}
	// 	});
	// }
});

// List for Todos
Todo.List = DefineList.extend({
	'#': Todo,

	// filter: function (check) {
	// 	let list = [];

	// 	this.each(function (todo) {
	// 		if (check(todo)) {
	// 			list.push(todo);
	// 		}
	// 	});

	// 	return list;
	// },

	completed: function () {
		return this.filter(function (todo) {
			return todo.attr('complete');
		});
	},

	remaining: function () {
		return this.attr('length') - this.completed().length;
	},

	allComplete: function () {
		return this.attr('length') === this.completed().length;
	}
});

export default Todo;
