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
      console.log('Test in recipe route and recipe is: ', recipe);
          return this.get('recipe').create(recipe);
      },
      toggleListDetail () {
        console.log('testing toggleListDetail');
      return this.toggleProperty('listDetailHidden');
    },
 }
});
