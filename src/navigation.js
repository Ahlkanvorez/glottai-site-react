import React from 'react';

const Navigation = ({ handleViewChange }) => (
    <div className="navbar navbar-fixed-top" role="navigation">
        <div className="container">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle"
                        data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand"
                        onClick={() => handleViewChange('Grammar')}>
                    γλῶτται
                </a>
            </div>
            <div className="collapse navbar-collapse"
                    id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                    <li>
                        <a onClick={() => handleViewChange('Learn')}>
                            Learn
                        </a>
                    </li>
                    <li>
                        <a onClick={() => handleViewChange('Grammar')}>
                            Grammar
                        </a>
                    </li>
                    <li>
                        <a onClick={() => handleViewChange('About')}>
                            About
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
);

export { Navigation };
