import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/NewRoom.css';
import TopNavMenu from './components/TopNavMenu';

interface Subject {
    subject_id: number;
    subject_name: string;
}

const NewRoom: React.FC = () => {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [roomTitle, setRoomTitle] = useState('');
    const [selectedSubject, setSelectedSubject] = useState<number | null>(null);
    const [maxPeople, setMaxPeople] = useState<number | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        const isLogin = localStorage.getItem('isLogin');
        if (isLogin === 'False') {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/login');
        }
        const fetchSubjects = async () => {
            try {
                const response = await fetch('http://localhost:8000/subjects/subject-list/');
                const data = await response.json();
                setSubjects(data);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };

        fetchSubjects();
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const googleAccount = localStorage.getItem('googleAccount');

        if (!googleAccount || !roomTitle || !selectedSubject || !maxPeople) {
            alert('모든 필드를 채워주세요.');
            return;
        }

        const postData = {
            google_account: googleAccount,
            room_title: roomTitle,
            subject_id: selectedSubject,
            max_people: maxPeople,
        };
        console.log(postData);

        try {
            const response = await fetch('http://localhost:8000/rooms/make-room/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postData),
            });

            if (response.ok) {
                const data = await response.json();
                alert('방이 성공적으로 만들어졌습니다.');
                navigate(`/ready/${data.room_id}`); 
            } else {
                alert('방 만들기에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error making room:', error);
            alert('방 만들기 중 오류가 발생했습니다.');
        }
    };

    return (
        <div>
            <TopNavMenu />
            <div className="new-room-container">
                <form onSubmit={handleSubmit} className="new-room-form">
                    <div className="form-group">
                        <label>방 제목</label>
                        <input
                            type="text"
                            value={roomTitle}
                            onChange={(e) => setRoomTitle(e.target.value)}
                            placeholder="제목 입력"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>주제</label>
                        <select
                            value={selectedSubject || ''}
                            onChange={(e) => setSelectedSubject(Number(e.target.value))}
                            required
                        >
                            <option value="" disabled>
                                주제 선택
                            </option>
                            {subjects.map((subject) => (
                                <option key={subject.subject_id} value={subject.subject_id}>
                                    {subject.subject_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>최대 인원</label>
                        <select
                            value={maxPeople || ''}
                            onChange={(e) => setMaxPeople(Number(e.target.value))}
                            required
                        >
                            <option value="" disabled>
                                인원 선택
                            </option>
                            {[1, 2, 3, 4, 5].map((num) => (
                                <option key={num} value={num}>
                                    {num}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="submit-button">
                        방 만들기
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewRoom;
