import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nickname = '';

  constructor(private router: Router, private socket: Socket) {}
  
  joinChat () {
    console.log('Inside chat')
    this.socket.connect();
    this.socket.emit('set-nickname', this.nickname);
    this.router.navigate(['/chatRoomPage'], {
      state: {
        nickname: this.nickname
      }
    });
  }

}
