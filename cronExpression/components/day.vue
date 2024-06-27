<!-- 每月离n日最近工作日 -->
<template>
  <div class="cron-expression-component cron-expression-day">
    <div class="cron-expression-component-checkbox">
      <el-checkbox v-model="isChecked" @change="unitTypeChangeHandle"></el-checkbox>
    </div>
    <div class="cron-expression-component-area">
      <div class="cron-expression-component-default-area">
        {{ cronExpressionConfig.language[language]['every'] }}{{ cronExpressionConfig.language[language]['month']
        }}{{ cronExpressionConfig.language[language]['distance'] }}
        <input
          v-if="unitTypeOption.validate"
          class="cron-expression-native-input"
          type="number"
          :min="unitTypeOption.validate.min"
          :max="unitTypeOption.validate.max"
          :value="unitTypeOption.arg1"
          @focus="unitTypeChangeHandle"
          @blur="valueHandle($event, 'arg1')"
        />
        {{ cronExpressionConfig.language[language]['day'] }}{{ cronExpressionConfig.language[language]['near']
        }}{{ cronExpressionConfig.language[language]['weekday'] }}
      </div>
    </div>
  </div>
</template>

<!-- cron表达式组件 -->
<script setup name="cronExpressionDay">
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
const unitType = ref('day')
// const timeType = computed(() => props.config.timeType)
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
  const value = parseInt(event.target.value, 10)
  const { min, max } = unitTypeOption.value.validate
  let finalValue = Number.isNaN(value) ? min : value
  if (value <= max && value >= min) {
  } else {
    if (key === 'arg1') {
      finalValue = min
      event.target.value = min
    }
  }

  emit('handle', {
    type: 'updateUnitArgsHandle',
    key,
    value: finalValue
  })
  // console.log(event.target.value)
}
onMounted(() => {})
</script>
