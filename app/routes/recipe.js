import Ember from 'ember';

export default Ember.Route.extend({
  recipe: Ember.inject.service(),
  flashMessages: Ember.inject.service(),

  model () {
    return this.get('store').findAll('recipe');
  },
  actions: {
    create (recipe) {
      console.log('Test in recipe route and recipe is: ', recipe);
          return this.get('recipe').create(recipe);
      }
 }
});
