import { lazy } from 'react';
import { Route } from 'react-router-dom';

const List = lazy(() => import('./list/List'));

const Routes = () => {
  return (
      <Route path='/' render={() => <List />} />
  );
}

export default Routes;
