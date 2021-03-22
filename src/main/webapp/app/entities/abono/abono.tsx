import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './abono.reducer';
import { IAbono } from 'app/shared/model/abono.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAbonoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Abono = (props: IAbonoProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { abonoList, match, loading, isAdmin } = props;
  return (
    <div>
      <h2 id="abono-heading">
        <Translate contentKey="abonoBlockchainApp.abono.home.title">Abonos</Translate>
      </h2>
      <div className="table-responsive">
        {abonoList && abonoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.abono.fechaAlquilerDesde">Fecha Alquiler Desde</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.abono.fechaAlquilerHasta">Fecha Alquiler Hasta</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.abono.direccion">Direccion</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.abono.idLocalidad">Id Localidad</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.abono.internalUser">Internal User</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.abono.temporada">Temporada</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {abonoList.map((abono, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${abono.id}`} color="link" size="sm">
                      {abono.id}
                    </Button>
                  </td>
                  <td>
                    {abono.fechaAlquilerDesde ? <TextFormat type="date" value={abono.fechaAlquilerDesde} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {abono.fechaAlquilerHasta ? <TextFormat type="date" value={abono.fechaAlquilerHasta} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{abono.direccion}</td>
                  <td>{abono.idLocalidad}</td>
                  <td>{abono.internalUser ? <Link to={`application-user/${abono.internalUser.id}`}>{abono.internalUser.direccion}</Link> : ''}</td>
                  <td>{abono.temporada ? abono.temporada.nombre : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${abono.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${abono.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      {isAdmin && <Button tag={Link} to={`${match.url}/${abono.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="abonoBlockchainApp.abono.home.notFound">No Abonos found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authentication, abono }: IRootState) => ({
  abonoList: abono.entities,
  loading: abono.loading,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Abono);
