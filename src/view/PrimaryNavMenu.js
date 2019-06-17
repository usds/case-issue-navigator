import React from 'react';

// Hacky McHackface
function uswds_image(img_name) {
    return require('../../node_modules/uswds/dist/img/' + img_name);
}

export default function PrimaryNavMenu(props) {
    const active = props.active_item ? props.active_item : props.items[0];
    const navItems = props.items.map(i=>(
        <li key={i} className="usa-nav__primary-item">
            <a href="javascript:void(0)" className={(i === active ? "usa-current " : "") +"usa-nav__link"}
                onClick={props.callback.navSelect}
                >{i}</a>
        </li>
    ));
    return (
        <header className="usa-header usa-header--extended" role="banner">
            <div className="usa-navbar">
                <div className="usa-logo" id="extended-logo">
                    <em className="usa-logo__text">{props.title}</em>
                </div>
                <button className="usa-menu-btn">Menu</button>
            </div>
            <nav role="navigation" className="usa-nav">
                <button className="usa-nav__close"><img src={uswds_image("close.svg")} alt="close" /></button>

                <div className="usa-nav__inner">
                    <ul className="usa-nav__primary usa-accordion">{navItems}</ul>
                </div>
                <div className="usa-nav__secondary">
                    <form className="usa-search usa-search--small ">
                        <div role="search">
                            <label className="usa-sr-only" htmlFor="extended-search-field-small">Search small</label>
                            <input className="usa-input" id="extended-search-field-small" type="search" name="search" />
                            <button className="usa-button" type="submit"><span className="usa-sr-only">Search</span></button>
                        </div>
                    </form>
                </div>
            </nav>
        </header>
    );
}
