import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Abono from './abono';
import AbonoDetail from './abono-detail';
import AbonoUpdate from './abono-update';
import AbonoDeleteDialog from './abono-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AbonoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AbonoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AbonoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Abono} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AbonoDeleteDialog} />
  </>
);

export default Routes;
