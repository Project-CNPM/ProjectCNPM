import React from 'react'
import { Link} from 'react-router-dom'

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useState } from 'react'
import AuthenticationService from '../../../api/service/AuthenticationService.js'
import UserService from '../../../api/service/UserService.js'

const Login = (props) => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [showSucessMessage, setShowSucessMessage] = useState(false);
   const [hasLoginFailed, setHasLoginFailed] = useState(false);

   function loginClicked() {
    console.log(username);
    console.log(password);
    AuthenticationService.executeJwtAuthenticationService(username,password)
    .then((response)=>{
      console.log(response);
      AuthenticationService.registerSuccessfulLoginForJwt(
        username,
        response.data.token
      )
        UserService.retrieveUserByUsername(username).then((resp)=>{
          console.log(resp.data)
          let result=resp.data.role.filter((row)=>{
            return row.code==="ROLE_ADMIN"||row.code==="ROLE_QUANLY"||row.code==="ROLE_NHANSU";
          })
          sessionStorage.setItem("ROLE",result[0]?result[0].code:"");
        })

        props.history.push('/admin/dashboard')

    }).catch( () =>{
      setShowSucessMessage(false);
      setHasLoginFailed(true);
    }
    )
  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">


          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>

                    <p className="text-muted">Sign In to your account</p>
                    {hasLoginFailed && (
                      <div className="alert alert-warning">Sai tên tài khoản hoặc mật khẩu</div>
                    )}
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="username" value={username} onChange={e => setUsername(e.target.value)}/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password"  value={password} onChange={e => setPassword(e.target.value)}/>
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton onClick={()=>loginClicked(props)} color="primary" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Bạn chưa có tài khoản đăng ký ngay để nhận được thông báo về những tin tức mới nhất !!!!!</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>

                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
