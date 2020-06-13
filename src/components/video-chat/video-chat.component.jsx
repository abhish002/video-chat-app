import React, { useState, useCallback } from 'react';
import './video-chat.styles.scss';

import Lobby from '../lobby/lobby.component';
import Room from '../room/room.component';

export const VideoChat = () => {
    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState('');
    const [token, setToken] = useState(null);

    const handleUserNameChange = useCallback(e => {
        setUsername(e.target.value);
    }, []);

    const handleRoomNameChange = useCallback(e => {
        setRoomName(e.target.value);
    }, []);

    const handleSubmit = useCallback(async event => {
        event.preventDefault();
        const data = await fetch('/video/token', {
            method: 'POST',
            body: JSON.stringify({
                identity: username,
                room: roomName
            }),
            headers: {
                'Content-Type': 'application/json'                
            }
        }).then(res => res.json());
        setToken(data.token);
    }, [username, roomName]);

    const handleLogout = useCallback(event => {
        setToken(null);
    }, []);

    return (
        token ?
            (<div>
                <p>User Name: {username}</p>
                <p>Room Name: {roomName}</p>
                <Room roomName={roomName} token={token} handleLogout={handleLogout}/>
            </div>
            ) :
            <Lobby
                userName={username}
                handleUserNameChange={handleUserNameChange}
                roomName={roomName}
                handleRoomNameChange={handleRoomNameChange}
                handleSubmit={handleSubmit}
            />
    )
}

export default VideoChat;
