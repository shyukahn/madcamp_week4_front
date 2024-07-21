import React, { useState, useEffect } from 'react';
import './css/Main.css'
import TopNavMenu from './components/TopNavMenu';

interface Room {
    room_id: number;
    room_title: string;
    google_account: string;
    subject_name: string;
    max_people: number;
    current_people: number;
    is_started: boolean;
}

const Main : React.FC = ()=> {
    const [roomsData, setRoomsData] = useState<Room[]>([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('http://localhost:8000/rooms/current_room/');
                const data = await response.json();
                setRoomsData(data);
            } catch (error) {
                console.error('Error fetching rooms data:', error);
            }
        };

        fetchRooms();
    }, []);

    const handleRoomClick = (roomId: number) => {
        console.log(`Room ID: ${roomId}`);
    };
    
    return (
        <div>
            <TopNavMenu />
            <div className='firstcon'>
                <div className='container'>
                    {roomsData.map(room => (
                        <div key={room.room_id} className="room-card" onClick={() => handleRoomClick(room.room_id)} style={{ cursor: 'pointer' }}>
                            <h3>{room.room_title}</h3>
                            <p>주제: {room.subject_name}</p>
                            <p className='people-count'>{room.current_people}/{room.max_people}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
    );
}

export default Main;