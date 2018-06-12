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
    changeProps
} from '@actions'
import { Actions } from 'react-native-router-flux'
import * as Images from '@utils/ImagesConstants'
import * as Constants from '@utils/Constants'

let baralho = {}

class EditDeck extends Component {

    constructor() {
        super()
        this.state = { color: 'black', title: '', added: '' }
    }

    prepareDeck = async () => {
        AsyncStorage.getItem(this.props.deck.name).then((deck) => {
            baralho = JSON.parse(deck)
        })
    }

    validationEdit() {
        if (this.state.title.length === 0) {
            this.setState({ added: false })
        } else {
            this.editSaveDeck(this.state.title, this.state.color)
        }
    }

    insertMessage() {
        if (this.state.added === false) {
            return (
                <Image source={Images.messages.titleIsNecessary} />
            )
        }

    }

    editSaveDeck = async (name, color) => {
        this.setState({ added: true })
        AsyncStorage.removeItem(this.props.deck.name)
        this.props.newDeck(name, { title: name, color: color, questions: this.props.deck.questions, pontos: this.props.deck.points })
        Actions.reset('home')

    }

    changeTitle(title) {
        this.setState({ title })
    }

    componentDidMount() {
        this.changeTitle(this.props.deck.name)
        this.setState({ color: this.props.deck.color })
        this.prepareDeck()
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

    render() {
        return (
            <ImageBackground style={styles.container} source={this.chooseColor(this.state.color)} >
                <View style={styles.title} >
                    <TextInput maxLength={15} value={this.state.title} onChangeText={(title) => this.changeTitle(title)} placeholder='Título...' style={{ fontSize: 30, color: 'white', minWidth: 100, textAlign: 'center', height: 50 }} />
                </View>
                <View style={{ alignItems: 'center' }} >
                    <Image source={Images.others.color} />
                </View>
                {this.colorOptions(Constants.colors[0], Constants.colors[1])}
                {this.colorOptions(Constants.colors[2], Constants.colors[3])}
                {this.colorOptions(Constants.colors[4], Constants.colors[5])}
                {this.colorOptions(Constants.colors[6], Constants.colors[7])}
                <View style={{alignItems: 'center', margin: 10}} >
                    {this.insertMessage()}
                </View>
                <View style={{ margin: 20 }} >
                    <Button onPress={() => this.validationEdit()} title='OK' color='black' ></Button>
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
        deck: state.FReducer.deck,
        colors: state.FReducer.colors
    }
)

export default connect(
    mapStateToProps,
    {
        newDeck,
        setDecks,
        resetDecks,
        chooseAction,
        changeProps
    }
)(EditDeck)
