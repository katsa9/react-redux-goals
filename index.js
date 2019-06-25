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
    subscribe
  }
}

//App Code
function todos (state = [], action) { //this is called a reducer - reduces the current state and the action to the new state
  if(action.type === 'ADD_TODO'){
    return state.concat([action.todo]);
  }
  return state;
}


// const store = createStore();
// store.subscribe(() => {
//   console.log("the new state is", store.getState();
// });
// const unsubscribe = store.subscribe(() => {
//   console.log("the state changed");
// });