import { Get, Injectable, OnModuleInit, Res } from "@nestjs/common";
import { io, Socket } from "socket.io-client";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";


@Injectable()
@WebSocketGateway({
    cors: {
        origin: ['http://localhost:3000']
    }
})
export class MyGateway implements OnModuleInit {
    @WebSocketServer()
    server: Server;

    onModuleInit() {
        this.server.on('connect', (socket) => {
            console.log('new connection', socket.id);
        })
    }

    // Приймаємо повідомлення про лайк і ретранслюємо його усім підключеним клієнтам
    @SubscribeMessage('likes')
    handleLikesEvent(client: any, payload: any) {
        console.log('Received like:', payload);
        this.server.emit('likes', payload);
    }
}