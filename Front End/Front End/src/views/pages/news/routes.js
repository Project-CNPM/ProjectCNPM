import React from 'react';

const Home = React.lazy(() => import('./views/Home'));
const Details = React.lazy(() => import('./views/Details'));
const Profile = React.lazy(() => import('./views/Profile'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', component: Home },
  { path: '/details/:id', exact: true, name: 'Details', component: Details },
  { path: '/profile', exact: true, name: 'Profile', component: Profile },
];

export default routes;
