
import Queue from "./Queue.js"

class Shelf {
    constructor () {
	// what is the information the visualizer needs to know about the state of the interpreter?
	// What are the visuals the scanning action will show?
	// - which character index is currently being examined
	// - which character index is currently being peeked
	// - when a new token is found

	this.currentIndices = new Queue ();
	this.peekedIndices = new Queue ();
	this.newTokens = new Queue ();

	this.states = new Queue ();
    }

    addCurrentIndex (index) {
	this.currentIndices.enqueue (index);
	this.addState (index, this.peekedIndices.peekFront (), this.newTokens.peekFront ());
    }

    addPeekedIndex (index) {
	this.peekedIndices.enqueue (index);
	this.addState (this.currentIndices.peekFront (), index, this.newTokens.peekFront ());
    }

    addToken (token) {
	this.newTokens.enqueue (token);
	this.addState (this.currentIndices.peekFront (), this.peekedIndices.peekFront (), token);
    }
    

    getNextIndex () {
	this.currentIndices.dequeue ();
    }

    getPeekedIndex () {
	this.peekedIndices.dequeue ();
    }

    getNextToken () {
	this.newTokens.dequeue ();
    }


    addState (currentIndex, peekIndex, mostRecentToken) {
	this.states.enqueue (
	    {
		currentIndex : currentIndex,
		peekIndex : peekIndex,
		token : mostRecentToken
	    }
	);
    }
    
}

export default Shelf;
