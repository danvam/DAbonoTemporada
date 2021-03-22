import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Espectaculo from './espectaculo';
import EspectaculoDetail from './espectaculo-detail';
import EspectaculoUpdate from './espectaculo-update';
import EspectaculoDeleteDialog from './espectaculo-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={EspectaculoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={EspectaculoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={EspectaculoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Espectaculo} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={EspectaculoDeleteDialog} />
  </>
);

export default Routes;
