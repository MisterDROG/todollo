import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/App/App';
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



