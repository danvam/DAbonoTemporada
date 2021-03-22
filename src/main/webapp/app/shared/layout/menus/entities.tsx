import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.entities.main')}
    id="entity-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    {props.isAdmin && <MenuItem icon="asterisk" to="/temporada">
      <Translate contentKey="global.menu.entities.temporada" />
    </MenuItem>}
    {props.isAdmin && <MenuItem icon="asterisk" to="/localidad">
      <Translate contentKey="global.menu.entities.localidad" />
    </MenuItem>}
    {props.isAdmin && <MenuItem icon="asterisk" to="/espectaculo">
      <Translate contentKey="global.menu.entities.espectaculo" />
    </MenuItem>}
    <MenuItem icon="asterisk" to="/abono">
      <Translate contentKey="global.menu.entities.abono" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/compra-abono">
      <Translate contentKey="global.menu.entities.compraAbono" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/alquila-abono">
      <Translate contentKey="global.menu.entities.alquilaAbono" />
    </MenuItem>
    <MenuItem icon="asterisk" to="/application-user">
      <Translate contentKey="global.menu.entities.applicationUser" />
    </MenuItem>
    {props.isAdmin && <MenuItem icon="asterisk" to="/transferir-tokens">
      <Translate contentKey="global.menu.entities.transferirTokens" />
    </MenuItem>}
    <MenuItem icon="asterisk" to="/aprobar-tokens">
      <Translate contentKey="global.menu.entities.aprobarTokens" />
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
