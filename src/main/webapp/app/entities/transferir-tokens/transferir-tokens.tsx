import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './transferir-tokens.reducer';
import { ITransferirTokens } from 'app/shared/model/transferir-tokens.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITransferirTokensProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TransferirTokens = (props: ITransferirTokensProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { transferirTokensList, match, loading } = props;
  return (
    <div>
      <h2 id="transferir-tokens-heading">
        <Translate contentKey="abonoBlockchainApp.transferirTokens.home.title">Transferir Tokens</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="abonoBlockchainApp.transferirTokens.home.createLabel">Create new Transferir Tokens</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {transferirTokensList && transferirTokensList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.transferirTokens.cantidad">Cantidad</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.transferirTokens.operacion">Operacion</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.transferirTokens.applicationUser">Application User</Translate>
                </th>
		            <th>
                  <Translate contentKey="abonoBlockchainApp.transferirTokens.temporada">Temporada</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {transferirTokensList.map((transferirTokens, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${transferirTokens.id}`} color="link" size="sm">
                      {transferirTokens.id}
                    </Button>
                  </td>
                  <td>{transferirTokens.cantidad}</td>
                  <td>{transferirTokens.password}</td>
                  <td>
                    {transferirTokens.applicationUser ? (
                      <Link to={`application-user/${transferirTokens.applicationUser.id}`}>{transferirTokens.applicationUser.direccion}</Link>
                    ) : (
                      ''
                    )}
                  </td>
		              <td>
                    {transferirTokens.temporada ? (
                      <Link to={`temporada/${transferirTokens.temporada.id}`}>{transferirTokens.temporada.nombre}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${transferirTokens.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${transferirTokens.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="abonoBlockchainApp.transferirTokens.home.notFound">No Transferir Tokens found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ transferirTokens }: IRootState) => ({
  transferirTokensList: transferirTokens.entities,
  loading: transferirTokens.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TransferirTokens);
