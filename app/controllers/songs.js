import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class SongsController extends Controller {
    @tracked songs = this.model;
    tableHeader = ['Title', 'Artist', 'Time'];

    @action
    addSong(songDetails) {
        this.songs.pushObject(songDetails);
        if (typeof(Storage) != undefined) {
            sessionStorage.setItem('songs', JSON.stringify(this.songs));
        }
    }
}
