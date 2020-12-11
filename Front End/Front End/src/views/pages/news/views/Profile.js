import React,{ useState, useEffect } from 'react'
import CategoryService from "../../../../api/service/CategoryService.js"
import NewService from "../../../../api/service/NewService.js"
import {IMAGES_URL,THUMBNAIL_URL} from "../../../../Constants"
import moment from 'moment'
import parse from 'html-react-parser'
import {
  CLink
} from '@coreui/react'

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
     <div className="col-sm-12">
              <div className="card" >
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-8">
                      <div>

                        <a href="/" className="breadcrumb active">TTPHU34</a>
                        <a href="/" className="breadcrumb active">/PROFILE</a>
                      
                      <hr></hr>
                      </div>





                    </div>

                  </div>
                </div>
              </div>
            </div>
    </>
  )
}

export default Details
