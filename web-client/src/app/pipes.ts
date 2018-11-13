import { Pipe, PipeTransform } from '@angular/core';
import { IMqttMessage } from 'ngx-mqtt';

@Pipe({ name: 'toVal', pure: false })
export class ToVal implements PipeTransform {

  transform(message: IMqttMessage): number {
    try {
      let payload: any = JSON.parse(message.payload.toString());

      return payload.val;
    } catch(e) {
      //console.error(e);
    }

    return null;
  }
}

@Pipe({ name: 'toBoolean', pure: false })
export class ToBoolean implements PipeTransform {

  transform(message: IMqttMessage): boolean {
    try {
      let payload: any = JSON.parse(message.payload.toString());

      return (payload.val == 1);
    } catch(e) {
      //console.error(e);
    }

    return false;
  }
}

@Pipe({ name: 'toBooleanString', pure: false })
export class ToBooleanString implements PipeTransform {

  transform(message: IMqttMessage): String {
    try {
      let payload: any = JSON.parse(message.payload.toString());

      return (payload.val == 1) ? 'ON' : 'OFF';
    } catch(e) {
      //console.error(e);
    }

    return 'OFF';
  }
}

@Pipe({ name: 'toColor', pure: false })
export class ToColor implements PipeTransform {

  transform(message: IMqttMessage): string {
    try {
      let payload: any = JSON.parse(message.payload.toString());

      return (payload.val == 1 ? 'success' : 'danger');
    } catch(e) {
      //console.error(e);
    }

    return 'warning';
  }
}

@Pipe({ name: 'statusToString', pure: false })
export class StatusToString implements PipeTransform {

  transform(message: IMqttMessage): string {
    try {
      let payload: any = JSON.parse(message.payload.toString());

      if (payload.session == 'online') return 'ONLINE';
      if (payload.session == 'timeout') return 'OFFLINE';
      if (payload.session == 'offline') return 'SHUTDOWN';
    } catch(e) {
    //  console.error(e);
    }

    return 'Unknown';
  }
}

@Pipe({ name: 'statusToColor', pure: false })
export class StatusToColor implements PipeTransform {

  transform(message: IMqttMessage): string {
    try {
      let payload: any = JSON.parse(message.payload.toString());

      if (payload.session == 'online') return 'success';
      if (payload.session == 'timeout') return 'danger';
      if (payload.session == 'offline') return 'danger';
    } catch(e) {
    //  console.error(e);
    }

    return 'warning';
  }
}

@Pipe({ name: 'statusToUptime', pure: false })
export class StatusToUptime implements PipeTransform {

  transform(message: IMqttMessage): Date {
    try {
      let payload: any = JSON.parse(message.payload.toString());

      return new Date(payload.tms * 1000);
    } catch(e) {
    //  console.error(e);
    }

    return null;
  }
}

@Pipe({ name: 'eventToText', pure: false })
export class EventToText implements PipeTransform {

  transform(message: IMqttMessage): string {
    try {
      let payload: any = JSON.parse(message.payload.toString());

      if (payload['ev']) {
        let event = payload.ev[0];
        if (event.msg == null || event.msg == '') {
          return '[NO TEXT]';
        } else {
          return event.msg;
        }
      }

      if (payload['ack']) {
        return 'Command Number ' + payload['ack'];
      }

    } catch(e) {
    //  console.error(e);
    }

    return 'Unknown';
  }
}

@Pipe({ name: 'eventToTime', pure: false })
export class EventToTime implements PipeTransform {

  transform(message: IMqttMessage): string {
    try {
      let payload: any = JSON.parse(message.payload.toString());

      if (payload['ev']) {
        let event = payload.ev[0];
        return (new Date(event.tms * 1000)).toLocaleString();
      }

      if (payload['ack']) {
        return '';
      }

    } catch(e) {
    //  console.error(e);
    }

    return 'Unknown';
  }
}

@Pipe({ name: 'eventToId', pure: false })
export class EventToId implements PipeTransform {

  transform(message: IMqttMessage): string {
    try {
      let payload: any = JSON.parse(message.payload.toString());

      if (payload['ev']) {
        let event = payload.ev[0];
        return '(id ' + event.id + ')';
      }

      if (payload['ack']) {
        return '';
      }

    } catch(e) {
    //  console.error(e);
    }

    return 'Unknown';
  }
}


@Pipe({ name: 'eventToType', pure: false })
export class EventToType implements PipeTransform {
  private ACK = 1;
  private STATUS = 2;
  private ALERT = 3;
  private ERROR = 4;
  private WARNING = 5;
  private NOTE = 6;
  private MESSAGE = 7;
  private INFO = 8;
  private DEBUG = 9;

  transform(message: IMqttMessage): string {
    try {
      let payload: any = JSON.parse(message.payload.toString());

      if (payload['ev']) {
        let event = payload.ev[0];

        if (event.src == this.ACK)  return 'ACK';
        if (event.src == this.STATUS)  return 'STATUS';
        if (event.src == this.ALERT)  return 'ALERT';
        if (event.src == this.ERROR)  return 'ERROR';
        if (event.src == this.WARNING)  return 'WARNING';
        if (event.src == this.NOTE)  return 'NOTE';
        if (event.src == this.MESSAGE)  return 'MESSAGE';
        if (event.src == this.INFO)  return 'INFO';
        if (event.src == this.DEBUG)  return 'DEBUG';
      }

      if (payload['ack']) {
        return 'ACK';
      }

    } catch(e) {
    //  console.error(e);
    }

    return 'Unknown';
  }
}

@Pipe({ name: 'stateToString' })
export class StateToStringPipe implements PipeTransform {
  private states = [
    'CLOSED',
    'CONNECTING',
    'CONNECTED'
  ];

  transform(state: number): string {
    return `${this.states[state]}`;
  }
}

@Pipe({ name: 'stateToClass' })
export class StateToClassPipe implements PipeTransform {
  private states = [ 'danger', 'warn', 'success' ];

  transform(state: number): string {
    return `${this.states[state]}`;
  }
}
