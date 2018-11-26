import * as types from "./actionTypes";
import Tools from "../common/tools";
import request from "../common/request";
import URL from "../common/urls";

// 获取数据answers
export const getQuestions = (param) => {
  const url = `${URL.REPORT}`;
  return async dispatch => {
    const data = await request(`${url}/${param}`);
    if( data.error === false ) {
      console.log('getQuestions', data);
      dispatch(getSuccess(data));
      const answerArr = data.result.map((item) => {
        return {
          questionId: item._id, // eslint-disable-line
          answerIds: item.itemList ? [item.itemList[0]._id] : [], // eslint-disable-line
        }
      });
      dispatch(saveList(answerArr));
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
    }
  };
};

export const submitAnswers = (param) => {
  const url = `${URL.REPORT}/answers`;
  return async dispatch => {
    const data = await request(url, {
      method: 'POST',
      body: {
        ...param,
      },
    });
    if( data.error === false ) {
      dispatch(submitSuccess(data));
    } else {
      Tools.showToast(data.message);
      dispatch(failed({ failInfo: data }));
    }
    return Promise.resolve(data);
  };
};

const getSuccess = (data) => {
  return {
    type: types.GET_QUESTION_LIST,
    payload: {
      questionList: data.result,
    },
  }
}

const submitSuccess = () => {
  return {
    type: types.SUBMIT_ANSWER_SUCCESS,
  }
}

export const saveList = (data) => {
  return {
    type: types.SAVE_ANSWER_LIST,
    payload: {
      answerArr: data,
    },
  }
}

// 请求失败
export const failed = payload => {
  return {
    type: types.REQUEST_FAILED,
    payload,
  };
};