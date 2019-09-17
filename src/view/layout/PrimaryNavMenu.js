import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import close from "uswds/dist/img/close.svg";
import "./PrimaryNavMenu.css";

export default function PrimaryNavMenu(props) {
  const navItems = Object.entries(props.views).map(([key, view]) => (
    <li key={view.ROUTE} className="usa-nav__primary-item">
      <NavLink
        to={"/" + view.ROUTE}
        activeClassName="usa-current"
        className={"usa-nav__link"}
        exact={true}
      >
        {view.TITLE} {props.summary && `(${props.summary[key]})`}
      </NavLink>
    </li>
  ));
  return (
    <React.Fragment>
      <div className="usa-overlay"></div>
      <header
        className="usa-header usa-header--extended sp-full-width"
        role="banner"
      >
        <div className="usa-navbar">
          <div className="usa-logo" id="extended-logo">
            <em className="usa-logo__text">{props.title}</em>
          </div>
          <button className="usa-menu-btn">Menu</button>
        </div>
        <nav role="navigation" className="usa-nav ">
          <button className="usa-nav__close">
            <img src={close} alt="close" />
          </button>
          <div className="usa-nav__inner">
            <ul className="usa-nav__primary usa-accordion">{navItems}</ul>
          </div>
        </nav>
      </header>
    </React.Fragment>
  );
}

PrimaryNavMenu.propTypes = {
  views: PropTypes.objectOf(PropTypes.object).isRequired,
  summary: PropTypes.objectOf(PropTypes.number),
  title: PropTypes.string.isRequired
};
