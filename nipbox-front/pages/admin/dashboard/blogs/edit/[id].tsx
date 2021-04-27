import axios from 'axios';
import { GetServerSideProps } from 'next';
import AdmPage from '../../../../../components/AdmPage/AdmPage';
import AdmBtn from '../../../../../components/AdmBtn/AdmBtn';
import { ssrUtils } from '../../../../../utils/ssr';
import AdminInput from '../../../../../components/AdminInput/AdminInput';
import AdmBlock from '../../../../../components/AdmBlock/AdmBlock';
import React, { ChangeEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import AdmTextarea from '../../../../../components/AdmTextarea/AdmTextarea';
import { useRouter } from 'next/router'
import { appConfig } from '../../../../../config';
import styles from './edit.module.scss'
import { IBLog } from '../../../../../interfaces/IBlog';

const EditBlog: React.FC<{item: IBLog[], allText: any[], groupId: string}> = ({item, allText, groupId}) => {
  const [headline, setHeadline] = useState('')
  const [desc, setDesc] = useState('')
  const [url, setUrl] = useState('')
  const [img, setImg] = useState<File | undefined | any>()
  const [alert, setAlert] = useState('')

  const [select, setSelect] = useState()

  const router = useRouter()

  useEffect(() => {
    const request = async () => {
      await axios.post(`${appConfig.baseUrl}/blog/change-order`, {dto: JSON.stringify(item)})
    }
    request()
  }, [])

  function addFile(e: ChangeEvent<HTMLInputElement>, setter: (x: File) => any) {
		const file = e.target.files?.item(0);
		if (file) {
			setter(file);
		}
	}

  const selectHandler = async (event, id: string) => {
    setSelect(event.target.value)

    const dto = {
      order: event.target.value,
      id,
      blogs: item
    }
    
    await axios.patch(`${appConfig.baseUrl}/blog/move`, {dto: JSON.stringify(dto)})
    location.reload()
  }

  const submitHandler = async (event: SyntheticEvent, id: string) => {
    event.preventDefault()
    console.log(headline, desc, url)

    const form = new FormData()
    const dto = {
      text: headline,
      desc,
      url
    }

    form.append('dto', JSON.stringify(dto))
    form.append('id', id)
    form.append('img', img)

    try {
      setAlert('')
      await axios.patch(`${appConfig.baseUrl}/blog/change/${id}`, form, {
        withCredentials: true
      })
      // router.push('/admin/dashboard/blogs')
    } catch (e) {
      setAlert('Не все поля были переданны')
      console.log(e)
    }
  }

	return (
    <AdmPage title="nipbox - блог" isAuthed={true}>
      <AdmBlock>
        <div className={styles.content}>
            <h1>Редакитрование Блога</h1>
        </div>

        {
          item?.map((i: IBLog, idx: number) => (
            <form key={i.id} className={styles.form} onSubmit={event => submitHandler(event, i.id)}>
              <AdmTextarea placeholder="Заголовок" defaultValue={i.text} onChange={(e) => setHeadline(e)} />
              {
                i.img && (
                  <div className={`${styles.media} ${styles['media-mg']}`}>
                    <img src={`${appConfig.baseUrl}/static/blog/${i.img}`} alt="" />
                  </div>
                )
              }
              <AdmTextarea placeholder="Описание" defaultValue={i.desc} onChange={(e) => setDesc(e)} />
              <AdminInput placeholder="Файл" type="file" onChange={(e) => addFile(e, setImg)} />
              <select onChange={event => selectHandler(event, i.id)} className={styles.select} >
                <option value="none" disabled selected>Список заголовков</option>
                {
                  allText?.map((t, idx: number) => (
                    <option key={t.id} value={t.id.toString()}>{t.text}</option>
                  ))
                }
              </select>
            
              <div className={styles.controls}>
                <AdmBtn btnType="submit" customClass={styles.control} onClick={() => {}}>
                  Изменить
                </AdmBtn>
              </div>
            </form>
          ))
        }

        {
          alert && <div className={styles.alert}>{alert}</div>
        }
      </AdmBlock>
    </AdmPage>
  )
};

export default EditBlog;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {params: {id}} = ctx

  if (!(await ssrUtils.validateReq(ctx.req.cookies))) {
		return {
			props: {},
			redirect: {
				destination: '/admin/login'
			}
		};
	}

  try {
    const res = await axios.get(`${appConfig.baseUrl}/blog/get-group/${id}`)
    const sortRes = res.data.sort((a, b) => a['order'] - b['order'])
    const allText = res.data.map((d: IBLog) => ({text: d.text, id: d.id, order: d.order}))
    return {
			props: {
				item: sortRes,
        allText,
        groupId: id
			}
		};
  } catch (e) {
    console.log(e.message)
    return {
			props: {},
			redirect: '/'
		};
  }
};