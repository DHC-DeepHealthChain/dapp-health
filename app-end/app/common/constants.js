// const PRODUCT = true;
const PRODUCT = false;

// const devUrl = 'http://192.168.3.243:18010/api/';
// const devUrl = 'http://192.168.3.226:18010/api/';
const devUrl = 'http://192.168.3.142:18010/api/';
// const devUrl = 'http://121.40.184.139:19010/api/';

const appdes = {
  version: "1.1.0",
  downloadSite: "http://t1.51ddkan.com/healthBao/app-release1.1.0.apk",
};

const url = {
  URL: PRODUCT
    ? "http://121.40.184.139:18010/api/"
    : devUrl,
};

const colors = {
  themeColor: "#22c8dc",
};

const map = {
  NONE: 0,
  NORMAL: 1,
  SATELLITE: 2,
};

const basicExamId = '5ad43f20a47f254f83550d21';

/* 积分规则 */
const scoreRules = [
  { id: "scoreRules1", label: "1、首次注册每人奖励500T钻；" },
  { id: "scoreRules2", label: "2、邀请注册每人500T钻 首次可邀请五人，后期将根据注册情况进行调整；" },
  {
    id: "scoreRules3",
    label: "3、每日签到奖励50T钻 连续签到一周额外奖励200T钻；",
  },
  { id: "scoreRules4", label: "4、完善个人资料填写 奖励300T钻；" },
  { id: "scoreRules5", label: "5、完成一份健康问卷填写奖励200T钻；" },
  {
    id: "scoreRules6",
    label: "6、每阅读一篇健康咨询文章奖励50T钻、每日最多可获得200T钻；",
  },
  {
    id: "scoreRules7",
    label: "7、每日首次分享生活健康文章至微信朋友圈奖励200T钻；",
  },
  {
    id: "scoreRules8",
    label: "8、参与健康计划、每天完成一项奖励80T钻，完成整个计划额外奖励500T钻；",
  },
  {
    id: "scoreRules9",
    label: "9、每上传一份有效影像健康资料奖励200T钻、每日最多可获得。400T钻；",
  },
  {
    id: "scoreRules10",
    label:
      "10、通过意见反馈提交的各种问题、建议，采纳后奖励500T钻；",
  },
  {
    id: "scoreRules10",
    label:
      "11、添加【元链DHC】微信，将一次性获得500T钻奖励。",
  },
];


export default {
  colors,
  url,
  map,
  appdes,
  basicExamId,
  scoreRules,
};
