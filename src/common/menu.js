import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '采购',
    icon: 'pay-circle-o',
    path: 'purchase',
    children: [
      {
        name: '商品列表',
        path: 'product-list',
      },
      {
        name: '购物车',
        path: 'shopping-cart',
      },
      {
        name: '收藏商品',
        path: 'collected',
      },
    ],
  },
  {
    name: '申购步骤',
    icon: 'plus-square-o',
    path: 'form',
    children: [
      {
        name: '申购步骤',
        path: 'step-form',
      },
    ],
  },
  {
    name: '审批步骤',
    icon: 'safety',
    path: 'list',
    children: [
      {
        name: '采购审批',
        path: 'basic-list',
      },
    ],
  },
  {
    name: 'HR',
    icon: 'usergroup-add',
    path: 'human',
    children: [
      {
        name: '导入组织结构',
        path: 'import',
      },
      {
        name: '组织架构',
        path: 'tree',
      },
    ],
  },
  // {
  //   name: 'dashboard',
  //   icon: 'dashboard',
  //   path: 'dashboard',
  //   children: [
  //     {
  //       name: '分析页',
  //       path: 'analysis',
  //     },
  //     {
  //       name: '监控页',
  //       path: 'monitor',
  //     },
  //     {
  //       name: '工作台',
  //       path: 'workplace',
  //     },
  //   ],
  // },
  // {
  //   name: '列表页',
  //   icon: 'table',
  //   path: 'list',
  //   children: [
  //     {
  //       name: '查询表格',
  //       path: 'table-list',
  //     },
  //     {
  //       name: '标准列表',
  //       path: 'basic-list',
  //     },
  //     {
  //       name: '卡片列表',
  //       path: 'card-list',
  //     },
  //     {
  //       name: '搜索列表',
  //       path: 'search',
  //       children: [
  //         {
  //           name: '搜索列表（文章）',
  //           path: 'articles',
  //         },
  //         {
  //           name: '搜索列表（项目）',
  //           path: 'projects',
  //         },
  //         {
  //           name: '搜索列表（应用）',
  //           path: 'applications',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   name: '详情页',
  //   icon: 'profile',
  //   path: 'profile',
  //   children: [
  //     {
  //       name: '基础详情页',
  //       path: 'basic',
  //     },
  //     {
  //       name: '高级详情页',
  //       path: 'advanced',
  //       authority: 'admin',
  //     },
  //   ],
  // },
  // {
  //   name: '结果页',
  //   icon: 'check-circle-o',
  //   path: 'result',
  //   children: [
  //     {
  //       name: '成功',
  //       path: 'success',
  //     },
  //     {
  //       name: '失败',
  //       path: 'fail',
  //     },
  //   ],
  // },
  // {
  //   name: '异常页',
  //   icon: 'warning',
  //   path: 'exception',
  //   children: [
  //     {
  //       name: '403',
  //       path: '403',
  //     },
  //     {
  //       name: '404',
  //       path: '404',
  //     },
  //     {
  //       name: '500',
  //       path: '500',
  //     },
  //     {
  //       name: '触发异常',
  //       path: 'trigger',
  //       hideInMenu: true,
  //     },
  //   ],
  // },
  // {
  //   name: '账户',
  //   icon: 'user',
  //   path: 'user',
  //   authority: 'guest',
  //   children: [
  //     {
  //       name: '登录',
  //       path: 'login',
  //     },
  //     {
  //       name: '注册',
  //       path: 'register',
  //     },
  //     {
  //       name: '注册结果',
  //       path: 'register-result',
  //     },
  //   ],
  // },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
