// @ts-nocheck
// This file is generated by Umi automatically
// DO NOT CHANGE IT MANUALLY!
import React from 'react';

export async function getRoutes() {
  const routes = {"1":{"path":"/","id":"1"},"2":{"path":"/Logo","id":"2"},"3":{"path":"/Maintain","id":"3"},"4":{"path":"/404","id":"4"},"5":{"path":"/*","id":"5"}} as const;
  return {
    routes,
    routeComponents: {
'1': React.lazy(() => import(/* webpackChunkName: "p__index" */'@/pages/index.js')),
'2': React.lazy(() => import(/* webpackChunkName: "routes__login" */'@/routes/login.js')),
'3': React.lazy(() => import(/* webpackChunkName: "routes__maintain" */'@/routes/maintain.tsx')),
'4': React.lazy(() => import(/* webpackChunkName: "routes__404" */'@/routes/404.js')),
'5': React.lazy(() => import(/* webpackChunkName: "routes__404" */'@/routes/404.js')),
},
  };
}
