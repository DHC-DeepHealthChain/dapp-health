import Tools from "./tools";

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  // const error = new Error(response.statusText);
  // error.response = response;
  // throw error;
}
const request = ( Type, Header, url, successCallback, failCallback, data ) => {
  console.log("requestUrl", url);
  const options = {
    method: Type,
    mode: "cors",
    credentials: "include",
    headers: Header,
  };
  if (Type === "POST_IMG") {
    options.method = "POST";
    options.body = data;
  } else if (Type !== "GET") {
    options.body = JSON.stringify(data) || "";
  }
  fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(response => {
      successCallback(response);
    })
    .catch(res => {
      if (failCallback) {
        failCallback(res);
      }
      // Tools.showToast('网络请求失败，请检查网络');
    });
};

const Util = {
  /*
     * fetch简单封装
     * url: 请求的URL
     * successCallback: 请求成功回调
     * failCallback: 请求失败回调
     *
     * */
  post: function post(url, data, successCallback, failCallback) {
    let myHeader;
    Tools.getStorage(
      "jwt",
      value => {
        myHeader = new Headers({
          "Access-Control-Allow-Origin": "",
          "Content-Type": "application/json",
          Authorization: `Bearer ${value}`,
        });
        request("POST", myHeader, url, successCallback, failCallback, data);
      },
      () => {
        myHeader = new Headers({
          "Access-Control-Allow-Origin": "",
          // 'Content-Type':'multipart/form-data',
          "Content-Type": "application/json",
        });
        request("POST", myHeader, url, successCallback, failCallback, data);
      },
      "text"
    );
  },
  put: function put(url, data, successCallback, failCallback) {
    let myHeader;
    Tools.getStorage(
      "jwt",
      value => {
        myHeader = new Headers({
          "Access-Control-Allow-Origin": "",
          "Content-Type": "application/json",
          Authorization: `Bearer ${value}`,
        });
        request("PUT", myHeader, url, successCallback, failCallback, data);
      },
      () => {
        myHeader = new Headers({
          "Access-Control-Allow-Origin": "",
          "Content-Type": "application/json",
        });
        request("PUT", myHeader, url, successCallback, failCallback, data);
      },
      "text"
    );
  },
  get: function get(url, data, successCallback, failCallback) {
    let myHeader;
    Tools.getStorage(
      "jwt",
      value => {
        myHeader = new Headers({
          "Access-Control-Allow-Origin": "",
          "Content-Type": "application/json",
          Authorization: `Bearer ${value}`,
        });
        let postData = data;
        postData = ((obj) => {
          let str = "";
          for (const key in obj) {
            if (key) {
              if (str !== "") {
                str += "&";
              }
              str += `${key}=${encodeURIComponent(obj[key])}`;
            }
          }
          return str;
        })(postData);
        request("GET", myHeader, `${url}?${postData}`, successCallback, failCallback);
      },
      () => {
        myHeader = new Headers({
          "Access-Control-Allow-Origin": "",
          "Content-Type": "application/json",
        });
        request("GET", myHeader, url, successCallback, failCallback, data);
      },
      "text"
    );
  },
  post_img: function post(url, successCallback, failCallback, data) {
    let myHeader;
    const formData = new FormData();
    formData.append("file", data);
    Tools.getStorage(
      "jwt",
      value => {
        myHeader = new Headers({
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data;charset=utf-8",
          Authorization: `Bearer ${value}`,
        });
        request(
          "POST_IMG",
          myHeader,
          url,
          successCallback,
          failCallback,
          formData
        );
      },
      () => {
        myHeader = new Headers({
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "multipart/form-data;charset=utf-8",
        });
        request(
          "POST_IMG",
          myHeader,
          url,
          successCallback,
          failCallback,
          formData
        );
      },
      "text"
    );
  },
};

export default Util;
