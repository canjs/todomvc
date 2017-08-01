'use strict';
import Component from 'can-component';
import template from './template.stache!';
import ViewModel from './viewModel';

Component.extend({
	tag: 'todo-app',
	events: {
		// When a new Todo has been created, add it to the todo list
		'{Todo} created': function (Construct, ev, todo) {
			this.scope.attr('todos').push(todo);
		}
	},
	helpers: {
		link: function (name, filter) {
			let data = filter ? { filter: filter } : {};
			return route.link(name, data, {
				className: route.attr('filter') === filter ? 'selected' : ''
			});
		},
		plural: function (singular, num) {
			return num() === 1 ? singular : singular + 's';
		}
	},
	template,
	ViewModel
});
