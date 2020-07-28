import React, {useState, useEffect, useCallback} from 'react';
import {Text, Image, View, StyleSheet, FlatList} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
  },
  thumbnail: {
    width: 53,
    height: 81,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
  },
  list: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

export default () => {
  const [movieList, setMovieList] = useState();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const REQUEST_URL =
      'https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json';
    fetch(REQUEST_URL)
      .then((res) => res.json())
      .then((resJson) => {
        setMovieList(resJson.movies);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, [setMovieList]);

  const renderMovie = useCallback(
    ({item}) => (
      <View style={styles.container} key={item.id}>
        <Image
          style={styles.thumbnail}
          source={{
            uri: item.posters.thumbnail,
            width: 100,
            height: 100,
          }}
        />
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text>{item.year}</Text>
        </View>
      </View>
    ),
    [],
  );

  if (!loaded) {
    return <Text>加载中...</Text>;
  }
  return (
    <FlatList
      data={movieList}
      renderItem={renderMovie}
      style={styles.list}
      keyExtractor={(item) => item.id}
    />
  );
};
