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
import { getEntity, updateEntity, createEntity, reset } from './transferir-tokens.reducer';
import { ITransferirTokens } from 'app/shared/model/transferir-tokens.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITransferirTokensUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TransferirTokensUpdate = (props: ITransferirTokensUpdateProps) => {
  const [applicationUserId, setApplicationUserId] = useState('0');
  const [temporadaId, setTemporadaId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { transferirTokensEntity, applicationUsers, temporadas, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/transferir-tokens');
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
    if (errors.length === 0) {
      const entity = {
        ...transferirTokensEntity,
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
          <h2 id="abonoBlockchainApp.transferirTokens.home.createOrEditLabel">
            <Translate contentKey="abonoBlockchainApp.transferirTokens.home.createOrEditLabel">Desploquear Cuenta o Transferir Tokens</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : transferirTokensEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="transferir-tokens-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="transferir-tokens-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="cantidadLabel" for="transferir-tokens-cantidad">
                  <Translate contentKey="abonoBlockchainApp.transferirTokens.cantidad">Cantidad</Translate>
                </Label>
                <AvField id="transferir-tokens-cantidad" type="string" className="form-control" name="cantidad" />
              </AvGroup>
              <AvGroup>
                <Label id="passwordLabel" for="transferir-tokens-password">
                  <Translate contentKey="abonoBlockchainApp.transferirTokens.password">Password</Translate>
                </Label>
                <AvField id="transferir-tokens-password" type="password" name="password" />
              </AvGroup>
              <AvGroup>
                <Label for="transferir-tokens-applicationUser">
                  <Translate contentKey="abonoBlockchainApp.transferirTokens.applicationUser">Application User</Translate>
                </Label>
                <AvInput id="transferir-tokens-applicationUser" type="select" className="form-control" name="applicationUser.id">
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
                <Label for="transferir-tokens-temporada">
                  <Translate contentKey="abonoBlockchainApp.transferirTokens.temporada">Temporada</Translate>
                </Label>
                <AvInput id="transferir-tokens-temporada" type="select" className="form-control" name="temporada.id">
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
              <Button tag={Link} id="cancel-save" to="/transferir-tokens" replace color="info">
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
  transferirTokensEntity: storeState.transferirTokens.entity,
  loading: storeState.transferirTokens.loading,
  updating: storeState.transferirTokens.updating,
  updateSuccess: storeState.transferirTokens.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(TransferirTokensUpdate);
