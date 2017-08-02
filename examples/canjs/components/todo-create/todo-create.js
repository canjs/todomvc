'use strict';
var Component = require("can-component");
var DefineMap = require("can-define/map/");
var view = require("./todo-create.stache");
var Todo = require("~/models/todo");

var ViewModel = DefineMap.extend({
    todo: {
        Value: Todo
    },
    createTodo: function() {
        this.todo.save().then(() => {
            this.todo = new Todo();
            
        });
    }
});

module.exports = Component.extend({
    tag: "todo-create",
    view,
    ViewModel
});
