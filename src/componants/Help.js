import {React, Component} from 'react'
import './Help.css'
import {Modal} from 'react-bootstrap'
import Exit from '../assets/images/redX.png'

//this componants brings up the help modal
export default class Help extends Component {
    constructor() {
        super()
        this.state = {
            show: false
        }
    }

    //reverses the boolean state when called
    handleHelp = () =>{
        this.setState({
            show: !this.state.show
        })
    }

    render() {
        return (
            <div className="help-div">
                <button onClick={this.handleHelp}  className="helpBtn">Help!</button>
                {/* MODAL SECTION */}
                <Modal show={this.state.show} centered>
                    <Modal.Header className="modalTitle">
                        Need some help?
                        <img alt="close" onClick={this.handleHelp} className="exitModal" src={Exit}></img>
                    </Modal.Header>
                    <Modal.Body>
                        Hangman is a simple word guessing game. You need to try to figure out an unknown word by guessing letters You have 10 chances. If too many letters which do not appear in the word are guessed, you lose and are hanged!.<br></br><br></br> Now get back out there and dont get hanged!<br></br>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
