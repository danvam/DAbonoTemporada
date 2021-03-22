import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './espectaculo.reducer';
import { IEspectaculo } from 'app/shared/model/espectaculo.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEspectaculoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Espectaculo = (props: IEspectaculoProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { espectaculoList, match, loading } = props;
  return (
    <div>
      <h2 id="espectaculo-heading">
        <Translate contentKey="abonoBlockchainApp.espectaculo.home.title">Espectaculos</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="abonoBlockchainApp.espectaculo.home.createLabel">Create new Espectaculo</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {espectaculoList && espectaculoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.espectaculo.idEspectaculo">Id Espectaculo</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.espectaculo.fechaEspectaculo">Fecha Espectaculo</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.espectaculo.nombre">Nombre</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.espectaculo.simbolo">Simbolo</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.espectaculo.temporada">Temporada</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {espectaculoList.map((espectaculo, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${espectaculo.id}`} color="link" size="sm">
                      {espectaculo.id}
                    </Button>
                  </td>
                  <td>{espectaculo.idEspectaculo}</td>
                  <td>
                    {espectaculo.fechaEspectaculo ? (
                      <TextFormat type="date" value={espectaculo.fechaEspectaculo} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{espectaculo.nombre}</td>
                  <td>{espectaculo.simbolo}</td>
                  <td>
                    {espectaculo.temporada ? <Link to={`temporada/${espectaculo.temporada.id}`}>{espectaculo.temporada.nombre}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${espectaculo.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="abonoBlockchainApp.espectaculo.home.notFound">No Espectaculos found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ espectaculo }: IRootState) => ({
  espectaculoList: espectaculo.entities,
  loading: espectaculo.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Espectaculo);
