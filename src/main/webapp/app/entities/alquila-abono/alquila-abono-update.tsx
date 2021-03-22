import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ILocalidad } from 'app/shared/model/localidad.model';
import { getEntities as getLocalidads } from 'app/entities/localidad/localidad.reducer';
import { IEspectaculo } from 'app/shared/model/espectaculo.model';
import { getEntities as getEspectaculos } from 'app/entities/espectaculo/espectaculo.reducer';
import { IApplicationUser } from 'app/shared/model/application-user.model';
import { getEntities as getApplicationUsers } from 'app/entities/application-user/application-user.reducer';
import { getEntity, updateEntity, createEntity, reset } from './alquila-abono.reducer';
import { IAlquilaAbono } from 'app/shared/model/alquila-abono.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAlquilaAbonoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AlquilaAbonoUpdate = (props: IAlquilaAbonoUpdateProps) => {
  const [localidadId, setLocalidadId] = useState('0');
  const [espectaculoId, setEspectaculoId] = useState('0');
  const [internalUserId, setInternalUserId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { alquilaAbonoEntity, localidads, espectaculos, applicationUsers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/alquila-abono');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getLocalidads();
    props.getEspectaculos();
    props.getApplicationUsers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...alquilaAbonoEntity,
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
          <h2 id="abonoBlockchainApp.alquilaAbono.home.createOrEditLabel">
            <Translate contentKey="abonoBlockchainApp.alquilaAbono.home.createOrEditLabel">Create or edit a AlquilaAbono</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : alquilaAbonoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="alquila-abono-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="alquila-abono-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label for="alquila-abono-localidad">
                  <Translate contentKey="abonoBlockchainApp.alquilaAbono.localidad">Localidad</Translate>
                </Label>
                <AvInput id="alquila-abono-localidad" type="select" className="form-control" name="localidad.id">
                  <option value="" key="0" />
                  {localidads
                    ? localidads.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.idLocalidad}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="alquila-abono-espectaculo">
                  <Translate contentKey="abonoBlockchainApp.alquilaAbono.espectaculo">Espectaculo</Translate>
                </Label>
                <AvInput id="alquila-abono-espectaculo" type="select" className="form-control" name="espectaculo.id">
                  <option value="" key="0" />
                  {espectaculos
                    ? espectaculos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.idEspectaculo}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="alquila-abono-internalUser">
                  <Translate contentKey="abonoBlockchainApp.alquilaAbono.internalUser">Internal User</Translate>
                </Label>
                <AvInput id="alquila-abono-internalUser" type="select" className="form-control" name="internalUser.id">
                  <option value="" key="0" />
                  {applicationUsers
                    ? applicationUsers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.direccion}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/alquila-abono" replace color="info">
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
  localidads: storeState.localidad.entities,
  espectaculos: storeState.espectaculo.entities,
  applicationUsers: storeState.applicationUser.entities,
  alquilaAbonoEntity: storeState.alquilaAbono.entity,
  loading: storeState.alquilaAbono.loading,
  updating: storeState.alquilaAbono.updating,
  updateSuccess: storeState.alquilaAbono.updateSuccess,
});

const mapDispatchToProps = {
  getLocalidads,
  getEspectaculos,
  getApplicationUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AlquilaAbonoUpdate);
