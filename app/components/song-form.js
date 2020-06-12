import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SongFormComponent extends Component {
    @tracked formDetails = {};

    @action
    addSong() {
        event.preventDefault();
        this.formDetails['time'] = this.formDetails['time'] + 'min';
        this.args.controllerAddAction(this.formDetails);
        this.formDetails = {};
    }

    @action
    confirmReset() {
        let response = confirm("Are you sure you want to reset the fields");
        if (response) {
            this.formDetails = {};
        }
    }
}
