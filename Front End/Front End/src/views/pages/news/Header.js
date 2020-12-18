import React from 'react'

import {
  CLink
} from '@coreui/react'
import {
  TheHeaderDropdown,

}  from './index'
import AuthenticationService from '../../../api/service/AuthenticationService.js'
const Home = (props) => {

  return (
    <div className="container-scroller">
      <div className="main-panel">
        <header id="header">
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="navbar-top">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <a className="navbar-brand" href="#"
                      ><img src="/assets/images/logo.svg" alt=""
                    /></a>
                  </div>
                  <ul className="navbar-top-right-menu">
                    <li className="nav-item">
                      <a href="" className="nav-link"><i className="mdi mdi-magnify"></i></a>
                    </li>

                    {
                    !AuthenticationService.isUserLoggedIn()?(
                    <>
                    <li className="nav-item">
                    <CLink className="nav-link" href="/login">
                      Login
                    </CLink>
                    </li>
                    <li className="nav-item">
                    <CLink className="nav-link" href="/register">
                      Register
                    </CLink>
                    </li>
                    </>
                    )
                    :<TheHeaderDropdown/>
                    }
                  </ul>
                </div>
              </div>
              <div className="navbar-bottom">
                <div className="d-flex justify-content-center align-items-center">

                  <div>
                    <button
                      className="navbar-toggler"
                      type="button"
                      data-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                      className="navbar-collapse justify-content-start collapse"
                      id="navbarSupportedContent"
                    >
                      <ul
                        className="navbar-nav d-lg-flex justify-content-between align-items-center"
                      >
                        <li>
                          <button className="navbar-close">
                            <i className="mdi mdi-close"></i>
                          </button>
                        </li>
                        <li className="nav-item active">
                          <a className="nav-link" href="index.html">Home</a>
                        </li>
                        <li className="nav-item">
                        <CLink className="nav-link" to="/category/tin-tuc">
                          TIN TỨC
                        </CLink>
                        </li>
                        <li className="nav-item">
                          <CLink className="nav-link" to="/category/the-thao">THỂ THAO</CLink>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" to="/category/cong-nghe">CÔNG NGHỆ</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="pages/contactus.html">ABOUT US</a>
                        </li>
                      </ul>
                    </div>
                  </div>

                </div>
              </div>
            </nav>
          </div>
        </header>
        </div>
        </div>
  )
}

export default Home
