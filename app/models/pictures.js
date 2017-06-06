import DS from 'ember-data';

export default DS.Model.extend({
  url: DS.attr('string'),
  picture: DS.belongsTo('recipe', {async: true})
});
