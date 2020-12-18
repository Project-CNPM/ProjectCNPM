import React, { useState, useEffect } from 'react'
import {
  CCard, CCardBody, CCardHeader, CCol, CRow, CForm,
  CFormGroup,
  CFormText,
  CInputFile,
  CInput,
  CLabel,
  CCardFooter,
  CSelect,
  CButton

} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import moment from 'moment'
import NewService from "../../../../api/service/NewService.js"
import CategoryService from "../../../../api/service/CategoryService.js"
import UploadService from "../../../../api/service/UploadService.js"
import { useFormik } from "formik";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const New = (props) => {

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
          likes: values.likes || 0,
          status: values.status || 2,
          categoryCode: values.categoryCode|| "tin-tuc"

        }
          NewService.createNew(todo)
            .then(() => props.history.push("/admin/news"))

      })




  }

  return (
    <>
      <CRow>
        <CCol xs="12" md="12" >
          

        </CCol>

      </CRow>
    </>

  )
}

export default New
