import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './alquila-abono.reducer';
import { IAlquilaAbono } from 'app/shared/model/alquila-abono.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAlquilaAbonoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const AlquilaAbono = (props: IAlquilaAbonoProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { alquilaAbonoList, match, loading, isAdmin } = props;
  return (
    <div>
      <h2 id="alquila-abono-heading">
        <Translate contentKey="abonoBlockchainApp.alquilaAbono.home.title">Alquila Abonos</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="abonoBlockchainApp.alquilaAbono.home.createLabel">Create new Alquila Abono</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {alquilaAbonoList && alquilaAbonoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.alquilaAbono.localidad">Localidad</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.alquilaAbono.espectaculo">Espectaculo</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.alquilaAbono.internalUser">Internal User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {alquilaAbonoList.map((alquilaAbono, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${alquilaAbono.id}`} color="link" size="sm">
                      {alquilaAbono.id}
                    </Button>
                  </td>
                  <td>{alquilaAbono.localidad ? alquilaAbono.localidad.idLocalidad : ''}</td>
                  <td>{alquilaAbono.espectaculo ? alquilaAbono.espectaculo.idEspectaculo : ''}</td>
                  <td>
                    {alquilaAbono.internalUser ? (
                      <Link to={`application-user/${alquilaAbono.internalUser.id}`}>{alquilaAbono.internalUser.direccion}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${alquilaAbono.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      {isAdmin && <Button tag={Link} to={`${match.url}/${alquilaAbono.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>}
                      {isAdmin && <Button tag={Link} to={`${match.url}/${alquilaAbono.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="abonoBlockchainApp.alquilaAbono.home.notFound">No Alquila Abonos found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authentication, alquilaAbono }: IRootState) => ({
  alquilaAbonoList: alquilaAbono.entities,
  loading: alquilaAbono.loading,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AlquilaAbono);
