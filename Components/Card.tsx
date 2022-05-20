import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

export type Props = {
  item: any;
  navigation: any;
};

const placeHolderImage = require('../Assets/images/error.jpeg');

const Card: React.FC<Props> = ({item, navigation: {navigate}}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigate('Details', {movieId: item.id});
      }}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={
          item.poster_path
            ? {uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`}
            : placeHolderImage
        }
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: 5,
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 20,
  },
});
export default Card;
