import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ToBoolean,
         ToVal,
         ToBooleanString,
         ToColor,
         StatusToString,
         StatusToColor,
         StatusToUptime,
         EventToText,
         EventToTime,
         EventToType,
         EventToId,
         StateToStringPipe,
         StateToClassPipe } from './pipes';
import { Mqtt } from './services/mqtt';
import { AppComponent } from './app.component';
import { IO } from './components/io';

@NgModule({
  declarations: [
    AppComponent,
    IO,

    ToBoolean,
    ToColor,
    StatusToString,
    StatusToColor,
    StatusToUptime,
    ToBooleanString,
    ToVal,
    EventToText,
    EventToTime,
    EventToType,
    EventToId,
    StateToStringPipe,
    StateToClassPipe
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot()
  ],
  providers: [
    Mqtt
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
