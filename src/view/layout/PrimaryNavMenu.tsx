import React from "react";
import close from "uswds/dist/img/close.svg";
import "./PrimaryNavMenu.css";
import { RootState } from "../../redux/create";
import { connect } from "react-redux";

const mapStateToProps = (state: RootState) => ({
  user: state.appStatus.user,
});

type Props = ReturnType<typeof mapStateToProps>;

const UnconnectedPrimaryNavMenu: React.FC<Props> = ({
  user,
}) => {
  return (
    <React.Fragment>
      <div className="usa-overlay"></div>
      <header
        className="usa-header usa-header--extended sp-full-width"
        role="banner"
      >
        <div className="usa-navbar">
          <div className="usa-logo" id="extended-logo">
            <em className="usa-logo__text">Case Issue Navigator</em>
          </div>
          <button className="usa-menu-btn">Menu</button>
        </div>
        <nav role="navigation" className="usa-nav ">
          <button className="usa-nav__close">
            <img src={close} alt="close" />
          </button>
          {user && (
            <div className="usa-nav__secondary margin-bottom-105">
              <ul className="usa-nav__secondary-links">
                <li className="usa-nav__secondary-item">{user.name}</li>
              </ul>
            </div>
          )}
        </nav>
      </header>
    </React.Fragment>
  );
};

export default connect(mapStateToProps)(UnconnectedPrimaryNavMenu);
