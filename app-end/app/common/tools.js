/**
 * Created by huangrz on 16/07/12.
 */
import { Alert, AsyncStorage } from "react-native";
import Toast from "react-native-root-toast"; // 引入类库

const Tools = {
  // 显示提示
  showToast: message => {
    Toast.show(message, {
      duration: Toast.durations.SHORT, // toast显示时长
      position: Toast.positions.BOTTOM, // toast位置
      shadow: false, // toast是否出现阴影
      animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
      hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
      delay: 0, // toast显示的延时
      onShow: () => {
        // toast出现回调（动画开始时）
      },
      onShown: () => {
        // toast出现回调（动画结束时）
      },
      onHide: () => {
        // toast隐藏回调（动画开始时）
      },
      onHidden: () => {
        // toast隐藏回调（动画结束时）
      },
    });
  },
  getStorage: (key, type) => {
    return AsyncStorage.getItem(key)
      .then(value => {
        if (type === "text") {
          return value;
        } else {
          return JSON.parse(value);
        }
      })
      .catch(error => {
        alert(error);
      });
  },
  // 移除缓存数据
  removeStorage: key => {
    return AsyncStorage.removeItem(key)
      .then(value => {
        return value;
      })
      .catch(error => {
        alert(error);
      });
  },

  // 保存缓存数据
  setStorage: async (key, value, isJson) => {
    if (isJson === true) {
      return AsyncStorage.setItem(key, JSON.stringify(value));
    } else {
      return AsyncStorage.setItem(key, value);
    }
  },
  // confirm 对话框
  confirm: (message, confirmBack, cancelBack) => {
    Alert.alert("温馨提示", message, [
      { text: "取消", onPress: cancelBack },
      { text: "确定", onPress: confirmBack },
    ]);
  },

  // 更新对话框
  update: (message, confirmBack, cancelBack) => {
    Alert.alert(
      "更新版本",
      message,
      [
        { text: "下次再说", onPress: cancelBack },
        { text: "下载", onPress: confirmBack },
      ],
      { cancelable: false }
    );
  },

  // alert 对话框
  alert: message => {
    Alert.alert("提示", message);
  },

  // 手机号码正则验证
  checkPhone: phone => {
    if (!/^1[3|4|5|7|8]\d{9}$/.test(phone)) {
      return false;
    }
    return true;
  },
  // 根据URL和参数名获取对应的值
  _getParameterByName(name, url) {
    if (url) {
      name = name.replace(/[\[\]]/g, "\\$&");
      let regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
      return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
  },

  formateDate(date) {
    const _month = date.getMonth();
    const _day = date.getDate();

    const year = date.getFullYear();
    const month = _month + 1 < 10 ? `0${_month + 1}` : `${_month + 1}`;
    const day = _day < 10 ? `0${_day}` : `${_day}`;

    const _date = `${year}-${month}-${day}`;
    return _date;
  },

  formateQuery(params) {
    let str = "";
    for (const key in params) {
      if (key) {
        if (str !== "") {
          str += "&";
        }
        str += `${key}=${encodeURIComponent(params[key])}`;
      }
    }
    return str;
  },

  checkPwd(pwd) {
    const reg = /^[a-zA-Z0-9-]+$/;
    const reg1 = /^[a-zA-Z]+$/;
    const reg2 = /^[0-9]+$/;
    if (pwd.length === 0 || pwd.length < 6) {
      return false
    }
    if (reg1.test(pwd)) {
      return false; // 全字母
    }
    if (reg2.test(pwd)) {
      return false; // 全数字
    }
    if (reg.test(pwd)) {
      return true;
    } else {
      return false;
    }
  },

};
export default Tools;
