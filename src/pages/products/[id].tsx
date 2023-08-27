import { useRouter } from 'next/router';
import { useEffect } from 'react'

type Props = {}

const Detail = (props: Props) => {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      if (router.isReady) {
        const { id } = router.query;
        console.log(id)
      }
    })();
    return () => {

    };
  }, [router.query.id]);
  return (
    <div>Detail</div>
  )
}

export default Detail