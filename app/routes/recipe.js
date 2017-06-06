import Ember from 'ember';

export default Ember.Route.extend({
  // recipe: Ember.inject.service(),
  // flashMessages: Ember.inject.service(),
  // classNames: ['recipe'],
  // classNameBindings: ['listDetailHidden'],
  // listDetailHidden: false,
  model (params) {
    return this.get('store').findRecord('recipe', params.recipe_id);
  },
    actions: {
      save (recipe) {
        console.log('testing recipe save on recipe-edit route and recipe is: ', recipe);
        recipe.save()
        .then(()=>{
          this.transitionTo('recipes')
        })
      }
 }
});