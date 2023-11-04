# cron表达式组件

使用前提，项目必须是使用vue3与element-plus的项目。



将目录拷贝到项目中去，引入组件文件`cronExpression/index.vue`，并且在项目中引入样式文件`cron-expression.scss`

页面使用方式

`<CronExpression ref="cronExpression" v-model="expression" />`



如需主动重置表达式组件

`const cronExpression = ref(null)`

`cronExpression.value.resetHandle()` // 重置功能
