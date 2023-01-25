import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { compose, legacy_createStore as createStore } from "redux";
import { Provider } from 'react-redux';
import { storeTodollo } from './redux/store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={storeTodollo}>
    <App />
  </Provider>
);



