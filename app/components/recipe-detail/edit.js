import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
  save () {
      console.log('test')
      this.sendAction('save', this.get('recipe'))
    }
  },
  showConsole () {
    console.log('testing show');
    this.sendAction('show', this.get('recipe'))
  }
});
