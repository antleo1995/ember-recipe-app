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
  this.route('recipe', { path:'/recipes/:recipe_id' },function() {
    this.route('edit');
    this.route('picture');
  });
  this.route('recipes', function() {
    this.route('new');
  });
  this.route('recipe-edit', { path: '/recipe/:recipe_id/edit' });
  this.route('allrecipes', { path: '/allrecipes' }) ;
});

export default Router;
