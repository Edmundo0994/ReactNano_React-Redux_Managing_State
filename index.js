// Library Code
  function createStore (reducer) {
    // State
    // Get the state
    // Listen to changes on the state
    // Update the state
    let state
    let listeners = []
  
    // Used to get the current state from the store
    const getState = () => state

    /* Used to provide a listener function the store will call when the
    state changes. It helps connect React components to the store */

    const subscribe = (listener) => {
      listeners.push(listener)
      return () => {
        listeners = listeners.filter((l) => l !== listener)
      }
    }
  
    // Used to make changes to the store's state
    const dispatch = (action) => {
      state = reducer(state, action)
      listeners.forEach((listener) => listener())
    }
  
    return {
      getState,
      subscribe,
      dispatch
    }
  }
  
// App code
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'

const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

// Action Creators
function addTodoAction (todo){
  return {
    type: ADD_TODO,
    todo,
  }
}

function removeTodoAction (id){
  return {
    type: REMOVE_TODO,
    id,
  }
}

function toggleTodoAction (id){
  return {
    type: TOGGLE_TODO,
    id,
  }
}

function addGoalAction (goal){
  return {
    type: ADD_GOAL,
    goal,
  }
}

function removeGoalAction (id){
  return {
    type: REMOVE_GOAL,
    id,
  }
}

function todos (state = [], action) {
  switch(action.type){
    case ADD_TODO:
      return state.concat([action.todo])
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id))
    case TOGGLE_TODO:
      return state.map((todo) => todo.id !== action.id ? todo :
        Object.assign({}, todo, { complete: !todo.complete}))
    default: 
      return state  
  }
}  

function goals (state = [], action) {
  switch(action.type){
    case ADD_GOAL:
      return state.concat([action.goal])
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id))
    default: 
      return state  
  }
}  

// Root reducer
function app (state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  }
}

const store = createStore(app)

/*
store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 0,
    name: 'Learn Redux',
    complete: false
  }
})
*/

store.dispatch(addTodoAction({
  id: 0,
  name: 'Walk the dog',
  complete: false,
}))

store.dispatch(addTodoAction({
  id: 1,
  name: 'Wash the car',
  complete: false,
}))

store.dispatch(addTodoAction({
  id: 2,
  name: 'Go to the gym',
  complete: true,
}))

store.dispatch(removeTodoAction(1))

store.dispatch(toggleTodoAction(0))

store.dispatch(addGoalAction({
  id: 0,
  name: 'Learn Redux'
}))

store.dispatch(addGoalAction({
  id: 1,
  name: 'Lose 20 pounds'
}))

store.dispatch(removeGoalAction(0))