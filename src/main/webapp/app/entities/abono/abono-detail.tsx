import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './abono.reducer';
import { IAbono } from 'app/shared/model/abono.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAbonoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AbonoDetail = (props: IAbonoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { abonoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="abonoBlockchainApp.abono.detail.title">Abono</Translate> [<b>{abonoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="fechaAlquilerDesde">
              <Translate contentKey="abonoBlockchainApp.abono.fechaAlquilerDesde">Fecha Alquiler Desde</Translate>
            </span>
          </dt>
          <dd>
            {abonoEntity.fechaAlquilerDesde ? (
              <TextFormat value={abonoEntity.fechaAlquilerDesde} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="fechaAlquilerHasta">
              <Translate contentKey="abonoBlockchainApp.abono.fechaAlquilerHasta">Fecha Alquiler Hasta</Translate>
            </span>
          </dt>
          <dd>
            {abonoEntity.fechaAlquilerHasta ? (
              <TextFormat value={abonoEntity.fechaAlquilerHasta} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="direccion">
              <Translate contentKey="abonoBlockchainApp.abono.direccion">Direccion</Translate>
            </span>
          </dt>
          <dd>{abonoEntity.direccion}</dd>
          <dt>
            <span id="idLocalidad">
              <Translate contentKey="abonoBlockchainApp.abono.idLocalidad">Id Localidad</Translate>
            </span>
          </dt>
          <dd>{abonoEntity.idLocalidad}</dd>
          <dt>
            <Translate contentKey="abonoBlockchainApp.abono.internalUser">Internal User</Translate>
          </dt>
          <dd>{abonoEntity.internalUser ? abonoEntity.internalUser.direccion : ''}</dd>
          <dt>
            <Translate contentKey="abonoBlockchainApp.abono.temporada">Temporada</Translate>
          </dt>
          <dd>{abonoEntity.temporada ? abonoEntity.temporada.nombre : ''}</dd>
        </dl>
        <Button tag={Link} to="/abono" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ abono }: IRootState) => ({
  abonoEntity: abono.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AbonoDetail);
