import Ember from 'ember';

export default Ember.Route.extend({
  recipe: Ember.inject.service(),
  flashMessages: Ember.inject.service(),
  classNames: ['recipe'],
  classNameBindings: ['listDetailHidden'],
  listDetailHidden: false,
  model () {
    return this.get('store').findAll('recipe');
  },
  actions: {
    create (recipe) {
      recipe.picture = ''
      this.get('store').createRecord('recipe', recipe).save()
          .then(() => {
            this.transitionTo('recipes');
          })
       },
      toggleListDetail () {
        console.log('testing toggleListDetail');
      return this.toggleProperty('listDetailHidden');
    },
    deleteRecipe(recipe) {
      console.log('Testing deleteRecipe in recipe.js route and recipe', recipe);
      recipe.destroyRecord();
    },
    clear(recipe) {
      console.log('testing clear');
      recipe = {};
    }
 }
});
