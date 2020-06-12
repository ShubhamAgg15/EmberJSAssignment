import Route from '@ember/routing/route';

export default class SongsRoute extends Route {
    model() {
        let songs;
        if (typeof(Storage) != 'undefined') {
            songs = JSON.parse(sessionStorage.getItem('songs'));
        }
        return songs != null ? songs : [];
    }
}
