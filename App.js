import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Button,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
} from 'react-native';

export default function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  const handlePress = () => {
    if (!todo) return;

    setTodos((cur) => [...cur, { item: todo, complete: false }]);
    setTodo('');
  };

  const handleComplete = (i) => {
    const newTodos = [...todos];
    newTodos[i].complete = !newTodos[i].complete;

    setTodos(newTodos);
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <StatusBar style='auto' />
          {todos.map((todo, i) => (
            <View style={styles.todoList} key={i}>
              <Text style={todo.complete ? styles.isComplete : styles.isNotComplete}>{todo.item}</Text>
              <Button title={todo.complete ? '취소' : '완료'} onPress={() => handleComplete(i)} />
            </View>
          ))}
          <View style={styles.todoForm}>
            <View style={styles.todoInputLabel}>
              <Text style={styles.text}>할 일</Text>
              <TextInput value={todo} onChangeText={setTodo} style={styles.textInput} />
            </View>
            <Button title='입력' onPress={handlePress} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 50,
  },
  isComplete: {
    textDecorationLine: 'underline line-through',
  },
  isNotComplete: {},
  todoList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 10,
    paddingLeft: 10,
  },
  textInput: {
    width: 200,
    borderColor: 'black',
    borderWidth: 1,
  },
  todoInputLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    borderColor: 'black',
    borderWidth: 1,
  },
  todoForm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
});
