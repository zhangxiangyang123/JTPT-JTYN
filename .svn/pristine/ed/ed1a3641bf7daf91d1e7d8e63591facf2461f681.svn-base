import { param2Obj } from '@/utils'

const userMap = {
  admin: {
    data: {
      roles: ['admin'],
      token: 'admin',
      introduction: '我是超级管理员',
      avatar: 'src/assets/avatar.gif',
      name: 'Admin',
      permission: [{
        path: '/charts',
        component: 'Layout',
        redirect: 'noredirect',
        name: 'Charts',
        meta: {
          title: '图表',
          icon: 'chart'
        },
        children: [
          {
            path: 'echarts',
            component: '/charts/echarts',
            name: 'Echarts',
            meta: { title: '可配置', noCache: true }
          },
          {
            path: 'keyboard',
            component: '/charts/keyboard',
            name: 'KeyboardChart',
            meta: { title: 'keyboardChart', noCache: true }
          },
          {
            path: 'line',
            component: '/charts/line',
            name: 'LineChart',
            meta: { title: 'lineChart', noCache: true }
          },
          {
            path: 'mixchart',
            component: '/charts/mixChart',
            name: 'MixChart',
            meta: { title: 'mixChart', noCache: true }
          }
        ]
      }]
    },
    code: 20000
  },
  editor: {
    data: {
      roles: ['editor'],
      token: 'editor',
      introduction: '我是编辑',
      avatar: 'src/assets/avatar.gif',
      name: 'Editor',
      permission: []
    },
    code: 20000
  }
}

const logout = {
  code: 20000
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: config => {
    return logout
  }
}
