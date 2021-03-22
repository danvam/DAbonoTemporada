import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './application-user.reducer';
import { IApplicationUser } from 'app/shared/model/application-user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApplicationUserProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ApplicationUser = (props: IApplicationUserProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { applicationUserList, match, loading, isAdmin } = props;
  return (
    <div>
      <h2 id="application-user-heading">
        <Translate contentKey="abonoBlockchainApp.applicationUser.home.title">Application Users</Translate>
        {isAdmin &&<Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="abonoBlockchainApp.applicationUser.home.createLabel">Create new Application User</Translate>
        </Link>}
      </h2>
      <div className="table-responsive">
        {applicationUserList && applicationUserList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.applicationUser.direccion">Direccion</Translate>
                </th>
                <th>
                  <Translate contentKey="abonoBlockchainApp.applicationUser.internalUser">Internal User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {applicationUserList.map((applicationUser, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${applicationUser.id}`} color="link" size="sm">
                      {applicationUser.id}
                    </Button>
                  </td>
                  <td>{applicationUser.direccion}</td>
                  <td>{applicationUser.internalUser ? applicationUser.internalUser.login : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${applicationUser.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      {isAdmin && <Button tag={Link} to={`${match.url}/${applicationUser.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>}
                      {isAdmin && <Button tag={Link} to={`${match.url}/${applicationUser.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="abonoBlockchainApp.applicationUser.home.notFound">No Application Users found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ authentication, applicationUser }: IRootState) => ({
  applicationUserList: applicationUser.entities,
  loading: applicationUser.loading,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationUser);
