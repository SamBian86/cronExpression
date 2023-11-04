<template>
  <div class="cron-expression">
    <!-- 输入框容器 -->
    <div class="cron-expression-input">
      <el-input
        :value="currentExpression"
        :placeholder="cronExpressionConfig.language[language].cronExpressionPlaceHolder"
        readonly
      >
        <template #append>
          <el-tooltip
            :effect="layout.el.tooltip.effect"
            :content="cronExpressionConfig.language[language].reset"
            :placement="layout.el.tooltip.placement"
          >
            <el-icon class="el-icon-button-svg" @click="resetHandle">
              <i-ep-refresh color="#999" size="12px"></i-ep-refresh>
            </el-icon>
          </el-tooltip>
        </template>
      </el-input>
    </div>
    <!-- 点选容器 -->
    <div class="cron-expression-content">
      <div class="cron-expression-timeType">
        <div
          :class="[
            'cron-expression-timeType-item',
            {
              'cron-expression-timeType-item--disabled': item['disabled'] === true
            },
            {
              'cron-expression-timeType-item--active': item['timeType'] === timeType
            }
          ]"
          v-for="(item, index) in timeTypes"
          :key="index"
          @click="timeTypeClickHandle(item)"
        >
          {{ cronExpressionConfig.language[language][item['language']] }}
        </div>
      </div>
      <div class="cron-expression-unitType">
        <div v-for="(item, index) in timeTypeItem['unitTypes']" :key="index">
          <!-- {{ item['type'] }} -->
          <component :is="components[item['type']]" :config="timeTypeItem" @handle="eventHandle" />
          <!-- {{ timeTypeItem }} -->
        </div>
      </div>
    </div>
    <!-- 语义描述容器 -->
    <div v-if="cronExpressionDescValue" class="cron-expression-description">
      {{ cronExpressionConfig.language[language]['meaning'] }}{{ cronExpressionDescValue }}
    </div>
  </div>
</template>

<!-- cron表达式组件 -->
<script setup name="CronExpression">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
// 配置文件
import layout from '@/config/layout'
// hook
import useCommonHook from '@/hooks/component/useCommonHook'
// 本地数据
import cronExpressionConfig from './configs'
// 目标单位时间选项组件
import cronExpressionEvery from './components/every.vue'
import cronExpressionNone from './components/none.vue'
import cronExpressionFrequency from './components/frequency.vue'
import cronExpressionRange from './components/range.vue'
import cronExpressionDay from './components/day.vue'
import cronExpressionLast from './components/last.vue'
import cronExpressionAppoint from './components/appoint.vue'
// hooks
import useEventHandle from './hooks/useEventHandle'

const emit = defineEmits(['update:modelValue'])
const handles = useEventHandle()
const props = defineProps({
  modelValue: {
    type: String
  }
})
const { store } = useCommonHook()
const currentExpression = computed(() => props.modelValue)
const language = computed(() => store.getters.website_language)
const components = {
  every: cronExpressionEvery,
  none: cronExpressionNone,
  frequency: cronExpressionFrequency,
  range: cronExpressionRange,
  day: cronExpressionDay,
  last: cronExpressionLast,
  appoint: cronExpressionAppoint
}
// 记录是否引发日与周的互斥
const muExInfo = ref({
  from: '',
  isLock: false
})

// 当前cron表达式的中文描述
const cronExpressionDescValue = ref('')
// 所有时间类别
const timeTypes = ref(cronExpressionConfig.timeTypes)
// 当前默认时间类别
const timeType = ref('second')
const timeTypeItem = ref({})
// 初始化当前默认时间类别下面的具体分类
timeTypeItem.value = timeTypes.value.find((item) => item['timeType'] === timeType.value)

// 时间类别切换
const timeTypeClickHandle = (item) => {
  const { timeType: type, disabled } = item
  if (!disabled) {
    timeType.value = type
    timeTypeItem.value = timeTypes.value.find((t) => t['timeType'] === type)
  }
}

// 设置最终的值
const setTimeTypeValue = (_timeTypes = []) => {
  _timeTypes.forEach((item) => {
    const uType = item['unitTypes'].find((ut) => ut['type'] === item['cType'])
    if (uType) {
      item['cValue'] = uType['formatValueHandle'](item['timeType'], uType)
      item['cDesc'] = uType['formatDescHandle'](item['timeType'], uType)
      // console.log(`timeType: ${item['timeType']}`)
      // console.log(uType)
      // console.log(`[${item['cValue']}]`)
    } else {
      console.log(`请检查timeType: ${item['timeType']} 有没有${item['cType']}选项`)
    }
  })
  const cValues = _timeTypes.map((item) => item['cValue'])
  const cDescs = ['year', 'month', 'day', 'week', 'hour', 'minute', 'second'] // 描述性文件的出现顺序
  _timeTypes.forEach((item) => {
    const idx = cDescs.indexOf(item['timeType'])
    if (idx !== -1) {
      if (item['cDesc']) {
        cDescs.splice(idx, 1, item['cDesc'])
      } else {
        cDescs.splice(idx, 1)
      }
    }
  })

  // 如果最后一位年是不指定,cron表达式最后一位不需要出现
  if (cValues.length === 7 && cValues[cValues.length - 1] === '') {
    cValues.pop()
  }
  const finalValues = cValues.join(' ')
  const finalDescs = cDescs.join()
  cronExpressionDescValue.value = finalDescs
  emit('update:modelValue', finalValues) // 更新currentExpression
  // console.log(`------------finalValues: ${finalValues}`)
  // console.log(`------------finalDescs: ${finalDescs}`)
}

// 事件处理
const eventHandle = async (obj) => {
  const { type, value } = obj
  console.log(`timeType: ${timeTypeItem.value['timeType']}, type: ${type}, value: ${value}`)

  if (type === 'updateUnitTypeHandle') {
    handles[type] && handles[type](timeTypeItem.value, value)
  }
  if (type === 'updateUnitArgsHandle') {
    timeTypeItem.value['unitTypes'].forEach((unitType) => {
      if (unitType['type'] === timeTypeItem.value['cType']) {
        // handles[type] && handles[type](unitType, obj)
        const _unitType = handles[type] && handles[type](unitType, obj)
        if (_unitType['arg1']) {
          unitType['arg1'] = _unitType['arg1']
        }
        if (_unitType['arg2']) {
          unitType['arg2'] = _unitType['arg2']
        }
      }
    })
  }
  await nextTick()
  // 设置最终的值
  setTimeTypeValue(timeTypes.value)

  await nextTick()

  // 判断是否引发互斥条件，日和周只能配置一项
  // 选择日引发互斥
  const tType = timeTypeItem.value['timeType']
  if (tType === 'day' && type !== 'none') {
    muExInfo.value['isLock'] = true
    muExInfo.value['from'] = tType
  } else if (tType === 'week' && type !== 'none') {
    // 选择周引发互斥
    muExInfo.value['isLock'] = true
    muExInfo.value['from'] = tType
  } else {
    muExInfo.value['isLock'] = false
    muExInfo.value[''] = ''
  }
}

// 数据还原
const reductionTimeTypesHandle = (exp = '') => {
  muExInfo.value['isLock'] = false
  muExInfo.value['from'] = ''
  const expression = exp.split(' ')
  if (expression.length !== 6 && expression.length !== 7) {
    console.error(`不合法的表达式:${exp}`)
    return false
  }
  // console.log(`将表达式---${expression}---还原成可用的符合timeTypes的数据结构`)
  timeTypes.value.forEach((timeItem, index) => {
    // 这里index的顺序刚好是秒,分钟,小时,日,月,周,年
    // 取出值
    const expValue = expression[index] || ''
    // 根据值解析出子组件的类型
    const expComponentInfo = cronExpressionConfig.componentInfo.componentInfoHandle(expValue)
    const { type, args } = expComponentInfo
    // console.log(`expValue: ${expValue}, expComponentInfo: ${expComponentInfo}`)

    timeItem['cType'] = type
    timeItem['unitTypes'].forEach((unitItem) => {
      const formatValueHandle = cronExpressionConfig.formatValueHandle[unitItem['type']]['formatHandle'] || ''
      const formatDescHandle = cronExpressionConfig.formatDescHandle[unitItem['type']]['formatHandle'] || ''

      cronExpressionConfig.componentInfo.componentInfoMergeHandle(unitItem, args, unitItem['type'] === type)
      unitItem['formatValueHandle'] = formatValueHandle
      unitItem['formatDescHandle'] = formatDescHandle
    })
  })

  setTimeTypeValue(timeTypes.value)
}

// 重置表达式
const resetHandle = async () => {
  const cron_expression_default = cronExpressionConfig.settings.cron_expression_default
  reductionTimeTypesHandle(cron_expression_default)
  emit('update:modelValue', cron_expression_default) // 更新currentExpression
}

// 这个文件的作用是可以放置一些全局的一些操作
onMounted(() => {
  // 初始化cronExpression的值
  watch(
    () => props.modelValue,
    (newValue, oldValue) => {
      // 无值初始化
      if (newValue === undefined && oldValue === undefined) {
        const cron_expression_default = cronExpressionConfig.settings.cron_expression_default
        console.log(`---初始化cronExpression---: ${newValue}`)
        setTimeout(() => {
          reductionTimeTypesHandle(cron_expression_default)
        }, 10)
      }

      // 有值初始化
      if (newValue && oldValue === undefined) {
        // 如果初始值和cronExpressionConfig.settings.cron_expression_default不同需要把对应的值在timeTypes.value上还原以后再执行mergeTimeTypesHandle
        console.log(`---已有cronExpression初始化---: ${newValue}`)
        setTimeout(() => {
          reductionTimeTypesHandle(newValue)
        }, 10)
      }
    },
    {
      immediate: true
    }
  )

  watch(
    () => currentExpression.value,
    (newValue, oldValue) => {
      // 改值初始化
      if (newValue !== oldValue && newValue && oldValue) {
        console.log(`---cronExpression变化---: ${newValue}`)
      }
    }
  )

  watch(
    () => muExInfo.value['isLock'],
    (newValue, oldValue) => {
      if (newValue) {
        // console.log('发生日与周的互斥逻辑')
        // 是否需要进行互斥处理
        const muExFixExpression = cronExpressionConfig.utils.formatMuExHandle(currentExpression.value, muExInfo.value)
        console.log(`互斥处理以后的表达式:${muExFixExpression}`)
        reductionTimeTypesHandle(muExFixExpression)
      }
    }
  )
})

defineExpose({
  resetHandle,
  getDefaultCronExpression: () => {
    return cronExpressionConfig.settings.cron_expression_default
  }
})
</script>
