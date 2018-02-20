import { Inject, Injectable } from '@angular/core';


@Injectable()
export class Config {

  protected config = {
    namespace: 'seneca',
    device: 'C8F9810F0014', // YOUR MAC ID
    hostname: 'localhost',
    clientId: 'seneca-web-client',
    port: 3000,
    keepalive: 10000
  }
}
