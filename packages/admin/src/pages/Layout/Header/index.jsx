import { useState, useEffect } from 'react';
import './index.scss';

const _Header = () => {
	let [count, setCount] = useState(1);

	useEffect(() => {
		setInterval(() => {
			setCount(count + 1);
		}, 1000);
	}, []);

	return (
		<div className="layout__header">
			<div className="icon" onClick={() => setCount(count + 1)}>
				Charlie-Blog
			</div>
			{count}
		</div>
	);
};

export default _Header;
