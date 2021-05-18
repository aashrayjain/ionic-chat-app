import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
import { ChatRoomPage } from './chat-room/chat-room.page';
import { ChatRoomPageModule } from './chat-room/chat-room.module';


const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
            IonicModule.forRoot(), 
            AppRoutingModule,
            ChatRoomPageModule,
            SocketIoModule.forRoot(config),
            RouterModule.forRoot([
              { path: 'chatRoomPage', component: ChatRoomPage }
            ])
          ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
