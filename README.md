### React project

> custom theme and international language config, use css-module

#### About custom theme
this project use `antd-theme-generator`, you can read `{projectName}/color.js`.
change theme need use `less.min.js`, do not remove it unless you know what you are

```bash
# first step run
# read for your varible-theme file to generator antd color.less
yarn run color
```

```bash
# run project
yarn install
yarn run dev
yarn run build
```

 #### simple route config like vue-router! 
 Also can use React.lazy import you components, then `{projectName}/src/routers/index.tsx` will read it and use `<React.Suspense />` to make code-spilt, more detail in `{projectName}/src/pageModel/common/index.tsx`
``` js
export const routesConfig: RouteConfigDeclaration[] = [
    {
        path: '/',
        component: CommonLayout,
        hidden: true,
        children: [
            {
                path: '/home/index',
                key: '1',
                exact: true,
                name: 'title1',
                isDynamic: true,
                component: React.lazy(() => import('@src/pages/home'))
            },
            {
                path: '/audit',
                isRedirect: true,
                component: RouteGo,
                name: 'title2',
                key: '4',
                children: [
                    {
                        path: '/audit/file',
                        exact: true,
                        name: 'title3',
                        isDynamic: true,
                        component: React.lazy(() => import('@src/pages/audit/file'))
                    },
                    {
                        path: '/audit/media',
                        exact: true,
                        isDynamic: true,
                        name: 'title4',
                        component: React.lazy(() => import('@src/pages/audit/source'))
                    }
                ]
            }
        ]
    }
]
```

#### language config
it's simple, to read i18next document