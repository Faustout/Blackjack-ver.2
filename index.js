const suits =['C', 'D', 'H', 'S', 'X']
const values = ['1','2','3','4','5','6','7','8','9','10','11','12','13']
const jokerValues = ['B', 'R']
let deck = []
let playerCards = []
let dealerCards = []
let playerScore = 0
let dealerScore = 0
const announcement = document.getElementById("announcement")
let isLost = false
let isWon = false
let isTie = false

function getDeck() {
    deck = []
    for (let i=0; i<suits.length; i++){
        let currentValues = ''

        // Randomized joker values
        if (suits[i] === 'X'){
            currentValues = jokerValues
        }
        else{
            currentValues = values
        }

        // looping through currentValues for ALL suits (including joker)
        for(let j=0; j<currentValues.length; j++) {
        let card = {value: currentValues[j], suit: suits[i]};
        deck.push(card)
       }
    }
    return deck
}

// Helper function to get card image path
function getCardImage(card){
    return `Card-Images/${card.suit}-${card.value}.png`
}

function shuffleCards(deck){

    // for 1000 turns
    // switching values between 2 cards
    for (let i=0; i<1000; i++)
    {
        let location1 = Math.floor((Math.random()*deck.length))
        let location2 = Math.floor((Math.random()*deck.length))
        let temp = deck[location1]

        deck[location1] = deck[location2]
        deck[location2] = temp

    } document.getElementById("new-game").style.display = "none"
     document.getElementById("next-hand").style.display = "none"
}

 function displayCard(card,containerSelector){
     const img = document.createElement('img')
         img.src = getCardImage(card)
         img.alt = `${card.suit}-${card.value}`
         img.className = 'card'
        document.querySelector(containerSelector).appendChild(img)

        // store the cards in appropriate arrays
        if (containerSelector === '#player-cards') {
            playerCards.push(card)
        } else if (containerSelector === '#dealer-cards'){
            dealerCards.push(card)
        }
        
}

function endGame(){
    document.getElementById("hit-me").style.display = "none"
    document.getElementById("stay").style.display = "none"
    document.getElementById("next-hand").style.display = "inline"
}

document.getElementById('new-game').addEventListener('click', () => {
    resetPlayingArea()
    deck = getDeck()
    clearCards()
    shuffleCards(deck)
    dealInitialHands()
})

function clearCards() {
    document.getElementById('dealer-cards').innerHTML =''
    document.getElementById('player-cards').innerHTML =''
    playerCards = []
    dealerCards = []
}

function dealInitialHands(){
    // deal 2 cards to the player
    displayCard(deck.pop(), '#player-cards')
    displayCard(deck.pop(), '#player-cards')

    // deal 2 cards to the dealer
    displayCard(deck.pop(), '#dealer-cards')
    displayCard(deck.pop(), '#dealer-cards')

    // calculating and display scores
    dealerScore = countScore(dealerCards)
    playerScore = countScore(playerCards)

    document.getElementById("dealer-number").textContent = dealerScore
    document.getElementById("player-number").textContent = playerScore


    // show action button
    document.getElementById('hit-me').style.display = 'inline'
    document.getElementById('stay').style.display= 'inline'

    // checking win/lost condition
    if (playerScore === "Bust"){
        isLost =true
        announcement.textContent = "Sorry, You Lost the Game..."
        endGame()
    }   else if (playerScore === 21){
        isWon =true
        announcement.textContent = "Blackjack! You've Won the Game!"
        endGame()
    }   
       else if (dealerScore === "Bust"){
        isWon =true
        announcement.textContent = "Dealer busts! You Won the Game!"
        endGame()
    }   
       else if (dealerScore === 21){
        isLost =true
        announcement.textContent = "Dealer got Blackjack! You Lost..."
        endGame()
    }   

}


function countScore (card){
    // for counting the total score

    // checking if the card joker or not, joker = instant bust
    let hasJoker = card.some(c => c.suit === "X")
    if (hasJoker) {
        return "Bust"
    }


    let hasAce = false
    let score = card.reduce((total, card) =>{
        if (card.value === "1"){
            hasAce = true
            return total += 1
        }
        if (['11','12','13'].includes(card.value)) {return total +10}
        return total + Number(card.value)
    },0 )
    if (hasAce) {
        score = (score + 10) > 21 ? score : score +10
    }
    // return bust if score exceeds 21
    if (score > 21) return "Bust"

return score
}


document.getElementById("hit-me").addEventListener('click', () => {
    hitMe("player")
})
document.getElementById("stay").addEventListener("click", () => {
    hitMe("dealer")
} )

document.getElementById("next-hand").addEventListener("click", () => {
    document.getElementById("new-game").click()
} )


function hitMe(target){

    // for the player
    if (target === "player") {
        displayCard(deck.pop(), '#player-cards')
        playerScore = countScore(playerCards)
        document.getElementById("player-number").textContent = playerScore

        if (playerScore > 21 || playerScore === "Bust"){
        isLost = true
        announcement.textContent = "You're out of the game!"
        endGame()
        }
         else if (playerScore === 21){
        isWon = true
        announcement.textContent = "Blackjack! You've Won the Game!"
        endGame()
        }
    }

    // for the dealer
    if (target === "dealer"){
        displayCard(deck.pop(), '#dealer-cards')
        dealerPlays()
    }
}

function dealerPlays (){
    // if any of isLost / isWon / isTie becomes true, return immediately
    // count the dealer's score with countScore() and update the UI to reflect the change

    if (isLost || isTie || isWon) {return}
    dealerScore = countScore(dealerCards)
    document.getElementById("dealer-number").textContent = dealerScore


    if (dealerScore < 17) {
        setTimeout(() => hitMe("dealer")
        , 900)
    }
        else if (dealerScore === "Bust" || dealerScore > 21 ) {
        isWon = true
        announcement.textContent = "Congratulations! You've Won The Game!"
        endGame()
        
    } else if (dealerScore > playerScore){
        isLost = true
        announcement.textContent = "Sorry, You Lost the Game..."
        endGame()
        
    } else if (dealerScore === playerScore){
        isTie = true
        announcement.textContent = "It's a tie!"
        endGame()
    }
    else {isWon = true
        announcement.textContent = "Congratulations! You've Won The Game!"
        endGame()
    }
    
}

function resetPlayingArea(){
    playerCards = []
    dealerCards = []
    playerScore = 0
    dealerScore = 0
    announcement.textContent = ""
    isLost = false
    isWon = false
    isTie = false
}


