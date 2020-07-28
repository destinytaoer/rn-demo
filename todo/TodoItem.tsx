import React, {FC, useState} from 'react';
import {View, TextInput, Switch, StyleSheet, Button} from 'react-native';
import {TodoInterface} from './types';
import {removeTodo, updateTodo, toggleTodo} from './actions';

interface Props {
  item: TodoInterface;
  remove: typeof removeTodo;
  update: typeof updateTodo;
  toggle: typeof toggleTodo;
}

const TodoItem: FC<Props> = ({item, toggle, remove, update}) => {
  const {isComplete, text, id} = item;
  const [value, setValue] = useState(isComplete);
  const toggleSwitch = (val: boolean) => {
    setValue(val);
    toggle(id);
  };
  return (
    <View style={styles.container}>
      <Switch
        style={styles.switch}
        value={value}
        onValueChange={toggleSwitch}
      />
      <TextInput
        style={[
          styles.content,
          isComplete && {textDecorationLine: 'line-through', color: 'green'},
        ]}
        value={text}
        onChangeText={(t) => update({id, text: t, isComplete})}
      />
      <Button
        title="删除"
        onPress={() => {
          remove(id);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  switch: {
    // width: 100,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
});

export default TodoItem;
