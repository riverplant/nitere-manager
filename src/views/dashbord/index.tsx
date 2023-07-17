import { Button, Card, Descriptions } from 'antd'
import styles from './index.module.less'

import { useEffect, useState } from 'react'
import * as echarts from 'echarts'
import { useStore } from '@/store'
import api from '@/api'
import { Dashboard } from '@/types/api'
import { formatNum } from '@/utils'
import { useCharts } from '@/hook/useCharts'

export default function DashBoard() {
  const userInfo = useStore(state => state.userInfo)

  const [report, setReport] = useState<Dashboard.ReportData>()
  //Hook一定要放在函数外面,初始化折线图
  const [lineRef, lineChart] = useCharts()
  //pies
  const [pieRef1, pieChart1] = useCharts()
  const [pieRef2, pieChart2] = useCharts()

  //radar
  const [radarRef, radarChart] = useCharts()

  useEffect(() => {
    // renderLineChart()
    const optionLine = {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['订单', '流水'],
      },
      grid: {
        left: '5%',
        right: '15%',
        bottom: '10%',
      },
      xAxis: {
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      },
      yAxis: { type: 'value' },

      series: [
        {
          name: '订单',
          type: 'line',
          data: [10, 20, 30, 50, 60, 70, 80, 90, 100, 110, 120],
        },
        {
          name: '流水',
          type: 'line',
          data: [13, 20, 35, 54, 60, 700, 85, 99, 106, 118, 125],
        },
      ],
    }

    const optionPie = {
      title: {
        text: '用户分布',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'auto',
      },
      series: [
        {
          name: '城市分布',
          type: 'pie',
          radius: '50%',
          center: ['50%', '50%'],
          data: [
            { value: 335, name: '多伦多' },
            { value: 310, name: '温哥华' },
            { value: 274, name: '蒙特利尔' },
            { value: 235, name: '卡尔加里' },
            { value: 400, name: '渥太华' },
          ],
        },
      ],
    }

    const optionAge = {
      title: {
        text: '用户年龄分布',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'auto',
      },
      series: [
        {
          name: '年龄分布',
          type: 'pie',
          radius: [50, 180],
          roseType: 'area',
          data: [
            { value: 30, name: '30岁' },
            { value: 40, name: '40' },
            { value: 20, name: '20' },
            { value: 50, name: '50' },
            { value: 60, name: '60岁' },
          ],
        },
      ],
    }

    const radar = {
      legend: {
        orient: 'vertical',
        left: 'auto',
      },
      radar: {
        indicator: [
          { name: '验货通过包裹总数', max: 3000 },
          { name: '待认证包裹总数', max: 3000 },
          { name: '验货失败包裹总数', max: 3000 },
          { name: '已付款包裹总数', max: 3000 },
          { name: '待付款包裹总数', max: 3000 },
        ],
      },
      series: [
        {
          name: '包裹模型诊断',
          type: 'radar',
          data: [
            {
              value: [2200, 600, 200, 600, 1400],
              name: '包裹模型诊断',
            },
          ],
        },
      ],
    }

    pieChart1?.setOption(optionPie)

    lineChart?.setOption(optionLine)

    pieChart2?.setOption(optionAge)

    radarChart?.setOption(radar)
  }, [lineChart, pieChart1, pieChart2, radarChart])

  //读服务加载折线图
  const renderLineChart = async () => {
    if (!lineChart) return
    const data = await api.getLineData()
    lineChart?.setOption({
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['订单', '流水'],
      },
      grid: {
        left: '5%',
        right: '15%',
        bottom: '10%',
      },
      xAxis: {
        data: data.label,
      },
      yAxis: { type: 'value' },

      series: [
        {
          name: '订单',
          type: 'line',
          data: data.order,
        },
        {
          name: '流水',
          type: 'line',
          data: data.amount,
        },
      ],
    })
  }

  const renderPieChart1 = async () => {
    if (!pieChart1) return
    const data = await api.getPieCityData()
    pieChart1?.setOption({
      title: {
        text: '用户分布',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'auto',
      },
      series: [
        {
          name: '城市分布',
          type: 'pie',
          radius: '50%',
          data: data,
        },
      ],
    })
  }

  const renderPieChart2 = async () => {
    if (!pieChart2) return
    const data = await api.getPieAgeData()
    pieChart2?.setOption({
      title: {
        text: '用户年龄分布',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'auto',
      },
      series: [
        {
          name: '年龄分布',
          type: 'pie',
          radius: [50, 180],
          roseType: 'area',
          data: data,
        },
      ],
    })
  }

  const renderRadarChart = async () => {
    if (!radarChart) return
    const data = await api.getRadarData()
    radarChart?.setOption({
      legend: {
        orient: 'vertical',
        left: 'auto',
      },
      radar: {
        indicator: data.indicator,
      },
      series: [
        {
          name: '包裹模型诊断',
          type: 'radar',
          data: data.data,
        },
      ],
    })
  }

  const handlePieChart = () => {
    renderPieChart1()
    renderPieChart2()
  }

  useEffect(() => {
    getReportData()
  }, [])

  const getReportData = async () => {
    const data = await api.getPackageReportData()
    setReport(data)
  }
  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        <img
          src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
          className={styles.userImg}
        ></img>
        <Descriptions title='逆海淘后台统计信息'>
          <Descriptions.Item label='统计时间（北京时间）' span={3}>
            {new Date().toLocaleDateString('en-us', {
              weekday: 'long',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </Descriptions.Item>
        </Descriptions>
      </div>
      <div className={styles.report}>
        <div className={styles.card}>
          <div className='title'>国内仓库包裹总数</div>
          <div className={styles.data}>{formatNum(report?.orderCount)}</div>
        </div>

        <div className={styles.card}>
          <div className='title'>验货通过包裹总数</div>
          <div className={styles.data}>873</div>
        </div>

        <div className={styles.card}>
          <div className='title'>验货通过包裹总重量</div>
          <div className={styles.data}>1300.781kg</div>
        </div>

        <div className={styles.card}>
          <div className='title'>验货通过包裹总体积</div>
          <div className={styles.data}>8.741m2</div>
        </div>

        <div className={styles.card}>
          <div className='title'>待认领</div>
          <div className={styles.data}>42</div>
        </div>

        <div className={styles.card}>
          <div className='title'>验货失败</div>
          <div className={styles.data}>59</div>
        </div>

        <div className={styles.card}>
          <div className='title'>Wechat支付</div>
          <div className={styles.data}>$1,236.79</div>
        </div>

        <div className={styles.card}>
          <div className='title'>e-Transfer支付</div>
          <div className={styles.data}>$815.69</div>
        </div>
      </div>
      <div className={styles.chart}>
        <Card
          title='订单及流水走势图'
          extra={
            <Button type='primary' onClick={renderLineChart}>
              刷新
            </Button>
          }
        >
          <div ref={lineRef} className={styles.itemChart}></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title='用户分布图'
          extra={
            <Button type='primary' onClick={handlePieChart}>
              刷新
            </Button>
          }
        >
          <div className={styles.pieChart}>
            <div ref={pieRef1} className={styles.itemPie}></div>
            <div ref={pieRef2} className={styles.itemPie}></div>
          </div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title='模型诊断'
          extra={
            <Button type='primary' onClick={renderRadarChart}>
              刷新
            </Button>
          }
        >
          <div ref={radarRef} className={styles.itemChart}></div>
        </Card>
      </div>
    </div>
  )
}
