import React from "react";
import "./PrimaryNavMenu.css";
import { RootState } from "../../redux/create";
import { connect } from "react-redux";
import FormattedDate from "../util/FormattedDate";

const mapStateToProps = (state: RootState) => ({
  user: state.appStatus.user,
  lastUpdated: state.cases.lastUpdated
});

type Props = ReturnType<typeof mapStateToProps>;

const UnconnectedPrimaryNavMenu: React.FC<Props> = ({ user, lastUpdated }) => {
  return (
    <React.Fragment>
      <div className="usa-overlay"></div>
      <header
        className="usa-header usa-header--extended sp-full-width"
        role="banner"
      >
        <div className="usa-navbar">
          <div className="usa-logo" id="extended-logo">
            <em className="usa-logo__text">ELIS Search Party</em>
          </div>
          <div>
            {user ? (
              <React.Fragment>
                <span className="signed-in-as">Signed in as: {user.name}</span>
                <br />
              </React.Fragment>
            ) : null}
            <FormattedDate label="Last Refresh" date={lastUpdated} />
          </div>
        </div>
        <nav role="navigation" className="usa-nav "></nav>
      </header>
    </React.Fragment>
  );
};

export default connect(mapStateToProps)(UnconnectedPrimaryNavMenu);
