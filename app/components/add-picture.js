import Ember from 'ember';

export default Ember.Component.extend({
  picture: {
    url: null
  },
  actions: {
    addPic() {
      console.log('testing addPic on add-picture');
      let data = this.get('picture');
      console.log('Data is in addPic on add-picture comp: ', data);
      data.recipe = this.get('recipe');
      console.log('Data after adding recipe is :', data)
      // data.set('recipe', this.get('recipe'))
      console.log('Data.recipe is: ', data.recipe);
      this.sendAction('addPic', data);
      this.set('picture.url', null);
    }
  }

});
