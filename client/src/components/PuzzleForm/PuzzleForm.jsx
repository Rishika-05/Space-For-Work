import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Unauthorized from '../unauthorized/Unauthorized';
export default function QuestionForm(props) {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Add Question | Space For Work';
        // eslint-disable-next-line
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        let data = {
            title: event.target.title.value,
            problem: {
                problemStatement: event.target.problemStatement.value,
                

            },
            answer: event.target.answer.value,

            difficulty: event.target.difficulty.value,
            
        }
        console.log(data);
        fetch(`http://localhost:9003/admin/puzzleUpload`, {
            method: "POST", body: JSON.stringify(data), headers: {
                'Content-Type': 'application/json'
            },
        });

        toast('Question added successfully', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        navigate('/');

    }
    if (props.user._id === undefined) {
        return (
            // <Unauthorized />
            <h4>Unauthorized</h4>
            )
    }
    else {
        return (
            <>
                <div className="mt-5">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label for="problem-title">Problem Title</label>
                            <textarea className="form-control" name="title" id="problem-title" rows="1" required></textarea>
                        </div>
                        <div className="form-group">
                            <label for="problem-statement">Problem Statement</label>
                            <textarea className="form-control" name="problemStatement" id="problem-statement" rows="6" required></textarea>
                        </div>
                        
                        
                        <div className="form-group">
                            <label for="hidden-output">Answer</label>
                            <textarea className="form-control" name="answer" id="hidden-output" rows="3" required></textarea>
                        </div>
                        <div className="form-group">
                            <label for="difficulty-select">Problem Difficulty</label>
                            <select className="form-control" name="difficulty" id="difficulty-select">
                                <option value="easy">Easy </option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                        
                        <button type="submit" className="btn btn-primary mb-5" style={{'width':'200px', marginLeft:'35vw'}}>Upload</button>
                    </form>
                </div>
                <ToastContainer/>
            </>
        )
    }
}
