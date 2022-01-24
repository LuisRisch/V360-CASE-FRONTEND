import { useRouter } from 'next/router';
import { getDataById } from '../data/dummy-data.js';
import SingleListComponent from '../components/single-list/single-list.js';

function SingleList() {
  const router = useRouter()
  const { id } = router.query

  return <SingleListComponent
    list={getDataById(id)}
  />
}

export default SingleList
