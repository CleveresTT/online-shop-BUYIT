import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DeviceStorage from './store/DeviceStorage';
import UserStorage from './store/UserStorage';

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStorage(),
        device: new DeviceStorage()
    }}>
        <App />
    </Context.Provider>,
    document.getElementById('root')
);
