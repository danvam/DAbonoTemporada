import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Temporada from './temporada';
import TemporadaDetail from './temporada-detail';
import TemporadaUpdate from './temporada-update';
import TemporadaDeleteDialog from './temporada-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TemporadaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TemporadaUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TemporadaDetail} />
      <ErrorBoundaryRoute path={match.url} component={Temporada} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TemporadaDeleteDialog} />
  </>
);

export default Routes;
