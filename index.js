function createStore () {
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
//return object containing the getState function
  return {
    getState,
    subscribe
  }
}

const store = createStore();
store.subscribe(() => {
  console.log("the new state is", store.getState();
});
const unsubscribe = store.subscribe(() => {
  console.log("the state changed");
});