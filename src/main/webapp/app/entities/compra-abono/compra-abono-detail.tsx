import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './compra-abono.reducer';
import { ICompraAbono } from 'app/shared/model/compra-abono.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompraAbonoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CompraAbonoDetail = (props: ICompraAbonoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { compraAbonoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="abonoBlockchainApp.compraAbono.detail.title">CompraAbono</Translate> [<b>{compraAbonoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <Translate contentKey="abonoBlockchainApp.compraAbono.localidad">Localidad</Translate>
          </dt>
          <dd>{compraAbonoEntity.localidad ? compraAbonoEntity.localidad.idLocalidad : ''}</dd>
          <dt>
            <Translate contentKey="abonoBlockchainApp.compraAbono.internalUser">Internal User</Translate>
          </dt>
          <dd>{compraAbonoEntity.internalUser ? compraAbonoEntity.internalUser.direccion : ''}</dd>
        </dl>
        <Button tag={Link} to="/compra-abono" replace color="info">
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

const mapStateToProps = ({ compraAbono }: IRootState) => ({
  compraAbonoEntity: compraAbono.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompraAbonoDetail);
