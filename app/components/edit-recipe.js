import Ember from 'ember';

export default Ember.Component.extend({
  recipe: {},

  actions: {
    updateRecipe () {
      this.sendAction('updateRecipe', this.get('recipe'));
      console.log("testing updateRecipe", this.get('recipe'));
    },
    reset() {
      console.log('testing reset in edit-recipe');
      this.sendAction('reset', this.get('recipe'));
    }
  },
});
