
import { useContext, useState } from 'react';
import './App.css';
import { Background } from './components/Background';
import { CreateTodoInput } from './components/CreateTodoInput';
import { Loading } from './components/Loading';
import { Modal } from './components/Modal';
import { MsnNoData } from './components/MsnNoData';
import { TodoActionsBar } from './components/TodoActionsBar';
import { TodoEditForm } from './components/TodoEditForm';
import { TodoHeader } from './components/TodoHeader';
import { TodoItem } from './components/TodoItem';
import { TodoList } from './components/TodoList';
import { ThemeContext } from './Context';
import { useLocalStorage } from './Hooks/useLocalStorage';




function App() {

  const { data: todos, saveNewData: setTodos, isLoading, error } = useLocalStorage('TODOS_V2-APP', []);
  const [filter, setFilter] = useState('all');
  const [openModal, setOpenModal] = useState(false);
  const [textToEdit, setTextToEdit] = useState('')
  const { darkMode } = useContext(ThemeContext)


  const totalUncompletedTodos = todos.filter(todo => !todo.completed).length

  const addTodo = (text) => {
    const newTodos = [...todos];
    newTodos.push({ completed: false, text: text })
    setTodos(newTodos);
  }

  const toogleonComplete = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    setTodos(newTodos);
  }

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex(todo => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    setTodos(newTodos);
  }

  const clearCompletedTodos = () => {
    const newTodos = todos.filter(todo => !todo.completed);
    setTodos(newTodos);
  }

  let filterTodos = [];
  let filterMessage;

  switch (filter) {
    case 'active':
      filterTodos = todos.filter(todo => !todo.completed);
      filterMessage = 'You have completed all your to-do´s';
      break;
    case 'completed':
      filterTodos = todos.filter(todo => todo.completed);
      filterMessage = 'You haven´t completed any to-do';
      break;
    default:
      filterTodos = todos;
      filterMessage = 'You haven´t create any to-do yet';
  }


  const openEditTodo = (text) => {
    setTextToEdit(text);
    setOpenModal(true);
  }

  const editTextTodo = (newText, previousText) => {
    const todoIndex = todos.findIndex(todo => todo.text === previousText);
    const newTodos = [...todos];
    newTodos[todoIndex].text = newText;
    setTodos(newTodos);
  }

  return (
    <>
      <Background />

      <div className='wrapper'>

        <main className='todo-container'>

          <TodoHeader />

          <CreateTodoInput addTodo={addTodo} />

          {isLoading && <Loading count={4} />}
          {error && <MsnNoData message={'An error occurred, please reload the page'} />}
          {(!isLoading && !filterTodos.length) &&
            <MsnNoData message={filterMessage} />}

          <TodoList>
            {filterTodos.map((todo, i) => {
              return (
                <TodoItem
                  key={i + todo.text}
                  completed={todo.completed}
                  text={todo.text}
                  onComplete={toogleonComplete}
                  deleteTodo={deleteTodo}
                  openEditTodo={openEditTodo}
                />
              )
            })}
          </TodoList>

          <TodoActionsBar
            totalUncompletedTodos={totalUncompletedTodos}
            clearCompletedTodos={clearCompletedTodos}
            setFilter={setFilter}
            filter={filter}
          />
          <p className={`footer ${darkMode ? 'footer-dark-mode' : ''}`}>
            Drag and drop to reorder list
          </p>
        </main>

        {openModal &&
          <Modal>
            <TodoEditForm
              textToEdit={textToEdit}
              setOpenModal={setOpenModal}
              editTextTodo={editTextTodo}
            />
          </Modal>
        }

      </div>


    </>
  );
}

export default App;
