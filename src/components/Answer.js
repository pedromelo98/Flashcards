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
    ImageBackground,
    Dimensions
} from 'react-native';
import {
    newDeck,
    setDecks,
    resetDecks,
    chooseAction,
    changeProps,
    savePoints,
    chooseDeck
} from '@actions'
import * as Constants from '@utils/Constants'
import { Actions } from 'react-native-router-flux'
import { createTransition, FlipX } from 'react-native-transition';
import Question from '@components/Question'
import * as Images from '@utils/ImagesConstants'
import Expo from 'expo'

const Transition = createTransition(FlipX);

class Answer extends Component {

    componentDidMount(){
        Expo.Notifications.cancelAllScheduledNotificationsAsync()
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

    pontuationMessage(pontuation) {
        if (pontuation === 100) {
            return <Image source={Images.messages.perfect} />
        }
        if (pontuation >= 70 && pontuation <= 99) {
            return <Image source={Images.messages.great} />
        }
        if (pontuation >= 50 && pontuation < 70) {
            return <Image source={Images.messages.cool} />
        }
        if (pontuation >= 30 && pontuation < 50) {
            return <Image source={Images.messages.dobetter} />
        }

        return <Image source={Images.messages.needstudy} />

    }

    savePoints() {
        if (this.props.deck.points < this.props.pontuation) {
            this.props.savePoints(this.props.pontuation, this.props.deck)
            this.props.chooseDeck({ name: this.props.deck.name, color: this.props.deck.color, questions: this.props.deck.questions, points: this.props.pontuation })
        }
    }

    renderComponent() {
        if (this.props.finished) {
            return (
                <View style={{flex: 1, justifyContent: 'center'}} >
                    <View style={{ alignItems: 'center', margin: 5 }} >
                        <Image source={Images.pontuation.yourPontuationIs} />
                    </View>
                    <Text style={{ color: 'white', fontSize: 28, textAlign: 'center', fontWeight: 'bold', margin: 5 }} >{Math.floor((this.props.pontuation / this.props.deck.questions.length) * 100)}%</Text>
                    {this.pontuationMessage(this.props.pontuation / this.props.deck.questions.length * 100)}
                    <View style={{marginTop: 5, alignItems: 'center' }} >
                        <TouchableOpacity onPress={() => { this.props.changeProps(0, Constants.CHANGE_QUESTION_INDEX); Transition.show(<Question/>); this.props.changeProps(false, Constants.CHANGE_FINISHED); this.props.changeProps(0, Constants.RESET_POINTS); }} style={{ alignItems: 'center', marginTop: 20 }} >
                            <Image source={Images.questionAndAnswer.tryAgain} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.savePoints(); Actions.pop() }} style={{ alignItems: 'center', marginTop: 20 }} >
                            <Image source={Images.others.backChoice} />
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        return (
            <View>
                <Text style={{ color: 'white', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }} >{this.props.questionIndex + 1}/{this.props.deck.questions.length}</Text>
                <View style={{ flex: 2, justifyContent: 'center' }} >
                    <Text style={{ color: 'white', fontSize: 30, textAlign: 'center' }} >{this.props.deck.questions[this.props.questionIndex].resposta}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }} >
                    <TouchableOpacity onPress={() => { Transition.show(<Question />); this.buttonFunction(); this.props.changeProps(1, Constants.ADD_POINT) }} >
                        <Image source={Images.questionAndAnswer.right} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { Transition.show(<Question />); this.buttonFunction() }} >
                        <Image source={Images.questionAndAnswer.wrong} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    changeQuestionIndex(questionIndex) {
        if (this.props.deck.questions.length <= questionIndex + 1) {
            return 0
        }
        return questionIndex + 1
    }


    buttonFunction() {
        if (this.props.deck.questions.length <= this.props.questionIndex + 1) {
            this.props.changeProps(this.changeQuestionIndex(this.props.questionIndex), Constants.CHANGE_QUESTION_INDEX)
            this.props.changeProps(true, Constants.CHANGE_FINISHED)
        } else {
            this.props.changeProps(this.changeQuestionIndex(this.props.questionIndex), Constants.CHANGE_QUESTION_INDEX)
        }
    }

    render() {
        return (
            <Transition>
                <ImageBackground style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} source={this.chooseBackground()} >
                    <View >
                        {this.renderComponent()}
                    </View>
                </ImageBackground>
            </Transition>
        );
    }
}


const mapStateToProps = state => (
    {
        pontuation: state.FReducer.pontuation,
        finished: state.FReducer.finished,
        questionIndex: state.FReducer.questionIndex,
        deck: state.FReducer.deck,
    }
)

export default connect(
    mapStateToProps,
    {
        savePoints,
        chooseDeck,
        newDeck,
        setDecks,
        resetDecks,
        chooseAction,
        changeProps
    }
)(Answer)
