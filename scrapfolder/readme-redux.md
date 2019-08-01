<!-- Redux -->

-- you can use Redux without using redux

function reducer(state = {}, action) {
if (action.type == 'SHOW_BIO_EDITOR') {
return Object.assign({}, state, {
bioEditorTextareaIsVisible: true
});
}
if (action.type == 'UPDATE_BIO') {
const user = { ...state.user, bio: action.bio };
return { ...state, user };
}
return state;
}

Redux requires that reducers be pure functions. That means they can have no side effects. They can't change anything that they did not create themselves.

// Example pure function

function reducer(state, action) {
if(action.type == "blabla"){
return{
...state,
bio: new.bla
}
}
}

// object.assign

import { createStore } from 'redux';
import { reducer } from './reducer';

const store = createStore(reducer);

<button onClick={store.dispatch(updateBio(teaxtarea.value))}>
