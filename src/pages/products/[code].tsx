import Layout from '@/components/Layout/Layout';
import { EStateGeneric } from '@/shared/types';
import { getOneProduct, selectOneProduct, selectOneProductStatus } from '@/states/products/productsSlice';
import { useAppDispatch } from '@/states/store';
import { useRouter } from 'next/router';
import { useEffect } from 'react'
import { useSelector } from 'react-redux';

type Props = {}

const Detail = (props: Props) => {
  const router = useRouter();
  const status = useSelector(selectOneProductStatus)
  const product = useSelector(selectOneProduct)
  const dispatch = useAppDispatch()
  useEffect(() => {
    (async () => {
      if (router.isReady) {
        const { code } = router.query;
        if (status === EStateGeneric.IDLE) {
          dispatch(getOneProduct(code as string))
        }
      }
    })();
    return () => {

    };
  }, [router.query.code]);
  return (
    <Layout>
      <div>
        {status === EStateGeneric.SUCCEEDED &&
          <div>
            {product.name}
          </div>
        }
      </div>
    </Layout>
  )
}

export default Detail