# generator-base-angulymerjs

[![Greenkeeper badge](https://badges.greenkeeper.io/zguillez/generator-base-angulymerjs.svg)](https://greenkeeper.io/)

[![npm version](https://badge.fury.io/js/generator-base-angulymerjs.svg)](https://badge.fury.io/js/generator-base-angulymerjs)
[![Build Status](http://img.shields.io/travis/zguillez/generator-base-angulymerjs.svg)](https://travis-ci.org/zguillez/generator-base-angulymerjs)
[![Code Climate](http://img.shields.io/codeclimate/github/zguillez/generator-base-angulymerjs.svg)](https://codeclimate.com/github/zguillez/generator-base-angulymerjs)
[![Dependency Status](https://gemnasium.com/zguillez/generator-base-angulymerjs.svg)](https://gemnasium.com/zguillez/generator-base-angulymerjs)
[![Installs](https://img.shields.io/npm/dt/generator-base-angulymerjs.svg)](https://coveralls.io/r/zguillez/generator-base-angulymerjs)
![](https://reposs.herokuapp.com/?path=zguillez/generator-base-angulymerjs)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)
[![Join the chat at https://gitter.im/zguillez/generator-base-angulymerjs](https://badges.gitter.im/zguillez/generator-base-angulymerjs.svg)](https://gitter.im/zguillez/generator-base-angulymerjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> [Zguillez](https://zguillez.io) | Guillermo de la Iglesia

## Yeoman generator for AngularJS with Polymer Webcomponents webapp development. With RequireJS, Bootstrap, Sass, and templating with Jade.
![](http://zguillez.github.io/img/angulymerjs.png)

# Getting Started
## Install Yeoman

```
npm install -g yo
```

## Yeoman Generators
To install generator-base-angulymerjs from npm, run:

```
npm install -g generator-base-angulymerjs

//or
sudo npm install -g generator-base-angulymerjs
```

Finally, initiate the generator:

```
yo base-angulymerjs
```

If you have error on install try to update dependences manually:

```bash
sudo npm update
```

```bash
bower update
```

## Requeriments
### [NodeJS](https://nodejs.org/)
For update npm

```
sudo npm install npm -g
```

### [Bower](http://bower.io/)

```
npm install -g bower
```

### [Sass](http://sass-lang.com/)

```
sudo gem install sass
```

**Documentation:**
- [https://nodejs.org/](https://nodejs.org/)
- [http://bower.io/](http://bower.io/)
- [http://sass-lang.com/](http://sass-lang.com/)

# Usage
Develop code on folder **/src**

```
/src
    /data
    /images
    /modules
    /scripts
        /controllers
        /directives
    /styles
    /templates
```

## Compile code
Use grunt task to compile code and deploy webapp

```
grunt serve
```

THis will launch server on port 9000

```
http://localhost:9000/
```

Distribute code is compileded on forder **/dist**

```
/dist
    /css
    /data
    /images
    /js
    /lib
    /modules
    /templates
```

## Routing
Put the routes for your app into file **/script/router.js**.

```
define(['controllers', 'directives'], function() {
    'use strict';
    window.app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
            when('/', {
                templateUrl: 'templates/index.html',
                controller: 'indexController'
            }).
            otherwise({
                redirectTo: '/'
            });
        }
    ]);
});
```

# AngularJS directives vs Polymer elements

You can use both AngularJS directives and Polymer elements.

In the code example I use an AngularJS directive for Header section and a Polymer  element for the Footer section.

* Put Polymer elements on folder **/modules/html/**
* Put AngularJS directives on folder **/scripts/directives/**
* Put AngularJS directives templates on folder **/templates/html/**

## Polymer elements templating
The NodeJS template engine JADE is implemented. Jade files (*.jade) must be located on **/modules** folder root.
- Grunt task **jade.js** will process the files into HTML files to folder **/modules/html**.
- Grunt task **copy.js** will copy all CSS files into **/modules/html** to folder **/dist/templates** for ditribution.

* You can also create and edit HTML templates without Jade files in **/modules/html**.

Example:

	//modules/footer.jade
	
	dom-module(id='element-footer')
		template
			style.
				:host {
					font-size: 0.8em;
				}
	
			div(class='row')
				p @{{year}}
	
		script.
			Polymer({
				is: 'element-footer',
				properties: {
					year: String
				}
			});
Rendered:

	//modules/html/footer.html
	
	<dom-module id="element-footer">
	    <template>
	        <style>
	        :host {
	            font-size: 0.8em;
	        }
	        </style>
	        <div class="row">
	            <p>@{{year}}</p>
	        </div>
	    </template>
	    <script>
	    Polymer({
	        is: 'element-footer',
	        properties: {
	            year: String
	        }
	    });
	    </script>
	</dom-module>


**Documentation:**
- [http://webcomponents.org/](http://webcomponents.org/)

## AngularJS Controllers
Controllers are loaded by RequireJS. Put all your neededed controllers into file **/scripts/controllers.js**.

```
define(['controllers/index'], function(indexController) {
    'use strict';
    window.app.controller('indexController', indexController);
});
```

The controllers files should be located into folder **/scripts/controllers/**

```
//scripts/controllers/index.js

define([], function() {
    'use strict';

    function indexController($scope, $http) {
        $scope.data = {};
        $scope.data.libs = [];
        $http.get('data/data.json').then(function(result) {
            $scope.data.libs = result.data;
        });
    }
    indexController.$inject = ['$scope', '$http'];
    return indexController;
});
```

## AngularJS Directives
Directives are loaded by RequireJS. Put all your neededed directives into file **/scripts/directives.js**.

```
define(['directives/header', 'directives/footer'], function(headerDirective, footerDirective) {
    'use strict';
    window.app.directive('ngheader', headerDirective);
    window.app.directive('ngfooter', footerDirective);
});
```

The directive files should be located into folder **/scripts/directives/**

```
//scripts/directives/header.js

define(['controllers/header', 'text!../../templates/header.html'], function(controller, template) {
    'use strict';

    function headerDirective() {
        return {
            restrict: 'A',
            controller: controller,
            template: template
        };
    }
    return headerDirective;
});
```

You can use RequireJS Text plugin to load a tempate file for the directive and inject a controller.

### Directives templating
The NodeJS template engine JADE is implemented. Jade files (*.jade) must be located on **/templates** folder root.
- Grunt task **jade.js** will process the files into HTML files to folder **/templates/html**.
- Grunt task **copy.js** will copy all CSS files into **/templates/html** to folder **/dist/templates** for ditribution.
- You can also create and edit HTML templates files in **/templates/html**.

## Integrating Polymer with AngularJS

You can use Polymer elements into AngularJS templates:

```
//templates/index.jade

header('ngheader'='')

section(class='content')

	header
		img(class='logo', src='images/angularjs.png')
		img(class='logo', src='images/polymer.png')

	.buttons.row
		link(rel='import' href='modules/libButton.html')
		element-libButton('ng-repeat'='lib in data.libs', name='{{lib.name}}', url='{{lib.url}}')

link(rel='import' href='modules/footer.html')
element-footer(year='2015')
```

**Documentation:**
- [http://jade-lang.com/](http://jade-lang.com/)

### Styling
Sass files (*.sass, *.scss) must be located on **/src/styles** folder root.
- Grunt task **sass.js** will process the files into CSS files to folder **/src/styles/css**.
- Grunt task **copy.js** will copy all CSS files into **/src/styles/css** to folder **/dist/css** for ditribution.
- You can also create and edit CSS files in **/src/styles/css**.

# Dependencies

Grunt task **copy.js** will read all bower.js files from **/bower_components** subfolders, and copy the file path from **main** node, like:

	//bower_components/requirejs/bower.json
	{
	  ...
	  "main": "require.js",
	  ...
	} 

And put this files into folder **/dist/lib/**.

If any installed dependency has no bower.json file (like lodash) you must edit the **copy.js** task to manually copy it:

	grunt.config.set('copy', {
		...
		lodash_: {
			cwd: 'bower_components/lodash/dist',
			src: 'lodash.js',
			dest: 'dist/lib/',
			expand: true
		},
		...
	});

If an unnecesaary file is copied (like boostrap.less):

	//bower_components/bootstrap/bower.json
	{
	  ...
	  "main": [
    	"less/bootstrap.less",
    	"dist/js/bootstrap.js"
	  ],
	  ...
	} 
	
you can delete it with the **clean-dist.js** task:

	//grunt/clean-dist.js
	grunt.registerTask('clean-dist', 'Clean dist folder', function() {
		...
		grunt.config.set('clean.files.src', ['dist/lib/bootstrap.less']);
		...
	});


# Contributing and issues
Contributors are welcome, please fork and send pull requests! If you have any ideas on how to make this project better then please submit an issue or send me an [email](mailto:mail@zguillez.io).

# License
©2016 Zguillez.io

Original code licensed under [MIT](https://en.wikipedia.org/wiki/MIT_License) Open Source projects used within this project retain their original licenses.

# Changelog

### v1.1.0 (March 4, 2016)

- Auto copy dependecies fron bower.json file

### v1.0.0 (January 12, 2016)
- Fix yo install version

### v0.1.0 (October 28, 2015)
Initial AngularJS with Polymer skeleton

Features:

* Webcomponents
* Bootstrap
* Jquery
* Sass
* Jade templating
* JSHint code chech
* Grunt tasks

[![Analytics](https://ga-beacon.appspot.com/UA-1125217-30/zguillez/generator-base-angulymerjs?pixel)](https://github.com/igrigorik/ga-beacon)