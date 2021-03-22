import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEspectaculo, defaultValue } from 'app/shared/model/espectaculo.model';

import { convertDateTimeBlockchain } from 'app/shared/util/date-utils';
import { getEntity as getTemporada } from 'app/entities/temporada/temporada.reducer';
import { WEB3_PROVIDER } from 'app/config/constants';
import Web3 from 'web3';

export const ACTION_TYPES = {
  FETCH_ESPECTACULO_LIST: 'espectaculo/FETCH_ESPECTACULO_LIST',
  FETCH_ESPECTACULO: 'espectaculo/FETCH_ESPECTACULO',
  CREATE_ESPECTACULO: 'espectaculo/CREATE_ESPECTACULO',
  UPDATE_ESPECTACULO: 'espectaculo/UPDATE_ESPECTACULO',
  DELETE_ESPECTACULO: 'espectaculo/DELETE_ESPECTACULO',
  RESET: 'espectaculo/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEspectaculo>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type EspectaculoState = Readonly<typeof initialState>;

// Reducer

export default (state: EspectaculoState = initialState, action): EspectaculoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ESPECTACULO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ESPECTACULO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ESPECTACULO):
    case REQUEST(ACTION_TYPES.UPDATE_ESPECTACULO):
    case REQUEST(ACTION_TYPES.DELETE_ESPECTACULO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ESPECTACULO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ESPECTACULO):
    case FAILURE(ACTION_TYPES.CREATE_ESPECTACULO):
    case FAILURE(ACTION_TYPES.UPDATE_ESPECTACULO):
    case FAILURE(ACTION_TYPES.DELETE_ESPECTACULO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ESPECTACULO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ESPECTACULO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ESPECTACULO):
    case SUCCESS(ACTION_TYPES.UPDATE_ESPECTACULO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ESPECTACULO):
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

const apiUrl = 'api/espectaculos';

// Actions

export const getEntities: ICrudGetAllAction<IEspectaculo> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ESPECTACULO_LIST,
  payload: axios.get<IEspectaculo>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IEspectaculo> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ESPECTACULO,
    payload: axios.get<IEspectaculo>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IEspectaculo> = entity => async dispatch => {

  const web3 = new Web3(WEB3_PROVIDER);
  const temporada = (await dispatch(getTemporada(entity.temporada.id))).value.data;
  const instanciaTemporada = new web3.eth.Contract(JSON.parse(temporada.abi), temporada.direccion);

  const owner = await instanciaTemporada.methods.owner().call();
  await instanciaTemporada.methods.creaEspectaculo(convertDateTimeBlockchain(entity.fechaEspectaculo), entity.nombre, entity.simbolo, '/api/espectaculo/')
  .send({from: owner, gas: 500000})
  .once('receipt', (receipt) => {
    if(receipt.events.EspectaculoCreado != null){
      entity.idEspectaculo = receipt.events.EspectaculoCreado.returnValues.id;
    }
   });

  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ESPECTACULO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IEspectaculo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ESPECTACULO,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEspectaculo> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ESPECTACULO,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
