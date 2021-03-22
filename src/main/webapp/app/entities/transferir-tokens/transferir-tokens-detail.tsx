import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './transferir-tokens.reducer';
import { ITransferirTokens } from 'app/shared/model/transferir-tokens.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITransferirTokensDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TransferirTokensDetail = (props: ITransferirTokensDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { transferirTokensEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="abonoBlockchainApp.transferirTokens.detail.title">TransferirTokens</Translate> [
          <b>{transferirTokensEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="cantidad">
              <Translate contentKey="abonoBlockchainApp.transferirTokens.cantidad">Cantidad</Translate>
            </span>
          </dt>
          <dd>{transferirTokensEntity.cantidad}</dd>
          <dt>
            <span id="password">
              <Translate contentKey="abonoBlockchainApp.transferirTokens.operacion">Operacion</Translate>
            </span>
          </dt>
          <dd>{transferirTokensEntity.password}</dd>
          <dt>
            <Translate contentKey="abonoBlockchainApp.transferirTokens.applicationUser">Application User</Translate>
          </dt>
          <dd>{transferirTokensEntity.applicationUser ? transferirTokensEntity.applicationUser.direccion : ''}</dd>
	        <dt>
            <Translate contentKey="abonoBlockchainApp.transferirTokens.temporada">Temporada</Translate>
          </dt>
          <dd>{transferirTokensEntity.temporada ? transferirTokensEntity.temporada.nombre : ''}</dd>
        </dl>
        <Button tag={Link} to="/transferir-tokens" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ transferirTokens }: IRootState) => ({
  transferirTokensEntity: transferirTokens.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TransferirTokensDetail);
