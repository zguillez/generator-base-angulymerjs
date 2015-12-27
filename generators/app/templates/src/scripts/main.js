'use strict';
require.config({
	paths: {
		router: './router',
		text: '../lib/text',
		angular: '../lib/angular.min',
		angularrouter: '../lib/angular-route.min',
		webcomponents: '../lib/webcomponents-lite.min',
		jquery: '../lib/jquery.min',
		bootstrap: '../lib/bootstrap.min',
		underscore: '../lib/lodash.min',
	}
});
window.app = {};
require(['angular', 'webcomponents', 'jquery', 'underscore'], function () {
	require(['angularrouter', 'bootstrap'], function () {
		window.app = angular.module('App', ['ngRoute']);
		require(['router'], function () {
			angular.bootstrap(document, ['App']);
		});
	});
});