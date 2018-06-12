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
    ActivityIndicator
} from 'react-native';
import {
    newDeck,
    setDecks,
    resetDecks,
    chooseAction,
    changeTitle,
    chooseDeck
} from '@actions'
import { Actions } from 'react-native-router-flux'
import * as Images from '@utils/ImagesConstants'
import * as Constants from '@utils/Constants'

class NewDeck extends Component {


    constructor() {
        super()
        this.state = { color: 'black', added: '' }
    }


    chooseColor(color) {
        switch (color) {
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

    colorOptions(firstColor, secondColor) {
        return (
            <View style={styles.colorOptions} >
                <TouchableOpacity onPress={() => this.setState({ color: firstColor.value })} >
                    <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }} >{firstColor.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({ color: secondColor.value })} >
                    <Text style={{ color: 'white', fontSize: 18, textAlign: 'center' }} >{secondColor.name}</Text>
                </TouchableOpacity>
            </View>
        )
    }

    insertMessage() {
        if (this.state.added) {
            return (
                <Image source={Images.messages.successCreated} />
            )
        } else if (this.state.added === false) {
            return (
                <Image source={Images.messages.titleIsNecessary} />
            )
        }
    }

    insertNewDeck() {
        if (this.props.title.length === 0) {
            this.setState({ added: false })
        } else {
            this.setState({ added: true })
            this.props.newDeck(this.props.title, { title: this.props.title, color: this.state.color, questions: [], points: 0 })
            this.props.chooseDeck({ name: this.props.title, color: this.state.color, questions: [], points: 0 })
            this.props.changeTitle('')
            Actions.deck()
        }
    }

    render() {
        return (
            <ImageBackground style={styles.container} source={this.chooseColor(this.state.color)} >
                <View style={styles.title} >
                    <TextInput maxLength={15} value={this.props.title} onChangeText={(title) => this.props.changeTitle(title)} placeholder='Título...' style={{ fontSize: 30, color: 'white', minWidth: 100, textAlign: 'center', height: 50 }} />
                </View>
                <View style={{ alignItems: 'center' }} >
                    <Image source={Images.others.color} />
                </View>
                {this.colorOptions(Constants.colors[0], Constants.colors[1])}
                {this.colorOptions(Constants.colors[2], Constants.colors[3])}
                {this.colorOptions(Constants.colors[4], Constants.colors[5])}
                {this.colorOptions(Constants.colors[6], Constants.colors[7])}
                <View style={{alignItems: 'center', margin: 30}} >
                    {this.insertMessage()}
                </View>
                <View style={{ margin: 10 }} >
                    <Button onPress={() => this.insertNewDeck()} title='OK' color='gray' ></Button>
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
    title: {
        alignItems: 'center',
        margin: 16
    },
    colorOptions: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

const mapStateToProps = state => (
    {
        newdeck: state.FReducer.newdeck,
        deck: state.FReducer.deck,
        title: state.FReducer.title,
        colors: state.FReducer.colors
    }
)

export default connect(
    mapStateToProps,
    {
        chooseDeck,
        newDeck,
        setDecks,
        resetDecks,
        chooseAction,
        changeTitle
    }
)(NewDeck)
