import { Module } from "@nestjs/common";
import { SocketClient } from "./socket-client"; // Add missing import statement

@Module({
    providers: [SocketClient]
})

export class SocketModule {}