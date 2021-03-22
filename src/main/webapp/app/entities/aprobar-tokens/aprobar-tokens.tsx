import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './aprobar-tokens.reducer';
import { IAprobarTokens } from 'app/shared/model/aprobar-tokens.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAprobarTokensProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const AprobarTokens = (props: IAprobarTokensProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { aprobarTokensList, match, loading } = props;
  return (
    <div>
      <h2 id="aprobar-tokens-heading">
        <Translate contentKey="abonoBlockchainApp.aprobarTokens.home.title">Aprobar Tokens</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="abonoBlockchainApp.aprobarTokens.home.createLabel">Create new Aprobar Tokens</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {aprobarTokensList && aprobarTokensList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.aprobarTokens.cantidad">Cantidad</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.aprobarTokens.operation">Operación</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.aprobarTokens.temporada">Temporada</Translate>
                </th>
		            <th>
                  <Translate contentKey="abonoBlockchainApp.aprobarTokens.applicationUser">Application User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {aprobarTokensList.map((aprobarTokens, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${aprobarTokens.id}`} color="link" size="sm">
                      {aprobarTokens.id}
                    </Button>
                  </td>
                  <td>{aprobarTokens.cantidad}</td>
                  <td>{aprobarTokens.password}</td>
                  <td>
                    {aprobarTokens.temporada ? (
                      <Link to={`temporada/${aprobarTokens.temporada.id}`}>{aprobarTokens.temporada.nombre}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {aprobarTokens.applicationUser ? (
                      <Link to={`application-user/${aprobarTokens.applicationUser.id}`}>{aprobarTokens.applicationUser.direccion}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${aprobarTokens.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${aprobarTokens.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
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
              <Translate contentKey="abonoBlockchainApp.aprobarTokens.home.notFound">No Aprobar Tokens found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ aprobarTokens }: IRootState) => ({
  aprobarTokensList: aprobarTokens.entities,
  loading: aprobarTokens.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AprobarTokens);
