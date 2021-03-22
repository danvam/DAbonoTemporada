import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AprobarTokens from './aprobar-tokens';
import AprobarTokensDetail from './aprobar-tokens-detail';
import AprobarTokensUpdate from './aprobar-tokens-update';
import AprobarTokensDeleteDialog from './aprobar-tokens-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AprobarTokensUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AprobarTokensUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AprobarTokensDetail} />
      <ErrorBoundaryRoute path={match.url} component={AprobarTokens} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AprobarTokensDeleteDialog} />
  </>
);

export default Routes;
