import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ListView, ScrollView, TouchableOpacity, Button, Image, AsyncStorage, TouchableHighlight, TextInput, ImageBackground } from 'react-native';
import { newDeck, setDecks, resetDecks, chooseAction } from '@actions'
import { Actions } from 'react-native-router-flux'
import * as Images from '@utils/ImagesConstants'

class DeleteDeck extends Component {

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

    deletar = async () => {
        AsyncStorage.removeItem(this.props.deck.name)
        Actions.home()
    }

    render() {

        return (
            <ImageBackground style={{ flex: 1 }} source={this.chooseBackground()} >
                <View style={{ alignItems: 'center', marginTop: 30 }} >
                    <Image source={Images.delets.deleteBig} />
                </View>
                <Text style={{ fontSize: 30, color: 'white', marginTop: 30, textAlign: 'center' }} >Tem certeza que quer</Text>
                <Text style={{ fontSize: 30, color: 'white', textAlign: 'center' }} >deletar "{this.props.deck.name}"?</Text>
                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'space-around' }} >
                    <TouchableOpacity onPress={() => this.deletar()}>
                        <Image source={Images.delets.yes} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Actions.pop()}>
                        <Image source={Images.delets.no} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    newcard: {
        alignItems: 'center',
        margin: 10
    }
})

const mapStateToProps = state => (
    {
        deck: state.FReducer.deck,
    }
)

export default connect(mapStateToProps, { newDeck, setDecks, resetDecks, chooseAction })(DeleteDeck)
