import React, { Component } from 'react';

import loaderImg from '../images/LoaderImg.gif'

class LoaderComponent extends Component {
    render() {
        if (!this.props.show)
            return null
        else
            return (
                <div className="loader">
                    <div className="loader-container">
                        <div className='loading-div'>
                            <img className="loading-img" src={loaderImg} />
                        </div>
                    </div>
                </div>
            );
    }
}

export default LoaderComponent;