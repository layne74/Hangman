import React from 'react'
import HangImg from './HangImg';
import './Hangman.css'
import { Container, Row, Col } from 'react-bootstrap';
import Help from '../Help';
import LivesLeft from '../LivesLeft';
import WinLose from '../WinLose';

export default function Hangman( props ) {
    const { status, usedLetters, restart, chosenWord, hangmanState, wordBuild, updateUsedLetters} = props;

    //Alphabet array ( add special characters if you want to add more complex words )
    const letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "-"];

    //maps the alphabet with conditionals
    let letter = letters.map( (letter, key) => {
        //If the letter has been used before it is made darker and no longer clickable
        if (usedLetters.includes( letter )) {
            return <div key={key}>
                <button value={letter} className="letterBtn used">
                    {letter}
                </button> 
            </div>
        //If the user has won the buttons are no longer clickable
        } else if ( status === "win" || status === "lose" ) {
            return <div key={key}>
                <button value={letter} className="letterBtn">
                    {letter}
                </button> 
            </div>
        //The buttons are returned normally ( not dark and can be clicked on )
        } else {
            return <div key={key}>
                <button onClick={updateUsedLetters} value={letter} className="letterBtn">
                    {letter}
                </button> 
            </div>
        }
        
    })

    //Container styling. This holds the buttons
    const letterContainer = {
        textAlign: "center",
        display: "flex",
        flexWrap: "wrap",
        width: "270px",
        height: "fit-content",
        justifyContent: "center",
        marginTop: "40px",
        marginBottom: "30px",
        marginLeft: "auto",
        marginRight: "auto"
    }
    
    /* DEPRECATED
    //based on the status of the game ( win/loss/null ) it will return the correct message
    function displayStatus(){
        if (status === "win") {
            return <h2>You win!</h2>
        } else if (status === "lose") {
            return <div><h2>You lose!</h2><p>The correct word was: {chosenWord}</p></div>
        } else {
            return null
        }
    }*/

    //Returned
    return (
        <div className="bodybg">
            {/* Main container for the rows */}
            <Container className="main">
                {/* Main heading */}
                <Row >
                    <div className="heading">
                        <h1>HANGMAN</h1>
                    </div>
                </Row>
                {/* Game body conaining the thelf and right side */}
                <Row>
                    {/* Left side */}
                    <Col className="leftSide">
                    <LivesLeft life={hangmanState} />
                    {/*<span>Lives left:</span> {displayLives()}*/}
                        <HangImg hangmanState={hangmanState} />
                        
                    </Col>
                    {/* Right side */}
                    <Col>
                        <div className="rightSide">
                            <h1 className="spacedLetters">{wordBuild}</h1>
                            <div style={letterContainer}>
                                {letter}
                            </div>
                            <button className="newgamebtn" onClick={restart}>New game!</button>
                            <Help />
                            <WinLose status={status} restart={restart} correctWord={chosenWord}/>
                            {/*displayStatus()*/}
                            
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
