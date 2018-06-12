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
import * as Constants from '@utils/Constants'
import { Actions } from 'react-native-router-flux'
import * as Images from '@utils/ImagesConstants'


let baralho = {}

class AddQuestion extends Component {

    constructor() {
        super()
        this.state = { added: '' }
    }

    prepareDeck = async () => {
        AsyncStorage.getItem(this.props.deck.name).then((deck) => {
            baralho = JSON.parse(deck)
        })
    }

    insertMessage() {
        if (this.state.added) {
            return (
                <Image source={Images.messages.successCreated} />
            )
        } else if (this.state.added === false) {
            return (
                <Image source={Images.messages.emptyBox} />
            )
        }
    }

    editSaveDeck = async (pergunta, resposta) => {
        if (pergunta.length === 0 || resposta.length === 0) {
            this.setState({ added: false })
        } else {
            baralho.questions.push({ pergunta, resposta })
            this.props.newDeck(baralho.title, baralho)
            this.props.chooseDeck({ name: baralho.title, color: baralho.color, questions: baralho.questions, points: baralho.points })
            Actions.deck()
        }
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
                        <TextInput value={this.props.question} onChangeText={(question) => this.props.changeProps(question, Constants.CHANGE_QUESTION)} multiline numberOfLines={3} placeholder='Digite a pergunta...' style={{ fontSize: 20, color: 'white', minWidth: 400, textAlign: 'center' }} />
                    </View>
                    <View style={{ alignItems: 'center', flex: 2, margin: 10 }} >
                        <Image source={Images.questionAndAnswer.answer} />
                        <TextInput value={this.props.answer} onChangeText={(answer) => this.props.changeProps(answer, Constants.CHANGE_ANSWER)} multiline numberOfLines={3} placeholder='Digite a resposta...' style={{ fontSize: 20, color: 'white', minWidth: 400, textAlign: 'center' }} />
                    </View>
                    <View style={{alignItems: 'center', flex: 2, margin: 10}} >
                    {this.insertMessage()}
                    </View>
                    <View style={{ alignItems: 'center', flex: 3, margin: 10 }} >
                        <Button onPress={() => { this.editSaveDeck(this.props.question, this.props.answer); this.props.changeProps('', Constants.CHANGE_QUESTION); this.props.changeProps('', Constants.CHANGE_ANSWER) }} title='finalizar carta' color='black' />
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => (
    {
        question: state.FReducer.question,
        answer: state.FReducer.answer,
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
)(AddQuestion)
