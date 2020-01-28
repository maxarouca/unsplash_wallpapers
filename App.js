/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import axios from 'axios';

const {height, width} = Dimensions.get('window');

import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont();

const App = () => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  const loadImages = async () => {
    setLoading(true);

    const {data} = await axios.get(
      'https://api.unsplash.com/photos/random?count=30&client_id=26b522e4472e15bce588002f5e840c4c144bebff8e96077542dcf91aae77fe1a'
    );
    if (data) {
      setImages(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={{height, width}}>
        <Image
          style={{
            flex: 1,
            height: null,
            width: null,
          }}
          source={{uri: item.urls.regular}}
        />
      </View>
    );
  };

  return (
    <>
      {loading && images.length > 0 ? (
        <View style={styles.view}>
          <ActivityIndicator size="large" color="grey" />
        </View>
      ) : (
        <View style={{flex: 1, backgroundColor: 'black'}}>
          <FlatList
            // scrollEnabled={!this.state.isImageFocused}
            horizontal
            pagingEnabled
            data={images}
            renderItem={item => renderItem(item)}
            keyExtractor={item => item.id}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
