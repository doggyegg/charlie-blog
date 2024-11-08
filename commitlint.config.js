module.exports = {
	// 定义规则类型
	rules: {
		// type 类型定义， git 提交的 type 必须在以下类型范围内
		'type-enum': [
			2,
			'always',
			[
				'feat', // 新功能 feature
				'fix', // 修复 bug
				'conflict', // 解决冲突
				'document', // 加注释
				'style', // 无关业务，样式修改
				'config', // 文档注释
				'refactor', // 重构(既不增加新功能，也不是修复bug)
				'revert', // 回退
				'build' // 打包
			]
		], // subject 大小写不做校验
		'subject-case': [0]
	}
};
