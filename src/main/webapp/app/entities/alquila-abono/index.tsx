import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AlquilaAbono from './alquila-abono';
import AlquilaAbonoDetail from './alquila-abono-detail';
import AlquilaAbonoUpdate from './alquila-abono-update';
import AlquilaAbonoDeleteDialog from './alquila-abono-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AlquilaAbonoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AlquilaAbonoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AlquilaAbonoDetail} />
      <ErrorBoundaryRoute path={match.url} component={AlquilaAbono} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AlquilaAbonoDeleteDialog} />
  </>
);

export default Routes;
