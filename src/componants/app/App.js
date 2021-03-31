import React, { Component } from 'react';
import './App.css';
import Hangman from '../MainLayout/Hangman';
import raw from '../../assets/dictionary.txt';

//stores all the words
let words = [];

export default class App extends Component {

  constructor() {
    super();
    this.updateUsedLetters = this.updateUsedLetters.bind(this);
    this.state = {
      status: null,    // win or lose as a string
      isLoaded: false, // for loading purposes 
      chosenWord: "",  // randomly selected word
      wordBuild: [],   // the word the user creates
      usedLetters: [], // letters that the user has used
      hangmanState: 0  // the current state of hangman ( used to controle what picture to show )
    }
  }

  // reads the text file
  componentDidMount(){
    fetch(raw)
    .then(r => r.text())
    .then(text => {
      // concats text to words
      words += text;
      // gets the index of the word "START" in the text file to ignore the legal information at the start
      let startLoc = words.lastIndexOf("START") + 6;
      // slices words from startLoc to the end and splits it at new line
      words = (words.slice(startLoc)).split("\n");
      // Lower 
      const randomWord = words[ Math.floor(Math.random() * words.length) ]
      //console.log(randomWord); // uncomment to get word in console on refresh
      
      //shows the user the letter underlines initailly
      function arr(){
        let wordArr = []
        for (let index = 0; index < randomWord.length; index++) {
          wordArr.push("_");
        }
        return wordArr
      }
      //updates the state
      this.setState({
        //randomly selects a word
        chosenWord: randomWord, 
        wordBuild: arr(),
        isLoaded: true
      }) 
    });
  }
  
  // Determines the games state (win/lose)
  checkGameState() {
    const wordBuild = (this.state.wordBuild)
    const hangmanState = this.state.hangmanState
    
    // If the wordBuild no longer has any "_" then the word is completed
    if (!wordBuild.includes("_")) {
      this.setState({
        status: "win"
      })
    }
    // If hangmanState is equal to 10, then there are no more lives left
    if (hangmanState === 10){
      this.setState({
        status: "lose"
      })
    }
  }

  // Adds the newly chosen letter to the usedLetters array
  updateUsedLetters = ( event ) => {
    const letterToPush = event.target.value
    let currArray = this.state.usedLetters
    //pushes the new letter to the array
    //Skipping the check if it exists because used buttons cant be clicked on
    currArray.push(letterToPush)
    //state updated and update is called
    this.setState({
      usedLetters: currArray
    }, () => this.update( letterToPush ))
  }

  // Updates the life counter and adds the newly chosen letter if it is in the word to guess
  update( letterToPush ){
    //the chosen word is lowercased as there are some words in the provided dictionary that are uppercase
    const chosenWord = this.state.chosenWord.toLowerCase();
    const buildArray = this.state.wordBuild;
    let life = 0
    // If the letter is in the word to guess then loop through
    if (chosenWord.includes( letterToPush )) {
      // Replaces all the "_" where the letter is in the word to guess
      for (var i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === letterToPush) {
          buildArray[i] = letterToPush
        // If it isnt the that position move to the next letter
        } else {
          continue;
        }
      }
    //if it isnt in the word to guess a life is lost
    } else {
      life += 1
    }
    // States are set
    this.setState({
      buildArray: buildArray,
      hangmanState: this.state.hangmanState + life
    }, () => this.checkGameState())
  }

  // This creates the wordBuild ( "_ _ _ _ _" ) what the user sees.
  // the length of the random chosen word is used as a count for the for loop.
  createWordBuild() {
    const chosen = this.state.chosenWord
    let wordArr = []
    // A "_" is pushed each time
    for (let index = 0; index < chosen.length; index++) {
      wordArr.push("_");
    }
    //console.log(this.state.chosenWord); // uncomment to get the new word on new game
    // The state is set
    this.setState({
      wordBuild: wordArr
    })
    
  }

  // zeros the state values
  newGame = () => {
    this.setState({
      status: null,    // win or lose
      isLoaded: true,  // for loading purposes
      chosenWord: words[ Math.floor(Math.random() * words.length) ], // randomly selected word from existing dictionary
      usedLetters: [], // letters that the user has used
      hangmanState: 0  // the current state of hangman ( used to controle what picture to show )
    }, () => this.createWordBuild()) 
  }

  render() {
    //If for some reason the pages takes a while to load, "Busy loading... is shown to the user"
    const isLoaded = this.state.isLoaded

    if (!isLoaded) {
      return (
        <div className="App">
          <p>Busy loading...</p>
        </div>
      )
    }else {
      return (
        <div className="App">
          {/* Hangman componant is called and states are passed as props*/}
          <Hangman 
            status={this.state.status}
            usedLetters={this.state.usedLetters} 
            hangmanState={this.state.hangmanState} 
            wordBuild={this.state.wordBuild} 
            restart={this.newGame} 
            updateUsedLetters={this.updateUsedLetters} 
            chosenWord={this.state.chosenWord} 
          />
          <p className="credits">Created by: <a href="https://github.com/layne74" target="blank">Layne Hutchings</a></p>
        </div>
      )
    }
  }
}
