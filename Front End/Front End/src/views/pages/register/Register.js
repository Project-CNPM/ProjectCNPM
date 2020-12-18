import React,{ useState, useEffect }  from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
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
import { useFormik} from "formik";
import UserService from "../../../api/service/UserService.js"

const Register = (props) => {
  const [data, setData]=useState([])
  let {email,userName,password,passwordrepeat}=data
  const formik = useFormik({
    initialValues:{email,userName,password,passwordrepeat},
    enableReinitialize: true,
     onSubmit: values => {onSubmit(values)},
    //  onSubmit: values => {
    //    alert(JSON.stringify(values, null, 2));

    //  },
  });
  function onSubmit(values){
    if(values.password===values.passwordrepeat){
      let todo={
        userName:values.userName,
        password:values.password,
        email:values.email,
        jobTitle:"",
        fullName:"",
        phone:"",
        imageUrl:"",
        intro:"",
        status:2,
        roleCode:["ROLE_USER"]
      }
      console.log(todo)
        UserService.createUser(todo)
       .then(() => props.history.push("/login"))
    }else{
      alert("Tao tai khoan that bai vui long kiem tra lai thong tin")
    }

  }
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" id="userName" name="userName" onChange={formik.handleChange} placeholder="Username" autoComplete="username" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" id="email" name="email" onChange={formik.handleChange} placeholder="Email" autoComplete="email" />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" id="password" name="password" onChange={formik.handleChange} placeholder="Password" autoComplete="new-password" />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" id="passwordrepeat" name="passwordrepeat" onChange={formik.handleChange} placeholder="Repeat password" autoComplete="new-password" />
                  </CInputGroup>
                  <CButton color="success" onClick={formik.handleSubmit} block>Create Account</CButton>
                </CForm>
              </CCardBody>
              {/* <CCardFooter className="p-4">

              </CCardFooter> */}
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
