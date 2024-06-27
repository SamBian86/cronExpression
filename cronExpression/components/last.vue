<!-- 最后一个 nL -->
<template>
  <div class="cron-expression-component cron-expression-last">
    <div class="cron-expression-component-checkbox">
      <el-checkbox v-model="isChecked" @change="unitTypeChangeHandle"></el-checkbox>
    </div>
    <div class="cron-expression-component-area">
      <div class="cron-expression-component-default-area">
        {{
          timeType === 'day'
            ? `${cronExpressionConfig.language[language]['this']}${cronExpressionConfig.language[language]['month']}${cronExpressionConfig.language[language]['last']}${cronExpressionConfig.language[language]['one']}${cronExpressionConfig.language[language]['day']}`
            : timeType === 'week'
            ? `${cronExpressionConfig.language[language]['this']}${cronExpressionConfig.language[language]['month']}${cronExpressionConfig.language[language]['last']}${cronExpressionConfig.language[language]['one']}${cronExpressionConfig.language[language]['ge']}`
            : ''
        }}
        <!-- 周 -->
        <select
          v-if="unitTypeOption.range && timeType === 'week'"
          class="cron-expression-native-select"
          @change="valueHandle($event, 'arg1')"
        >
          <option v-for="(item, index) in unitTypeOption.range()" :key="index" :value="item['value']">{{ item['label'] }}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<!-- cron表达式组件 -->
<script setup name="cronExpressionLast">
import { ElCheckbox } from 'element-plus'
import { ref, computed, onMounted } from 'vue'
// 本地数据
import cronExpressionConfig from '../configs'
import store from '@/store'
const emit = defineEmits(['handle'])
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
const unitType = ref('last')
const timeType = computed(() => props.config.timeType)
const config = computed(() => props.config)
const unitTypeOption = computed(() => props.config.unitTypes.find((u) => u['type'] === unitType.value))

// 是否选中
const isChecked = computed(() => config.value['cType'] === unitType.value)

// 修改当前时间单位下的子组件类型
const unitTypeChangeHandle = () => {
  emit('handle', {
    type: 'updateUnitTypeHandle',
    value: unitType.value
  })
}

// 修改值
const valueHandle = (event, key) => {
  emit('handle', {
    type: 'updateUnitTypeHandle',
    value: unitType.value
  })
  const value = parseInt(event.target.value, 10)
  emit('handle', {
    type: 'updateUnitArgsHandle',
    key,
    value
  })
  // console.log(event.target.value)
}
onMounted(() => {})
</script>
