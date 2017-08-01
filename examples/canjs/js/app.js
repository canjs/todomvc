import $ from 'jquery';
import route from 'can-route';
import stache from 'can/view/stache/stache';
// import './models/todo';
// import './components/todo-app';

/* global $, can */
(function () {
	'use strict';

	$(function () {
		// Set up a route that maps to the `filter` attribute
		route('{filter}');

		// Render #app-template
		$('#todoapp').html(stache.from('app-template', {}));

		// Start the router
		route.ready();
	});
})();
