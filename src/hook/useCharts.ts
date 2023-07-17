import * as echarts from 'echarts'
import { RefObject, useEffect, useRef, useState } from 'react'

export const useCharts = (): [RefObject<HTMLDivElement>, echarts.ECharts | undefined] => {
  const chartRef = useRef<HTMLDivElement>(null)
  const [chartInstance, setChartInstance] = useState<echarts.ECharts>()
  useEffect(() => {
    const chart = echarts.init(chartRef.current as HTMLElement)
    setChartInstance(chart)
  }, [])

  return [chartRef, chartInstance]
}
