import React,{ useState, useEffect } from 'react'
import AuthenticationService from "../../../../api/service/AuthenticationService.js"
import UserService from "../../../../api/service/UserService.js"
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
  CBadge,


} from '@coreui/react'
import moment from 'moment'


const ActivityCmt = (props) => {
  const [data, setData]=useState([])
  const [comment, setComment]=useState([])

  useEffect(() => {

    function getNewData() {
      UserService.retrieveUserByUsername(AuthenticationService.getLoggedInUserName()).then((response) => {
          setData(response.data);
          console.log(response.data)
        })
    }
    function getCommentData() {
      UserService.retrieveCommentOfUser(AuthenticationService.getLoggedInUserName()).then((response) => {
          setComment(response.data);
          console.log(response.data)
        })
    }
    getNewData()
    getCommentData()
  },[])




  function loadBreadBrum(){

    return (
      <>
      <CBreadcrumbItem>
          <CLink to="/profile">{AuthenticationService.getLoggedInUserName()}</CLink>
          </CBreadcrumbItem>
      <CBreadcrumbItem >COMMENTS</CBreadcrumbItem>
      </>
    )
  }

  const getBadge = (status)=>{
    switch (status) {
      case "1": return 'success'
     // case 'Inactive': return 'secondary'
      case "2": return 'warning'
      case "3": return 'danger'
      default: return 'primary'
    }
  }
  const getNameBadge = (status)=>{
    switch (status) {
      case "1": return 'Active'
     // case 'Inactive': return 'secondary'
      case "2": return 'Pending'
      case "3": return 'Banned'
      default: return 'None'
    }
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
        <CNavLink to="/comments" className="menu-item menu-item-active">HOẠT ĐỘNG BÌNH LUẬN</CNavLink>
        <CNavLink to="/addnew"className="menu-item">GỬI BÀI VIẾT</CNavLink>
        <CNavLink to="/gopy" className="menu-item" >GÓP Ý</CNavLink>

        </CNav>
       </CRow>
       </CCol>

       <CCol xs="9">
       <div className="row">
                  {
                    comment.map((row)=>{
                      return (
                        <div key={row.id}>
                          <div className="col-sm-12 grid-margin" >
                            <h2 className="font-weight-300 mb-2">
                              <CLink to={`/details/${row.newId}`}> Id bình luận: {row.id} - Ngày đăng: {moment(row.createdDate).format("YYYY-MM-DD")}</CLink>
                            </h2>
                            <p className="fs-13 text-muted mb-0">
                              <span className="mr-2">Lượt thích: {row.likes} </span>{moment(row.createdDate).fromNow()}-
                              <CBadge color={getBadge(`${row.status}`)}>{getNameBadge(`${row.status}`)} </CBadge>

                            </p>
                            <p className="fs-15">
                            {row.content}
                            </p>
                          </div>
                        <hr></hr>
                        </div>
                      )
                    })
                  }
        </div>

          </CCol>
       </CRow>




     </CCardBody>
     </CCard>

     </CCol>
     </CRow>






    </>
  )
}

export default ActivityCmt
