// 可让vue在线上环境开启 vue-dev-tool脚本
// Vue2
const walker = document.createTreeWalker(document.body, 1);
let Vue, node;
while ((node = walker.nextNode())) {
	if (node.__vue__) {
		Vue = node.__vue__.$options._base;
		if (!Vue.config.devtools) {
			Vue.config.devtools = true;
			if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
				window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('init', Vue);
				console.info('==> vue devtools now is enabled');
			}
		}
		break;
	}
}

// Vue3
const el = document.querySelector('#app');
const vm = el.__vue_app__;

window.__VUE_DEVTOOLS_GLOBAL_HOOK__.apps.push({
	app: vm,
	version: vm.version,
	types: {
		Comment: Symbol('Comment'),
		Fragment: Symbol('Fragment'),
		Static: Symbol('Static'),
		Text: Symbol('Text')
	}
});
if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
	window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('init', vm);
	console.info('==> vue devtools now is enabled');
}
