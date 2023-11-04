<!-- 每xx * -->
<template>
  <div class="cron-expression-component cron-expression-every">
    <div class="cron-expression-component-checkbox">
      <el-checkbox v-model="isChecked" @change="unitTypeChangeHandle"></el-checkbox>
    </div>
    <div class="cron-expression-component-area">
      <div class="cron-expression-component-default-area">
        {{ cronExpressionConfig.language[language]['every'] }}{{ cronExpressionConfig.language[language][config['language']] }}
      </div>
    </div>
  </div>
</template>

<!-- cron表达式组件 -->
<script setup name="cronExpressionEvery">
import { ref, computed, onMounted } from 'vue'
// hook
import useCommonHook from '@/hooks/component/useCommonHook'
// 本地数据
import cronExpressionConfig from '../configs'
const emit = defineEmits(['handle'])
const { store } = useCommonHook()
const language = computed(() => store.getters.website_language)
// 本地数据
const props = defineProps({
  config: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
// 当前组件类型
const unitType = ref('every')
const config = computed(() => props.config)
// 是否选中
const isChecked = computed(() => config.value['cType'] === unitType.value)

// 修改当前时间单位下的子组件类型
const unitTypeChangeHandle = () => {
  emit('handle', {
    type: 'updateUnitTypeHandle',
    value: unitType.value
  })
}

onMounted(() => {})
</script>
