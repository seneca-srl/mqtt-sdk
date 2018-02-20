import {Component} from '@angular/core';
import {Mqtt} from './services/mqtt';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    dev = null;
    events = [];
    event_notification = false;
    status = null;

    constructor(public mqtt: Mqtt) {
        this.status = this.mqtt.subscribe('sts');

        this.mqtt.subscribe('cfg').subscribe((msg) => {
            let cfg = JSON.parse(msg.payload.toString());
            console.log("CONFIGURATION RECEIVED", cfg);
            if (cfg['dev']) {
                this.dev = cfg.dev;
            }
        });

        this.mqtt.subscribe('ev').subscribe((msg) => {
            if (!msg.retain) {
                this.events.push(msg);
                this.event_notification = true;
                setTimeout(() => this.event_notification = false, 2500);
            } else {
                console.log('RETAIN MESSAGE IGNORED', msg);
            }
        });
    }

    ResetEvents() {
        this.events = [];
    }

    ReadDeviceInfo() {
        this.mqtt.publish('act', { act: 186712324 });
    }
}
