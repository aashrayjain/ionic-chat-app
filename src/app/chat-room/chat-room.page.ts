import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavParams, ToastController } from '@ionic/angular';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.page.html',
  styleUrls: ['./chat-room.page.scss'],
})
export class ChatRoomPage implements OnInit {

  messages = [];
  nickname = '';
  message = '';

  constructor(private router: Router,
    private socket: Socket,
    private toastCtrl: ToastController
    ) { 
      // console.log(this.router.getCurrentNavigation().extras.state);
      this.nickname = this.router.getCurrentNavigation().extras.state.nickname;

      
      this.getMessages().subscribe(message => {
        console.log(message);
        this.messages.push(message);
      });

      this.getUsers().subscribe(data => {
        console.log(data);
        let user = data['user'];
        if (data['event'] === 'left') {
          this.showToast('User left: ' + user);
        } else {
          this.showToast('User joined: ' + user);
        }
      });
    }

  ngOnInit() {
  }

  sendMessage() {
    this.socket.emit('add-message', { text: this.message });
    this.message = '';
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', data => {
        observer.next(data);
      });
    });
    return observable;
  }

  async showToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    console.log(toast);
    await toast.present();
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }


}
