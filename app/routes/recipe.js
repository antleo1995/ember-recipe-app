import Ember from 'ember';

export default Ember.Route.extend({
  // recipe: Ember.inject.service(),
  // flashMessages: Ember.inject.service(),
  // classNames: ['recipe'],
  // classNameBindings: ['listDetailHidden'],
  // listDetailHidden: false,
  model (params) {
    // console.log(this.get('store').findRecord('recipe', params.recipe_id))
    return this.get('store').findRecord('recipe', params.recipe_id);
  },
    actions: {
      saveRecipe (recipe) {
        console.log('testing recipe save on recipe-edit route and recipe is: ', recipe);
        recipe.save()
        .then(()=>{
          this.transitionTo('recipes');
        });
      },
      reset(){
         this.transitionTo('recipe');
      },
      showConsole (recipe) {
        console.log(this.get('recipe'))
      },
      back() {
        history.back();
      },
      savePic(picture) {
        console.log('tesing save pic');
        let pictureRecord = this.get('store').createRecord('picture', picture);
        pictureRecord.save();
        picture = null
      }
 }
});
