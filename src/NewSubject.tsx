// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// import './css/NewSubject.css'; // CSS 파일 임포트
// import TopNavMenu from './components/TopNavMenu';

// const NewSubject: React.FC = () => {
//   const [subjectName, setSubjectName] = useState('');
//   const [elements, setElements] = useState([{ element_name: '', element_image: null }]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const isLogin = localStorage.getItem('isLogin');
//     if (isLogin === 'False') {
//       alert('로그인이 필요한 서비스입니다.');
//       navigate('/login');
//     }
//   }, [navigate]);

//   const handleElementChange = (index: number, field: string, value: any) => {
//     const newElements = [...elements];
//     newElements[index] = { ...newElements[index], [field]: value };
//     setElements(newElements);
//   };

//   const handleAddElement = () => {
//     setElements([...elements, { element_name: '', element_image: null }]);
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     const formData = new FormData();
//     const subjectData = {
//       subject_name: subjectName,
//       elements: elements.map(el => ({ element_name: el.element_name }))
//     };
//     formData.append('data', JSON.stringify(subjectData));

//     elements.forEach((el, index) => {
//       if (el.element_image) {
//         formData.append(`element_image_${index}`, el.element_image);
//       }
//     });

//     try {
//       const response = await fetch(`${process.env.REACT_APP_API_URL}/subjects/new-subject/`, {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         console.log('Subject and elements created successfully');
//       } else {
//         console.error('Error creating subject and elements');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <TopNavMenu />
//       <div className="new-subject-container">
//         <form onSubmit={handleSubmit} className="new-subject-form">
//           <div className="form-group">
//             <label>주제 제목</label>
//             <input
//               type="text"
//               value={subjectName}
//               onChange={(e) => setSubjectName(e.target.value)}
//               placeholder="제목 입력"
//               required
//             />
//           </div>
//           <div className="elements-grid">
//             {elements.map((el, index) => (
//               <div key={index} className="element-card">
//                 <input
//                   type="text"
//                   value={el.element_name}
//                   onChange={(e) => handleElementChange(index, 'element_name', e.target.value)}
//                   placeholder="이미지 이름 입력"
//                   required
//                 />
//                 <input
//                   type="file"
//                   onChange={(e) => handleElementChange(index, 'element_image', e.target.files ? e.target.files[0] : null)}
//                   required
//                 />
//               </div>
//             ))}
//           </div>
//           <button type="button" onClick={handleAddElement} className="add-element-button">요소 추가</button>
//           <button type="submit" className="submit-button">주제 만들기</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default NewSubject;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './css/NewSubject.css'; // CSS 파일 임포트
import TopNavMenu from './components/TopNavMenu';

const NewSubject: React.FC = () => {
  const [subjectName, setSubjectName] = useState('');
  const [numElements, setNumElements] = useState(4);
  const [elements, setElements] = useState(new Array(numElements).fill({ element_name: '', element_image: null }));
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = localStorage.getItem('isLogin');
    if (isLogin === 'False') {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    setElements(new Array(numElements).fill({ element_name: '', element_image: null }));
  }, [numElements]);

  const handleElementChange = (index: number, field: string, value: any) => {
    const newElements = [...elements];
    newElements[index] = { ...newElements[index], [field]: value };
    setElements(newElements);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNumElements(Number(event.target.value));
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
        alert('성공적으로 등록되었습니다.');
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
          <div className="subject-form-group">
            <label>주제 제목</label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="제목 입력"
              required
            />
          </div>
          <div className="subject-form-group">
            <label>요소의 개수</label>
            <select value={numElements} onChange={handleSelectChange}>
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={16}>16</option>
            </select>
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
          <button type="submit" className="submit-button">주제 만들기</button>
        </form>
      </div>
    </div>
  );
};

export default NewSubject;
