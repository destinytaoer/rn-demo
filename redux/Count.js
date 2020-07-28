import React from 'react';
import {SafeAreaView, Text, Button} from 'react-native';
import {connect} from 'react-redux';

const Count = ({count, increment, decrement}) => {
  return (
    <SafeAreaView>
      <Text>{count}</Text>
      <Button
        title="increment"
        onPress={() => {
          increment();
        }}
      />
      <Button
        title="decrement"
        onPress={() => {
          decrement();
        }}
      />
    </SafeAreaView>
  );
};

export default connect(
  (state) => ({count: state.count}),
  (dispatch) => ({
    increment: () => dispatch({type: 'INCREMENT', payload: 1}),
    decrement: () => dispatch({type: 'DECREMENT', payload: 1}),
  }),
)(Count);
