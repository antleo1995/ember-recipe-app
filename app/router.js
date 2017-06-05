import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
});

Router.map(function () {
  this.route('index', { path: '/' });
  this.route('sign-up');
  this.route('sign-in');
  this.route('change-password');
  this.route('users');
  this.route('recipe', function() {
    this.route('new');
  });
  this.route('recipes', function() {
    this.route('new');
  });
});

export default Router;
