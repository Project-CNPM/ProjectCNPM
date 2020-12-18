import React from 'react';

const Home = React.lazy(() => import('./views/Home'));
const Details = React.lazy(() => import('./views/Details'));
const Profile = React.lazy(() => import('./views/Profile'));
const ChangePassword = React.lazy(() => import('./views/ChangePassword'));
const Comments = React.lazy(() => import('./views/ActivityCmt'));
const AddNew = React.lazy(() => import('./views/AddNew'));
const Gopy = React.lazy(() => import('./views/Gopy'));
const Category = React.lazy(() => import('./views/Category'));
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', component: Home },
  { path: '/details/:id', exact: true, name: 'Details', component: Details },
  { path: '/profile', exact: true, name: 'Profile', component: Profile },
  { path: '/profile/:name', exact: true, name: 'Profile', component: Profile },
  { path: '/password', exact: true, name: 'ChangePassword', component: ChangePassword },
  { path: '/comments', exact: true, name: 'ChangePassword', component: Comments },
  { path: '/addnew', exact: true, name: 'Add New', component: AddNew },
  { path: '/gopy', exact: true, name: 'Gop y', component: Gopy },
  { path: '/category', exact: true, name: 'Gop y', component: Category },
];

export default routes;
