import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | songs', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /songs', async function(assert) {
    await visit('/songs');
    assert.equal(currentURL(), '/songs');
  });

  test(`visiting /songs should have minimum of input fields and buttons`, async function(assert){
    await visit('/songs');

    const titleInput = this.element.querySelector('[data-test-title-input]');
    const artistInput = this.element.querySelector('[data-test-artist-input]');
    const timeInput = this.element.querySelector('[data-test-time-input]');

    assert.dom(titleInput).exists();
    assert.dom(artistInput).exists();
    assert.dom(timeInput).exists();

    const titleInputPlaceholder = titleInput.attributes.getNamedItem('placeholder').value;
    const artistInputPlaceholder = artistInput.attributes.getNamedItem('placeholder').value;
    const timeInputPlaceholder = timeInput.attributes.getNamedItem('placeholder').value;

    assert.equal(titleInputPlaceholder, 'Title');
    assert.equal(artistInputPlaceholder, 'Artist');
    assert.equal(timeInputPlaceholder, 'Time');

    const addBtn = this.element.querySelector('[data-test-submit-button]');
    const resetBtn = this.element.querySelector('[data-test-reset-button]');

    assert.dom(addBtn).exists();
    assert.dom(addBtn).hasText('Add');
    assert.dom(resetBtn).exists();
    assert.dom(resetBtn).hasText('Reset');
  });

  test('visiting /songs should render songs table if data is available in session storage', 
    async function(assert) {
      const data = [
        {title:'BetterPlace', artist:'Artist1', time:'3min'},
        {title:'Summer of 69', artist:'Bryan', time:'4min'}
      ];
      sessionStorage.setItem('songs', JSON.stringify(data));

      await visit('/songs');

      const songsTable = this.element.querySelector('[data-test-common-table]');
      assert.dom(songsTable).exists();
      sessionStorage.clear();
  });

  test('visiting /songs should not render songs table if data is not available in session storage', 
    async function(assert) {
      sessionStorage.clear();

      await visit('/songs');
      const songsTable = this.element.querySelector('[data-test-common-table]');
      assert.equal(songsTable, null);
  });
});
