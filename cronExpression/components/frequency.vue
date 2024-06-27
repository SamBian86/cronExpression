<!-- 指定精确开始点与频率 n/m -->
<template>
  <div class="cron-expression-component cron-expression-frequency">
    <div class="cron-expression-component-checkbox">
      <el-checkbox v-model="isChecked" @change="unitTypeChangeHandle"></el-checkbox>
    </div>
    <div class="cron-expression-component-area">
      <div class="cron-expression-component-default-area">
        {{ cronExpressionConfig.language[language]['from'] }}
        <!-- 除了周 -->
        <input
          v-if="unitTypeOption.validate && timeType !== 'week'"
          class="cron-expression-native-input"
          type="number"
          :min="unitTypeOption.validate.min"
          :max="unitTypeOption.validate.max"
          :value="unitTypeOption.arg1"
          @focus="unitTypeChangeHandle"
          @blur="valueHandle($event, 'arg1')"
        />
        <!-- 周 -->
        <select
          v-if="unitTypeOption.range && timeType === 'week'"
          v-model="arg1"
          class="cron-expression-native-select"
          @change="valueHandle($event, 'arg1')"
        >
          <option v-for="(item, index) in unitTypeOption.range()" :key="index" :value="item['value']">{{ item['label'] }}</option>
        </select>
        {{
          timeType === 'week'
            ? cronExpressionConfig.language[language]['empty']
            : timeType === 'year'
            ? cronExpressionConfig.language[language][config['language']]
            : cronExpressionConfig.language[language][config['language']]
        }}
        {{ cronExpressionConfig.language[language]['start'] }}
        {{ cronExpressionConfig.language[language]['interval'] }}
        <input
          v-if="unitTypeOption.validate"
          class="cron-expression-native-input"
          type="number"
          :min="unitTypeOption.validate.min"
          :max="unitTypeOption.validate.max"
          :value="unitTypeOption.arg2"
          @focus="unitTypeChangeHandle"
          @blur="valueHandle($event, 'arg2')"
        />
        {{
          timeType === 'week'
            ? cronExpressionConfig.language[language]['day']
            : cronExpressionConfig.language[language][config['language']]
        }}
        {{ cronExpressionConfig.language[language]['do'] }}
      </div>
    </div>
  </div>
</template>

<!-- cron表达式组件 -->
<script setup name="cronExpressionFrequency">
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
const unitType = ref('frequency')
const timeType = computed(() => props.config.timeType)
const config = computed(() => props.config)
const unitTypeOption = computed(() => props.config.unitTypes.find((u) => u['type'] === unitType.value))
const arg1 = computed(() => parseInt(unitTypeOption.value.arg1, 10))

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
  if (key === 'arg1' && timeType.value === 'week') {
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
  } else {
    const value = parseInt(event.target.value, 10)
    const { min, max } = unitTypeOption.value.validate
    let finalValue = Number.isNaN(value) ? (key === 'arg1' ? min : key === 'arg2' ? max : min) : value
    if (value <= max && value >= min) {
    } else {
      if (key === 'arg1') {
        finalValue = min
        event.target.value = min
      }
      if (key === 'arg2') {
        finalValue = max
        event.target.value = max
      }
    }

    emit('handle', {
      type: 'updateUnitArgsHandle',
      key,
      value: finalValue
    })
  }
  // console.log(event.target.value)
}

onMounted(() => {})
</script>
