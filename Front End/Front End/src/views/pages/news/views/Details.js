import React,{ useState, useEffect } from 'react'
import CategoryService from "../../../../api/service/CategoryService.js"
import UserService from "../../../../api/service/UserService.js"
import NewService from "../../../../api/service/NewService.js"
import AuthenticationService from "../../../../api/service/AuthenticationService.js"
import CommentService from "../../../../api/service/CommentService.js"
import CommentChildService from "../../../../api/service/CommentChildService.js"
import {IMAGES_URL,THUMBNAIL_URL} from "../../../../Constants"
import moment from 'moment'
import parse from 'html-react-parser'
import swal from 'sweetalert'
import { useFormik } from "formik";
import "./commentstyle.css"

import {
  CInput,
  CLink,
  CTextarea
} from '@coreui/react'

const Details = (props) => {
  const id =props.match.params.id
  const [data, setData]=useState([])
  const [news, setNews]=useState([])
  const [userData, setUserData]=useState([])
  const [comments, setComments]=useState([])
  const [commentChild, setCommentChild]=useState([])
  const [commentId, setCommentId]=useState()


  const formik = useFormik({
     initialValues: {
      content: '',
      newId:id
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmitComment(values)
    },
    //  onSubmit: values => {
    //    alert(JSON.stringify(values, null, 2));
    //  },
  });
  const formikChild = useFormik({
    initialValues: {
     contentChild: '',
     commentId:commentId
   },
   enableReinitialize: true,
   onSubmit: (values) => {
     onSubmitCommentChild(values)
   },
    // onSubmit: values => {
    //   alert(JSON.stringify(values, null, 2));
    // },
 });

  useEffect(() => {
    function getNewData() {
      if (id !== '-1') {
        NewService.retrieveNew(id).then((response) => {
          setData(response.data);
        })
      }
    }
    function getCommentData() {

        CommentService.retrieveCommentByNewsId(id).then((response) => {
          setComments(response.data);

        })
    }
    function getUserData() {
      UserService.retrieveUserByUsername(AuthenticationService.getLoggedInUserName()).then((response) => {
          setUserData(response.data);
          console.log(response.data)
        })
    }

    getUserData()
    getNewData();
    getNewLatestData();
    getCommentData();

  }, [id])
  function getNewLatestData(){

    NewService.retrieveAllNewsWithStatus(1,3,1).then((response) => {
      setNews(response.data.listResult);
    })
    .catch((err)=>{
      alert(err.message);
    });
  }
  function onSubmitComment(values){
    let comment = {
      content: values.content,
      newId: values.newId,
      userId:userData.id
    }
    CommentService.createComment(comment).then(()=>{
      swal("Thành công", "Trước khi được đăng tải vui lòng chờ quản trị viên duyệt!", "success");
      formik.setFieldValue("content","");

    })

  }
  function onSubmitCommentChild(values){
    let comment = {
      content: values.contentChild,
      commentCode: values.commentId
    }
    CommentChildService.createComment(comment).then(()=>{
      swal("Thành công", "Trước khi được đăng tải vui lòng chờ quản trị viên duyệt!", "success");
      formikChild.setFieldValue("contentChild","");
    })

  }



  return (
    <>
     <div className="col-sm-12">
              <div className="card" >
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-8">
                      <div>
                        <h1 className="font-weight-600 mb-1">
                          {data && data.title}
                        </h1>
                        <p className="fs-13 text-muted mb-0">
                          <span className="mr-2">{data && data.categoryCode} </span>{data&&moment(data.createdDate).fromNow()}
                        </p>

                        {data && parse(`${data.content}`)}

                      </div>



                      <div className="post-comment-section">
                        <h3 className="font-weight-600">Related Posts</h3>
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="post-author">
                              <div className="rotate-img">
                                <img
                                  src="../assets/images/inner/inner_5.jpg"
                                  alt="banner"
                                  className="img-fluid"
                                />
                              </div>
                              <div className="post-author-content">
                                <h5 className="mb-1">
                                  Virus Kills Member Of Council Advising Iran’s
                                  Supreme Leader
                                </h5>
                                <p className="fs-13 text-muted mb-0">
                                  <span className="mr-2">Photo </span>10 Minutes ago
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="post-author">
                              <div className="rotate-img">
                                <img
                                  src="../assets/images/inner/inner_6.jpg"
                                  alt="banner"
                                  className="img-fluid"
                                />
                              </div>
                              <div className="post-author-content">
                                <h5 className="mb-1">
                                  Virus Kills Member Of Council Advising Iran’s
                                  Supreme Leader
                                </h5>
                                <p className="fs-13 text-muted mb-0">
                                  <span className="mr-2">Photo </span>10 Minutes ago
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <CTextarea className="block_input_texarea" id="content" name="content" onChange={formik.handleChange} value={formik.values.content || ""} rows="2" placeholder="What are you thinking?"></CTextarea>
                        <div className="mar-top clearfix">
                          <button className="btn btn-sm btn-primary pull-right" type="submit" onClick={formik.handleSubmit} value={formik.values.content}><i className="fa fa-pencil fa-fw"></i> Share</button>
                        </div>

                        <div className="comment-section">
                        <h5 className="font-weight-600">Comments</h5>



                          {
                            comments.map((row)=>{
                              return (
                            <div className="media-block pad-all" key={row.id}>
                            <a className="media-left" href="#"><img className="img-circle img-sm" alt="Profile Picture" src="https://bootdey.com/img/Content/avatar/avatar1.png"></img></a>
                            <div className="media-body">
                              <div className="mar-btm">
                                <a href="#" className="btn-link text-semibold media-heading box-inline">{row.createdBy}</a>
                                <p className="text-muted text-sm"><i className="fa fa-mobile fa-lg"></i> - From Mobile - {moment(row.createdDate).fromNow()}</p>
                              </div>
                              <p>{row.content}</p>
                              {/* <img className="img-responsive thumbnail" src="https://via.placeholder.com/400x300" alt="Image"></img> */}
                              <div className="pad-ver">
                                <span className="tag tag-sm"><i className="fa fa-heart text-danger"></i> {row.likes} Likes</span>
                                <div className="btn-group">
                                  <a className="btn btn-sm btn-default btn-hover-success" href="#"><i className="fa fa-thumbs-up"></i></a>
                                  <a className="btn btn-sm btn-default btn-hover-danger" href="#"><i className="fa fa-thumbs-down"></i></a>
                                </div>
                                <a className="btn btn-sm btn-default btn-hover-primary" onClick={()=> {
                                    if(commentId===row.id){
                                      setCommentId(0)
                                    }else{
                                      setCommentId(row.id)
                                    }


                                 }}>Comment</a>

                              </div>


                                {
                                  commentId===row.id?
                                  (
                                    <>
                                    <br></br>
                                    <div id={`formRep_${row.id}`}>
                                    <CTextarea  className="block_input_texarea" id={`contentChild_${row.id}`} name="contentChild" onChange={formikChild.handleChange} value={formikChild.values.contentChild || ""} rows="2" placeholder="What are you thinking?"></CTextarea>
                                    <div className="mar-top clearfix">
                                      <button className="btn btn-sm btn-primary pull-right" onClick={formikChild.handleSubmit} type="submit"><i className="fa fa-pencil fa-fw"></i> Share</button>
                                    </div>
                                    </div>
                                    </>
                                  ):""
                                }
                                {(row.commentchild.length>0 && !commentChild.includes(row.id)) &&
                                <p className="count-reply"><CLink  className="view_all_reply" onClick={()=>{
                                  setCommentChild([...commentChild,row.id])
                                }} ><span className="num_reply_cmt">{row.commentchild.length}</span> trả lời</CLink></p>
                              }

                              <hr></hr>
                              <div>
                            {
                            commentChild.includes(row.id) && row.commentchild.map((item)=>
                            { return (<div className="media-block pad-all" key={item.id}>
                            <a className="media-left" href="#"><img className="img-circle img-sm" alt="Profile Picture" src="https://bootdey.com/img/Content/avatar/avatar2.png"></img></a>
                            <div className="media-body">
                              <div className="mar-btm">
                                <a href="#" className="btn-link text-semibold media-heading box-inline">{item.createdBy}</a>
                                <p className="text-muted text-sm"><i className="fa fa-globe fa-lg"></i> - From Web - {moment(item.createdDate).fromNow()}</p>
                              </div>
                              <p>{item.content}</p>
                              <div>
                                <div className="btn-group">
                                  <a className="btn btn-sm btn-default btn-hover-success" href="#"><i className="fa fa-thumbs-up"></i></a>
                                  <a className="btn btn-sm btn-default btn-hover-danger" href="#"><i className="fa fa-thumbs-down"></i></a>
                                </div>

                              </div>
                            </div>
                            </div>)}) }
                          </div>
                            </div>
                          </div>
                              )
                            })
                          }





                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <h2 className="mb-4 text-primary font-weight-600">
                        Latest news
                      </h2>
                      {
                        news.map((item)=>(
                      <div className="row" key={item.id}>
                        <div className="col-sm-12">
                          <div className="border-bottom pb-4 pt-4">
                            <div className="row">
                              <div className="col-sm-8">
                                <h5 className="font-weight-600 mb-1">
                                  {item.title}
                                </h5>
                                <p className="fs-13 text-muted mb-0">
                                  <span className="mr-2">{item.category} </span>{item&&moment(item.createdDate).fromNow()}
                                </p>
                              </div>
                              <div className="col-sm-4">
                                <div className="rotate-img">
                                <CLink className="nav-link" href={`/details/${item.id}`}>
                                  <img
                                    src={`${THUMBNAIL_URL}${item.thumbnail}&size=150x150`}
                                    alt="banner"
                                    className="img-fluid"
                                  />
                                  </CLink>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      )
                        )
                      }





                    </div>
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}

export default Details
