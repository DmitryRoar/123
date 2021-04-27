import axios from 'axios';
import { GetServerSideProps } from 'next';
import React from 'react';
import Page from '../../../components/Page/Page';
import StartBlog from '../../../components/StartBlog/StartBlog';
import { appConfig } from '../../../config';
import sanitizeFont from '../../../utils/sanitizeFont';
import styles from './id.module.scss'

export default function InfoPage({item}) {
	return (
    <Page title={`nipbox - ${item[0].text}`}>
      <div className={`container ${styles['container-column']}`}>
        {item?.map((i, idx: number) => (
          <>
            {
              idx === 0 
              ? <StartBlog item={i} key={idx} />
              : <div className={styles.wrap} key={idx}>
              <div className={styles.desc}>
                <div className={styles.headline}>
                  <h3>
                    {sanitizeFont(i.text)}
                  </h3>
                </div>
              <h3>{i.desc}</h3>
              </div>
              <div className={styles.img} >
                <img src={`${appConfig.baseUrl}/static/blog/${i.img}`} alt={i.text} />
              </div>
            </div>
            }
          </>
        ))}
      </div>
    </Page>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { id } = context.params;
	try {
		const res = await axios.get(`${appConfig.baseUrl}/blog/get-group/${id}`);
		return {
			props: {
				item: res.data.sort((a, b) => a['order'] - b['order'])
			}
		};
	} catch (err) {
		console.log(err.message);

		return {
			props: {},
			redirect: '/'
		};
	}
};