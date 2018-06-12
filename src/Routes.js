import React, { Component } from 'react'
import { Router, Scene } from 'react-native-router-flux'
import { connect } from 'react-redux'
import Home from '@components/Home.js'
import Deck from '@components/Deck.js'
import NewDeck from '@components/NewDeck.js'
import Question from '@components/Question.js'
import DeleteDeck from '@components/DeleteDeck.js'
import AddQuestion from '@components/AddQuestion.js'
import EditDeck from '@components/EditDeck.js'
import EditChoice from '@components/EditChoice.js'
import EditCards from '@components/EditCards.js'
import EditCard from '@components/EditCard'
import { Actions } from 'react-native-router-flux'
import { refreshDecks, changeProps, chooseDeck } from '@actions'
import * as Constants from './utils/Constants'

class Routes extends Component {


    render() {
        return (
            <Router navigationBarStyle={{ backgroundColor: '#222' }} titleStyle={{ color: 'white' }} navBarButtonColor='white' >
                <Scene key='root'>
                    <Scene key='home' component={Home} title='Baralhos' hideNavBar={false} left={() => null} onEnter={() => this.props.refreshDecks()} initial />
                    <Scene key='deck' component={Deck} title={this.props.deck.name} hideNavBar={false} onExit={() => this.props.changeProps(0, Constants.CHANGE_QUESTION_INDEX)} left={() => null} />
                    <Scene key='newDeck' component={NewDeck} title='Novo baralho' hideNavBar={false} />
                    <Scene key='question' component={Question} title={this.props.deck.name} onExit={() => { this.props.changeProps(0, Constants.RESET_POINTS); this.props.changeProps(false, Constants.CHANGE_FINISHED) }} hideNavBar={false} />
                    <Scene key='deleteDeck' component={DeleteDeck} title={'Deletar'} hideNavBar={false} left={() => null} />
                    <Scene key='addQuestion' component={AddQuestion} title={'Nova carta'} hideNavBar={false} />
                    <Scene key='editChoice' component={EditChoice} title={'Editar'} hideNavBar={false} />
                    <Scene key='editDeck' component={EditDeck} title={'Editar Baralho'} hideNavBar={false} />
                    <Scene key='editCards' component={EditCards} title={'Editar Cartas'} hideNavBar={false} />
                    <Scene key='editCard' component={EditCard} title={'Editar Carta'} hideNavBar={false} onExit={() => this.props.changeProps(-1, Constants.CHANGE_INDEX_QUESTION)} />
                </Scene>
            </Router>
        )
    }
}



const mapStateToProps = state => (
    {
        pontuacao: state.FReducer.pontuation,
        deck: state.FReducer.deck
    }
)

export default connect(mapStateToProps, { refreshDecks, changeProps, chooseDeck })(Routes)