/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { AssignOwnerEvent, ChampionRoll, ChampionRolledEvent, ChampionsRolledEvent, CreateRoomEvent, JoinRoomEvent, KickPlayerEvent, LeaveRoomEvent, NicknameNotAvailableEvent, OwnerAssignedEvent, Player, PlayerJoinedEvent, PlayerKickedEvent, PlayerLeftEvent, RollChampionEvent, RollChampionsEvent, RoomCreatedEvent, RoomJoinedEvent, RoomNotFoundEvent } from '@let-it-roll/let-it-roll-shared';
import * as express from 'express';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Room } from './room';

const app = express();

const server = app.listen(process.env.port || 3333);

const io = new Server(server, {
    cors: { origin: "*" }
});

const getRoomId = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>): string => {
    return (<any> socket).lastRoomId;
}

const setRoomId = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, id: string): void => {
    (<any> socket).lastRoomId = id;
}

const rooms: Record<string, Room> = {};

io.on('connection', (socket) => {
    socket.on(CreateRoomEvent, ({ nickname }: CreateRoomEvent) => {
        const roomId = socket.id;
        const player: Player = { id: socket.id, nickname };

        setRoomId(socket, roomId);
        rooms[socket.id] = new Room(player);
        socket.join(roomId);
        io.to(roomId).emit(RoomCreatedEvent, <RoomCreatedEvent> { player, roomId })
    });

    socket.on(JoinRoomEvent, ({ nickname, roomId }: JoinRoomEvent) => {
        const room = rooms[roomId];

        if(!room) return socket.emit(RoomNotFoundEvent);

        const res = room.join({ id: socket.id, nickname });

        if(!res) return socket.emit(NicknameNotAvailableEvent)

        setRoomId(socket, roomId);

        socket.join(roomId);

        socket.emit(RoomJoinedEvent, <RoomJoinedEvent> { 
            players: room.players, 
            playerId: socket.id, 
            ownerId: room.ownerId, 
            rolls: room.currentRolls, 
            roomId 
        });

        socket.broadcast.to(roomId).emit(PlayerJoinedEvent, <PlayerJoinedEvent> { player: room.entries[socket.id].player })
    });

    socket.on(LeaveRoomEvent, (event: LeaveRoomEvent) => {
        const roomId = getRoomId(socket);
        const room = rooms[roomId];
        if(!room) return;
        room.leave(socket.id);        
        socket.leave(roomId);
        io.to(roomId).emit(PlayerLeftEvent, <PlayerLeftEvent> { playerId: socket.id, ownerId: room.ownerId });
    });

    socket.on(KickPlayerEvent, ({ playerId }: KickPlayerEvent) => {
        const roomId = getRoomId(socket);
        const room = rooms[roomId];
        if(!room || playerId === room.ownerId || socket.id !== room.ownerId) return;

        room.kick(playerId);

        io.to(roomId).emit(PlayerKickedEvent, <PlayerKickedEvent>{ playerId })
    })

    socket.on(AssignOwnerEvent, ({ ownerId }: AssignOwnerEvent) => {
        const roomId = getRoomId(socket);
        const room = rooms[roomId];
        if(!room || ownerId === room.ownerId || socket.id !== room.ownerId) return;

        room.assignOwner(ownerId);

        io.to(roomId).emit(OwnerAssignedEvent, <OwnerAssignedEvent>{ ownerId })
    })

    socket.on(RollChampionsEvent, (event: RollChampionsEvent) => {
        const roomId = getRoomId(socket);
        const room = rooms[roomId];
        if(!room || room.ownerId !== socket.id) return;

        const rolls = room.rollChampions();

        if(!rolls) return;
        
        io.to(roomId).emit(ChampionsRolledEvent, <ChampionsRolledEvent> { rolls: Object.values(rolls) })
    });

    socket.on(RollChampionEvent, (event: RollChampionEvent) => {
        const roomId = getRoomId(socket);
        const room = rooms[roomId];
        if(!room) return;

        const roll = room.rollChampion(socket.id);
        if(!roll) return;
        
        io.to(roomId).emit(ChampionRolledEvent, <ChampionRolledEvent> { roll })
    });

    socket.on('disconnect', (e) => {
        const roomId = getRoomId(socket);
        const room = rooms[roomId];
        if(!room) return;
        room.leave(socket.id);
        socket.broadcast.to(roomId).emit(PlayerLeftEvent, <PlayerLeftEvent> { playerId: socket.id, ownerId: room.ownerId });
    });
      
})

server.on('error', console.error);

