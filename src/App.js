
import { useContext, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
  const reorder = (list, startIndex, endIndex)=>{
    const result = [...list];;
    const [removed] = result.splice(startIndex,1);
    result.splice(endIndex,0,removed);
    return result;
}
  const onDragAndDrop = (result)=>{
    const { source, destination} = result;
    if(!destination)return;
    if(source.index===destination.index 
      && source.droppableId===destination.droppableId)return;
     const newTodos = reorder(todos,source.index, destination.index);
      setTodos(newTodos);
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
            {error && <MsnNoData message={'An error occurred, please reload the page'} />}
            {(!isLoading && !filterTodos.length) &&
              <MsnNoData message={filterMessage} />}
            <Droppable droppableId='todoList'>
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
