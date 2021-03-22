import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './compra-abono.reducer';
import { ICompraAbono } from 'app/shared/model/compra-abono.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompraAbonoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const CompraAbono = (props: ICompraAbonoProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { compraAbonoList, match, loading, isAdmin } = props;
  return (
    <div>
      <h2 id="compra-abono-heading">
        <Translate contentKey="abonoBlockchainApp.compraAbono.home.title">Compra Abonos</Translate>
        {!(compraAbonoList && compraAbonoList.length === 1) && <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="abonoBlockchainApp.compraAbono.home.createLabel">Create new Compra Abono</Translate>
        </Link>}
      </h2>
      <div className="table-responsive">
        {compraAbonoList && compraAbonoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.compraAbono.localidad">Localidad</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.compraAbono.internalUser">Internal User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {compraAbonoList.map((compraAbono, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${compraAbono.id}`} color="link" size="sm">
                      {compraAbono.id}
                    </Button>
                  </td>
                  <td>{compraAbono.localidad ? compraAbono.localidad.idLocalidad : ''}</td>
                  <td>
                    {compraAbono.internalUser ? (
                      <Link to={`application-user/${compraAbono.internalUser.id}`}>{compraAbono.internalUser.direccion}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${compraAbono.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      {isAdmin && <Button tag={Link} to={`${match.url}/${compraAbono.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>}
                      {isAdmin && <Button tag={Link} to={`${match.url}/${compraAbono.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="abonoBlockchainApp.compraAbono.home.notFound">No Compra Abonos found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authentication, compraAbono }: IRootState) => ({
  compraAbonoList: compraAbono.entities,
  loading: compraAbono.loading,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompraAbono);
