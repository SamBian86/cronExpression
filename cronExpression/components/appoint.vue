<!-- 精准指定 n,n,n -->
<template>
  <div class="cron-expression-component cron-expression-appoint">
    <div class="cron-expression-component-checkbox">
      <el-checkbox v-model="isChecked" @change="unitTypeChangeHandle"></el-checkbox>
    </div>
    <div class="cron-expression-component-area">
      <div class="cron-expression-component-default-area">
        {{ cronExpressionConfig.language[language]['appoint']
        }}{{
          timeType === 'week'
            ? cronExpressionConfig.language[language]['theWeek']
            : cronExpressionConfig.language[language][config['language']]
        }}
      </div>
      <div class="cron-expression-component-extra-area">
        <el-checkbox-group v-model="args" @change="valueHandle($event, 'arg1')">
          <template v-if="unitTypeOption.range && timeType !== 'week'">
            <el-checkbox v-for="(item, index) in unitTypeOption.range()" :key="index" :label="parseInt(item, 10)">
              {{ item < 10 ? `0${item}` : item }}
            </el-checkbox>
          </template>
          <template v-else>
            <el-checkbox v-for="(item, index) in unitTypeOption.range()" :key="index" :label="parseInt(item['value'], 10)">
              {{ cronExpressionConfig.language[language][item['language']] }}
            </el-checkbox>
          </template>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<!-- cron表达式组件 -->
<script setup name="cronExpressionAppoint">
import { ElCheckboxGroup, ElCheckbox } from 'element-plus'
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
const unitType = ref('appoint')
const timeType = computed(() => props.config.timeType)
const config = computed(() => props.config)
const unitTypeOption = computed(() => props.config.unitTypes.find((u) => u['type'] === unitType.value))
const args = computed(() => unitTypeOption.value.arg1.map((num) => parseInt(num, 10)))

// 是否选中
const isChecked = computed(() => config.value['cType'] === unitType.value)
// 修改当前时间单位下的子组件类型
const unitTypeChangeHandle = () => {
  emit('handle', {
    type: 'updateUnitTypeHandle',
    value: unitType.value
  })
  if (args.value.length === 0) {
    if (timeType.value !== 'day' && timeType.value !== 'month' && timeType.value !== 'week') {
      emit('handle', {
        type: 'updateUnitArgsHandle',
        key: 'arg1',
        value: [0]
      })
    } else {
      emit('handle', {
        type: 'updateUnitArgsHandle',
        key: 'arg1',
        value: [1]
      })
    }
  }
}

// 修改值
const valueHandle = (value, key) => {
  emit('handle', {
    type: 'updateUnitTypeHandle',
    value: unitType.value
  })
  if (value.length === 0) {
    emit('handle', {
      type: 'updateUnitArgsHandle',
      key,
      value: timeType.value !== 'day' && timeType.value !== 'month' && timeType.value !== 'week' ? [0] : [1]
    })
  } else {
    emit('handle', {
      type: 'updateUnitArgsHandle',
      key,
      value
    })
  }
}
onMounted(() => {})
</script>
