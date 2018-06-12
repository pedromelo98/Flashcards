import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ListView, ScrollView, TouchableOpacity, Button, Image, AsyncStorage, TouchableHighlight, TextInput, ImageBackground } from 'react-native';
import { newDeck, setDecks, resetDecks, chooseAction } from '@actions'
import { Actions } from 'react-native-router-flux'
import * as Images from '@utils/ImagesConstants'

class EditChoice extends Component {

    componentDidMount() {
        this.props.resetDecks()
    }

    render() {
        return (
            <View style={{ flex: 1, margin: 10, justifyContent: 'center' }} >
                <View style={{ justifyContent: 'center' }} >
                    <TouchableOpacity style={{margin: 10}} onPress={() => Actions.editDeck()} style={styles.newcard} >
                        <Image source={Images.edits.editDeck} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{margin: 10}} onPress={() => Actions.editCards()} style={styles.newcard} >
                        <Image source={Images.edits.editCards} />
                    </TouchableOpacity>
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

export default connect(mapStateToProps, { newDeck, setDecks, resetDecks, chooseAction })(EditChoice)
