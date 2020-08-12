import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  TextInput,
  Button,
} from 'react-native';
import {connect} from 'react-redux';
import {addTodo} from '../todo/actions';

const Todo = (props) => {
  const {todos, dispatch} = props;

  const [value, setValue] = useState('');

  const renderItem = ({item}) => {
    const handlePress = () => {
      dispatch({
        type: 'home/removeTodo',
        payload: item.id,
      });
    };

    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text>{item.text}</Text>
        <Button title="删除" onPress={handlePress} />
      </View>
    );
  };

  const onChangeText = (text) => {
    setValue(text);
  };

  const onSubmit = () => {
    console.log('dispatch');
    dispatch({
      type: 'home/addTodo',
      payload: value,
    });
  };

  return (
    <SafeAreaView>
      <TextInput
        onSubmitEditing={onSubmit}
        value={value}
        onChangeText={onChangeText}
        style={{borderWidth: 1, borderColor: '#222'}}
      />
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = ({home}) => {
  return {
    todos: home.todos,
  };
};

export default connect(mapStateToProps)(Todo);
