Pseudocode blackjack

Available functions
1. Make a deck ( 4 suits, 13 cards per suit, 1 Joker), images available (ace is 1, J Q K indexed as 11 12 13 but adds 10 points each)
2. Shuffle deck function from the available deck
3. Start/Restart game, when starting a game the player received 2 cards and the shuffle function starts
4. Hit function (playet takes one randomized card from the deck)
5. The function condition as
- Point < 21, can still hit
- Point === 21, Blackjack, won the game (game stops here press start to continue)
- Point > 21, bust, lost the game (game stops here press start to continue)
- Drawn card is joker, automatically lost the game (game stops here press start to continue)