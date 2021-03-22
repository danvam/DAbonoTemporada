import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './aprobar-tokens.reducer';
import { IAprobarTokens } from 'app/shared/model/aprobar-tokens.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAprobarTokensDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AprobarTokensDetail = (props: IAprobarTokensDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { aprobarTokensEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="abonoBlockchainApp.aprobarTokens.detail.title">AprobarTokens</Translate> [<b>{aprobarTokensEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="cantidad">
              <Translate contentKey="abonoBlockchainApp.aprobarTokens.cantidad">Cantidad</Translate>
            </span>
          </dt>
          <dd>{aprobarTokensEntity.cantidad}</dd>
          <dt>
            <span id="password">
              <Translate contentKey="abonoBlockchainApp.aprobarTokens.operation">Operation</Translate>
            </span>
          </dt>
          <dd>{aprobarTokensEntity.password}</dd>
          <dt>
            <Translate contentKey="abonoBlockchainApp.aprobarTokens.temporada">Temporada</Translate>
          </dt>
          <dd>{aprobarTokensEntity.temporada ? aprobarTokensEntity.temporada.nombre : ''}</dd>
        </dl>
        <dt>
            <Translate contentKey="abonoBlockchainApp.aprobarTokens.applicationUser">Application User</Translate>
        </dt>
        <dd>{aprobarTokensEntity.applicationUser ? aprobarTokensEntity.applicationUser.direccion : ''}</dd>
        <Button tag={Link} to="/aprobar-tokens" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ aprobarTokens }: IRootState) => ({
  aprobarTokensEntity: aprobarTokens.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AprobarTokensDetail);
