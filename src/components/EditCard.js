import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    ScrollView,
    TouchableOpacity,
    Button,
    Image,
    AsyncStorage,
    TouchableHighlight,
    TextInput,
    ImageBackground
} from 'react-native';
import {
    newDeck,
    setDecks,
    resetDecks,
    chooseAction,
    changeProps,
    chooseDeck
} from '@actions'
import { Actions } from 'react-native-router-flux'
import * as Images from '@utils/ImagesConstants'

let baralho = {}

class EditCard extends Component {

    constructor() {
        super()
        this.state = { pergunta: '', resposta: '', added: '' }
    }

    prepareDeck = async () => {
        AsyncStorage.getItem(this.props.deck.name).then((deck) => {
            baralho = JSON.parse(deck)
        })

        if (this.props.askIndex !== -1) {
            this.setState({ pergunta: this.props.deck.questions[this.props.askIndex].pergunta })
            this.setState({ resposta: this.props.deck.questions[this.props.askIndex].resposta })
        }
    }

    insertMessage() {
        if (this.state.added === false) {
            return (
                <Image source={Images.messages.emptyBox} />
            )
        }
    }

    editSaveDeck = async (pergunta, resposta) => {
        if (pergunta.length === 0 || resposta.length === 0) {
            this.setState({ added: false })
        } else {
            this.setState({ added: true })
            baralho.questions[this.props.askIndex].pergunta = pergunta
            baralho.questions[this.props.askIndex].resposta = resposta
            this.props.newDeck(baralho.title, baralho)
            this.props.chooseDeck({ name: baralho.title, color: baralho.color, questions: baralho.questions, points: baralho.points })
            Actions.pop()
        }
    }

    deleteCard = async () => {
        baralho.questions.splice(this.props.askIndex, 1)
        this.props.newDeck(baralho.title, baralho)
        this.props.chooseDeck({ name: baralho.title, color: baralho.color, questions: baralho.questions, points: baralho.points })
    }

    componentDidMount() {
        this.prepareDeck()
    }

    chooseBackground() {
        switch (this.props.deck.color) {
            case 'purple':
                return Images.backgroundCards.purple
            case 'orange':
                return Images.backgroundCards.orange
            case 'yellow':
                return Images.backgroundCards.yellow
            case 'blue':
                return Images.backgroundCards.blue
            case 'pink':
                return Images.backgroundCards.pink
            case 'red':
                return Images.backgroundCards.red
            case 'green':
                return Images.backgroundCards.green
            case 'black':
                return Images.backgroundCards.black
            default:
                return Images.backgroundCards.black
        }
    }

    render() {
        return (
            <ImageBackground style={{ flex: 1 }} source={this.chooseBackground()} >
                <ScrollView>
                    <View style={{ flex: 1, margin: 10 }} >
                        <Text style={{ fontSize: 30, textAlign: 'center', marginTop: 18, color: 'white' }} >{this.props.deck.name}</Text>
                    </View>
                    <View style={{ alignItems: 'center', flex: 2, margin: 10 }} >
                        <Image source={Images.questionAndAnswer.question} />
                        <TextInput value={this.state.pergunta} onChangeText={(pergunta) => this.setState({ pergunta })} multiline numberOfLines={3} placeholder='Digite a pergunta...' style={{ fontSize: 20, color: 'white', minWidth: 400, textAlign: 'center' }} />
                    </View>
                    <View style={{ alignItems: 'center', flex: 2, margin: 10 }} >
                        <Image source={Images.questionAndAnswer.answer} />
                        <TextInput value={this.state.resposta} onChangeText={(resposta) => this.setState({ resposta })} multiline numberOfLines={3} placeholder='Digite a resposta...' style={{ fontSize: 20, color: 'white', minWidth: 400, textAlign: 'center' }} />
                    </View>
                    <View style={{ alignItems: 'center', margin: 10 }} >
                        {this.insertMessage()}
                    </View>
                    <View style={{ alignItems: 'center', flex: 3, margin: 20 }} >
                        <Button onPress={() => { this.editSaveDeck(this.state.pergunta, this.state.resposta) }} title='finalizar carta' color='black' />
                    </View>
                    <View style={{ alignItems: 'center', flex: 3, margin: 20 }} >
                        <Button onPress={() => { this.deleteCard(); Actions.pop() }} title='excluir carta' color='black' />
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => (
    {
        askIndex: state.FReducer.askIndex,
        deck: state.FReducer.deck,
    }
)

export default connect(
    mapStateToProps,
    {
        newDeck,
        setDecks,
        resetDecks,
        chooseAction,
        changeProps,
        chooseDeck
    }
)(EditCard)
