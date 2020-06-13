import React from 'react';
import './lobby.styles.scss';

export const Lobby = ({
    userName,
    handleUserNameChange,
    roomName,
    handleRoomNameChange,
    handleSubmit
}) => {
    return (
        <form autoComplete={'off'} className='lobby' onSubmit={handleSubmit}>
            <input                
                placeholder='enter your name'
                id="name"
                type="text"
                value={userName}
                onChange={handleUserNameChange}
                required
            />
            <input
                placeholder='enter room name'
                id="roomName"
                type="text"
                value={roomName}
                onChange={handleRoomNameChange}
                required
            />
            <button type="submit">Submit</button>
        </form>
    )
}

export default Lobby;
