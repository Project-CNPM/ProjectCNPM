import React,{ useState, useEffect } from 'react'
import AuthenticationService from "../../../../api/service/AuthenticationService.js"
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
  CFormText,
  CInputFile,
  CCardFooter,
  CSelect,
  CForm

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import moment from 'moment'
import NewService from "../../../../api/service/NewService.js"
import CategoryService from "../../../../api/service/CategoryService.js"
import UploadService from "../../../../api/service/UploadService.js"
import { useFormik } from "formik";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



const AddNew = (props) => {
  const [showMessage, setShowMessage] = useState(false);
  const [data, setData] = useState([])
  const [category, setCategory] = useState([])
  let { title, content, shortDescription, thumbnail, status, likes, categoryCode} = data
  const id = props.match.params.id


  const formik = useFormik({
    initialValues: { title, content, shortDescription, thumbnail, status, likes, categoryCode },
    enableReinitialize: true,
    onSubmit: values => { onSubmit(values) },
    //  onSubmit: values => {
    //    alert(JSON.stringify(values, null, 2));

    //  },
  });


  useEffect(() => {
    function getCategoryData() {

      CategoryService.retrieveAllCategories().then((response) => {
        setCategory(response.data);
      })
        .catch((err) => {
          alert(err.message);
        });
    }

    getCategoryData();

  }, [id])

  function onSubmit(values) {
    console.log(values.thumbnail)
    let thumbnail=values.thumbnail;
    UploadService.uploadFile(values.thumbnail)
      .then((res) => {
        thumbnail=res.data.fileName;

      }).catch((error)=>{
          thumbnail=values.thumbnail
      }).finally(()=>{
        let todo = {
          id: id,
          title: values.title,
          content: values.content,
          shortDescription: values.shortDescription,
          thumbnail: thumbnail || "",
          likes: 1,
          status: 2,
          categoryCode: values.categoryCode|| "tin-tuc"

        }
          NewService.createNew(todo)
            .then(() => props.history.push("/admin/news"))

      })
  }

  function loadBreadBrum(){

    return (
      <>
      <CBreadcrumbItem>
          <CLink to="/profile">{AuthenticationService.getLoggedInUserName()}</CLink>
          </CBreadcrumbItem>
      <CBreadcrumbItem >ADDNEW</CBreadcrumbItem>
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
         <CNavLink to="/addnew"className="menu-item menu-item-active">GỬI BÀI VIẾT</CNavLink>
        <CNavLink  to="/gopy" className="menu-item" >GÓP Ý</CNavLink>

        </CNav>
       </CRow>
       </CCol>

       <CCol xs="9">

        <CRow>


            <CForm action="" method="post" onSubmit={formik.handleSubmit} className="form-horizontal">

                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="title">Title</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="title" name="title" placeholder="title" onChange={formik.handleChange}
                      value={formik.values.title || ""} />
                    <CFormText></CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="shortDescription">Short Description</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CInput id="shortDescription" name="shortDescription" placeholder="shortDescription" onChange={formik.handleChange}
                      value={formik.values.shortDescription || ""} />
                    <CFormText></CFormText>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CLabel col md="3" htmlFor="thumbnail">File input</CLabel>
                  <CCol xs="12" md="9">
                    <CInputFile id="thumbnail" name="thumbnail"
                      onChange={(event) => {
                        formik.setFieldValue("thumbnail", event.currentTarget.files[0]);
                      }}
                    />
                  </CCol>
                </CFormGroup>


                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="select">Category</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CSelect custom name="categoryCode" id="categoryCode" onChange={formik.handleChange} value={`${formik.values.categoryCode}` || "1"}>
                      {
                        category.map((item) =>
                          (<option key={item.id} value={item.code}>{item.name}</option>)
                        )
                      }


                    </CSelect>
                  </CCol>
                </CFormGroup>
                <CFormGroup row>
                  <CCol md="3">
                    <CLabel htmlFor="content">Content</CLabel>
                  </CCol>
                  <CCol xs="12" md="9">
                    <CKEditor
                      editor={ClassicEditor}
                      name="intro"
                      data={formik.values.content || ""}
                      config={
                        {

                          ckfinder: {
                            uploadUrl: 'http://localhost:8081/ckfinder/connector?command=FileUpload&type=Files&currentFolder=/'
                          }
                        }
                      }
                      onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                      }}
                      onChange={(event, editor) => {

                        const data = editor.getData();
                        formik.setFieldValue("content", data);

                      }}

                    />
                  </CCol>
                </CFormGroup>


                <CButton className="" type="submit" size="sm" color="primary"><CIcon name="cil-scrubber" /> Submit</CButton>

            </CForm>


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

export default AddNew
