import axios from 'axios';
import { useEffect, useState } from 'react';
import AdmPage from '../../../../components/AdmPage/AdmPage'
import { GetServerSideProps } from 'next';
import { ssrUtils } from '../../../../utils/ssr';
import AdmBtn from '../../../../components/AdmBtn/AdmBtn';
import AdmBlock from '../../../../components/AdmBlock/AdmBlock';
import styles from './index.module.scss'
import { IBLog } from '../../../../interfaces/IBlog';
import { appConfig } from '../../../../config';

const Blogs = () => {
  const [blogs, setBlogs] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    const request = async () => {
      const {data} = await axios.get(`${appConfig.baseUrl}/blog/get-parent`)
      setBlogs(data)
      setLoading(false)
    }
    request()
  }, [])

  function remove(id: string) {
		setRemoving(true);
    axios.get(`${appConfig.baseUrl}/blog/remove/${id}`, { withCredentials: true })
      .then(() => location.reload());
	}


	return (
    <AdmPage title="nipbox - блог" isAuthed={true}>
      <AdmBtn onClick={() => {}} href="/admin/dashboard/blogs/add">
        Добавить блог
      </AdmBtn>

      <AdmBlock>
        {
          blogs?.length 
          ? blogs?.map((blog: IBLog, idx: number) => (
              <div className={styles.block} key={blog.id}>
                <div className={styles.top}>
                  <div className={styles.id}>
                    #{idx + 1} (id: {blog.id})
                  </div>
                  <div className={styles.title}>
                    <h3>{blog.text}</h3>
                  </div>
                </div>

                <div className={styles.content}>
                  <div className={styles.media}>
                    <img 
                      src={`${appConfig.baseUrl}/static/blog/${blog.img}`} 
                      alt={blog.text}
                    />
                  </div>
                  <div className={styles.data}>
                    {
                      blog.isChildren && <div className={styles.desc}>
                        <img src="/img/package.png" alt="" />
                        <div className={styles.text}>
                          parent id:<strong>{blog.groupId}</strong>
                        </div>
                      </div> 
                    }
                    <div className={styles.desc}>
                      <img src="/img/info.png" alt="" />
                      <div className={styles.text}>
                        {blog.desc}
                      </div>
                    </div>
                  </div>
                  <div className={styles.controls}>
                      <AdmBtn customClass={styles.control} onClick={() => {}} href={`/admin/dashboard/blogs/edit/${blog.id}`}>
                        Редактирoвать
                      </AdmBtn>
                      <AdmBtn customClass={styles.control} onClick={() => {remove(blog.id)}} loading={removing} type="secondary">
                        Удалить
                      </AdmBtn>
                    </div>
                </div>
              </div>
            ))
          : <div>
              {
                loading
                ? <p>Загрузка</p>
                : <p>Блогов пока нет</p>
              }
            </div>
        }
      </AdmBlock>

    </AdmPage>
  )
};

export default Blogs;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	if (!(await ssrUtils.validateReq(ctx.req.cookies))) {
		return {
			props: {},
			redirect: {
				destination: '/admin/login',
			},
		};
	}

	return {
		props: {},
    redirect: '/'
	};
};