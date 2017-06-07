import Ember from 'ember';

export default Ember.Component.extend({

  recipe: {},
  picture: {
    url: null
  },
  actions: {
    create () {
      this.sendAction('create', this.get('recipe'));
      console.log("recipe form recipe is: ", this.get('recipe'));
    },
  },
});
