import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './temporada.reducer';
import { ITemporada } from 'app/shared/model/temporada.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITemporadaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TemporadaDetail = (props: ITemporadaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { temporadaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="abonoBlockchainApp.temporada.detail.title">Temporada</Translate> [<b>{temporadaEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="faseEtapa">
              <Translate contentKey="abonoBlockchainApp.temporada.faseEtapa">Fase Etapa</Translate>
            </span>
          </dt>
          <dd>{temporadaEntity.faseEtapa}</dd>
          <dt>
            <span id="nombre">
              <Translate contentKey="abonoBlockchainApp.temporada.nombre">Nombre</Translate>
            </span>
          </dt>
          <dd>{temporadaEntity.nombre}</dd>
          <dt>
            <span id="actualIdLocalidad">
              <Translate contentKey="abonoBlockchainApp.temporada.actualIdLocalidad">Actual Id Localidad</Translate>
            </span>
          </dt>
          <dd>{temporadaEntity.actualIdLocalidad}</dd>
          <dt>
            <span id="actualIdEspectaculo">
              <Translate contentKey="abonoBlockchainApp.temporada.actualIdEspectaculo">Actual Id Espectaculo</Translate>
            </span>
          </dt>
          <dd>{temporadaEntity.actualIdEspectaculo}</dd>
          <dt>
            <span id="actualIdAbono">
              <Translate contentKey="abonoBlockchainApp.temporada.actualIdAbono">Actual Id Abono</Translate>
            </span>
          </dt>
          <dd>{temporadaEntity.actualIdAbono}</dd>
          <dt>
            <span id="precioBase">
              <Translate contentKey="abonoBlockchainApp.temporada.precioBase">Precio Base</Translate>
            </span>
          </dt>
          <dd>{temporadaEntity.precioBase}</dd>
          <dt>
            <span id="tiposLocalidad">
              <Translate contentKey="abonoBlockchainApp.temporada.tiposLocalidad">Tipos Localidad</Translate>
            </span>
          </dt>
          <dd>{temporadaEntity.tiposLocalidad}</dd>
          <dt>
            <span id="factorIncrementoTipo">
              <Translate contentKey="abonoBlockchainApp.temporada.factorIncrementoTipo">Factor Incremento Tipo</Translate>
            </span>
          </dt>
          <dd>{temporadaEntity.factorIncrementoTipo}</dd>
          <dt>
            <span id="porcentajeAlquiler">
              <Translate contentKey="abonoBlockchainApp.temporada.porcentajeAlquiler">Porcentaje Alquiler</Translate>
            </span>
          </dt>
          <dd>{temporadaEntity.porcentajeAlquiler}</dd>
          <dt>
            <span id="dineroAbono">
              <Translate contentKey="abonoBlockchainApp.temporada.dineroAbono">Dinero Abono</Translate>
            </span>
          </dt>
          <dd>{temporadaEntity.dineroAbono}</dd>
          <dt>
            <span id="direccion">
              <Translate contentKey="abonoBlockchainApp.temporada.direccion">Direccion</Translate>
            </span>
          </dt>
          <dd>{temporadaEntity.direccion}</dd>
          <dt>
            <span id="abi">
              <Translate contentKey="abonoBlockchainApp.temporada.abi">Abi</Translate>
            </span>
          </dt>
          <dd>{temporadaEntity.abi}</dd>
          <dt>
            <span id="abiDAbono">
              <Translate contentKey="abonoBlockchainApp.temporada.abiDAbono">Abi DAbono</Translate>
            </span>
          </dt>
          <dd>{temporadaEntity.abiDAbono}</dd>
        </dl>
        <Button tag={Link} to="/temporada" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/temporada/${temporadaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ temporada }: IRootState) => ({
  temporadaEntity: temporada.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TemporadaDetail);
