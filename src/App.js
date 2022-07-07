
import { useContext,  useEffect,  useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
import { ThemeContext } from './Context';
import { addNewTodo, getTodos, getTodosError, getTodosStatus, selectAllTodos, toogleCompleteTodo,deleteOneTodo,deleteCompletedTodos, editTodo,reorderTodos, saveNewData } from './Slices/todosSlice';





function App() {
  
  const todos = useSelector(selectAllTodos)
  console.log(todos)
  const isLoading = useSelector(getTodosStatus)
  const error = useSelector(getTodosError)
  const dispacth = useDispatch()

  useEffect(()=>{
    dispacth(getTodos('TODOS_V2-APP',[]))
  },[])
  
  console.log(todos)
  saveNewData(todos)

  const [filter, setFilter] = useState('all');
  const [openModal, setOpenModal] = useState(false);
  const [textToEdit, setTextToEdit] = useState('')
  const { darkMode } = useContext(ThemeContext)

  
 

  const totalUncompletedTodos = todos.filter(todo => !todo.completed).length
  let filterTodos
  let filterMessage

  const addTodo = (text) => dispacth(addNewTodo(text))

  const toogleonComplete = (id) => dispacth(toogleCompleteTodo(id))

  const deleteTodo = (id) => dispacth(deleteOneTodo (id))

  const clearCompletedTodos = () => dispacth(deleteCompletedTodos())

  const editTextTodo = (newText, previousText) =>
    dispacth(editTodo({ newText, previousText }))

  const onDragAndDrop = (result) =>
    dispacth( reorderTodos({ result }))

  const openEditTodo = (text) => {
    setTextToEdit(text);
    setOpenModal(true);
  }

  switch (filter) {
    case 'active': {
      filterTodos = todos.filter(todo => !todo.completed);
      filterMessage = 'You have completed all your to-do´s';
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

            
            {/* {error && <MsnNoData message={'An error occurred, please reload the page'} />} */}
            {(!isLoading && !filterTodos.length) && 
              <MsnNoData message={filterMessage} />}
            {isLoading?  <Loading count={4} />
            :
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
                                id={todo.id}
                              />
                            </div>)}
                        </Draggable>
                      )
                    })}
                    {droppableProvided.placeholder}
                  </TodoList>

                </div>)}
            </Droppable>
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
