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
import { IApplicationUser } from 'app/shared/model/application-user.model';
import { getEntities as getApplicationUsers } from 'app/entities/application-user/application-user.reducer';
import { getEntity, updateEntity, createEntity, reset } from './aprobar-tokens.reducer';
import { IAprobarTokens } from 'app/shared/model/aprobar-tokens.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAprobarTokensUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AprobarTokensUpdate = (props: IAprobarTokensUpdateProps) => {
  const [temporadaId, setTemporadaId] = useState('0');
  const [applicationUserId, setApplicationUserId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { aprobarTokensEntity, temporadas, applicationUsers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/aprobar-tokens');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getTemporadas();
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
        ...aprobarTokensEntity,
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
          <h2 id="abonoBlockchainApp.aprobarTokens.home.createOrEditLabel">
            <Translate contentKey="abonoBlockchainApp.aprobarTokens.home.createOrEditLabel">Create or edit a AprobarTokens</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : aprobarTokensEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="aprobar-tokens-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="aprobar-tokens-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="cantidadLabel" for="aprobar-tokens-cantidad">
                  <Translate contentKey="abonoBlockchainApp.aprobarTokens.cantidad">Cantidad</Translate>
                </Label>
                <AvField id="aprobar-tokens-cantidad" type="string" className="form-control" name="cantidad" />
              </AvGroup>
              <AvGroup>
                <Label id="passwordLabel" for="aprobar-tokens-password">
                  <Translate contentKey="abonoBlockchainApp.aprobarTokens.password">Password</Translate>
                </Label>
                <AvField id="aprobar-tokens-password" type="password" name="password" />
              </AvGroup>
              <AvGroup>
                <Label for="aprobar-tokens-temporada">
                  <Translate contentKey="abonoBlockchainApp.aprobarTokens.temporada">Temporada</Translate>
                </Label>
                <AvInput id="aprobar-tokens-temporada" type="select" className="form-control" name="temporada.id">
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
	      <AvGroup>
                <Label for="aprobar-tokens-applicationUser">
                  <Translate contentKey="abonoBlockchainApp.aprobarTokens.applicationUser">Application User</Translate>
                </Label>
                <AvInput id="aprobar-tokens-applicationUser" type="select" className="form-control" name="applicationUser.id">
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
              <Button tag={Link} id="cancel-save" to="/aprobar-tokens" replace color="info">
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
  applicationUsers: storeState.applicationUser.entities,
  aprobarTokensEntity: storeState.aprobarTokens.entity,
  loading: storeState.aprobarTokens.loading,
  updating: storeState.aprobarTokens.updating,
  updateSuccess: storeState.aprobarTokens.updateSuccess,
});

const mapDispatchToProps = {
  getTemporadas,
  getApplicationUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AprobarTokensUpdate);
