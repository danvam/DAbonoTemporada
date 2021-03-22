import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITemporada } from 'app/shared/model/temporada.model';
import { getEntities as getTemporadas } from 'app/entities/temporada/temporada.reducer';
import { getEntity, updateEntity, createEntity, reset } from './localidad.reducer';
import { ILocalidad } from 'app/shared/model/localidad.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ILocalidadUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LocalidadUpdate = (props: ILocalidadUpdateProps) => {
  const [temporadaId, setTemporadaId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { localidadEntity, temporadas, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/localidad');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTemporadas();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...localidadEntity,
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
          <h2 id="abonoBlockchainApp.localidad.home.createOrEditLabel">
            <Translate contentKey="abonoBlockchainApp.localidad.home.createOrEditLabel">Create or edit a Localidad</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : localidadEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="localidad-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="localidad-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="idLocalidadLabel" for="localidad-idLocalidad">
                  <Translate contentKey="abonoBlockchainApp.localidad.idLocalidad">Id Localidad</Translate>
                </Label>
                <AvField id="localidad-idLocalidad" type="string" className="form-control" name="idLocalidad" disabled/>
              </AvGroup>
              <AvGroup>
                <Label id="tipoLocalidadLabel" for="localidad-tipoLocalidad">
                  <Translate contentKey="abonoBlockchainApp.localidad.tipoLocalidad">Tipo Localidad</Translate>
                </Label>
                <AvField id="localidad-tipoLocalidad" type="string" className="form-control" name="tipoLocalidad" />
              </AvGroup>
              <AvGroup>
                <Label id="nombreLabel" for="localidad-nombre">
                  <Translate contentKey="abonoBlockchainApp.localidad.nombre">Nombre</Translate>
                </Label>
                <AvField id="localidad-nombre" type="string" className="form-control" name="nombre" />
              </AvGroup>
              <AvGroup>
                <Label id="simboloLabel" for="localidad-simbolo">
                  <Translate contentKey="abonoBlockchainApp.localidad.simbolo">Simbolo</Translate>
                </Label>
                <AvField id="localidad-simbolo" type="string" className="form-control" name="simbolo" />
              </AvGroup>
              <AvGroup>
                <Label for="localidad-temporada">
                  <Translate contentKey="abonoBlockchainApp.localidad.temporada">Temporada</Translate>
                </Label>
                <AvInput id="localidad-temporada" type="select" className="form-control" name="temporada.id">
                  <option value="" key="0" />
                  {temporadas
                    ? temporadas.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.nombre}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/localidad" replace color="info">
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
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  temporadas: storeState.temporada.entities,
  localidadEntity: storeState.localidad.entity,
  loading: storeState.localidad.loading,
  updating: storeState.localidad.updating,
  updateSuccess: storeState.localidad.updateSuccess,
});

const mapDispatchToProps = {
  getTemporadas,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LocalidadUpdate);
