
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
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
import { filterParams, selectedFilter, selectFilter } from './Slices/filterSlice';
import { selectedMode } from './Slices/modeSlice';
import { addNewTodo, getTodos, getTodosError, getTodosStatus, selectAllTodos, toogleCompleteTodo, deleteOneTodo, deleteCompletedTodos, editTodo, saveNewData } from './Slices/todosSlice';

function App() {

  const todos = useSelector(selectAllTodos)
  const isLoading = useSelector(getTodosStatus)
  const error = useSelector(getTodosError)
  const filter = useSelector(selectedFilter)
  const darkMode = useSelector(selectedMode)
  const dispacth = useDispatch()

  const { filterTodos, filterMessage } = filterParams(filter, todos)

  const [openModal, setOpenModal] = useState(false);
  const [textToEdit, setTextToEdit] = useState({})

  useEffect(() => {
    dispacth(getTodos('TODOS_V2-APP'))
  }, [])

  saveNewData(todos)

  const totalUncompletedTodos = todos?.filter(todo => !todo.completed).length

  const addTodo = (text) => dispacth(addNewTodo(text))

  const toogleonComplete = (id) => dispacth(toogleCompleteTodo(id))

  const deleteTodo = (id) => dispacth(deleteOneTodo(id))

  const clearCompletedTodos = () => dispacth(deleteCompletedTodos())

  const openEditTodo = (text, id) => {
    setTextToEdit({ text, id });
    setOpenModal(true);
  }

  const editTextTodo = (newText, id) =>
    dispacth(editTodo({ newText, id }))

  
  const setFilter = (value) => dispacth(selectFilter(value))


  return (
    <>
      
      <Background />

      <div className='wrapper'>

        <main className='todo-container'>

          <TodoHeader />

          <CreateTodoInput addTodo={addTodo} />

          {error && <MsnNoData message={'An error occurred, please reload the page'} />}

          {(!isLoading && !filterTodos.length) &&
            <MsnNoData message={filterMessage} />}

          {isLoading ?
            <Loading count={4} />
            :

            <TodoList>
              {filterTodos.map((todo) => {
                return (

                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    
                    onComplete={toogleonComplete}
                    deleteTodo={deleteTodo}
                    openEditTodo={openEditTodo}
                    
                  />

                )
              }

              )

              }
            </TodoList>

          }
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
              textToEdit={textToEdit.text}
              idToEdit={textToEdit.id}
              setOpenModal={setOpenModal}
              editTextTodo={editTextTodo}
            />
          </Modal>
        }

      </div>



    </>
  )
}

export default App;
