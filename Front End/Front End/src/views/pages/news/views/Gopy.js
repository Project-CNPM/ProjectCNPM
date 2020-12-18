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
  CButton,
  CTextarea

} from '@coreui/react'



const Gopy = (props) => {
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
      <CBreadcrumbItem >GOPY</CBreadcrumbItem>
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
        <CNavLink to="/password" className="menu-item " >ĐỔI MẬT KHẨU</CNavLink>

        <CNavLink to="/comments" className="menu-item">HOẠT ĐỘNG BÌNH LUẬN</CNavLink>


         <CNavLink to="/addnew" className="menu-item">GỬI BÀI VIẾT</CNavLink>


        <CNavLink to="/gopy" className="menu-item menu-item-active" >GÓP Ý</CNavLink>

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
         <CLabel htmlFor="content">Nội dung bạn muốn góp ý</CLabel>
         <CTextarea type="content" id="content" name="content" placeholder={`Enter your password`} onChange={formik.handleChange} required />
      </CFormGroup>
      <hr></hr>

       </CCol>
       </CRow>

       <CRow className="align-items-center mt-3">
       <CCol xs="2" className="mb-3 mb-xl-0 text-left">
       <CButton variant="outline" color="secondary" onClick={formik.handleSubmit} >Lưu</CButton>
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

export default Gopy
