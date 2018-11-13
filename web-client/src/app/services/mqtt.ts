import { Inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

import { Config } from './config';

import {
  IMqttMessage,
  MqttService
} from 'ngx-mqtt';

export type QoS = 0 | 1 | 2;

@Injectable()
export class Mqtt extends Config {
  private mqtt: MqttService = null;
  public Messages: BehaviorSubject<IMqttMessage> = new BehaviorSubject<IMqttMessage>(null);
  public Updated: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
  public Count: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private appNs(): string {
    return this.config.namespace + '/' + this.config.device + '/';
  }

  constructor() {
    super();
    this.mqtt = new MqttService({ hostname: this.config.hostname, clientId: this.config.clientId, port: this.config.port, keepalive: this.config.keepalive });
    this.mqtt.onConnect.subscribe((e) => console.log('MQTT CONNECTED', e));
    this.mqtt.onError.subscribe((e) => console.log('MQTT ERROR', e));
    this.mqtt.onClose.subscribe(() => console.log('MQTT CLOSE'));
    this.mqtt.onReconnect.subscribe(() => console.log('MQTT RECONNECT'));
    this.mqtt.onMessage.subscribe((e) => {
      try {
        let data = e.payload.toString();
        let payload: any = JSON.parse(e.payload.toString());
        if (payload['tms']) this.Updated.next(new Date(payload.tms * 1000));
      } catch(e) {
        console.log('MQTT INVALID MESSAGE', e);
      }

      console.log("MQTT MESSAGE [" + e.topic + "]: " + e.payload.toString());
      this.Messages.next(e);
      this.Count.next(this.Count.getValue() + 1);
    });
  }

  public publish(topic: string, message: any, retain = false, qos: QoS = 1): void {
    this.mqtt
      .publish(this.appNs() + topic, JSON.stringify(message), { retain, qos })
      .subscribe((err) => console.log(err));
  }

  public subscribe(filter: string): Observable<IMqttMessage> {
    return this.mqtt.observe(this.appNs() + filter);
  }

  public subscribeWithValue(filter: string, def: any): BehaviorSubject<any> {
    let subject = new BehaviorSubject(def);

    this.mqtt.observe(this.appNs() + filter).subscribe((msg) => {
      subject.next(msg);
    });

    return subject;
  }

  public unsubscribe(filter: string): void {
    this.mqtt.observables[filter] = null;
  }

  public get state() {
    return this.mqtt.state;
  }
}
