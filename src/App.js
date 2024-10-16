import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { appStore } from './utils/appStore';
import Body from './component/Body';

function App() {
  return (
    <Provider store={appStore}>
          <div>
            <Body/>
         </div>
    </Provider>

  );
}

export default App;
