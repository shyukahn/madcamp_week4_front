import React, { useEffect, useState } from 'react';
import './css/Ranking.css'

import TopNavMenu from './components/TopNavMenu';


interface Subject {
    subject_id: number;
    subject_name: string;
    num_used: number;
    subject_rank: number;
}

const Ranking: React.FC = () => {
    const [subjectsData, setSubjectsData] = useState<Subject[]>([]);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await fetch('http://localhost:8000/subjects/subject-ranking/');
                const data = await response.json();
                setSubjectsData(data);
            } catch (error) {
                console.error('Error fetching subjects data:', error);
            }
        };

        fetchSubjects();
    }, []);

    return (
        <div>
            <TopNavMenu />
            <div className="main-container">
                <div className="box">
                    <div className="box-title">가장 많이 선택된 주제</div>
                    <div className="subjects-container">
                        {subjectsData.map(subject => (
                            <div key={subject.subject_id} className="subject-card">
                                <h3>{subject.subject_rank}. {subject.subject_name}</h3>
                                <p>선택 횟수: {subject.num_used}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="box">
                    <div className="box-title">가장 많은 선택을 받은 후보</div>
                    <div className="subjects-container">
                        {/* 여기에는 후보 데이터를 렌더링합니다. */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ranking;