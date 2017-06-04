import Ember from 'ember';

export default Ember.Component.extend({

  recipe: {},

  actions: {
    create () {
      this.sendAction('create', this.get('recipe'));
      console.log("recipe form recipe is: ", this.get('recipe'));
    }
  },
});
