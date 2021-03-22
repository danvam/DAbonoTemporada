import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAprobarTokens, defaultValue } from 'app/shared/model/aprobar-tokens.model';

import { getEntity as getTemporada } from 'app/entities/temporada/temporada.reducer';
import { getEntity as getApplicationUser } from 'app/entities/application-user/application-user.reducer';
import { WEB3_PROVIDER } from 'app/config/constants';
import Web3 from 'web3';

export const ACTION_TYPES = {
  FETCH_APROBARTOKENS_LIST: 'aprobarTokens/FETCH_APROBARTOKENS_LIST',
  FETCH_APROBARTOKENS: 'aprobarTokens/FETCH_APROBARTOKENS',
  CREATE_APROBARTOKENS: 'aprobarTokens/CREATE_APROBARTOKENS',
  UPDATE_APROBARTOKENS: 'aprobarTokens/UPDATE_APROBARTOKENS',
  DELETE_APROBARTOKENS: 'aprobarTokens/DELETE_APROBARTOKENS',
  RESET: 'aprobarTokens/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAprobarTokens>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type AprobarTokensState = Readonly<typeof initialState>;

// Reducer

export default (state: AprobarTokensState = initialState, action): AprobarTokensState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_APROBARTOKENS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_APROBARTOKENS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_APROBARTOKENS):
    case REQUEST(ACTION_TYPES.UPDATE_APROBARTOKENS):
    case REQUEST(ACTION_TYPES.DELETE_APROBARTOKENS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_APROBARTOKENS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_APROBARTOKENS):
    case FAILURE(ACTION_TYPES.CREATE_APROBARTOKENS):
    case FAILURE(ACTION_TYPES.UPDATE_APROBARTOKENS):
    case FAILURE(ACTION_TYPES.DELETE_APROBARTOKENS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_APROBARTOKENS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_APROBARTOKENS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_APROBARTOKENS):
    case SUCCESS(ACTION_TYPES.UPDATE_APROBARTOKENS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_APROBARTOKENS):
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

const apiUrl = 'api/aprobar-tokens';

// Actions

export const getEntities: ICrudGetAllAction<IAprobarTokens> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_APROBARTOKENS_LIST,
  payload: axios.get<IAprobarTokens>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IAprobarTokens> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_APROBARTOKENS,
    payload: axios.get<IAprobarTokens>(requestUrl),
  };
};
export const createEntity: ICrudPutAction<IAprobarTokens> = entity => async dispatch => {

  const web3 = new Web3(WEB3_PROVIDER);
  const temporada = (await dispatch(getTemporada(entity.temporada.id))).value.data;
  const applicationUser = (await dispatch(getApplicationUser(entity.applicationUser.id))).value.data;
  const instanciaDAbono = new web3.eth.Contract(JSON.parse(temporada.abiDAbono), temporada.dineroAbono);

  const resultado = await web3.eth.personal.unlockAccount(applicationUser.direccion, entity.password, 300);
  if(entity.cantidad && entity.cantidad > 0){
    await instanciaDAbono.methods.approve(temporada.direccion, entity.cantidad)
    .send({from: applicationUser.direccion, gas: 500000});
    entity.password = 'Desbloqueo y Aprobación';
  }else{
    entity.password = 'Desbloqueo';
  }

  const result = await dispatch({
    type: ACTION_TYPES.CREATE_APROBARTOKENS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAprobarTokens> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_APROBARTOKENS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAprobarTokens> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_APROBARTOKENS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
