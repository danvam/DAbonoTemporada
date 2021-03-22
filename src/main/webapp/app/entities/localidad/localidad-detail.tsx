import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './localidad.reducer';
import { ILocalidad } from 'app/shared/model/localidad.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILocalidadDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LocalidadDetail = (props: ILocalidadDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { localidadEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="abonoBlockchainApp.localidad.detail.title">Localidad</Translate> [<b>{localidadEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="idLocalidad">
              <Translate contentKey="abonoBlockchainApp.localidad.idLocalidad">Id Localidad</Translate>
            </span>
          </dt>
          <dd>{localidadEntity.idLocalidad}</dd>
          <dt>
            <span id="tipoLocalidad">
              <Translate contentKey="abonoBlockchainApp.localidad.tipoLocalidad">Tipo Localidad</Translate>
            </span>
          </dt>
          <dd>{localidadEntity.tipoLocalidad}</dd>
          <dt>
            <span id="nombre">
              <Translate contentKey="abonoBlockchainApp.localidad.nombre">Nombre</Translate>
            </span>
          </dt>
          <dd>{localidadEntity.nombre}</dd>
          <dt>
            <span id="simbolo">
              <Translate contentKey="abonoBlockchainApp.localidad.simbolo">Símbolo</Translate>
            </span>
          </dt>
          <dd>{localidadEntity.simbolo}</dd>
          <dt>
            <Translate contentKey="abonoBlockchainApp.localidad.temporada">Temporada</Translate>
          </dt>
          <dd>{localidadEntity.temporada ? localidadEntity.temporada.nombre : ''}</dd>
        </dl>
        <Button tag={Link} to="/localidad" replace color="info">
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

const mapStateToProps = ({ localidad }: IRootState) => ({
  localidadEntity: localidad.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LocalidadDetail);
