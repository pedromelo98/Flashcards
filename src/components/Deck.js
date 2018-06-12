import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ListView, ScrollView, TouchableOpacity, Button, Image, AsyncStorage, TouchableHighlight, TextInput, ImageBackground } from 'react-native';
import { newDeck, setDecks, resetDecks, chooseAction } from '@actions'
import { Actions } from 'react-native-router-flux'
import * as Images from '@utils/ImagesConstants'
//Titulo do deck atual encontra-se na navBar do router-flux, propriedade "title" do componente Deck!
class Deck extends Component {


    componentDidMount() {
        this.props.resetDecks()
    }


    renderGoButton() {
        if (this.props.deck.questions.length > 0) {
            return (
                <TouchableOpacity onPress={() => Actions.question()} >
                    <Image source={Images.others.go} />
                </TouchableOpacity>
            )
        }
        return(
            <Image source={Images.others.addtostart} />
        )
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'space-between', margin: 10 }} >
                <View>
                    <TouchableOpacity onPress={() => Actions.home()} >
                        <Image source={Images.others.back} />
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center' }} >
                    <Image source={Images.pontuation.bestPontuation} />
                    <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }} >{this.props.deck.points}</Text>
                </View>
                <View style={{ justifyContent: 'center' }} >
                    <TouchableOpacity onPress={() => Actions.addQuestion()} style={styles.newcard} >
                        <Image source={Images.questionAndAnswer.newQuestion} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Actions.editChoice()} style={styles.newcard} >
                        <Image source={Images.edits.edit} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Actions.deleteDeck()} style={styles.newcard} >
                        <Image source={Images.delets.deleteCard} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                    <View style={{ justifyContent: 'flex-end', margin: 7 }} >
                        <Text style={{ fontSize: 22, color: 'gray' }} >{this.props.deck.questions.length} cartas</Text>
                    </View>
                    {this.renderGoButton()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    newcard: {
        alignItems: 'center',
    }
})

const mapStateToProps = state => (
    {
        deck: state.FReducer.deck,
    }
)

export default connect(mapStateToProps, { newDeck, setDecks, resetDecks, chooseAction })(Deck)
