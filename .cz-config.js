module.exports = {
	// 可选类型，和上面commitlint.config.js配置的规则一一对应
	types: [
		{ value: 'feat', name: 'feat: 新功能' },
		{ value: 'fix', name: 'fix: 修复' },
		{ value: 'style', name: 'style: 样式修改' },
		{ value: 'document', name: 'document: 添加注释' },
		{ value: 'refactor', name: 'refactor: 重构(既不是增加feature，也不是修复bug)' },
		{ value: 'conflict', name: 'conflict: 解决冲突' },
		{ value: 'config', name: 'config:配置文件变更' },
		{ value: 'build', name: 'build: 打包' },
		{ value: 'revert', name: 'revert: 回退' }
	], // 消息步骤，正常只需要选择
	messages: {
		type: '请选择提交类型:',
		subject: '请简要描述提交(必填):',
		confirmCommit: '确认使用以上信息提交？(y/n)'
	},
	skipQuestions: ['body', 'footer'], // 跳过问题：详细描述，issue相关
	subjectLimit: 100 // subject描述文字长度最长是100
};
