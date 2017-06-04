import Ember from 'ember';
import { storageFor } from 'ember-local-storage';

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  credentials: storageFor('auth'),
  isAuthenticated: Ember.computed.bool('credentials.token'),

  create (recipe) {
    return this.get('ajax').post('/recipes', {
      data: {
        recipe: {
      title: recipe.title,
      ingredient_list: recipe.ingredients,
      directions: recipe.directions
    }
  }
    });
  },

});
