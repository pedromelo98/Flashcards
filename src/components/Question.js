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
    chooseAction
} from '@actions'
import { createTransition, FlipX } from 'react-native-transition';
import Answer from '@components/Answer'
import * as Images from '@utils/ImagesConstants'


const Transition = createTransition(FlipX);

class Question extends Component {

    doTransition = () => {
        Transition.show(
            <Answer />
        );
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

    renderComponent() {
        if (this.props.finished) {
            return (
                <Image source={Images.questionAndAnswer.finishedAll} />
            )
        }
        return (
            <View>
                <Text style={{ color: 'white', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }} >{this.props.questionIndex + 1}/{this.props.deck.questions.length}</Text>
                <View style={{marginTop: 100, justifyContent: 'center'}} >
                    <Text style={{ color: 'white', fontSize: 30, textAlign: 'center', fontWeight: 'bold' }} >{this.props.deck.questions[this.props.questionIndex].pergunta}</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <Transition>
                <ImageBackground style={{ flex: 1, alignItems: 'center', justifyContent:'space-between' }} source={this.chooseBackground()} >
                    {this.renderComponent()}
                    <TouchableOpacity style={{ justifyContent: 'flex-end', marginTop: 40 }} onPress={this.doTransition} >
                        <Image source={Images.questionAndAnswer.showAnswer} />
                    </TouchableOpacity>
                </ImageBackground>
            </Transition>
        );
    }
}


const mapStateToProps = state => (
    {
        finished: state.FReducer.finished,
        questionIndex: state.FReducer.questionIndex,
        deck: state.FReducer.deck,
    }
)

export default connect(mapStateToProps, { newDeck, setDecks, resetDecks, chooseAction })(Question)
