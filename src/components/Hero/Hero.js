import React, { Component } from 'react';

const initData = {
    sub_heading: "KAIPAD - Kainet Launchpad",
    heading: "The Next Generation Web 3.0 Launchpad",
    content: "Full-scale Blockchain Ecosystem for ICOs & NFT Pre-Sales"
}

class Hero extends Component {
    state = {
        initData: {}
    }
    componentDidMount(){
        this.setState({
            initData: initData
        })
    }
    render() {
        return (
            <section className="hero-section">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                    <div className="col-12 col-md-6 col-lg-9 text-center">
                        {/* Hero Content */}
                        <div className="hero-content">
                        <div className="intro text-center mb-5">
                            <span className="intro-text">{this.state.initData.sub_heading}</span>
                            <h1 className="mt-4">{this.state.initData.heading}</h1>
                            <p>{this.state.initData.content}</p>
                        </div>
                        {/* Buttons */}
                        <div className="button-group">
                            <a className="btn btn-bordered active smooth-anchor" href="#explore"><i className="icon-rocket mr-2" />Explore ICOs</a>
                            <a className="btn btn-bordered-white" href="/apply"><i className="icon-note mr-2" />Create ICO</a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Hero;