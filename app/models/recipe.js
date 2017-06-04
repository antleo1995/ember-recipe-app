import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  ingredient_list: DS.attr('string'),
  directions: DS.attr('string'),
});
