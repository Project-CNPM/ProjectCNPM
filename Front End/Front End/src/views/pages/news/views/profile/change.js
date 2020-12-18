import React,{ useState, useEffect } from 'react'
import CategoryService from "../../../../api/service/CategoryService.js"
import NewService from "../../../../api/service/NewService.js"
import {IMAGES_URL,THUMBNAIL_URL} from "../../../../Constants"
import {
  CBreadcrumb,
  CBreadcrumbItem,
  CBreadcrumbRouter,
  CCard,
  CCardBody,
  CCardHeader,
  CLink,
  CCol,
  CRow,
  CNav,
  CNavItem,
  CNavLink,
  CFormGroup,
  CFormText,
  CLabel,
  CInput,
  CButton

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import moment from 'moment'


const Details = (props) => {
  const id =props.match.params.id
  const [category, setCategory]=useState([])
  const [data, setData]=useState([])
  const [news, setNews]=useState([])



  useEffect(() => {
    function getNewData() {
      if (id !== '-1') {
        NewService.retrieveNew(id).then((response) => {
          setData(response.data);
        })
      }

    }
    function getCategoryData() {

      CategoryService.retrieveAllCategories().then((response) => {
        setCategory(response.data);
      })
        .catch((err) => {
          alert(err.message);
        });
    }
    getNewData();
    getCategoryData();
    getNewLatestData();

  }, [id])
  function getNewLatestData(){

    NewService.retrieveAllNewsWithStatus(1,3,1).then((response) => {
      setNews(response.data.listResult);
    })
    .catch((err)=>{
      alert(err.message);
    });
  }



  return (
    <>
      <CRow>
      <CCol xs="10">
     <CCard>
     <CCardHeader color="white">
     <CBreadcrumb>
       <CBreadcrumbItem>
        <CLink>TTPHU34</CLink>
         </CBreadcrumbItem>
          <CBreadcrumbItem active>PROFILE</CBreadcrumbItem>
      </CBreadcrumb>
     </CCardHeader>
     <CCardBody>
       <CRow>
        <CCol xs="3">
       <CRow className="flex-column">
       <CNav vertical>

        <CNavLink className="menu-item menu-item-active" >TÀI KHOẢN</CNavLink>


        <CNavLink className="menu-item">HOẠT ĐỘNG BÌNH LUẬN</CNavLink>


         <CNavLink className="menu-item">GỬI BÀI VIẾT</CNavLink>


        <CNavLink className="menu-item" >GÓP Ý</CNavLink>

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
                    <p className="form-control-static">ttp****@gm***.com</p>
                    </div>
                    <div>
                    <CLink to="/account/email"><CIcon name="cil-pencil" alt="Settings" /></CLink>
                    </div>
                    </div>

                  </CFormGroup>
                  <CFormGroup>
                    <CLabel className="label_fill" htmlFor="name">EMAIL</CLabel>
                    <div className="edit-link">
                    <div className="edit-link-contents">
                    <p className="form-control-static">ttp****@gm***.com</p>
                    </div>
                    <div>
                    <CLink to="/account/email"><CIcon name="cil-pencil" alt="Settings" /></CLink>
                    </div>
                    </div>

                  </CFormGroup>
                  <CFormGroup>
                    <CLabel className="label_fill" htmlFor="name">ĐIỆN THOẠI</CLabel>
                    <div className="edit-link">
                    <div className="edit-link-contents">
                    <p className="form-control-static">Username</p>
                    </div>
                    <div>
                    <CLink to="/account/email"><CIcon name="cil-pencil" alt="Settings" /></CLink>
                    </div>
                    </div>

                  </CFormGroup>
                  <hr></hr>


                </CCol>


       </CRow>

       <CRow >
       <CCol xs="12">
       <CFormGroup>
          <CLabel htmlFor="name">Name</CLabel>
          <CInput id="name" placeholder="Enter your name" required />
        </CFormGroup>
        </CCol>
        </CRow>

        <CRow className="align-items-center mt-3">
        <CCol xs="2" className="mb-3 mb-xl-0 text-left">
        <CButton variant="outline" color="secondary" >Lưu</CButton>
        </CCol>
        <CCol xs="2" className="mb-3 mb-xl-0">
        <CButton variant="outline" color="danger" >Hủy</CButton>
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

export default Details
