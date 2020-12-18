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
  CBadge

} from '@coreui/react'
import CIcon from '@coreui/icons-react'


const Profile = (props) => {

  const [data, setData]=useState([])

  useEffect(() => {
    console.log(props)
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
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,

   },
   enableReinitialize: true,
   onSubmit: (values) => {
    onSubmit(values)
   },
   //  onSubmit: values => {
   //    alert(JSON.stringify(values, null, 2));
   //  },
 });
  function onSubmit(values){
    let todo={
      id:values.id,
      fullName:values.fullName,
      email:values.email,
      phone:values.phone,
    }

      UserService.updateUser(values.id,todo)
    .then( () => props.history.push('/profile'))

  }


  function loadFormEdit(){
    if(props.match.params)
    {
      if(props.match.params.name==="email"){
          return formEdit("Email","email")
      }
      else if (props.match.params.name==="phone"){
          return formEdit("Số điện thoại","phone")
      }
      else if (props.match.params.name==="fullname"){
        return formEdit("Họ và tên","fullName")
    }
    }
    return (
      <>
      </>
    )
  }
  function loadBreadBrum(){
    if(props.match.params)
    {
      if(props.match.params.name==="email"){
          return breadBrum("CHANGEMAIL")
      }
      else if (props.match.params.name==="phone"){
        return breadBrum("CHANGEPHONE")
      }
      else if (props.match.params.name==="fullname"){
        return breadBrum("CHANGEFULLNAME")
    }
    }
    return (
      <>
      <CBreadcrumbItem>
          <CLink to="/profile">{AuthenticationService.getLoggedInUserName()}</CLink>
          </CBreadcrumbItem>
      <CBreadcrumbItem >PROFILE</CBreadcrumbItem>
      </>
    )
  }
  function formEdit(label,name){
    return (
      <>
      <hr></hr>
      <CRow>
      <CCol xs="12">
      <CFormGroup>
         <CLabel htmlFor="name">{label} <CBadge color="danger">NEW</CBadge></CLabel>
         <CInput id={name} name={name} placeholder={`Enter your ${name}`} onChange={formik.handleChange}  required />
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
       </>
    )
  }
  function breadBrum(label){
    return (
      <>
          <CBreadcrumbItem>
          <CLink>TTPHU34</CLink>
          </CBreadcrumbItem>
          <CBreadcrumbItem ><CLink to="/profile">PROFILE</CLink></CBreadcrumbItem>
          <CBreadcrumbItem active>{label}</CBreadcrumbItem>
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

        <CNavLink to="/profile" className="menu-item menu-item-active" >TÀI KHOẢN</CNavLink>
        <CNavLink to="/password" className="menu-item " >ĐỔI MẬT KHẨU</CNavLink>

        <CNavLink to="/comments"className="menu-item">HOẠT ĐỘNG BÌNH LUẬN</CNavLink>


         <CNavLink to="/addnew" className="menu-item">GỬI BÀI VIẾT</CNavLink>


        <CNavLink to="/gopy" className="menu-item" >GÓP Ý</CNavLink>

        </CNav>
       </CRow>
       </CCol>

       <CCol xs="7">
       <CRow className="flex-column">
         <h3>Tài khoản</h3>
         <hr></hr>

                <CCol xs="12">
                  <CFormGroup>
                    <CLabel className="label_fill" htmlFor="name">HỌ VÀ TÊN</CLabel>
                    <div className="edit-link">
                    <div className="edit-link-contents">
                    <p className="form-control-static">{data.fullName || ""}</p>
                    </div>
                    <div>
                    <CLink to="/profile/fullname"><CIcon name="cil-pencil" alt="Settings" /></CLink>
                    </div>
                    </div>

                  </CFormGroup>
                  <CFormGroup>
                    <CLabel className="label_fill" htmlFor="name">EMAIL</CLabel>
                    <div className="edit-link">
                    <div className="edit-link-contents">
                    <p className="form-control-static">{data.email || ""}</p>
                    </div>
                    <div>
                    <CLink to="/profile/email"><CIcon name="cil-pencil" alt="Settings" /></CLink>
                    </div>
                    </div>

                  </CFormGroup>
                  <CFormGroup>
                    <CLabel className="label_fill" htmlFor="name">ĐIỆN THOẠI</CLabel>
                    <div className="edit-link">
                    <div className="edit-link-contents">
                    <p className="form-control-static">{data.phone || ""}</p>
                    </div>
                    <div>
                    <CLink to="/profile/phone"><CIcon name="cil-pencil" alt="Settings" /></CLink>
                    </div>
                    </div>

                  </CFormGroup>



                </CCol>


       </CRow>

        {loadFormEdit()}

        </CCol>

       </CRow>




     </CCardBody>
     </CCard>

     </CCol>
     </CRow>






    </>
  )
}

export default Profile
