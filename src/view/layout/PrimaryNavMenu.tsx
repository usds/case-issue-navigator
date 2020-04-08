import React from "react";
import "./PrimaryNavMenu.css";
import { RootState } from "../../redux/create";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import Roxy from "./roxy.svg";

const mapStateToProps = (state: RootState) => ({
  user: state.appStatus.user
});

type Props = ReturnType<typeof mapStateToProps>;

const UnconnectedPrimaryNavMenu: React.FC<Props> = ({ user }) => {
  const renderInitials = () => {
    if (!user) {
      return null;
    }
    return (
      <span
        className="signed-in-as"
        data-tip={`Signed in as: ${user.name}`}
        data-for="username"
      >
        <span className="signed-in-as-content">{user.name.charAt(0)}</span>
        <ReactTooltip id="username"></ReactTooltip>
      </span>
    );
  };
  return (
    <React.Fragment>
      <div className="usa-overlay"></div>
      <header
        className="usa-header usa-header--extended sp-full-width"
        role="banner"
      >
        <div className="usa-navbar">
          <div style={{ display: "flex" }}>
            <img
              src={Roxy}
              alt="Roxy the a geometric rescue dog and the Search Party Logo"
              style={{ width: "38px" }}
            />
            <h1 className="site-title" style={{ marginLeft: "10px" }}>
              Search Party
            </h1>
          </div>
          {renderInitials()}
        </div>
        <nav role="navigation" className="usa-nav "></nav>
      </header>
    </React.Fragment>
  );
};

export default connect(mapStateToProps)(UnconnectedPrimaryNavMenu);
