import React from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import AuthenticationService from '../api/service/AuthenticationService.js'

const TheHeaderDropdown = (props) => {
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={'/admin/avatars/6.jpg'}
            className="c-avatar-img"
            alt=""
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-bell" className="mfe-2" />
          Thông báo
        </CDropdownItem>


        <CDropdownItem to="/comments">
          <CIcon name="cil-comment-square" className="mfe-2" />
          Bình luận

        </CDropdownItem>
        <CDropdownItem to="/password">
          <CIcon name="cil-check-circle" className="mfe-2" />
          Đổi password

        </CDropdownItem>

        <CDropdownItem
        to="/profile"
        >
          <CIcon name="cil-user" className="mfe-2" />Cá nhân
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={()=>{
            AuthenticationService.logout()
            window.location.reload();
          }}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Đăng xuất
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
