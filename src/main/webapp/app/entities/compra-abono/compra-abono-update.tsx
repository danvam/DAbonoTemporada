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
import { IApplicationUser } from 'app/shared/model/application-user.model';
import { getEntities as getApplicationUsers } from 'app/entities/application-user/application-user.reducer';
import { getEntity, updateEntity, createEntity, reset } from './compra-abono.reducer';
import { ICompraAbono } from 'app/shared/model/compra-abono.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICompraAbonoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CompraAbonoUpdate = (props: ICompraAbonoUpdateProps) => {
  const [localidadId, setLocalidadId] = useState('0');
  const [internalUserId, setInternalUserId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { compraAbonoEntity, localidads, applicationUsers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/compra-abono');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getLocalidads();
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
        ...compraAbonoEntity,
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
          <h2 id="abonoBlockchainApp.compraAbono.home.createOrEditLabel">
            <Translate contentKey="abonoBlockchainApp.compraAbono.home.createOrEditLabel">Create or edit a CompraAbono</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : compraAbonoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="compra-abono-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="compra-abono-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label for="compra-abono-localidad">
                  <Translate contentKey="abonoBlockchainApp.compraAbono.localidad">Localidad</Translate>
                </Label>
                <AvInput id="compra-abono-localidad" type="select" className="form-control" name="localidad.id">
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
                <Label for="compra-abono-internalUser">
                  <Translate contentKey="abonoBlockchainApp.compraAbono.internalUser">Internal User</Translate>
                </Label>
                <AvInput id="compra-abono-internalUser" type="select" className="form-control" name="internalUser.id">
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
              <Button tag={Link} id="cancel-save" to="/compra-abono" replace color="info">
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
  applicationUsers: storeState.applicationUser.entities,
  compraAbonoEntity: storeState.compraAbono.entity,
  loading: storeState.compraAbono.loading,
  updating: storeState.compraAbono.updating,
  updateSuccess: storeState.compraAbono.updateSuccess,
});

const mapDispatchToProps = {
  getLocalidads,
  getApplicationUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompraAbonoUpdate);
