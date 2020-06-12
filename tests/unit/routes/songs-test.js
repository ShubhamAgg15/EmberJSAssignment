import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | songs', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:songs');
    assert.ok(route);
  });

  test('should return empty array if there is no previous song in session storage', function(assert) {
    let route = this.owner.lookup('route:songs');
    sessionStorage.clear();
    const songs = route.model();
    assert.deepEqual(songs, []);
  });

  test('should return songs array if there are previous songs available in session storage', function(assert) {
    let route = this.owner.lookup('route:songs');

    const songs = [
      {title:'BetterPlace', artist:'Artist1', time:'3min'},
      {title:'Summer of 69', artist:'Bryan', time:'4min'}
    ];
    sessionStorage.setItem('songs', JSON.stringify(songs))

    const expectedSongs = route.model();
    assert.deepEqual(songs, expectedSongs);
    sessionStorage.clear();
  });
});
