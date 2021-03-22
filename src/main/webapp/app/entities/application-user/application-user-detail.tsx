import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './application-user.reducer';
import { IApplicationUser } from 'app/shared/model/application-user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IApplicationUserDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ApplicationUserDetail = (props: IApplicationUserDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { applicationUserEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="abonoBlockchainApp.applicationUser.detail.title">ApplicationUser</Translate> [
          <b>{applicationUserEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="direccion">
              <Translate contentKey="abonoBlockchainApp.applicationUser.direccion">Direccion</Translate>
            </span>
          </dt>
          <dd>{applicationUserEntity.direccion}</dd>
          <dt>
            <Translate contentKey="abonoBlockchainApp.applicationUser.internalUser">Internal User</Translate>
          </dt>
          <dd>{applicationUserEntity.internalUser ? applicationUserEntity.internalUser.login : ''}</dd>
        </dl>
        <Button tag={Link} to="/application-user" replace color="info">
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

const mapStateToProps = ({ applicationUser }: IRootState) => ({
  applicationUserEntity: applicationUser.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationUserDetail);
