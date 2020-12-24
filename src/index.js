import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './component/App';
import Loader from './component/common/Loader';

ReactDOM.render(
    <Suspense fallback={ <Loader /> }>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>,
  document.getElementById('root')
);
