![Seneca Logo](seneca_web.png "SENECA S.r.l.")

# About
This project is designed to show an mqtt client/server environment with SENECA Mqtt enabled devices. The project is for debug purposes but can be extended.
You can find a complete broker and a web application that act as a client (with an UI).

# PREREQUISITE
You need a Node JS environment at least 6.x to run the example in all its parts, don't forget to run with administrative privileges.

# CONFIGURATION
Programm the RTU with the peoject mqtt in seal directory; remember to setup the mqtt broker address: usually in a local environment the ip is your pc address. Once programmed you need to set the correct mac address of the rtu, you can find it in the Seal connection panel. Rename the file web-client/src/app/services/example_config.ts in config.ts. Open this file and edit the row setting your mac addess (without ":"):

```javascript
protected config = {
  namespace: 'seneca',
  device: '<<AABBCCDDEEFF>>', // YOUR MAC ID
  hostname: 'localhost',
  clientId: 'seneca-web-client',
  port: 3000,
  keepalive: 10000
}
```

You can update other config parameters but remember to sync modifications on seal project too.

# INSTALLATION
Open two shells, make sure your are running command as administrator/root privileges.
On the first shell on the root of the sdk:

```bash
# npm install -g @angular/cli
# cd web-client
# npm install
# npm run server
```

On the second shell:
```bash
# cd web-client
# npm run client
```
A browser will be opened automatically with the client running, on the two shell you can see the debug log of the mqtt broker and web client running.

# BUILD
If you want to create a dist directory with thw only file needed for running in a staric environment (nginx or apache) you can run this command:

```bash
# cd web-client
# npm run build-prod
```
You can customize the build command using the Angular ng client.

# LICENSE
You can find the complete license detail, for all the library used on the licenses.txt file. This SENECA code is free to use with SENECA S.r.l. hardware and software devices.

Copyright (c) SENECA S.r.l.
All rights reserved.

Seneca S.r.l.
Via Austria, 26
35127 Padova (PD)
ITALY

