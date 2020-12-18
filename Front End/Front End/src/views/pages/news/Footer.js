import React from 'react'


const Footer = (props) => {

  return (
    <footer>
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="col-sm-5">
                  <img src="assets/images/logo.svg" className="footer-logo" alt="" />
                  <h5 className="font-weight-normal mt-4 mb-5">
                  Báo là trang web thời trang tin tức, giải trí, âm nhạc của bạn.  Chúng tôi cung cấp cho bạn những tin tức nóng hổi và video mới nhất trực tiếp từ ngành giải trí.
                  </h5>

                </div>
                <div className="col-sm-4">

                </div>
                <div className="col-sm-3">
                  <h3 className="font-weight-bold mb-3">CATEGORIES</h3>
                  <div className="footer-border-bottom pb-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 font-weight-600">Công nghệ</h5>
                      <div className="count">1</div>
                    </div>
                  </div>
                  <div className="footer-border-bottom pb-2 pt-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 font-weight-600">Tin tức</h5>
                      <div className="count">1</div>
                    </div>
                  </div>
                  <div className="footer-border-bottom pb-2 pt-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="mb-0 font-weight-600">Thể thao</h5>
                      <div className="count">1</div>
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <div className="d-sm-flex justify-content-between align-items-center">

                    <div className="fs-14 font-weight-600">
                      Handcrafted by <a href="https://www.bootstrapdash.com/" target="_blank" className="text-white">Nhóm 16</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
  )
}

export default Footer
