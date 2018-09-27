class Hangman {
    constructor(word, remainingGuesses) {
        this.word = word.toLowerCase().split('')
        this.remainingGuesses = remainingGuesses
        this.guessedLetters = []
        this.status = 'playing'
    }
    calculateStatus() {
        const finished = this.word.every((letter) => this.guessedLetters.includes(letter) || letter === ' ')

        if (this.remainingGuesses === 0) {
            this.status = 'failed'
        } else if (finished) {
            this.status = 'finished'
        } else {
            this.status = 'playing'
        }
    }
    get puzzle() {
        let puzzle = ''

        this.word.forEach((letter) => {
            if (this.guessedLetters.includes(letter) || letter === ' ') {
                puzzle += letter
            } else {
                puzzle += '*'
            }
        })
        
        return puzzle
    }
    makeGuess(guess) {
        if (this.status !== 'playing') return
    
        const isUnique = !this.guessedLetters.includes(guess.toLowerCase())
        const isBadGuess = !this.word.includes(guess.toLowerCase())
        
        if (isUnique) this.guessedLetters.push(guess)
        if (isBadGuess) this.remainingGuesses--
    
        this.calculateStatus()
    }
    get statusMessage() {
        if (this.status === 'finished') {
            return 'Great work! You guessed the word.'
        } else if (this.status === 'failed') {
            return `Nice try! The word was "${this.word}".`
        } else {
            return `Guesses left: ${this.remainingGuesses}`
        }
    }
}

