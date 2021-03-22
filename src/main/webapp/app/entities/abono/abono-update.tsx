import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IApplicationUser } from 'app/shared/model/application-user.model';
import { getEntities as getApplicationUsers } from 'app/entities/application-user/application-user.reducer';
import { ITemporada } from 'app/shared/model/temporada.model';
import { getEntities as getTemporadas } from 'app/entities/temporada/temporada.reducer';
import { getEntity, updateEntity, createEntity, reset } from './abono.reducer';
import { IAbono } from 'app/shared/model/abono.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAbonoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AbonoUpdate = (props: IAbonoUpdateProps) => {
  const [internalUserId, setInternalUserId] = useState('0');
  const [temporadaId, setTemporadaId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { abonoEntity, applicationUsers, temporadas, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/abono');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getApplicationUsers();
    props.getTemporadas();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.fechaAlquilerDesde = convertDateTimeToServer(values.fechaAlquilerDesde);
    values.fechaAlquilerHasta = convertDateTimeToServer(values.fechaAlquilerHasta);

    if (errors.length === 0) {
      const entity = {
        ...abonoEntity,
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
          <h2 id="abonoBlockchainApp.abono.home.createOrEditLabel">
            <Translate contentKey="abonoBlockchainApp.abono.home.createOrEditLabel">Create or edit a Abono</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : abonoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="abono-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="abono-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="fechaAlquilerDesdeLabel" for="abono-fechaAlquilerDesde">
                  <Translate contentKey="abonoBlockchainApp.abono.fechaAlquilerDesde">Fecha Alquiler Desde</Translate>
                </Label>
                <AvInput
                  id="abono-fechaAlquilerDesde"
                  type="datetime-local"
                  className="form-control"
                  name="fechaAlquilerDesde"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.abonoEntity.fechaAlquilerDesde)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="fechaAlquilerHastaLabel" for="abono-fechaAlquilerHasta">
                  <Translate contentKey="abonoBlockchainApp.abono.fechaAlquilerHasta">Fecha Alquiler Hasta</Translate>
                </Label>
                <AvInput
                  id="abono-fechaAlquilerHasta"
                  type="datetime-local"
                  className="form-control"
                  name="fechaAlquilerHasta"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.abonoEntity.fechaAlquilerHasta)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="direccionLabel" for="abono-direccion">
                  <Translate contentKey="abonoBlockchainApp.abono.direccion">Direccion</Translate>
                </Label>
                <AvField id="abono-direccion" type="text" name="direccion" disabled/>
              </AvGroup>
              <AvGroup>
                <Label id="idLocalidadLabel" for="abono-idLocalidad">
                  <Translate contentKey="abonoBlockchainApp.abono.idLocalidad">Id Localidad</Translate>
                </Label>
                <AvField id="abono-idLocalidad" type="text" name="idLocalidad" disabled/>
              </AvGroup>
              <AvGroup>
                <Label for="abono-internalUser">
                  <Translate contentKey="abonoBlockchainApp.abono.internalUser">Internal User</Translate>
                </Label>
                <AvInput id="abono-internalUser" type="select" className="form-control" name="internalUser.id" disabled>
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
              <AvGroup>
                <Label for="abono-temporada">
                  <Translate contentKey="abonoBlockchainApp.abono.temporada">Temporada</Translate>
                </Label>
                <AvInput id="abono-temporada" type="select" className="form-control" name="temporada.id" disabled>
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
              <Button tag={Link} id="cancel-save" to="/abono" replace color="info">
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
  applicationUsers: storeState.applicationUser.entities,
  temporadas: storeState.temporada.entities,
  abonoEntity: storeState.abono.entity,
  loading: storeState.abono.loading,
  updating: storeState.abono.updating,
  updateSuccess: storeState.abono.updateSuccess,
});

const mapDispatchToProps = {
  getApplicationUsers,
  getTemporadas,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AbonoUpdate);
