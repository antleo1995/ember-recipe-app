import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('recipe-detail/edit', 'Integration | Component | recipe detail/edit', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{recipe-detail/edit}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#recipe-detail/edit}}
      template block text
    {{/recipe-detail/edit}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
