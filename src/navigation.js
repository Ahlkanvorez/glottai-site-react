import React from 'react';

// props = { handleViewChange() }
const Navigation = props => (
    <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
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
                <a className="navbar-brand" onClick={() => props.handleViewChange('Grammar')}>
                    γλῶτται
                </a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul className="nav navbar-nav">
                    <li>
                        <a onClick={() => props.handleViewChange('Learn')}>
                            Learn
                        </a>
                    </li>
                    <li>
                        <a onClick={() => props.handleViewChange('Grammar')}>
                            Grammar
                        </a>
                    </li>
                    <li>
                        <a onClick={() => props.handleViewChange('About')}>
                            About
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export { Navigation };