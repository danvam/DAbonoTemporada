import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './espectaculo.reducer';
import { IEspectaculo } from 'app/shared/model/espectaculo.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEspectaculoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EspectaculoDetail = (props: IEspectaculoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { espectaculoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="abonoBlockchainApp.espectaculo.detail.title">Espectaculo</Translate> [<b>{espectaculoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="idEspectaculo">
              <Translate contentKey="abonoBlockchainApp.espectaculo.idEspectaculo">Id Espectaculo</Translate>
            </span>
          </dt>
          <dd>{espectaculoEntity.idEspectaculo}</dd>
          <dt>
            <span id="fechaEspectaculo">
              <Translate contentKey="abonoBlockchainApp.espectaculo.fechaEspectaculo">Fecha Espectaculo</Translate>
            </span>
          </dt>
          <dd>
            {espectaculoEntity.fechaEspectaculo ? (
              <TextFormat value={espectaculoEntity.fechaEspectaculo} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="nombre">
              <Translate contentKey="abonoBlockchainApp.espectaculo.nombre">Nombre</Translate>
            </span>
          </dt>
          <dd>{espectaculoEntity.nombre}</dd>
          <dt>
            <span id="simbolo">
              <Translate contentKey="abonoBlockchainApp.espectaculo.simbolo">Símbolo</Translate>
            </span>
          </dt>
          <dd>{espectaculoEntity.simbolo}</dd>
          <dt>
            <Translate contentKey="abonoBlockchainApp.espectaculo.temporada">Temporada</Translate>
          </dt>
          <dd>{espectaculoEntity.temporada ? espectaculoEntity.temporada.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/espectaculo" replace color="info">
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

const mapStateToProps = ({ espectaculo }: IRootState) => ({
  espectaculoEntity: espectaculo.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EspectaculoDetail);
