import {getComment,createComment,thumbComment} from '../api/index.js';
import store from "../store/index.js";

const getCommentListAction = (id) => (dispatch) => {
  dispatch({
    type: "getCommentListStart",
    payload: {
      id:id,
      code:0,
      data:[]
    },
  });
  getComment(id)
    .then((res) => {
      dispatch({
        type: "getCommentListSuccess",
        payload: {
          code:1,
          id:id,
          data:res.data.data
        },
      });
    })
    .catch((e) => {
      dispatch({
        type: "getCommentListFail",
        payload: {
          code:-1,
          id:id,
          
        },
      });
    });
};

const createCommentAction = (data) => (dispatch) => {
  dispatch({
    type: "createCommentStart",
    payload: {
      createComment:0
    },
  });
  createComment(data)
  .then(res=>{
    dispatch({
        type: "createCommentSuccess",
        payload: {
          createComment:1
        },
      });
  })
  .then(e=>{
    dispatch({
        type: "createCommentSuccess",
        payload: {
          createComment:-1
        },
      });
  })
};
const likeCommentAction=(id)=>(dispatch)=>{
  dispatch({
    type:"likeCommentStart",
    payload:{
      likeComment:0
    }
  })
  thumbComment(id)
  .then(res=>{
    dispatch({
      type:"likeCommentSuccess",
      payload:{
        likeComment:1
      }
    })
  })
  .catch(e=>{
    console.log('thumbLink',e )
    dispatch({
      type:"likeCommentFail",
      payload:{
        likeComment:-1
      }
    })
  })
}

export { getCommentListAction,createCommentAction,likeCommentAction };