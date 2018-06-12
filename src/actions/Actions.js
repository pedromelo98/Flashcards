import { AsyncStorage } from 'react-native'
import * as Constants from '@utils/Constants'


export const newDeck = (key, value) => {
    AsyncStorage.setItem(key, JSON.stringify(value));
    return {
        type: Constants.NEW_DECK,
        payload: true
    }
}

export const savePoints = (pontuation, deck) => {

    AsyncStorage.setItem(deck.name, JSON.stringify({ title: deck.name, color: deck.color, questions: deck.questions, points: pontuation }));
    return {
        type: Constants.NEW_DECK,
        payload: true
    }
}

export const changeProps = (propsvalue, constant) => {
    return{
        type: constant,
        payload: propsvalue
    }
}

export const refreshDecks = () => {
    return{
        type: Constants.NEW_DECK,
        payload: true
    }
}

export const deckReceived = () => {
    return{
        type: Constants.NEW_DECK,
        payload: false
    }
}

export const setDecks = (decks) => {
    return{
        type: Constants.SET_DECKS,
        payload: decks
    }
}

export const changeTitle = (title) => {
    return{
        type: Constants.CHANGE_TITLE,
        payload: title
    }
}

export const resetDecks = () => {
    return{
        type: Constants.RESET_DECKS,
        payload: []
    }
}

export const chooseDeck = (deck) => {
    return{
        type: Constants.CHOOSE_DECK,
        payload: deck
    }
}

export const chooseAction = (action) => {
    return{
        type: Constants.CHOOSE_ACTION,
        payload: action
    }
}