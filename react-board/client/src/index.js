import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './component/App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const basic = {
    boardList: [],
};

function reducer(state = basic, action){
    if(action.type === 'getBoard'){
        state.boardList = action.payload;
        return state;
    }else{
        return state;
    }
}

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
