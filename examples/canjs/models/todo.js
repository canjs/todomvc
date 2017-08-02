'use strict';
var set = require('can-set');
var connect = require('can-connect');
var DefineMap = require('can-define/map/');
var DefineList = require('can-define/list/');

var Todo = DefineMap.extend('Todo', {
    id: {
        type: 'string',
        value: () => new Date().getTime()
    },
    name: 'string',
    complete: {
        type: 'boolean',
        value: false
    },
    toggleComplete: function() {
        this.complete = !this.complete;
    }
});

Todo.algebra = new set.Algebra(
    set.props.boolean('complete'),
    set.props.id('id'),
    set.props.sort('sort')
);

Todo.List = DefineList.extend('TodoList', {
    '#': Todo,
    get active(){
        return this.filter({complete: false});
    },
    get complete(){
        return this.filter({complete: true});
    },
    get allComplete(){
        return this.length === this.complete.length;
    },
    get saving() {
        return this.filter(function(todo) {
            return todo.isSaving();
        });
    },
    updateCompleteTo: function(value) {
        this.forEach(function(todo) {
            todo.complete = value;
            todo.save();
        });
    },
    destroyComplete: function(){
        this.complete.forEach(function(todo){
            todo.destroy();
        });
    }
});

Todo.connection = connect([
  require('can-connect/data/localstorage-cache/localstorage-cache'),
  require('can-connect/constructor/constructor'),
  require('can-connect/can/map/map')
],{
  Map: Todo,
  List: Todo.List,
  name: 'todo',
  algebra: Todo.algebra
});

module.exports = Todo;
