import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer()
  public server: Server;

  @SubscribeMessage('uploadProgress')
  handleUploadProgress(client: Server, payload: number) {
    this.server.emit('uploadProgress', payload);
  }
}
