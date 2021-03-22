import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './alquila-abono.reducer';
import { IAlquilaAbono } from 'app/shared/model/alquila-abono.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAlquilaAbonoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AlquilaAbonoDetail = (props: IAlquilaAbonoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { alquilaAbonoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="abonoBlockchainApp.alquilaAbono.detail.title">AlquilaAbono</Translate> [<b>{alquilaAbonoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <Translate contentKey="abonoBlockchainApp.alquilaAbono.localidad">Localidad</Translate>
          </dt>
          <dd>{alquilaAbonoEntity.localidad ? alquilaAbonoEntity.localidad.idLocalidad : ''}</dd>
          <dt>
            <Translate contentKey="abonoBlockchainApp.alquilaAbono.espectaculo">Espectaculo</Translate>
          </dt>
          <dd>{alquilaAbonoEntity.espectaculo ? alquilaAbonoEntity.espectaculo.idEspectaculo : ''}</dd>
          <dt>
            <Translate contentKey="abonoBlockchainApp.alquilaAbono.internalUser">Internal User</Translate>
          </dt>
          <dd>{alquilaAbonoEntity.internalUser ? alquilaAbonoEntity.internalUser.direccion : ''}</dd>
        </dl>
        <Button tag={Link} to="/alquila-abono" replace color="info">
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

const mapStateToProps = ({ alquilaAbono }: IRootState) => ({
  alquilaAbonoEntity: alquilaAbono.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AlquilaAbonoDetail);
