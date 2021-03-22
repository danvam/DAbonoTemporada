import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './localidad.reducer';
import { ILocalidad } from 'app/shared/model/localidad.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILocalidadProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Localidad = (props: ILocalidadProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { localidadList, match, loading } = props;
  return (
    <div>
      <h2 id="localidad-heading">
        <Translate contentKey="abonoBlockchainApp.localidad.home.title">Localidads</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="abonoBlockchainApp.localidad.home.createLabel">Create new Localidad</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {localidadList && localidadList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.localidad.idLocalidad">Id Localidad</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.localidad.tipoLocalidad">Tipo Localidad</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.localidad.nombre">Nombre</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.localidad.simbolo">Simbolo</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.localidad.temporada">Temporada</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {localidadList.map((localidad, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${localidad.id}`} color="link" size="sm">
                      {localidad.id}
                    </Button>
                  </td>
                  <td>{localidad.idLocalidad}</td>
                  <td>{localidad.tipoLocalidad}</td>
                  <td>{localidad.nombre}</td>
                  <td>{localidad.simbolo}</td>
                  <td>{localidad.temporada ? <Link to={`temporada/${localidad.temporada.id}`}>{localidad.temporada.nombre}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${localidad.id}`} color="info" size="sm">
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
              <Translate contentKey="abonoBlockchainApp.localidad.home.notFound">No Localidads found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ localidad }: IRootState) => ({
  localidadList: localidad.entities,
  loading: localidad.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Localidad);
