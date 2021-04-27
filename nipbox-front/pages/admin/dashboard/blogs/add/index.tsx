import axios from 'axios';
import { GetServerSideProps } from 'next';
import AdmPage from '../../../../../components/AdmPage/AdmPage';
import AdmBtn from '../../../../../components/AdmBtn/AdmBtn';
import { ssrUtils } from '../../../../../utils/ssr';
import AdminInput from '../../../../../components/AdminInput/AdminInput';
import AdmBlock from '../../../../../components/AdmBlock/AdmBlock';
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import styles from './add.module.scss'
import AdmTextarea from '../../../../../components/AdmTextarea/AdmTextarea';
import { useRouter } from 'next/router'
import { appConfig } from '../../../../../config';
import { IBLog } from '../../../../../interfaces/IBlog';

const AddBlog = () => {
  const [headline, setHeadline] = useState('')
  const [desc, setDesc] = useState('')
  const [url, setUrl] = useState('')
  const [img, setImg] = useState<File | undefined | any>()
  const [alert, setAlert] = useState('')

  const [allId, setAllId] = useState([])
  const [select, setSelect] = useState()
  const [showUrl, setShowUrl] = useState(true)

  const router = useRouter()

  useEffect(() => {
    const request = async () => {
      const {data} = await axios.get(`${appConfig.baseUrl}/blog`)
      data.map((d: IBLog) => {
        setAllId(prev => [...prev, {id: d.id, text: d.text, isChildren: d.isChildren}])
      })
    }
    request()
    return () => {}
  }, [])

  function addFile(e: ChangeEvent<HTMLInputElement>, setter: (x: File) => any) {
		const file = e.target.files?.item(0);
		if (file) {
			setter(file);
		}
	}

  const submitHandler = async (event: SyntheticEvent) => {
    event.preventDefault()

    const form = new FormData()
    const dto = {
      text: headline,
      desc,
      url: !select && url
    }
    if (select) {
      form.append('id', select)
    }
    form.append('dto', JSON.stringify(dto))
    form.append('img', img)

    try {
      setAlert('')
      await axios.post(`${appConfig.baseUrl}/blog/create`, form, {
        withCredentials: true
      })
      router.push('/admin/dashboard/blogs')
    } catch (e) {
      setAlert('Не все поля были переданны')
      console.log(e)
    }
  }

  const selectHandler = event => {
    setShowUrl(false)
    setSelect(event.target.value)
    
    if (event.target.value !== 'New') {
      setShowUrl(false)
    } else {
      setShowUrl(true)
    }
  }

	return (
    <AdmPage title="nipbox - блог" isAuthed={true}>
      <AdmBlock customClass={styles.wrap}>
        <h1>Создание Блога</h1>
        <form onSubmit={submitHandler}>
        
          <AdminInput placeholder="Заголовок" value={headline} onChange={(e) => setHeadline(e.target.value)} />
          <AdmTextarea placeholder="Описание" onChange={(e) => setDesc(e)} />
          <AdminInput multiple={true} type="file" onChange={(e) => addFile(e, setImg)} />

          <select onChange={selectHandler} className={styles.select}>
            <option value="New">New</option>
            {
              allId?.map((h, idx: number) => (
                <React.Fragment key={idx}>
                  {
                    !h.isChildren && <option value={h.id}>{h.text}</option>
                  }
                </React.Fragment>
              ))
            }
          </select>

          <div className={styles.controls}>
            <AdmBtn btnType="submit" customClass={styles.control} onClick={() => {}}>
              Создать
            </AdmBtn>
          </div>
        </form>

        {
          alert && <div className={styles.alert}>{alert}</div>
        }
      </AdmBlock>
    </AdmPage>
  )
};

export default AddBlog;

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
	};
};