import Ember from 'ember';

export default Ember.Component.extend({
  recipe: {},

  actions: {
  deleteRecipe () {
        console.log('deleteRecipe button is clicked');
        return this.sendAction('deleteRecipe', this.get('recipe'));
      }
    }
});
