import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  createRecord (store, type, record) {
    console.log('Record is: ', record)
    const api = this.get('host')
    const serialized =  this.serialize(record, {includeId: true});
    console.log('Serialized is,', serialized);
    const recipeId = serialized.recipe_id;
    const url = `${api}/recipes/${recipeId}/pictures`;
    const data = { picture: serialized }

    return this.ajax(url, 'POST', {data})
  }
});
