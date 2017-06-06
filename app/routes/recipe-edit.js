import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    save (recipe) {
      recipe.save()
      .then(()=>{
        this.transitionTo('recipes')
      })
    }
  }
});
