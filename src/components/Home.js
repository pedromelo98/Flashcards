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
  ActivityIndicator
} from 'react-native';
import {
  newDeck,
  setDecks,
  resetDecks,
  chooseDeck,
  deckReceived
} from '@actions'
import { Actions } from 'react-native-router-flux'
import * as Images from '@utils/ImagesConstants'


class Home extends Component {


  getDecks = async () => {
    this.props.resetDecks()
    AsyncStorage.getAllKeys().then(keys => {
      AsyncStorage.multiGet(keys).then(stores => stores.map((result, i, store) => { this.props.setDecks(JSON.parse(store[i][1])) }))
    })
  }



  chooseCardColor(color) {
    switch (color) {
      case 'purple':
        return <Image source={Images.cards.purple} />
      case 'orange':
        return <Image source={Images.cards.orange} />
      case 'yellow':
        return <Image source={Images.cards.yellow} />
      case 'blue':
        return <Image source={Images.cards.blue} />
      case 'pink':
        return <Image source={Images.cards.pink} />
      case 'red':
        return <Image source={Images.cards.red} />
      case 'green':
        return <Image source={Images.cards.green} />
      case 'black':
        return <Image source={Images.cards.black} />
    }
  }


  listaDeDecks() {
    if (this.props.decks[0]) {
      return (
        this.props.decks.slice(0).map((result, i, a) => {
          return (
            <View key={result.title} >
              <TouchableOpacity onPress={() => { Actions.deck(); this.props.chooseDeck({ name: result.title, color: result.color, questions: result.questions, points: result.points }) }} style={styles.decks}>
                <View style={styles.deck}>
                  {this.chooseCardColor(result.color)}
                  <Text style={styles.title}>{result.title}</Text>
                  <Text style={styles.card}>{result.questions.length} cartas</Text>
                </View>
              </TouchableOpacity>
            </View >
          )
        }))
    } else {
      return (
        <View style={{alignItems: 'center'}} >
          <Image source={Images.others.nonedeck} />
        </View>
      )
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.novodeck === true) {
      this.getDecks()
      this.props.deckReceived()
    }
  }

  componentDidMount() {
    this.props.resetDecks()
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <TouchableOpacity onPress={() => Actions.newDeck()} style={styles.newDeck} ><Image source={Images.others.newDeck} /></TouchableOpacity>
          {this.listaDeDecks()}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  newDeck: {
    alignItems: 'center',
    padding: 10,
    marginTop: 10
  },
  card: {
    color: 'gray',
  },
  title: {
    fontSize: 20,
  },
  decks: {
    margin: 20
  },
  deck: {
    alignItems: 'center',
  },
});

const mapStateToProps = state => (
  {
    decks: state.FReducer.decks,
    novodeck: state.FReducer.newdeck,
  }
)

export default connect(
  mapStateToProps,
  {
    newDeck,
    setDecks,
    resetDecks,
    chooseDeck,
    deckReceived
  }
)(Home)
