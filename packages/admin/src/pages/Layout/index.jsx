import { Menu } from 'antd';
import Header from './Header';
import Content from './Content';
import './index.scss';

const _Layout = () => {
	return (
		<div className="layout">
			<div className="header">
				<Header />
			</div>
			<div className="main">
				<div className="left">
					<Menu />
				</div>
				<div className="right">
					<Content />
				</div>
			</div>
		</div>
	);
};

export default _Layout;
