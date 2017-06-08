import Ember from 'ember';

export default Ember.Component.extend({
  recipe: {},
  picture: {
    url: null
  },
  actions: {
    updateRecipe () {
      this.sendAction('updateRecipe', this.get('recipe'));
      console.log("testing updateRecipe", this.get('recipe'));
    },
    reset() {
      console.log('testing reset in edit-recipe');
      this.sendAction('reset', this.get('recipe'));
    },
    addPic() {
      console.log('testing addPic');
      // let data = this.get('picture');
      // console.log('Recipe on edit-recipe addPic is: ', this.get('recipe'));
      data.recipe = this.get('recipe');
      // data.set('recipe', this.get('recipe'))
      // console.log('Data.recipe is: ', data.recipe);
      this.sendAction('addPic', data);
      this.set('picture.url', null);
    }
  },
});
