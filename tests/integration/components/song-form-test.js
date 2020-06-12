import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, fillIn, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | song-form', function(hooks) {
  setupRenderingTest(hooks);

  test('should call external action on Add click and clear the form', async function(assert) {
    assert.expect(4);

    this.set('externalAction', (actual) => {
      let expected = { title: 'Better Place', artist: 'Artist 1', time: '3min'};
      assert.deepEqual(actual, expected, 'song details are passed to the external action');
    });

    await render(hbs`<SongForm @controllerAddAction={{action externalAction}}/>`);

    const titleInput = this.element.querySelector('[data-test-title-input]');
    const artistInput = this.element.querySelector('[data-test-artist-input]');
    const timeInput = this.element.querySelector('[data-test-time-input]');

    await fillIn(titleInput, 'Better Place');
    await fillIn(artistInput, 'Artist 1');
    await fillIn(timeInput, '3');
    
    await click('[data-test-submit-button]');

    assert.equal(titleInput.value, '', 'clear the title input');
    assert.equal(artistInput.value, '', 'clear the artist input');
    assert.equal(timeInput.value, '', 'clear the time input');
  });

  test('should ask for confirmation on Reset click and take appropriate action', async function(assert) {
    const originalWindowsConfirmFunctionality = window.confirm;
    this.set('externalAction', () => {});

    await render(hbs`<SongForm @controllerAddSong={{action externalAction}}/>`);

    const titleInput = this.element.querySelector('[data-test-title-input]');
    const artistInput = this.element.querySelector('[data-test-artist-input]');
    const timeInput = this.element.querySelector('[data-test-time-input]');

    await fillIn(titleInput, 'Better Place');
    await fillIn(artistInput, 'Artist 1');
    await fillIn(timeInput, '3');
    
    window.confirm = function() { return false; }
    await click('[data-test-reset-button]');

    assert.equal(titleInput.value, 'Better Place', 'should not clear the title input');
    assert.equal(artistInput.value, 'Artist 1', 'shoudld not clear the artist input');
    assert.equal(timeInput.value, '3', 'should not clear the time input');

    window.confirm = function() { return true; }
    await click('[data-test-reset-button]');

    assert.equal(titleInput.value, '', 'clear the title input');
    assert.equal(artistInput.value, '', 'clear the artist input');
    assert.equal(timeInput.value, '', 'clear the time input');

    window.confirm = originalWindowsConfirmFunctionality;
  });
});
