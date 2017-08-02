'use strict';
var view = require('./index.stache');
var DefineMap = require('can-define/map/');
var Todo = require('~/models/todo');
var route = require('can-route');

var AppViewModel = DefineMap.extend('AppViewModel',{
    appName: {type: 'string', serialize: false},
    filter: 'string',
    allTodos: {
        get: function(lastSet, resolve){
            Todo.getList({}).then(resolve, err => console.error(err));
        }
    },
    get todosList() {
        if(this.allTodos) {
            if(this.filter === 'complete') {
                return this.allTodos.complete;
            } else if(this.filter === 'active') {
                return this.allTodos.active;
            } else {
                return this.allTodos;
            }
        }
    },
    get allChecked() {
        return this.todosList && this.todosList.allComplete;
    },
    set allChecked(newVal) {
        this.todosList && this.todosList.updateCompleteTo(newVal);
    }
});

var appVM = window.appVM = new AppViewModel({
    appName: 'todos'
});

route.data = appVM;
route('{filter}');
route.ready();

var frag = view(appVM);
document.getElementById('todoapp').appendChild(frag);
