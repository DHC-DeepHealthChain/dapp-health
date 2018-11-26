
/* const SharePlatform = {
  QQ: 0,
  SINA: 1,
  WECHAT: 2,
  WECHATMOMENT: 3,
  QQZONE: 4,
  FACEBOOK: 5,
}; */
const platforms = [
    {
        id: 1,
        icon: require('../imgs/inviteCode/wechat.png'),
        label: '微信',
        key: 'WECHAT',
    },
    {
        id: 2,
        icon: require('../imgs/inviteCode/wechatComment.png'),
        label: '微信朋友圈',
        key: 'WECHATMOMENT',
    },
    // {
    //     id: 3,
    //     icon: require('../imgs/inviteCode/sina.png'),
    //     label: '微博',
    //     key: 'SINA',
    // },
    // {
    //     id: 4,
    //     icon: require('../imgs/inviteCode/qq_icon.png'),
    //     label: 'QQ空间',
    //     key: 'QQZONE',
    // },
];

export default platforms;