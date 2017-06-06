import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    save () {
      console.log('test')
      this.sendAction('save', this.get('recipe'))
    }
  },
  reset () {
    console.log('testing reset in recipe-detail')
  }
});
