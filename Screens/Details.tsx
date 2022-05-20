import {
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getMovieDetails} from '../services/services';

type Props = {
  route: any;
  navigation: any;
};

const placeHolderImage = require('../Assets/images/error.jpeg');

// const height = Dimensions.get('window')
const height = Dimensions.get('screen').height;

const Details: React.FC<Props> = ({route, navigation}) => {
  const {movieId} = route.params;

  const [detail, setDetail] = useState<any>();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getMovieDetails(movieId).then(movieData => {
      setDetail(movieData);
      setLoaded(true);
    });
  }, [movieId]);

  return (
    <React.Fragment>
      {loaded && (
        <ScrollView>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={
              detail.poster_path
                ? {uri: `https://image.tmdb.org/t/p/w500${detail.poster_path}`}
                : placeHolderImage
            }
          />
          <View style={styles.container}>
            <Text style={styles.movieTitle}>
              {(detail && detail.name) || (detail && detail.title)}
            </Text>
          </View>
        </ScrollView>
      )}
      {!loaded && <ActivityIndicator size="large" />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: height / 2,
  },

  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
});

export default Details;
