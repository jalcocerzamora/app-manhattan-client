import { Injectable } from '@angular/core';

import { environment } from 'projects/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket;

  constructor() {   }

  setupSocketConnection(){
    // this.socket = io(environment.SOCKET_ENDPOINT);
    // this.socket = io(environment.SOCKET_ENDPOINT, {
    //   query: {
    //     token: 'cde'
    //   }
    // });
    // this.socket.emit('my message', 'Hello there from Angular.');
  }
}
