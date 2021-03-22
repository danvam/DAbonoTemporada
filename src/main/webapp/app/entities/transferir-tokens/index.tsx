import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TransferirTokens from './transferir-tokens';
import TransferirTokensDetail from './transferir-tokens-detail';
import TransferirTokensUpdate from './transferir-tokens-update';
import TransferirTokensDeleteDialog from './transferir-tokens-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TransferirTokensUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TransferirTokensUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TransferirTokensDetail} />
      <ErrorBoundaryRoute path={match.url} component={TransferirTokens} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TransferirTokensDeleteDialog} />
  </>
);

export default Routes;
