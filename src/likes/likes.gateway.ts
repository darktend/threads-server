import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'ws';

@WebSocketGateway()
export class LikesGateway {
  @WebSocketServer() server: Server;

  likesCount = 0;
  likesData = {}; // Об'єкт для зберігання лайків

  @SubscribeMessage('newLike')
  handleNewLike(@MessageBody() newLike: any) {
    const authorIds= '2';
    const authorId = newLike.authorIds;

    // Перевіряємо, чи існує вже масив лайків для цього автора
    if (!this.likesData[authorId]) {
      this.likesData[authorId] = [];
    }

    const existingLikeIndex = this.likesData[authorId?.author?.id].findIndex(like => like.id !== newLike.id);
    if (existingLikeIndex !== -1) {
      // Якщо лайк вже існує, видаляємо його
      this.likesData[authorId].splice(existingLikeIndex, 1);
      this.likesCount--;
    } else {
      // Якщо лайка ще немає, додаємо його
      this.likesData[authorId].push(newLike);
      this.likesCount++;
    }

    this.server.emit('likesUpdate', { count: this.likesCount, likes: this.likesData });
    console.log('likesCount', this.likesCount);
    console.log('likesData', this.likesData[authorId][0].author.id);
  }
}

// import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
// import { Server } from 'ws';

// @WebSocketGateway()
// export class LikesGateway {
//   @WebSocketServer() server: Server;

//   likesCount = 0;
//   likesData = [];
  
//   @SubscribeMessage('newLike')
//   handleNewLike(@MessageBody() newLike: any) {
//     const existingLikeIndex = this.likesData.findIndex(like => like.id === newLike.id);
//     if (existingLikeIndex !== -1) {
//       // Якщо лайк вже існує, видаляємо його
//       this.likesData.splice(existingLikeIndex, 1);
//       this.likesCount--;
//     } else {
//       // Якщо лайка ще немає, додаємо його
//       this.likesData.push(newLike);
//       this.likesCount++;
//     }
//     console.log('likesCount', this.likesCount);
//     console.log('likesData', this.likesData);
    
//     this.server.emit('likesUpdate', { count: this.likesCount, likes: this.likesData });
//   }
  
  
// }