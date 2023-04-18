import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import pathToRegexp from 'path-to-regexp';
import './BasicLayout.less';
import Contents from './Contents';

class BasicLayout extends React.PureComponent {
  socket = null;

  static propTypes = {
    getCurrentUser: PropTypes.func,
    logout: PropTypes.func,
    isInQiankun: PropTypes.bool,
    isShop: PropTypes.bool,
  };

  static defaultProps = {
    getCurrentUser: () => {},
    isShop: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false, // 当前侧边栏收起状态
    };
  }

  componentDidMount() {
    this.props.getCurrentUser();
  }

  onMenuClick = ({ key }) => {
    const { logout } = this.props;

    if (key === 'logout') {
      logout({ shouldRequest: true, redirectUrl: `${location.origin}/` });
    }
  };

  /**
   * 设置菜单收缩状态
   */
  setMenuCollapsed = (iscollapsed) => {
    const collapsed = iscollapsed || !this.state.collapsed;
    this.setState({ collapsed });
  };

  getRouterAuthority = (pathname, routeData) => {
    let routeAuthority;
    // 递归遍历路由获取authority，子路由若没设置authority，将继承父路由authority
    const getAuthority = (key, routes) => {
      routes.forEach((route) => {
        if (route.path && pathToRegexp(route.path, [], { end: false }).test(key) && route.authority) {
          routeAuthority = route.authority;
        }
        if (route.routes) {
          routeAuthority = getAuthority(key, route.routes);
        }
      });
      return routeAuthority;
    };
    return getAuthority(pathname, routeData);
  };

  render() {
    const { isInQiankun, isShop } = this.props;
    return (
      <BrowserRouter basename={isInQiankun ? '/todocenter-web' : '/'}>
        <Switch>
          <Route
            render={() => {
              return (
                <Layout className={`todocenter-container ${isInQiankun ? 'in-qk' : 'out-qk'}`}>
                  <Layout className="right-layout">
                    <Layout className="ant-layout-ie9">
                      <Contents isInQiankun={isInQiankun} isShop={isShop} />
                    </Layout>
                  </Layout>
                </Layout>
              );
            }}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    getCurrentUser: dispatch.common.getCurrentUser,
    logout: dispatch.common.logout,
  };
};

const mapState = (state) => {
  return {
    currentUser: state.common.currentUser,
    isShop: state.common.isShop,
    isInQiankun: state.common.isInQiankun,
    getCurrentUserLoading: state.loading.effects.common.getCurrentUser,
  };
};

export default connect(mapState, mapDispatch)(BasicLayout);
