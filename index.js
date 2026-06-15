const suits =['C', 'D', 'H', 'S', 'X']
const values = ['1','2','3','4','5','6','7','8','9','10','11','12','13']
const jokerValues = ['B', 'R']
let deck = []
let playerCards = []
let dealerCards = []
announcementNode.textContent = "";
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

    }
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


document.getElementById('new-game').addEventListener('click', () => {
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
    const dealerScore = countScore(dealerCards)
    const playerScore = countScore(playerCards)

    document.getElementById("dealer-number").textContent = dealerScore
    document.getElementById("player-number").textContent = playerScore


    // show action button
    document.getElementById('hit-me').style.display = 'inline'
    document.getElementById('stay').style.display= 'inline'

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
            return total = 1
        }
        if (['11','12','13'].includes(card.value)) {return total +10}
        return total + Number(card.value)
    },0 )
    if (hasAce) {
        score = (score + 10) > 21 ? score : score +10
    }
return score
}


function hitMe(target){

    // for the player
    if (target === "player") {
        displayCard(deck.pop(), '#player-cards')
        playerScore = countScore(playerScore)
        document.getElementById("player-number").textContent = playerScore

        if (playerScore > 21 || playerScore === "Bust"){
        isLost = true
        announcementNode.textContent = "You're out of the game!"
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
    dealerScore = countScore(dealerScore)
    document.getElementById("dealer-number").textContent = dealerScore
}
























// let cards = []
// let sum = 0 
// let hasBlackJack = false
// let isAlive = false
// let message =""
// let player = {
//     name: "Faust",
//     chips: 67 
// }


// console.log(sum)
// let messageEl = document.getElementById("message-el")
// // let sumEl = document.getElementById("sum-el")
// let sumEl = document.querySelector("#sum-el")
// //query selector sistem milih2nya kaya di css
// let cardsEl = document.getElementById("cards-el")
// let playerEl = document.getElementById("player-el")
// playerEl.textContent= player.name + ": $" + player.chips
// let fileName = `${drawnCard.suit}-${drawnCard.value}.png`

// console.log(playerEl)

// function getRandomCard() {
//     let randomCard = Math.floor(Math.random()*13 ) +1
//     // if (randomCard === 1){
//     //     return 11
//     // }  
//         if (randomCard > 10){
//         return 10
//     } else return randomCard
       
// }

// function startGame(){
//     isAlive = true
//     let firstcard= getRandomCard()
//     let secondcard= getRandomCard()
//     cards = [firstcard, secondcard]
//     sum = firstcard + secondcard


//     renderGame()
// }

// function renderGame(){
// cardsEl.textContent= "Cards: "

//     for (let i=0; i<cards.length;i++){
//         cardsEl.textContent += cards[i] + " "
//     }
      
// if (sum <= 20) {
//     message ="Do you want to draw a new card? 😏"
// }
// else if (sum === 21){
//     message="Woohoo! You've got a Blackjack! 🥳"
//     hasBlackJack = true

// }
// else {
//     message="You're out of the game! 😭" 
//     isAlive =false
    
// }


// sumEl.textContent= "Sum: " + sum
// messageEl.textContent=message
 
// }

// function newCard(){
//     if (isAlive === true && hasBlackJack === false){
//     console.log("Drawing a new card from the deck");
//     let newcard = getRandomCard()
//     sum += newcard
//     cards.push(newcard)
//     console.log(cards);
//     renderGame()
//     }
// }



