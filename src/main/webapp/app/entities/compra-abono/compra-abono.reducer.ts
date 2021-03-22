import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICompraAbono, defaultValue } from 'app/shared/model/compra-abono.model';

import { getEntity as getTemporada } from 'app/entities/temporada/temporada.reducer';
import { getEntity as getLocalidad } from 'app/entities/localidad/localidad.reducer';
import { getEntity as getApplicationUser } from 'app/entities/application-user/application-user.reducer';
import { createEntity as createAbono } from 'app/entities/abono/abono.reducer';
import { WEB3_PROVIDER } from 'app/config/constants';
import Web3 from 'web3';

export const ACTION_TYPES = {
  FETCH_COMPRAABONO_LIST: 'compraAbono/FETCH_COMPRAABONO_LIST',
  FETCH_COMPRAABONO: 'compraAbono/FETCH_COMPRAABONO',
  CREATE_COMPRAABONO: 'compraAbono/CREATE_COMPRAABONO',
  UPDATE_COMPRAABONO: 'compraAbono/UPDATE_COMPRAABONO',
  DELETE_COMPRAABONO: 'compraAbono/DELETE_COMPRAABONO',
  RESET: 'compraAbono/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICompraAbono>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type CompraAbonoState = Readonly<typeof initialState>;

// Reducer

export default (state: CompraAbonoState = initialState, action): CompraAbonoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COMPRAABONO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COMPRAABONO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_COMPRAABONO):
    case REQUEST(ACTION_TYPES.UPDATE_COMPRAABONO):
    case REQUEST(ACTION_TYPES.DELETE_COMPRAABONO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_COMPRAABONO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COMPRAABONO):
    case FAILURE(ACTION_TYPES.CREATE_COMPRAABONO):
    case FAILURE(ACTION_TYPES.UPDATE_COMPRAABONO):
    case FAILURE(ACTION_TYPES.DELETE_COMPRAABONO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPRAABONO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPRAABONO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_COMPRAABONO):
    case SUCCESS(ACTION_TYPES.UPDATE_COMPRAABONO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_COMPRAABONO):
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

const apiUrl = 'api/compra-abonos';

// Actions

export const getEntities: ICrudGetAllAction<ICompraAbono> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COMPRAABONO_LIST,
  payload: axios.get<ICompraAbono>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ICompraAbono> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COMPRAABONO,
    payload: axios.get<ICompraAbono>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ICompraAbono> = entity => async dispatch => {

  const web3 = new Web3(WEB3_PROVIDER);
  const localidad = (await dispatch(getLocalidad(entity.localidad.id))).value.data;
  const temporada = (await dispatch(getTemporada(localidad.temporada.id))).value.data;
  const applicationUser = (await dispatch(getApplicationUser(entity.internalUser.id))).value.data;

  const instanciaTemporada = new web3.eth.Contract(JSON.parse(temporada.abi), temporada.direccion);
  
  await instanciaTemporada.methods.compraAbono(temporada.nombre + localidad.simbolo, entity.internalUser.id , '/api/abonado/', localidad.idLocalidad)
  .send({from: applicationUser.direccion, gas: 500000})
  .once('receipt', (receipt) => {
    if(receipt.events.AbonoComprado != null){
      dispatch(createAbono({ idLocalidad: localidad.idLocalidad , direccion: receipt.events.AbonoComprado.returnValues.abono, internalUser: applicationUser, temporada : localidad.temporada}));
    }
   });

  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COMPRAABONO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICompraAbono> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COMPRAABONO,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICompraAbono> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COMPRAABONO,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
