import React from 'react';
import sanitizeFont from '../../utils/sanitizeFont';
import styles from './StartBlog.module.scss'

export default function StartBlog({item}) {
	return (
      <div className={`${styles['container-column']}`}>
          <div className={styles.wrap} key={item.id}>
            <div className={styles.desc}>
              <div className={styles.headline}>
                <h3>
                  {sanitizeFont(item.text)}
                </h3>
              </div>
              <div className={styles.desc}>
                <h3>{item.desc}</h3>
              </div>
            </div>
          </div>
      </div>
  )
}