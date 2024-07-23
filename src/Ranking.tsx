import React, { useEffect, useState } from 'react';
import './css/Ranking.css';
import TopNavMenu from './components/TopNavMenu';

interface Subject {
    subject_id: number;
    subject_name: string;
    num_used: number;
    subject_rank: number;
}

interface Element {
    element_id: number;
    element_name: string;
    element_image: string;
    num_won: number;
    element_rank: number;
}

const Ranking: React.FC = () => {
    const [subjectsData, setSubjectsData] = useState<Subject[]>([]);
    const [elementsData, setElementsData] = useState<Element[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<number | null>(null);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/subjects/subject-ranking/`);
                const data = await response.json();
                setSubjectsData(data);
            } catch (error) {
                console.error('Error fetching subjects data:', error);
            }
        };

        fetchSubjects();
    }, []);

    useEffect(() => {
        if (selectedSubject !== null) {
            const fetchElements = async () => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/subjects/subject-ranking/${selectedSubject}/element-ranking/`);
                    const data = await response.json();
                    setElementsData(data);
                } catch (error) {
                    console.error('Error fetching elements data:', error);
                }
            };

            fetchElements();
        }
    }, [selectedSubject]);

    return (
        <div>
            <TopNavMenu />
            <div className="ranking-main-container">
                <div className="ranking-box">
                    <div className="ranking-box-title">가장 많이 선택된 주제</div>
                    <div className="ranking-subjects-container">
                        {subjectsData.map(subject => (
                            <div
                                key={subject.subject_id}
                                className={`ranking-subject-card ${selectedSubject === subject.subject_id ? 'selected' : ''}`}
                                onClick={() => setSelectedSubject(subject.subject_id)}
                            >
                                <h3>{subject.subject_rank}. {subject.subject_name}</h3>
                                <p>선택 횟수: {subject.num_used}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {selectedSubject !== null && (
                    <div className="ranking-box">
                        <div className="ranking-box-title">가장 많은 선택을 받은 후보</div>
                        <div className="ranking-subjects-container">
                            {elementsData.map(element => (
                                <div key={element.element_id} className="ranking-element-card">
                                    <h3>{element.element_rank}. {element.element_name}</h3>
                                    <img src={`${process.env.REACT_APP_API_URL}${element.element_image}`} alt={element.element_name} />
                                    <p>Wins: {element.num_won}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Ranking;
