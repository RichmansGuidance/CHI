import { 
    MessageBody, 
    OnGatewayConnection, 
    OnGatewayDisconnect, 
    OnGatewayInit, 
    SubscribeMessage, 
    WebSocketGateway, 
    WebSocketServer 
  } from "@nestjs/websockets";
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway({
    namespace: '/notifications',
    cors: {
      origin: '*'
    }
  })

  export class NotificationsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    private readonly log = console.log.bind(console);
  
    afterInit(server: Server) {
      this.log('Websocket initialized');
    }
  
    handleConnection(client: Socket) {
      this.log(`connected ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      this.log(`disconnected ${client.id}`);
    }
  
    @SubscribeMessage('newPost')
    handleNewPost(@MessageBody() data: { message: string, user: string }) {
      if (data && data.message && data.user) {
        this.server.emit('newPost', data);
      }
    }
  }