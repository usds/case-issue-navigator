import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import UsaButton from "./util/UsaButton";
import close from "uswds/dist/img/close.svg";

export default function PrimaryNavMenu(props) {
  const navItems = Object.values(props.views).map(view => (
    <li key={view.ROUTE} className="usa-nav__primary-item">
      <NavLink
        to={"/" + view.ROUTE}
        activeClassName="usa-current"
        className={"usa-nav__link"}
      >
        {view.TITLE} {props.summary && `(${props.summary[view.TITLE]})`}
      </NavLink>
    </li>
  ));
  return (
    <React.Fragment>
      <div className="usa-overlay"></div>
      <header className="usa-header usa-header--extended" role="banner">
        <div className="usa-navbar">
          <div className="usa-logo" id="extended-logo">
            <em className="usa-logo__text">{props.title}</em>
          </div>
          <button className="usa-menu-btn">Menu</button>
        </div>
        <nav role="navigation" className="usa-nav">
          <button className="usa-nav__close">
            <img src={close} alt="close" />
          </button>
          <div className="usa-nav__inner">
            <ul className="usa-nav__primary usa-accordion">{navItems}</ul>
          </div>
          <div className="usa-nav__secondary">
            <form
              className="usa-search usa-search--small "
              onSubmit={e => e.preventDefault()}
            >
              <div role="search">
                <label
                  className="usa-sr-only"
                  htmlFor="extended-search-field-small"
                >
                  Search small
                </label>
                <input
                  className="usa-input"
                  id="extended-search-field-small"
                  type="search"
                  name="search"
                />
                <UsaButton type="submit">
                  <span className="usa-sr-only">Search</span>
                </UsaButton>
              </div>
            </form>
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
