import React, { useState, useEffect } from 'react';
import './room.styles.scss';

import { connect } from 'twilio-video';

import Participant from '../participant/participant.component';

export const Room = ({ roomName, token, handleLogout }) => {
    const [room, setRoom] = useState(null);
    const [participants, setParticipants] = useState([]);

    useEffect(() => {
        connect(token, { name: roomName })
            .then(room => setRoom(room))
        if (room) {
            room.on('participantConnected', (participant) => {
                setParticipants(prevParticipants => [...prevParticipants, participant])
            });

            room.on('participantDisconnected', (disconnectedParticipant) => {
                setParticipants(prevParticipants => prevParticipants.filter(p => p !== disconnectedParticipant))
            });
        }
        console.log(participants)
        return () => {
            setRoom(currentRoom => {
                if (currentRoom && currentRoom.localParticipant.state === 'connected') {
                    currentRoom.localParticipant.tracks.forEach(function (trackPublication) {
                        trackPublication.track.stop();
                    });
                    currentRoom.disconnect();
                    return null;
                } else {
                    return currentRoom;
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomName, token]);

    const remoteParticipants = participants.map(participant => (
        <Participant key={participant.sid} participant/>
    ));

    return (
        <div className='room'>
            {room && console.log(participants)}
            <h2>Room: {roomName.toUpperCase()}</h2>
            <button onClick={handleLogout}>Leave Room</button>
            <div className="local-participant">
                {
                    room ? <Participant key={room.localParticipant.sid} participant={room.localParticipant} /> : ''
                }
            </div>
            <h3>Remote Participants</h3>
            <div className="remote-participants">{remoteParticipants}</div>
        </div>
    )
}

export default Room;
