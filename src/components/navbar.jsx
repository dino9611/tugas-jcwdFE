import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
import {Link} from "react-router-dom";

const NaviBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">My App</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink>
                <Link to="/">To-Do List</Link>
              </NavLink>
            </NavItem>
            <NavbarText>
              <Link to="/resep">Recipe Feature</Link>
            </NavbarText>
            <NavbarText>
              <Link to="/test-router-page">Test Router Page</Link>
            </NavbarText>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NaviBar;