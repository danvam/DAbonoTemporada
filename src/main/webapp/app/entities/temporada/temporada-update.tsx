import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './temporada.reducer';
import { ITemporada } from 'app/shared/model/temporada.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITemporadaUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TemporadaUpdate = (props: ITemporadaUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { temporadaEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/temporada');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...temporadaEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="abonoBlockchainApp.temporada.home.createOrEditLabel">
            <Translate contentKey="abonoBlockchainApp.temporada.home.createOrEditLabel">Create or edit a Temporada</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : temporadaEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="temporada-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="temporada-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="faseEtapaLabel" for="temporada-faseEtapa">
                  <Translate contentKey="abonoBlockchainApp.temporada.faseEtapa">Fase Etapa</Translate>
                </Label>
                <AvInput disabled
                  id="temporada-faseEtapa"
                  type="select"
                  className="form-control"
                  name="faseEtapa"
                  value={(!isNew && temporadaEntity.faseEtapa) || 'CREACION'}
                >
                  <option value="CREACION">{translate('abonoBlockchainApp.Etapas.CREACION')}</option>
                  <option value="ABONO">{translate('abonoBlockchainApp.Etapas.ABONO')}</option>
                  <option value="INICIADA">{translate('abonoBlockchainApp.Etapas.INICIADA')}</option>
                  <option value="FINALIZADA">{translate('abonoBlockchainApp.Etapas.FINALIZADA')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="nombreLabel" for="temporada-nombre">
                  <Translate contentKey="abonoBlockchainApp.temporada.nombre">Nombre</Translate>
                </Label>
                <AvField id="temporada-nombre" type="text" name="nombre" disabled/>
              </AvGroup>
              <AvGroup>
                <Label id="actualIdLocalidadLabel" for="temporada-actualIdLocalidad">
                  <Translate contentKey="abonoBlockchainApp.temporada.actualIdLocalidad">Actual Id Localidad</Translate>
                </Label>
                <AvField id="temporada-actualIdLocalidad" type="string" className="form-control" name="actualIdLocalidad" disabled/>
              </AvGroup>
              <AvGroup>
                <Label id="actualIdEspectaculoLabel" for="temporada-actualIdEspectaculo">
                  <Translate contentKey="abonoBlockchainApp.temporada.actualIdEspectaculo">Actual Id Espectaculo</Translate>
                </Label>
                <AvField id="temporada-actualIdEspectaculo" type="string" className="form-control" name="actualIdEspectaculo" disabled/>
              </AvGroup>
              <AvGroup>
                <Label id="actualIdAbonoLabel" for="temporada-actualIdAbono">
                  <Translate contentKey="abonoBlockchainApp.temporada.actualIdAbono">Actual Id Abono</Translate>
                </Label>
                <AvField id="temporada-actualIdAbono" type="string" className="form-control" name="actualIdAbono" disabled/>
              </AvGroup>
              <AvGroup>
                <Label id="precioBaseLabel" for="temporada-precioBase">
                  <Translate contentKey="abonoBlockchainApp.temporada.precioBase">Precio Base</Translate>
                </Label>
                <AvField id="temporada-precioBase" type="string" className="form-control" name="precioBase" disabled/>
              </AvGroup>
              <AvGroup>
                <Label id="tiposLocalidadLabel" for="temporada-tiposLocalidad">
                  <Translate contentKey="abonoBlockchainApp.temporada.tiposLocalidad">Tipos Localidad</Translate>
                </Label>
                <AvField id="temporada-tiposLocalidad" type="string" className="form-control" name="tiposLocalidad" disabled />
              </AvGroup>
              <AvGroup>
                <Label id="factorIncrementoTipoLabel" for="temporada-factorIncrementoTipo">
                  <Translate contentKey="abonoBlockchainApp.temporada.factorIncrementoTipo">Factor Incremento Tipo</Translate>
                </Label>
                <AvField id="temporada-factorIncrementoTipo" type="string" className="form-control" name="factorIncrementoTipo" disabled/>
              </AvGroup>
              <AvGroup>
                <Label id="porcentajeAlquilerLabel" for="temporada-porcentajeAlquiler">
                  <Translate contentKey="abonoBlockchainApp.temporada.porcentajeAlquiler">Porcentaje Alquiler</Translate>
                </Label>
                <AvField id="temporada-porcentajeAlquiler" type="string" className="form-control" name="porcentajeAlquiler" disabled/>
              </AvGroup>
              <AvGroup>
                <Label id="dineroAbonoLabel" for="temporada-dineroAbono">
                  <Translate contentKey="abonoBlockchainApp.temporada.dineroAbono">Dinero Abono</Translate>
                </Label>
                <AvField id="temporada-dineroAbono" type="text" name="dineroAbono" disabled/>
              </AvGroup>
              <AvGroup>
                <Label id="direccionLabel" for="temporada-direccion">
                  <Translate contentKey="abonoBlockchainApp.temporada.direccion">direccion</Translate>
                </Label>
                <AvField 
			id="temporada-direccion" 
			type="text" 
			name="direccion" 
			disabled={!isNew}
                validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="abiLabel" for="temporada-abi">
                  <Translate contentKey="abonoBlockchainApp.temporada.abi">Abi</Translate>
                </Label>
                <AvField 
		  id="temporada-abi" 
                  type="text"
			className="form-control" 
			name="abi" disabled={!isNew}
                validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 6000, errorMessage: translate('entity.validation.maxlength', { max: 6000 }) },
                }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="abiDAbonoLabel" for="temporada-abiDAbono">
                  <Translate contentKey="abonoBlockchainApp.temporada.abiDAbono">abi DAbono</Translate>
                </Label>
                <AvField id="temporada-abiDAbono" type="text" className="form-control" name="abiDAbono" disabled={!isNew}
                validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    maxLength: { value: 6000, errorMessage: translate('entity.validation.maxlength', { max: 6000 }) },
                }}
                />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/temporada" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                {!isNew && <Translate contentKey="abonoBlockchainApp.temporada.transitar">Cambiar de fase</Translate>}
                {isNew && <Translate contentKey="entity.action.save">Save</Translate>}
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  temporadaEntity: storeState.temporada.entity,
  loading: storeState.temporada.loading,
  updating: storeState.temporada.updating,
  updateSuccess: storeState.temporada.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TemporadaUpdate);
