import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getPopularTv} from '../services/services';
import Card from '../Components/Card';

type Props = {
  title: string;
  content: any;
  navigation: any;
};
interface popular {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

const List: React.FC<Props> = ({navigation, title, content}) => {
  const [popularTv, setPopularTv] = useState<popular>();
  const [error, setError] = useState(false);

  return (
    <View style={styles.list}>
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View>
        <FlatList
          data={content}
          renderItem={({item}) => <Card navigation={navigation} item={item} />}
          horizontal={true}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 25,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
});
export default List;
