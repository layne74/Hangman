import React from 'react'
import {Modal, Button} from 'react-bootstrap'

export default function WinLose( props ) {
    const { status, restart, correctWord } = props;
    // local variables
    let title = "";
    let body = "";

    //alters the above variables depending on the passed in props
    if (status === "win"){
        title = "YOU WON!!";
        body = "Well done on not being hung!!"
    }else if (status === "lose"){
        title = "Oh no!! You lost";
        body = "The correct word was: " + correctWord + " I'm sure you will get it next time!"
    }

    //if the passed in prop "status" is ignaored, nothing happens
    if (status === null) {
        return null
    //if if it is not null, the modal is shown withe the title and body variables
    }else {
        return (
            <div>
                <Modal centered show={true}>
                    <Modal.Header className="modalTitle">
                        {title}
                    </Modal.Header>
                    <Modal.Body>
                        {body}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={restart}>New game?</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
    
    
}
