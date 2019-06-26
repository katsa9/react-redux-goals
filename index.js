//Library Code
function createStore (reducer) {
  //the store should have 4 parts
  // 1. the state
  // 2. get the state
  // 3. Listen for changes on the state
  // 4. update the state

  let state
  let listeners = []

  const getState = () => state

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => { //when subscribing, we return a function that can then be used to unsubscribe
      listeners = listeners.filter((l) => l !== listener)
    }
  }

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }
//return object containing the getState function
  return {
    getState,
    subscribe,
    dispatch
  }
}

//App Code
function todos (state = [], action) { //this is called a reducer - reduces the current state and the action to the new state
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.todo]);
    case 'REMOVE_TODO':
      return state.filter((todo) => todo.id !== action.id);
    case 'TOGGLE_TODO':
      return state.map((todo) => todo.id !== action.id ? todo :
        Object.assign({}, todo, { complete: !todo.complete }));
    default :
    return state;    
  }
}

//Using the store
const store = createStore(todos);
store.subscribe(() => { //passing in a listener
  console.log("The new state is: ", store.getState());
});

store.dispatch({  //passing the dispatch method an action object
  type: 'ADD_TODO',
  todo: {
    id: 0,
    name: 'learn redux',
    complete: false
  }
});
// const store = createStore();
// store.subscribe(() => {
//   console.log("the new state is", store.getState();
// });
// const unsubscribe = store.subscribe(() => {
//   console.log("the state changed");
// });