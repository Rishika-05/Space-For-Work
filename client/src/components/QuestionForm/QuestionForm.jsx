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
        console.log(event.target.tag.value)
        let data = {
            title: event.target.title.value,
            problem: {
                problemStatement: event.target.problemStatement.value,
                sampleInput: event.target.sampleInput.value,
                sampleOutput: event.target.sampleOutput.value,
                inputFormat: event.target.inputFormat.value,
                outputFormat: event.target.outputFormat.value,
                constraints: event.target.constraints.value,
                explanation: event.target.explanation.value,

            },
            answer: event.target.answer.value,

            testCase: event.target.testCase.value,
            difficulty: event.target.difficulty.value,
            tag: event.target.tag.value,
        }

        fetch(`https://space-for-work-backend.herokuapp.com/admin/questionUpload/?user=${props.user._id}`, {
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
                            <label for="input-format">Input Format</label>
                            <textarea className="form-control" name="inputFormat" id="input-format" rows="2" required></textarea>
                        </div>
                        <div className="form-group">
                            <label for="output-format">Output Format</label>
                            <textarea className="form-control" name="outputFormat" id="output-format" rows="2" required></textarea>
                        </div>
                        <div className="form-group">
                            <label for="problem-constraints">Constraints</label>
                            <textarea className="form-control" name="constraints" id="problem-constraints" rows="2" required></textarea>
                        </div>
                        <div className="form-group">
                            <label for="problem-explanation">Explanation</label>
                            <textarea className="form-control" name="explanation" id="problem-explanation" rows="2" required></textarea>
                        </div>
                        <div className="form-group">
                            <label for="sample-input">Sample input</label>
                            <textarea className="form-control" name="sampleInput" id="sample-input" rows="3"></textarea>
                        </div>
                        <div className="form-group">
                            <label for="sample-output">Sample output</label>
                            <textarea className="form-control" name="sampleOutput" id="sample-output" rows="3" required></textarea>
                        </div>
                        <div className="form-group">
                            <label for="hidden-input">Hidden input</label>
                            <textarea className="form-control" name="testCase" id="hidden-input" rows="3" ></textarea>
                        </div>
                        <div className="form-group">
                            <label for="hidden-output">Hidden output</label>
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
                        <div className="form-group">
                            <label for="tag-select">Problem Tag</label>
                            <select className="form-control" name="tag" id="tag-select">
                                <option value="implementation">Implementation</option>
                                <option value="strings">Strings</option>
                                <option value="sorting">Sorting</option>
                                <option value="greedy">Greedy</option>
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
