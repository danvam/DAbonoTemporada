import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import temporada, {
  TemporadaState
} from 'app/entities/temporada/temporada.reducer';
// prettier-ignore
import localidad, {
  LocalidadState
} from 'app/entities/localidad/localidad.reducer';
// prettier-ignore
import espectaculo, {
  EspectaculoState
} from 'app/entities/espectaculo/espectaculo.reducer';
// prettier-ignore
import abono, {
  AbonoState
} from 'app/entities/abono/abono.reducer';
// prettier-ignore
import compraAbono, {
  CompraAbonoState
} from 'app/entities/compra-abono/compra-abono.reducer';
// prettier-ignore
import alquilaAbono, {
  AlquilaAbonoState
} from 'app/entities/alquila-abono/alquila-abono.reducer';
// prettier-ignore
import applicationUser, {
  ApplicationUserState
} from 'app/entities/application-user/application-user.reducer';
// prettier-ignore
import transferirTokens, {
  TransferirTokensState
} from 'app/entities/transferir-tokens/transferir-tokens.reducer';
// prettier-ignore
import aprobarTokens, {
  AprobarTokensState
} from 'app/entities/aprobar-tokens/aprobar-tokens.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly temporada: TemporadaState;
  readonly localidad: LocalidadState;
  readonly espectaculo: EspectaculoState;
  readonly abono: AbonoState;
  readonly compraAbono: CompraAbonoState;
  readonly alquilaAbono: AlquilaAbonoState;
  readonly applicationUser: ApplicationUserState;
  readonly transferirTokens: TransferirTokensState;
  readonly aprobarTokens: AprobarTokensState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  temporada,
  localidad,
  espectaculo,
  abono,
  compraAbono,
  alquilaAbono,
  applicationUser,
  transferirTokens,
  aprobarTokens,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
