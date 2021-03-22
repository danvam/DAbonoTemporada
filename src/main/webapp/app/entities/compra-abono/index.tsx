import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CompraAbono from './compra-abono';
import CompraAbonoDetail from './compra-abono-detail';
import CompraAbonoUpdate from './compra-abono-update';
import CompraAbonoDeleteDialog from './compra-abono-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CompraAbonoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CompraAbonoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CompraAbonoDetail} />
      <ErrorBoundaryRoute path={match.url} component={CompraAbono} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CompraAbonoDeleteDialog} />
  </>
);

export default Routes;
