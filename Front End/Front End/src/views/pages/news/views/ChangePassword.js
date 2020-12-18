import React,{ useState, useEffect } from 'react'
import AuthenticationService from "../../../../api/service/AuthenticationService.js"
import UserService from "../../../../api/service/UserService.js"
import { useFormik } from "formik";
import {
  CBreadcrumb,
  CBreadcrumbItem,
  CCard,
  CCardBody,
  CCardHeader,
  CLink,
  CCol,
  CRow,
  CNav,
  CNavLink,
  CFormGroup,
  CLabel,
  CInput,
  CButton

} from '@coreui/react'



const ChangePassword = (props) => {
  const [data, setData]=useState([])
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {

    function getNewData() {
      UserService.retrieveUserByUsername(AuthenticationService.getLoggedInUserName()).then((response) => {
          setData(response.data);
          console.log(response.data)
        })
    }
    getNewData()
  },[])

  const formik = useFormik({
    initialValues: {
      id:data.id,
      password: "",
      curpassword: "",
      passwordRepeat: "",


   },
   enableReinitialize: true,
   onSubmit: (values) => {
    onSubmit(values)
   },
 });
  function onSubmit(values){

    if(values.password===values.passwordRepeat){
      let todo={
        id:values.id,
        password:values.password,
      }
      AuthenticationService.executeJwtAuthenticationService(data.userName,values.curpassword)
    .then((response)=>{
      UserService.changePassword(values.id,todo)
      .then(() => props.history.push('/profile'))
      .catch(()=>{
        setShowMessage(true)
      })
    }).catch(()=>{
      setShowMessage(true)
    })
    }
    else{
      setShowMessage(true)
    }

  }

  function loadBreadBrum(){

    return (
      <>
      <CBreadcrumbItem>
          <CLink to="/profile">{AuthenticationService.getLoggedInUserName()}</CLink>
          </CBreadcrumbItem>
      <CBreadcrumbItem >PASSWORD</CBreadcrumbItem>
      </>
    )
  }

  return (
    <>
      <CRow>
      <CCol xs="10">
     <CCard>
     <CCardHeader color="white">
     <CBreadcrumb>
       {loadBreadBrum()}
      </CBreadcrumb>
     </CCardHeader>
     <CCardBody>
       <CRow>
        <CCol xs="3">
       <CRow className="flex-column">
       <CNav vertical>

        <CNavLink to="/profile"  className="menu-item" >TÀI KHOẢN</CNavLink>
        <CNavLink to="/password" className="menu-item menu-item-active" >ĐỔI MẬT KHẨU</CNavLink>

        <CNavLink to="/comments" className="menu-item">HOẠT ĐỘNG BÌNH LUẬN</CNavLink>


         <CNavLink to="/addnew" className="menu-item">GỬI BÀI VIẾT</CNavLink>


        <CNavLink to="/gopy" className="menu-item" >GÓP Ý</CNavLink>

        </CNav>
       </CRow>
       </CCol>

       <CCol xs="7">
       {showMessage && (
                      <div className="alert alert-warning">Thông tin bị sai vui lòng kiểm tra lại</div>
        )}
      <CRow>
      <CCol xs="12">
      <CFormGroup>
         <CLabel htmlFor="curpassword">Password cũ</CLabel>
         <CInput type="password" id="curpassword" name="curpassword" placeholder={`Enter your password`} onChange={formik.handleChange} required />
      </CFormGroup>
      <hr></hr>
      <CFormGroup>
         <CLabel htmlFor="password">Password mới</CLabel>
         <CInput type="password" id="password" name="password" placeholder={`Enter your password`} onChange={formik.handleChange} required />
      </CFormGroup>
      <hr></hr>
      <CFormGroup>
         <CLabel htmlFor="passwordRepeat">Nhập lại password mới</CLabel>
         <CInput type="password" id="passwordRepeat" name="passwordRepeat" placeholder={`Enter your password`} onChange={formik.handleChange} required />
      </CFormGroup>
       </CCol>
       </CRow>

       <CRow className="align-items-center mt-3">
       <CCol xs="2" className="mb-3 mb-xl-0 text-left">
       <CButton variant="outline" color="secondary" onClick={formik.handleSubmit} >Lưu</CButton>
       </CCol>
       <CCol xs="2" className="mb-3 mb-xl-0">
       <CButton variant="outline" color="danger" onClick={()=>{
         props.history.push("/profile")
       }}>Hủy</CButton>
       </CCol>
       </CRow>


        </CCol>

       </CRow>




     </CCardBody>
     </CCard>

     </CCol>
     </CRow>






    </>
  )
}

export default ChangePassword
