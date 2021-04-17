import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {adminRoutes, recorderRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {toJS} from "mobx";

const AppRouter = observer(() => {
  const {user} = useContext(Context)

  console.log("USER", toJS(user.user));
  return (
    <Switch>
      {user.isAuth && (user.user.role === "ADMIN" ) && adminRoutes.map(({path, Component}) =>
        <Route key={path} path={path} component={Component} exact/>
      )}
      {user.isAuth && (user.user.role === "RECORDER" ) && recorderRoutes.map(({path, Component}) =>
        <Route key={path} path={path} component={Component} exact/>
      )}
      {publicRoutes.map(({path, Component}) =>
        <Route key={path} path={path} component={Component} exact/>
      )}
      <Redirect to={SHOP_ROUTE}/>
    </Switch>
  );
});

export default AppRouter;