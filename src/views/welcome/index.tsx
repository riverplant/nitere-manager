import styles from './index.module.less'

export default function Welcome() {
  return (
    <div className={styles.welcome}>
      <div className={styles.content}>
        <div className={styles.subTitle}>欢迎体验</div>
        <div className={styles.title}>逆海淘后台管理系统</div>
        <div className={styles.desc}>通用后台管理系统,管理所有的系统数据和功能模块</div>
      </div>
      <div className={styles.img}></div>
    </div>
  )
}
