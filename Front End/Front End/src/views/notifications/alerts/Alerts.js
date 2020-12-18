import React,{ useState, useEffect } from 'react'
import UserService from "../../../api/service/UserService.js"
import CommentService from "../../../api/service/CommentService.js"
import NewService from "../../../api/service/NewService.js"
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CLink,
  CProgress,
  CRow
} from '@coreui/react'

const Alerts = () => {
  const [news, setNews]=useState([])
  const [users, setUsers]=useState([])
  const [comment, setComment]=useState([])
  useEffect(() => {

    function getNewData() {
      NewService.retrieveAllByStatus(2).then((response) => {
          setNews(response.data);
          console.log(response.data)
        })
    }
    function getUserData() {
      UserService.retrieveAllByStatus(2).then((response) => {
          setUsers(response.data);
          console.log(response.data)
        })
    }
    function getCommentData() {
      CommentService.retrieveAllByStatus(2).then((response) => {
          setComment(response.data);
          console.log(response.data)
        })
    }
    getUserData()
    getNewData()
    getCommentData()
  },[])

  return (
    <>
      <CRow>
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>
              Thông báo
            </CCardHeader>
            <CCardBody>
              <CAlert color="primary" className="text-center">
                {/*eslint-disable-next-line*/}
                Hiện tại có&nbsp;
                <CLink className="alert-link">{news.length} tin</CLink>.
                đang chờ duyệt.
              </CAlert>
              <CAlert color="secondary" className="text-center">
                {/*eslint-disable-next-line*/}
                Hiện tại có&nbsp;
                <CLink className="alert-link">{comment.length} bình luận</CLink>.
                đang chờ duyệt.
              </CAlert>
              <CAlert color="info" className="text-center">
                {/*eslint-disable-next-line*/}
                Hiện tại có&nbsp;
                <CLink className="alert-link">{users.length} user</CLink>.
                đang chờ duyệt.
              </CAlert>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

    </>
  )
}

export default Alerts
