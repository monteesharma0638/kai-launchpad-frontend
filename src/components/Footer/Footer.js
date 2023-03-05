import React from "react";

const state = {
    "data": {
        "img": "/img/logo.png",
        "copyright": "©2022 Kainet Launchpad, All Rights Reserved By",
        "owner": "KAINET",
        "ownerLink": "http://kainet.world",
    },
    "socialData": [
        {
            "id": 1,
            "link": "http://Twitter.com/kainet_official",
            "icon": "icon-social-twitter"
        },
        {
            "id": 2,
            "link": "https://linktr.ee/kainet",
            "icon": "fas fa-tree"
        },
        {
            "id": 2,
            "link": "https://www.reddit.com/r/KAINET/",
            "icon": "icon-social-reddit"
        },
        {
            "id": 3,
            "link": "https://discord.com/invite/tgr3aFzfNz",
            "icon": "icon-social-vkontakte"
        }
    ],
    "widgetData": [
        {
            "id": 1,
            "text": "Features",
            "link": "/blog"
        },
        {
            "id": 2,
            "text": "Roadmap",
            "link": "/blog"
        },
        {
            "id": 3,
            "text": "How It Works",
            "link": "/blog"
        },
        {
            "id": 4,
            "text": "Blog",
            "link": "/blog"
        },
        {
            "id": 5,
            "text": "Privacy Policy",
            "link": "/blog"
        }
    ]
}

export default function Footer() {
  return (
    <footer className="footer-area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 text-center">
            {/* Footer Items */}
            <div className="footer-items">
              {/* Logo */}
              <a className="navbar-brand" href="/">
                <img src={state.data.img} alt="" />
              </a>
              {/* Social Icons */}
              <div className="social-icons d-flex justify-content-center my-4">
                {state.socialData.map((item, idx) => {
                  return (
                    <a
                      key={`fsd_${idx}`}
                      className="facebook"
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className={item.icon} />
                      <i className={item.icon} />
                    </a>
                  );
                })}
              </div>
              {/* <ul className="list-inline">
                {state.widgetData.map((item, idx) => {
                  return (
                    <li key={`fwd_${idx}`} className="list-inline-item">
                      <a href={item.link}>{item.text}</a>
                    </li>
                  );
                })}
              </ul> */}
              {/* Copyright Area */}
              <div className="copyright-area py-4">
                {state.data.copyright}{" "}
                <a href={state.data.ownerLink} target="_blank">
                  {state.data.owner}
                </a>
              </div>
            </div>
            {/* Scroll To Top */}
            <div id="scroll-to-top" className="scroll-to-top">
              <a href="#header" className="smooth-anchor">
                <i className="fa-solid fa-arrow-up" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
