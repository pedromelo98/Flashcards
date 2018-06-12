import * as Constants from '@utils/Constants'

const INITIAL_STATE = {
    askIndex: -1,
    pontuation: 0,
    finished: false,
    question: '',
    answer: '',
    questionIndex: 0,
    decks: '',
    deck: { name: '', color: '', questions: [], points: 0 },
    _action: '',
    newdeck: false,
    title: '',
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case Constants.CHANGE_INDEX_QUESTION:
            return { ...state, askIndex: action.payload }
            break
        case Constants.RESET_POINTS:
            return { ...state, pontuation: action.payload }
            break
        case Constants.ADD_POINT:
            return { ...state, pontuation: state.pontuation + action.payload }
            break
        case Constants.CHANGE_FINISHED:
            return { ...state, finished: action.payload }
            break
        case Constants.CHANGE_QUESTION_INDEX:
            return { ...state, questionIndex: action.payload }
            break
        case Constants.CHANGE_QUESTION:
            return { ...state, question: action.payload }
            break
        case Constants.CHANGE_ANSWER:
            return { ...state, answer: action.payload }
            break
        case Constants.SET_DECKS:
            return { ...state, decks: [...state.decks, action.payload] }
            break
        case Constants.CHANGE_TITLE:
            return { ...state, title: action.payload }
            break
        case Constants.NEW_DECK:
            return { ...state, newdeck: action.payload }
            break
        case Constants.RESET_DECKS:
            return { ...state, decks: action.payload }
            break
        case Constants.CHOOSE_DECK:
            return { ...state, deck: action.payload }
            break
        case Constants.CHOOSE_ACTION:
            return { ...state, _action: action.payload }
            break
        default:
            return state
    }
}