import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  ingredient_list: DS.attr('string'),
  directions: DS.attr('string'),
  prep_time: DS.attr('string'),
  editable: DS.attr('boolean'),

});
