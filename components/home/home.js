import { useRouter } from 'next/router';
import styles from './home.module.css';
import ListsCard from '../cards/lists-card/lists-card.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ListItemCard from '../cards/list-item-card/list-item-card.js';
import Button from '../ui/button/button';
import { getAllData } from '../../data/dummy-data.js';


function Home() {
  const router = useRouter();

  const CARD_HEADER =
    <>
      Suas listas TODO
      <div className={styles.sized_box} />
      <FontAwesomeIcon icon={faTasks} color="var(--light--black)" />
    </>
  const CARD_BODY =
    <>
      {
        getAllData().map(list => { 
          return (
            <ListItemCard
              key={list.id}
              title={list.title}
              description={list.description}
              button={
                <Button
                  label="Ver mais"
                  type="button"
                  onClick={() => router.push(`/${list.id}`)}
                />
              }
            />
          )
        })
      }
    </>
  const CARD_FOOTER =
    <>
      <div>
        <Button
          label=""
          type="button"
          icon={faArrowLeft}
        />
      </div>
      <div>
        <Button
          label=""
          type="button"
          icon={faArrowRight}
        />
      </div>
    </>

  return (
    <div className={styles.container}>
      <ListsCard
        cardHeader={CARD_HEADER}
        cardBody={CARD_BODY}
        cardFooter={CARD_FOOTER}
      />
    </div>
  )
}

export default Home
