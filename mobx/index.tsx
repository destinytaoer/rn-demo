import React, {useState, useRef, FC} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  FlatList,
  View,
  Switch,
  Button,
} from 'react-native';
import TodoStore, {TodoInterface} from './ObserveTodo';
import {observer} from 'mobx-react';

interface ItemProps {
  item: TodoInterface;
  handleDelete: () => void;
}

interface ListProps {
  store: TodoStore;
}

const todoStore = new TodoStore();

const TodoItem: FC<ItemProps> = observer(({item, handleDelete}) => {
  const toggleCompleted = (val: boolean) => {
    item.completed = val;
  };

  return (
    <View style={{flexDirection: 'row', paddingVertical: 10}}>
      <Switch value={item.completed} onValueChange={toggleCompleted} />
      <Text style={{flex: 1}}>{item.task}</Text>
      <Button title="delete" onPress={handleDelete} />
    </View>
  );
});

const TodoList: FC<ListProps> = observer(({store}) => {
  const [task, setTask] = useState('');
  const textinput = useRef<TextInput>(null);
  const renderItem = ({item, index}: {item: TodoInterface; index: number}) => {
    return <TodoItem item={item} handleDelete={handleDelete(index)} />;
  };
  const onChangeText = (text: string) => {
    setTask(text);
  };
  const addTodo = () => {
    store.addTodo(task);
    textinput.current?.clear();
  };
  const handleDelete = (index: number) => {
    return () => {
      store.todos.splice(index, 1);
    };
  };
  return (
    <View>
      <Text>Todo</Text>
      <Text>{store.report}</Text>
      <TextInput
        ref={textinput}
        value={task}
        onChangeText={onChangeText}
        onSubmitEditing={addTodo}
        placeholder="What do you want to do?"
      />
      <FlatList
        data={store.todos}
        keyExtractor={(item, index) => index + ''}
        renderItem={renderItem}
      />
    </View>
  );
});

const TodosView: FC = () => {
  return (
    <SafeAreaView>
      <TodoList store={todoStore} />
    </SafeAreaView>
  );
};

export default TodosView;
