import React, { useEffect } from "react";
import Formulario from "./components/Formulario";
import { connect } from "react-redux";
import { Provider } from "react-redux";
import store from "./components/store/index";
import instance from "../src/utils/api";
import { addUser } from "../src/components/actions/index";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import routes from "./components/routes";

const App = connect(
  null,
  mapDispatchToProps
)((props) => {
  useEffect(() => {
    instance.get(`/api/user`).then((result) => {
      props.addUser(result.data);
    });
  });
  return (
    <BrowserRouter>
      <Switch>
        <Route  path={routes.Formulario} component={Formulario} />
      </Switch>
    </BrowserRouter>
  );
});
function mapDispatchToProps(dispatch) {
  return {
    addUser: (user) => dispatch(addUser(user)),
  };
}
const ConnectedApp = (props) => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
export default ConnectedApp;
