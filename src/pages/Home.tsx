import {
    IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
    IonItem, IonList, IonRefresherContent, IonRefresher,
    IonSearchbar
} from '@ionic/react';
import {useEffect, useState} from 'react';
import {getAllProperty} from '../databaseHandler';
import {Property} from '../models';

const Home: React.FC = () => {
    const [property, setProperty] = useState<any[]>([]);
    const [searchText, setText] = useState('');

    async function fetchData() {
        const allProperties = await getAllProperty();
        setProperty(allProperties);
        console.log(allProperties);
    }

    async function searchProperty(searchText: string) {
        const allProperties = await getAllProperty() as Property[];
        searchText = searchText.toLowerCase();
        const filteredResults = allProperties.filter(element => element.property.toLowerCase().indexOf(searchText) > -1);
        setProperty(filteredResults);
    }

    useEffect(() => {
        fetchData()
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
                <IonSearchbar value={searchText} onIonChange={e => setText(e.detail.value!)}/>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent/>
                </IonRefresher>
                {property &&
                <IonList>
                    {
                        property.map((c, i) =>
                            <IonItem routerLink={'details/' + c.id} button key={i}>{c.property}</IonItem>
                        )
                    }
                </IonList>
                }
            </IonContent>
        </IonPage>
    );
};

export default Home;
