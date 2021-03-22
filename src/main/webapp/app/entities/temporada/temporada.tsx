import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './temporada.reducer';
import { ITemporada } from 'app/shared/model/temporada.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITemporadaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Temporada = (props: ITemporadaProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { temporadaList, match, loading } = props;
  return (
    <div>
      <h2 id="temporada-heading">
        <Translate contentKey="abonoBlockchainApp.temporada.home.title">Temporadas</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="abonoBlockchainApp.temporada.home.createLabel">Create new Temporada</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {temporadaList && temporadaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.temporada.faseEtapa">Fase Etapa</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.temporada.nombre">Nombre</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.temporada.precioBase">Precio Base</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.temporada.tiposLocalidad">Tipos Localidad</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.temporada.factorIncrementoTipo">Factor Incremento Tipo</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.temporada.porcentajeAlquiler">Porcentaje Alquiler</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.temporada.dineroAbono">Dinero Abono</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.temporada.direccion">Direccion</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.temporada.abi">abi</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.temporada.abiDAbono">abi DAbono</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {temporadaList.map((temporada, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${temporada.id}`} color="link" size="sm">
                      {temporada.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`abonoBlockchainApp.Etapas.${temporada.faseEtapa}`} />
                  </td>
                  <td>{temporada.nombre}</td>
                  <td>{temporada.precioBase}</td>
                  <td>{temporada.tiposLocalidad}</td>
                  <td>{temporada.factorIncrementoTipo}</td>
                  <td>{temporada.porcentajeAlquiler}</td>
                  <td>{temporada.dineroAbono ? temporada.dineroAbono.substring(0, 10) : ''}...</td>
                  <td>{temporada.direccion ? temporada.direccion.substring(0, 10) : ''}...</td>
                  <td>{temporada.abi ? temporada.abi.substring(0, 25) : ''}...</td>
                  <td>{temporada.abiDAbono ? temporada.abiDAbono.substring(0, 25) : ''}...</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${temporada.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${temporada.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
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
              <Translate contentKey="abonoBlockchainApp.temporada.home.notFound">No Temporadas found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ temporada }: IRootState) => ({
  temporadaList: temporada.entities,
  loading: temporada.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Temporada);
