import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {
  getPopularMovies,
  getPopularTv,
  getMovieDetails,
} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../Components/List';

interface movieProps {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[];
  id?: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  navigation: any;
}

const deviceSize = Dimensions.get('screen');

const Home: React.FC<movieProps> = ({navigation}) => {
  const [moviesImages, setMoviesImages] = useState<string[]>([]);
  const [popularTv, setPopularTv] = useState<any>();
  const [popularMovies, setPopularMovies] = useState<any>();
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getPopularMovies()
      .then(movies => {
        const moviesImagesArray: string[] = [];
        movies.forEach((movie: any) => {
          moviesImagesArray.push(
            'https://image.tmdb.org/t/p/w500' + movie?.poster_path,
          );
        });
        setMoviesImages(moviesImagesArray);
      })
      .catch(err => {
        setError(err);
        console.log(error);
      })
      .finally(() => {
        setLoaded(true);
      });

    getPopularTv()
      .then(tv => {
        setPopularTv(tv);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoaded(true);
      });

    getPopularMovies()
      .then(popMovies => {
        setPopularMovies(popMovies);
      })
      .catch(err => {
        setError(err);
      })
      .finally(() => {
        setLoaded(true);
      });
  }, []);

  return (
    <React.Fragment>
      {loaded && (
        <ScrollView>
          <View style={styles.SliderContainer}>
            <SliderBox
              images={moviesImages}
              sliderBoxHeight={deviceSize.height / 1.5}
              circleLoop={true}
              // autoplay={true}
              dotStyle={styles.dotStyle}
            />
          </View>
          <View style={styles.carousel}>
            <List
              navigation={navigation}
              content={popularTv}
              title="Popular Tv Shows"
            />
          </View>
          <View style={styles.carousel}>
            <List
              navigation={navigation}
              content={popularMovies}
              title="Popular Movies"
            />
          </View>
        </ScrollView>
      )}

      {!loaded && <ActivityIndicator size="large" />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  SliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  carousel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dotStyle: {
    height: 0,
  },
});

export default Home;
