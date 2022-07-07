
import { useContext, useReducer, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { TYPES } from './actions/todosActions';
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
import { saveNewData, setTodosInitialState, todosInicialState, todosReducer } from './reducers/todosReducer';




function App() {

  const [state, dispacth] = useReducer(todosReducer, todosInicialState, setTodosInitialState);

  const { todos, isLoading } = state

  saveNewData(todos);

  const [filter, setFilter] = useState('all');
  const [openModal, setOpenModal] = useState(false);
  const [textToEdit, setTextToEdit] = useState('')
  const { darkMode } = useContext(ThemeContext)

  const totalUncompletedTodos = todos.filter(todo => !todo.completed).length
  let filterTodos
  let filterMessage

  const addTodo = (text) => dispacth({ type: TYPES.ADD_NEW_TODO, payload: text })

  const toogleonComplete = (text) => dispacth({ type: TYPES.TOOGLE_COMPLETE_TODO, payload: text })

  const deleteTodo = (text) => dispacth({ type: TYPES.DELETE_TODO, payload: text })

  const clearCompletedTodos = () => dispacth({ type: TYPES.CLEAR_COMPLETED_TODOS })

  const editTextTodo = (newText, previousText) =>
    dispacth({ type: TYPES.EDIT_TEXT_TODO, payload: { newText, previousText } })

  const onDragAndDrop = (result) =>
    dispacth({ type: TYPES.REORDER_TODOS, payload: { result } })

  const openEditTodo = (text) => {
    setTextToEdit(text);
    setOpenModal(true);
  }

  switch (filter) {
    case 'active': {
      filterTodos = todos.filter(todo => !todo.completed);
      filterMessage = 'You haven´t completed any to-do yet';
      break;
    }
    case 'completed': {
      filterTodos = todos.filter(todo => todo.completed);
      filterMessage = 'You haven´t completed any to-do yet';
      break;
    }
    default: {
      filterTodos = todos;
      filterMessage = 'You haven´t create any to-do yet';
    }

  }


  return (
    <>
      <DragDropContext onDragEnd={(result) => onDragAndDrop(result)}>
        <Background />

        <div className='wrapper'>

          <main className='todo-container'>

            <TodoHeader />

            <CreateTodoInput addTodo={addTodo} />

            {isLoading && <Loading count={4} />}
            {/* {error && <MsnNoData message={'An error occurred, please reload the page'} />} */}
            {(!isLoading && !filterTodos.length) && 
              <MsnNoData message={filterMessage} />}
            <Droppable droppableId='todoList' ignoreContainerClipping={true}>
              {(droppableProvided) => (
                <div
                  {...droppableProvided.droppableProps}
                  ref={droppableProvided.innerRef}
                  className='droppable-container'

                >
                  <TodoList>
                    {filterTodos.map((todo, i) => {
                      return (
                        <Draggable
                          key={i + todo.text}
                          draggableId={i + todo.text}
                          index={i}
                        >
                          {(draggableProvided) => (
                            <div
                              {...draggableProvided.draggableProps}
                              ref={draggableProvided.innerRef}
                              {...draggableProvided.dragHandleProps}
                            >
                              <TodoItem
                                completed={todo.completed}
                                text={todo.text}
                                onComplete={toogleonComplete}
                                deleteTodo={deleteTodo}
                                openEditTodo={openEditTodo}
                                index={i}
                              />
                            </div>)}
                        </Draggable>
                      )
                    })}
                    {droppableProvided.placeholder}
                  </TodoList>

                </div>)}
            </Droppable>
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

      </DragDropContext>
    </>
  );
}

export default App;
