import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Temporada from './temporada';
import Localidad from './localidad';
import Espectaculo from './espectaculo';
import Abono from './abono';
import CompraAbono from './compra-abono';
import AlquilaAbono from './alquila-abono';
import ApplicationUser from './application-user';
import TransferirTokens from './transferir-tokens';
import AprobarTokens from './aprobar-tokens';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}temporada`} component={Temporada} />
      <ErrorBoundaryRoute path={`${match.url}localidad`} component={Localidad} />
      <ErrorBoundaryRoute path={`${match.url}espectaculo`} component={Espectaculo} />
      <ErrorBoundaryRoute path={`${match.url}abono`} component={Abono} />
      <ErrorBoundaryRoute path={`${match.url}compra-abono`} component={CompraAbono} />
      <ErrorBoundaryRoute path={`${match.url}alquila-abono`} component={AlquilaAbono} />
      <ErrorBoundaryRoute path={`${match.url}application-user`} component={ApplicationUser} />
      <ErrorBoundaryRoute path={`${match.url}transferir-tokens`} component={TransferirTokens} />
      <ErrorBoundaryRoute path={`${match.url}aprobar-tokens`} component={AprobarTokens} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
