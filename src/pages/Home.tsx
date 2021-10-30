import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonItem, IonList, IonRefresherContent, IonRefresher,
  IonSearchbar
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { getAllRecords } from '../databaseHandler';
import { Record } from '../models';

const Home: React.FC = () => {
  const [records, setRecords] = useState<any[]>([])
  const [searchText, setText] = useState('')

  async function fetchData() {
    const allRecords = await getAllRecords();
    setRecords(allRecords);
  }

  async function searchProperty(searchText: string) {
    const allRecords = await getAllRecords() as Record[];
    searchText = searchText.toLowerCase();
    const filteredResults = allRecords.filter(record => record.property.toLowerCase().indexOf(searchText) > - 1);
    setRecords(filteredResults);
  }

  useEffect(() => {
    fetchData();
  }, [])


  useEffect(() => {
    searchProperty(searchText);
  }, [searchText])

  function doRefresh(event: any) {
    fetchData();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.detail.complete();
    }, 1000);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CourseWork</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonSearchbar value={searchText} onIonChange={e => setText(e.detail.value!)}></IonSearchbar>
        <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        {records &&
          <IonList>
            {
              records.map((c, i) =>
                <IonItem routerLink={'details/' + c.id} button key={i}>{c.property}</IonItem>
              )
            }
          </IonList>
        }
      </IonContent>
    </IonPage >
  );
};

export default Home;