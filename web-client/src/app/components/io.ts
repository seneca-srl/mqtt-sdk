import { Component, Input } from '@angular/core';

import { Mqtt } from '../services/mqtt';

@Component({
  selector: 'io',
  templateUrl: './io.html',
})
export class IO {
  @Input() name: string = null;
  @Input() topic: string = null;
  @Input() command: number = 0;
  @Input() digital: boolean = false;

  value: any = null;

  constructor(public mqtt: Mqtt) {
  }

  ngOnInit() {
    console.log('SUBSCRIBING ' + this.name + ': ' + this.topic);
    this.value = this.mqtt.subscribe(this.topic);
  }

  SendCommand() {
    this.mqtt.publish('act', { act: this.command });
  }
}
