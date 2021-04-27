import axios from 'axios';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import Page from '../../../components/Page/Page';
import { appConfig } from '../../../config';
import { IBLog } from '../../../interfaces/IBlog';
import sanitizeFont from '../../../utils/sanitizeFont';

const Blog: FC = observer(() => {
  const [items, setItems] = useState<any>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const request = async () => {
      const {data} = await axios.get(`${appConfig.baseUrl}/blog/get-parent`);
      setItems(data)
      setLoading(false)
    }
    request() 
  }, [])
  
	return (
		<Page title="Блог" tags="Блог Статьи nipbox">
      <div className="container" style={{marginBottom: 35}}>
			  <div className="headline">
          <h2 className="h2Main fontLena">
            {sanitizeFont('Блог')}
          </h2>
        </div>
			  <div className="row">
          {
            items?.length 
            ? items?.map((blog: IBLog) => (
                <Link href={`blog/${blog.id}` || '/'} key={blog.id}>
                  <a className="col-xs-12 col-sm-6 col-md-3">
                  <div className="reviewItem">
                    <div>
                      <div className="reviewItemVideoWrap">
                        <img src={`${appConfig.baseUrl}/static/blog/${blog.img}`} alt="img" className="reviewItemVideoImage" />
                      </div>
                      <div className="reviewItemTextWrap fontLena">
                        {blog.text}
                      </div>
                    </div>
                  </div>
                  </a>
                </Link>
              ))
            : <div className={`container container-full-screen`}>
                {
                  loading
                  ? <p className="left-text">Загрузка</p>
                  : <p>Блога пока что нет</p>
                }
              </div>
          }
        </div>
      </div>
		</Page>
	);
});

export default Blog;