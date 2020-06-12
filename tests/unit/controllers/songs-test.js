import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | songs', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:songs');
    assert.ok(controller);
  });

  test('should add song object to songs array and session storage when addSong method is called', function(assert) {
    let controller = this.owner.lookup('controller:songs');
    controller.songs = [];

    const mockSongDetails = {
      title: 'Better Place',
      artist: 'Artist1',
      time: '3min'
    };
    controller.addSong(mockSongDetails);
    assert.equal(controller.songs[0], mockSongDetails);
    assert.equal(sessionStorage.getItem('songs'), JSON.stringify(controller.songs));  

    sessionStorage.clear();
  });
});
