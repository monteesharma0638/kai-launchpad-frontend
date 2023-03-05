import { ConnectButton } from '@rainbow-me/rainbowkit';
import React from 'react';

const Header = () => {
    return (
        <header id="header">
            {/* Navbar */}
            <nav data-aos="zoom-out" data-aos-delay={800} className="navbar gameon-navbar navbar-expand">
                <div className="container header">
                    {/* Logo */}
                    <a className="navbar-brand" href="/">
                        <img src="/img/logo.png" alt="Brand Logo" />
                    </a>
                    <div className="ml-auto" />
                    {/* Navbar Nav */}
                    <ul className="navbar-nav items mx-auto">
                        <li className="nav-item">
                            <a href="/" className="nav-link">Home</a>
                        </li>
                        <li className="nav-item">
                            <a href="/erc721explorer" className="nav-link">Explore Collection</a>
                        </li>
                        <li className="nav-item">
                            <a href="/erc20explorer" className="nav-link"> Explore ICO</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a href="#" className="nav-link">Launch Pad <i className="icon-arrow-down" /></a>
                            <ul className="dropdown-menu">
                                
                                <li className="nav-item dropdown">
                                    <a href="#" className="nav-link"> Token Launchpad <i className="icon-arrow-right" /></a>
                                    <ul className="dropdown-menu">
                                        <li className="nav-item">
                                            <a href="/erc20/mintable" className="nav-link">Mintable ERC20</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/erc20/fixedsupply" className="nav-link">Fixed Supply ERC20</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/erc20/mintable-burnable" className="nav-link">Mintable-Burnable ERC20</a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown">
                                    <a href="#" className="nav-link">Nft Launchpad<i className="icon-arrow-right" /></a>
                                    <ul className="dropdown-menu">
                                        <li className="nav-item">
                                            <a href="/erc721/queryable" className="nav-link">ERC721A</a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="/erc721/queryable" className="nav-link">ERC721a Querable</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        
                    </ul>
                    {/* Navbar Icons */}
                    {/* <ul className="navbar-nav icons">
                        <li className="nav-item">
                            <a href="#" className="nav-link" data-toggle="modal" data-target="#search">
                                <i className="icon-magnifier" />
                            </a>
                        </li>
                    </ul> */}
                    {/* Navbar Toggler */}
                    <ul className="navbar-nav toggle">
                        <li className="nav-item">
                            <a href="#" className="nav-link" data-toggle="modal" data-target="#menu">
                                <i className="icon-menu m-0" />
                            </a>
                        </li>
                    </ul>
                    {/* Navbar Action Button */}
                    <ul className="navbar-nav action">
                        <li className="nav-item ml-2">
                            <ConnectButton />
                            {/* <a href="/wallet-connect" className="btn ml-lg-auto btn-bordered-white"><i className="icon-wallet mr-md-2" />Wallet Connect</a> */}
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;