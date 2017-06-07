import DS from 'ember-data';

export default DS.Model.extend({
  url: DS.attr('string'),
  recipe: DS.belongsTo('recipe', {async: true})
});
