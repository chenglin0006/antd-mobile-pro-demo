import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import './BasicLayout.less';
import Contents from './Contents';

class BasicLayout extends React.PureComponent {
  socket = null;

  static propTypes = {
    getCurrentUser: PropTypes.func,
  };

  static defaultProps = {
    getCurrentUser: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route
            render={() => {
              return (
                <Layout className="todocenter-container">
                  <Layout className="right-layout">
                    <Layout className="ant-layout-ie9">
                      <Contents />
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
