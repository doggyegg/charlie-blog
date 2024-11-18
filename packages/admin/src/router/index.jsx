import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';
import Layout from '../pages/Layout';
const Login = lazy(() => {
	return import('../pages/Login');
});

function Router() {
	const [routes, setRoutes] = useState([]);
	const isLogin = localStorage.getItem('TOKEN');

	useEffect(() => {
		fetchMenus().then(res => {
			setRoutes(buildMenus(res));
		});
	}, []);

	// 路由权限走后端，暂时模拟接口
	const fetchMenus = () => {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve([
					{
						name: '个人中心',
						path: '/center',
						element: '/Center/index.jsx'
					}
				]);
			}, 1000);
		});
	};

	// 构建菜单路由
	const buildMenus = menus => {
		const recurFunc = menus => {
			menus.forEach(menu => {
				menu.component = lazy(() => {
					return import(`../pages${menu.element}`);
				});
				if (menu.children?.length) {
					recurFunc(menu.children);
				}
			});
		};
		recurFunc(menus);
		return menus;
	};

	// 递归渲染路由组件
	const recurRender = routes => {
		return routes.map(menu => {
			return (
				<Route path={menu.path} key={menu.path} element={<menu.component />}>
					{menu.children ? recurRender(menu.children) : null}
				</Route>
			);
		});
	};

	return (
		<BrowserRouter>
			<Suspense fallback={<div>loading...</div>}>
				<Routes>
					{/* 固定路由 */}
					<Route path="/" element={<Navigate to={isLogin ? '/home' : '/login'} />}></Route>
					<Route path="/home" element={<Layout />}></Route>
					<Route path="/login" element={<Login />}></Route>
					{/* 权限路由 */}
					{recurRender(routes)}
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}

export default Router;
