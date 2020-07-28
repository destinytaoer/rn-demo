import React, {FC, useState, useRef} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import TodoItem from './TodoItem';
import {connect} from 'react-redux';
import * as actions from './actions';
import {addTodo, removeTodo, updateTodo, toggleTodo} from './actions';
import {StateInterface} from './types';

interface Props extends StateInterface {
  addTodo: typeof addTodo;
  removeTodo: typeof removeTodo;
  updateTodo: typeof updateTodo;
  toggleTodo: typeof toggleTodo;
}

const Todo: FC<Props> = ({
  todos,
  addTodo: add,
  removeTodo: remove,
  updateTodo: update,
  toggleTodo: toggle,
}) => {
  const [value, setValue] = useState('');
  const textInput = useRef<TextInput>(null);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TodoList</Text>
      <View style={styles.inputWrap}>
        <TextInput
          style={styles.input}
          placeholder="What do you want to do?"
          value={value}
          onSubmitEditing={() => {
            add(value);
            textInput.current?.clear();
          }}
          ref={textInput}
          onChangeText={(text) => setValue(text)}
        />
      </View>
      <View>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <TodoItem
              item={item}
              update={update}
              remove={remove}
              toggle={toggle}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  inputWrap: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    paddingHorizontal: 40,
    marginVertical: 20,
  },
});

// const mapStateToProps = (state: StateInterface) => ({
//   ...state,
// });

// const mapDispatchToProps = () => ({
//   addTodo,
//   removeTodo,
//   updateTodo,
//   toggleTodo,
// });

export default connect((state: StateInterface) => ({...state}), actions)(Todo);
