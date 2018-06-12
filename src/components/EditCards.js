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
  Picker,
  ImageBackground
} from 'react-native';
import {
  changeProps,
  newDeck,
  setDecks,
  resetDecks,
  chooseDeck,
  deckReceived
} from '@actions'
import { Actions } from 'react-native-router-flux'
import * as Constants from '@utils/Constants'
import * as Images from '@utils/ImagesConstants'

class EditCards extends Component {

  chooseColor(color) {
    switch (color) {
      case 'purple':
        return Images.card.purple
      case 'orange':
        return Images.card.orange
      case 'yellow':
        return Images.card.yellow
      case 'blue':
        return Images.card.blue
      case 'pink':
        return Images.card.pink
      case 'red':
        return Images.card.red
      case 'green':
        return Images.card.green
      case 'black':
        return Images.card.black
    }
  }

  reduceBigQuestion(question) {
    if (question.length > 20) {
      return question.substr(0, 20) + '...?'
    }
    return question
  }

  cardsList() {
    if (this.props.deck.questions[0]) {
      return (
        this.props.deck.questions.slice(0).map((result, i, a) => {
          return (
            <View key={result.pergunta} style={{ margin: 10 }} >
              <TouchableOpacity onPress={() => { this.props.changeProps(i, Constants.CHANGE_INDEX_QUESTION); Actions.editCard() }} style={{}}>
                <ImageBackground style={{ minHeight: 250, minWidth: 250, alignItems: 'center', justifyContent: 'center' }} source={this.chooseColor(this.props.deck.color)} >
                  <View style={{}}>
                    <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', textAlign: 'center' }}>{i + 1}</Text>
                  </View>
                </ImageBackground>
                <Text style={{ color: 'gray', fontSize: 12, textAlign: 'center' }} >Pergunta</Text>
                <Text style={{ fontSize: 18, textAlign: 'center' }}>{this.reduceBigQuestion(result.pergunta)}</Text>
              </TouchableOpacity>
            </View >
          )

        }))
    }
    return (
      <View style={{margin: 10, justifyContent: 'center'}} >
        <Image source={Images.others.nonecard} />
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={{}}>
        <View style={{ alignItems: 'center' }} >
          {this.cardsList()}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => (
  {
    deck: state.FReducer.deck,
  }
)

export default connect(
  mapStateToProps,
  {
    changeProps,
    newDeck,
    setDecks,
    resetDecks,
    chooseDeck,
    deckReceived
  }
)(EditCards)
