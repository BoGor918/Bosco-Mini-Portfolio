// others
import './index.css';
import ReactDOM from 'react-dom/client';
// global components
import MapperContextProvider from './globalVariable/MapperContextProvider';
// page components
import App from './App';

// render
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// render
root.render(
  <MapperContextProvider>
    <App />
  </MapperContextProvider>
);