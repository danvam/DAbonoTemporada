import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITemporada, defaultValue } from 'app/shared/model/temporada.model';
import { Etapas } from 'app/shared/model/enumerations/etapas.model';

import { WEB3_PROVIDER } from 'app/config/constants';
import Web3 from 'web3';

export const ACTION_TYPES = {
  FETCH_TEMPORADA_LIST: 'temporada/FETCH_TEMPORADA_LIST',
  FETCH_TEMPORADA: 'temporada/FETCH_TEMPORADA',
  CREATE_TEMPORADA: 'temporada/CREATE_TEMPORADA',
  UPDATE_TEMPORADA: 'temporada/UPDATE_TEMPORADA',
  DELETE_TEMPORADA: 'temporada/DELETE_TEMPORADA',
  RESET: 'temporada/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITemporada>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type TemporadaState = Readonly<typeof initialState>;

// Reducer

export default (state: TemporadaState = initialState, action): TemporadaState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TEMPORADA_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TEMPORADA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_TEMPORADA):
    case REQUEST(ACTION_TYPES.UPDATE_TEMPORADA):
    case REQUEST(ACTION_TYPES.DELETE_TEMPORADA):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TEMPORADA_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TEMPORADA):
    case FAILURE(ACTION_TYPES.CREATE_TEMPORADA):
    case FAILURE(ACTION_TYPES.UPDATE_TEMPORADA):
    case FAILURE(ACTION_TYPES.DELETE_TEMPORADA):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TEMPORADA_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TEMPORADA):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_TEMPORADA):
    case SUCCESS(ACTION_TYPES.UPDATE_TEMPORADA):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TEMPORADA):
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

const apiUrl = 'api/temporadas';

// Actions

export const getEntities: ICrudGetAllAction<ITemporada> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TEMPORADA_LIST,
  payload: axios.get<ITemporada>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ITemporada> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TEMPORADA,
    payload: axios.get<ITemporada>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ITemporada> = entity => async dispatch => {

  const web3 = new Web3(WEB3_PROVIDER);
  const instanciaTemporada = new web3.eth.Contract(JSON.parse(entity.abi), entity.direccion);

  entity.nombre = await instanciaTemporada.methods.nombre().call();
  entity.actualIdLocalidad = await instanciaTemporada.methods.actualIdLocalidad().call();
  entity.actualIdEspectaculo = await instanciaTemporada.methods.actualIdEspectaculo().call();
  entity.actualIdAbono = await instanciaTemporada.methods.actualIdAbono().call();
  entity.precioBase = await instanciaTemporada.methods.precioBase().call();
  entity.tiposLocalidad = await instanciaTemporada.methods.tiposLocalidad().call();
  entity.factorIncrementoTipo = await instanciaTemporada.methods.factorIncrementoTipo().call();
  entity.dineroAbono = await instanciaTemporada.methods.dineroAbono().call();
  entity.porcentajeAlquiler = await instanciaTemporada.methods.porcentajeAlquiler().call();
  entity.faseEtapa = await instanciaTemporada.methods.faseTemporada().call();

  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TEMPORADA,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};
       /* eslint-disable no-console */
export const updateEntity: ICrudPutAction<ITemporada> = entity => async dispatch => {

  const web3 = new Web3(WEB3_PROVIDER);
  const instanciaTemporada = new web3.eth.Contract(JSON.parse(entity.abi), entity.direccion);

  const owner = await instanciaTemporada.methods.owner().call();
  let gasPermitido = 500000;
  if(entity.faseEtapa === Etapas.CREACION){
    gasPermitido = await instanciaTemporada.methods.iniciaPeriodoAbono().estimateGas({gas: gasPermitido ,from: owner});
    await instanciaTemporada.methods.iniciaPeriodoAbono().send({from: owner, gas: gasPermitido});
  }else if(entity.faseEtapa === Etapas.ABONO){
    gasPermitido = await instanciaTemporada.methods.iniciaTemporada().estimateGas({gas: gasPermitido ,from: owner});
    await instanciaTemporada.methods.iniciaTemporada().send({from: owner, gas: gasPermitido});
  }else if(entity.faseEtapa === Etapas.INICIADA){
    gasPermitido = await instanciaTemporada.methods.finalizaTemporada().estimateGas({gas: gasPermitido ,from: owner});
    await instanciaTemporada.methods.finalizaTemporada().send({from: owner, gas: gasPermitido});
  } 
  entity.faseEtapa = await instanciaTemporada.methods.faseTemporada().call();
  entity.actualIdLocalidad = await instanciaTemporada.methods.actualIdLocalidad().call();
  entity.actualIdEspectaculo = await instanciaTemporada.methods.actualIdEspectaculo().call();
  entity.actualIdAbono = await instanciaTemporada.methods.actualIdAbono().call();

  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TEMPORADA,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  console.log("result:: ", result);
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITemporada> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TEMPORADA,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
