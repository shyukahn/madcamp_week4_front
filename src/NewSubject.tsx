import React, { useState } from 'react';
import './css/NewSubject.css'; // CSS 파일 임포트
import TopNavMenu from './components/TopNavMenu';

const NewSubject: React.FC = () => {
  const [subjectName, setSubjectName] = useState('');
  const [elements, setElements] = useState([{ element_name: '', element_image: null }]);
  
  const handleElementChange = (index: number, field: string, value: any) => {
    const newElements = [...elements];
    newElements[index] = { ...newElements[index], [field]: value };
    setElements(newElements);
  };

  const handleAddElement = () => {
    setElements([...elements, { element_name: '', element_image: null }]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    const subjectData = {
      subject_name: subjectName,
      elements: elements.map(el => ({ element_name: el.element_name }))
    };
    formData.append('data', JSON.stringify(subjectData));

    elements.forEach((el, index) => {
      if (el.element_image) {
        formData.append(`element_image_${index}`, el.element_image);
      }
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/subjects/new-subject/`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Subject and elements created successfully');
      } else {
        console.error('Error creating subject and elements');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <TopNavMenu />
      <div className="new-subject-container">
        <form onSubmit={handleSubmit} className="new-subject-form">
          <div className="form-group">
            <label>주제 제목</label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="제목 입력"
              required
            />
          </div>
          <div className="elements-grid">
            {elements.map((el, index) => (
              <div key={index} className="element-card">
                <input
                  type="text"
                  value={el.element_name}
                  onChange={(e) => handleElementChange(index, 'element_name', e.target.value)}
                  placeholder="이미지 이름 입력"
                  required
                />
                <input
                  type="file"
                  onChange={(e) => handleElementChange(index, 'element_image', e.target.files ? e.target.files[0] : null)}
                  required
                />
              </div>
            ))}
          </div>
          <button type="button" onClick={handleAddElement} className="add-element-button">요소 추가</button>
          <button type="submit" className="submit-button">주제 만들기</button>
        </form>
      </div>
    </div>
  );
};

export default NewSubject;
