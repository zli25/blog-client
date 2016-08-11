// we don't need to use a variable
// or the from keyword when importing a css/styl file
// thanks the the styles loader it gets added as a
// <style> tag in the head by default but can be changed
import 'normalize.css';
// the angular libs are just common js
// and therefore we can assume they were
// exported using the default keyword in ES2015
// so we can import each module
// with any name we see fit.
// Note that the actual value are just strings except angular itself
// because that's how angular decided to export
// their auxillary modules
import angular from 'angular';
import ngRoute from 'angular-route';
import ngAnimate from 'angular-animate';
// because we exported a named variable
// without using default keyword
// we must import it with the brackets
// import {home} from './components/home/home';

angular.module('app', [
  ngRoute,
  ngAnimate,
  // home is the module, the angular module
  // because that's what we exported in home.js
  // all angular modules have a name
  // property who's value is the name you set the
  // module to be
  // home.name
])
.controller('TestController', function($scope) {
  $scope.title = 'Welcome to the Angular Build Tool 2!'
  console.log($scope.title);
});