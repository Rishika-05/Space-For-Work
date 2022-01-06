import React,{ useEffect} from 'react'
import { Link } from 'react-router-dom'
import Particles from 'react-tsparticles'
import patriclesConfig from './config/particle-config'
import './home.css'
import prob from './problem.png'
import puz from './puzzle.png'

export default function Home(props) {
    useEffect(() => {
        document.title = 'Home | Space For Work';
        // eslint-disable-next-line
    }, []);
    props.setInterview(true);
    return (
        <div className="home1">
            <Particles
                params={patriclesConfig} />
            <div className="main_content mt-3" style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '4vw', fontWeight: 'lighter', color: '#263238' }}> Help Us</h1>
                <h2 style={{ fontSize: '4vw', fontWeight: 'bold', color: '#263238' }}>Improve  Space</h2>
            </div>
            <div className="bottom_boxx" style={{ textAlign: 'center' }}>
                <div className="imgContainer">
                    <img src={prob} alt="Problem" className='imgg' />
                    <h5>Problem Set</h5>
                    <Link to="/questionUpload"><button type="button" style={{ "fontSize": "18px" }} className="btn-sm btn-dark my-4">Add Question</button></Link>
                </div>
                <div className="imgContainer pull">
                    <img src={puz} alt="Puzzle" className='imgg' />
                    <h5>Puzzles</h5>
                    <Link to="/puzzleUpload"><button type="button" style={{ "fontSize": "18px" }} className="btn-sm btn-dark my-4">Add Puzzle</button></Link>
                </div>
            </div>
        </div>
    )
}
