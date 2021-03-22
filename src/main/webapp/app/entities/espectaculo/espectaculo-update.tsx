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
import { getEntity, updateEntity, createEntity, reset } from './espectaculo.reducer';
import { IEspectaculo } from 'app/shared/model/espectaculo.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEspectaculoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EspectaculoUpdate = (props: IEspectaculoUpdateProps) => {
  const [temporadaId, setTemporadaId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { espectaculoEntity, temporadas, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/espectaculo');
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
    values.fechaEspectaculo = convertDateTimeToServer(values.fechaEspectaculo);

    if (errors.length === 0) {
      const entity = {
        ...espectaculoEntity,
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
          <h2 id="abonoBlockchainApp.espectaculo.home.createOrEditLabel">
            <Translate contentKey="abonoBlockchainApp.espectaculo.home.createOrEditLabel">Create or edit a Espectaculo</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : espectaculoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="espectaculo-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="espectaculo-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="idEspectaculoLabel" for="espectaculo-idEspectaculo">
                  <Translate contentKey="abonoBlockchainApp.espectaculo.idEspectaculo">Id Espectaculo</Translate>
                </Label>
                <AvField id="espectaculo-idEspectaculo" type="string" className="form-control" name="idEspectaculo" disabled/>
              </AvGroup>
              <AvGroup>
                <Label id="fechaEspectaculoLabel" for="espectaculo-fechaEspectaculo">
                  <Translate contentKey="abonoBlockchainApp.espectaculo.fechaEspectaculo">Fecha Espectaculo</Translate>
                </Label>
                <AvInput
                  id="espectaculo-fechaEspectaculo"
                  type="datetime-local"
                  className="form-control"
                  name="fechaEspectaculo"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.espectaculoEntity.fechaEspectaculo)}
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="nombreLabel" for="espectaculo-nombre">
                  <Translate contentKey="abonoBlockchainApp.espectaculo.nombre">Nombre</Translate>
                </Label>
                <AvField
                  id="espectaculo-nombre"
                  type="text"
                  name="nombre"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="simboloLabel" for="espectaculo-simbolo">
                  <Translate contentKey="abonoBlockchainApp.espectaculo.simbolo">Simbolo</Translate>
                </Label>
                <AvField
                  id="espectaculo-simbolo"
                  type="text"
                  name="simbolo"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="espectaculo-temporada">
                  <Translate contentKey="abonoBlockchainApp.espectaculo.temporada">Temporada</Translate>
                </Label>
                <AvInput id="espectaculo-temporada" type="select" className="form-control" name="temporada.id">
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
              <Button tag={Link} id="cancel-save" to="/espectaculo" replace color="info">
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
  espectaculoEntity: storeState.espectaculo.entity,
  loading: storeState.espectaculo.loading,
  updating: storeState.espectaculo.updating,
  updateSuccess: storeState.espectaculo.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(EspectaculoUpdate);
