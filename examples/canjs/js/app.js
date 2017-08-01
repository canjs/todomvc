'use strict';
import route from 'can-route';
import stache from 'can/view/stache/stache';
import DefineMap from 'can-define/map/map';
import './component';

const ViewModel = DefineMap.extend({
	filter: 'string'
});

let viewModel = new ViewModel();
let app = document.getElementById('todoapp');
let frag = stache('<todo-app />');

route.data = viewModel;

route('{filter}');

app.appendChild(frag(viewModel));

// Start the router
route.ready();
