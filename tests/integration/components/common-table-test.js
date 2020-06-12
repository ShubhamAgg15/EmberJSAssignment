import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | common-table', function(hooks) {
  setupRenderingTest(hooks);

  test('should be able to render given content', async function(assert) {
    const tableHeader = ['Title', 'Artist', 'Time'];
    const songs = [
      { title: 'Better Place', artist: 'Artist1', time: '3min' }, 
      { title: 'Summer of 69', artist: 'Bryan', time: '4min'}
    ];

    this.set('tableHeader', tableHeader);
    this.set('songs', songs);

    await render(hbs`<CommonTable @header={{this.tableHeader}} @rows={{this.songs}}/>`);

    const rows = this.element.querySelectorAll('tr');
    const firstRowCells = rows[0].querySelectorAll('th');
    const secondRowCells = rows[1].querySelectorAll('td');
    const thirdRowCells = rows[2].querySelectorAll('td');

    assert.equal(firstRowCells[0].textContent, 'Title');
    assert.equal(firstRowCells[1].textContent, 'Artist');
    assert.equal(firstRowCells[2].textContent, 'Time');
    assert.equal(secondRowCells[0].textContent, 'Better Place');
    assert.equal(secondRowCells[1].textContent, 'Artist1');
    assert.equal(secondRowCells[2].textContent, '3min');
    assert.equal(thirdRowCells[0].textContent, 'Summer of 69');
    assert.equal(thirdRowCells[1].textContent, 'Bryan');
    assert.equal(thirdRowCells[2].textContent, '4min');
  });
});
