import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITransferirTokens, defaultValue } from 'app/shared/model/transferir-tokens.model';

import { getEntity as getTemporada } from 'app/entities/temporada/temporada.reducer';
import { getEntity as getApplicationUser } from 'app/entities/application-user/application-user.reducer';
import { WEB3_PROVIDER } from 'app/config/constants';
import Web3 from 'web3';

export const ACTION_TYPES = {
  FETCH_TRANSFERIRTOKENS_LIST: 'transferirTokens/FETCH_TRANSFERIRTOKENS_LIST',
  FETCH_TRANSFERIRTOKENS: 'transferirTokens/FETCH_TRANSFERIRTOKENS',
  CREATE_TRANSFERIRTOKENS: 'transferirTokens/CREATE_TRANSFERIRTOKENS',
  UPDATE_TRANSFERIRTOKENS: 'transferirTokens/UPDATE_TRANSFERIRTOKENS',
  DELETE_TRANSFERIRTOKENS: 'transferirTokens/DELETE_TRANSFERIRTOKENS',
  RESET: 'transferirTokens/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITransferirTokens>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type TransferirTokensState = Readonly<typeof initialState>;

// Reducer

export default (state: TransferirTokensState = initialState, action): TransferirTokensState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TRANSFERIRTOKENS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TRANSFERIRTOKENS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_TRANSFERIRTOKENS):
    case REQUEST(ACTION_TYPES.UPDATE_TRANSFERIRTOKENS):
    case REQUEST(ACTION_TYPES.DELETE_TRANSFERIRTOKENS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TRANSFERIRTOKENS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TRANSFERIRTOKENS):
    case FAILURE(ACTION_TYPES.CREATE_TRANSFERIRTOKENS):
    case FAILURE(ACTION_TYPES.UPDATE_TRANSFERIRTOKENS):
    case FAILURE(ACTION_TYPES.DELETE_TRANSFERIRTOKENS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRANSFERIRTOKENS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TRANSFERIRTOKENS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_TRANSFERIRTOKENS):
    case SUCCESS(ACTION_TYPES.UPDATE_TRANSFERIRTOKENS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TRANSFERIRTOKENS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/transferir-tokens';

// Actions

export const getEntities: ICrudGetAllAction<ITransferirTokens> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TRANSFERIRTOKENS_LIST,
  payload: axios.get<ITransferirTokens>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ITransferirTokens> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TRANSFERIRTOKENS,
    payload: axios.get<ITransferirTokens>(requestUrl),
  };
};
export const createEntity: ICrudPutAction<ITransferirTokens> = entity => async dispatch => {

  const web3 = new Web3(WEB3_PROVIDER);
  const temporada = (await dispatch(getTemporada(entity.temporada.id))).value.data;
  const applicationUser = (await dispatch(getApplicationUser(entity.applicationUser.id))).value.data;
  const instanciaDAbono = new web3.eth.Contract(JSON.parse(temporada.abiDAbono), temporada.dineroAbono);
  const instanciaTemporada = new web3.eth.Contract(JSON.parse(temporada.abi), temporada.direccion);

  const owner = await instanciaTemporada.methods.owner().call();
  const resultado = await web3.eth.personal.unlockAccount(owner, entity.password, 300);
  if(entity.cantidad && entity.cantidad > 0){
    await instanciaDAbono.methods.transfer(applicationUser.direccion, entity.cantidad)
    .send({from: owner, gas: 500000});
    entity.password = 'Desbloqueo y Transferencia';
  }else{
    entity.password = 'Desbloqueo';
  }

  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TRANSFERIRTOKENS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITransferirTokens> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TRANSFERIRTOKENS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITransferirTokens> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TRANSFERIRTOKENS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
