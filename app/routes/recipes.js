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
      this.get('store').createRecord('recipe', recipe).save()
      // console.log('Test in recipe route and recipe is: ', recipe);
      //     this.get('recipe').create(recipe)
          .then(() => {
            this.transitionTo('recipes', recipe);
          });
       },
      toggleListDetail () {
        console.log('testing toggleListDetail');
      return this.toggleProperty('listDetailHidden');
    },
    deleteRecipe(recipe) {
      console.log('Testing deleteRecipe in recipe.js route and recipe', recipe);
      recipe.destroyRecord();
    }
 }
});
