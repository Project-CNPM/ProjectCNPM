import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import {  CFade } from '@coreui/react'
import AuthenticationService from "../../../api/service/AuthenticationService.js"

// routes config
import routes from './routes'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = (props) => {
  const isAuthenticated = () => {
    //write your condition here
    return AuthenticationService.isAdmin();
  }


  const UnauthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      !isAuthenticated()
        ? <Component {...props} />
        : <Redirect to='/' />
    )} />
  );


  const AuthenticatedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isAuthenticated()
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  );
  return (

          <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
             
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )} />
              )
            })}
             <Redirect from="/" to="/home" />
          </Switch>
        </Suspense>

  )
}

export default React.memo(TheContent)
