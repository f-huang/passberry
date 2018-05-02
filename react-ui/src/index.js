import ReactDOM from 'react-dom';

import "./app/base.css";
import routes from './routes'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(routes, document.getElementById('root'));
registerServiceWorker();
