import {
    IonButton, IonContent, IonDatetime, IonHeader,
    IonInput, IonItem, IonLabel, IonPage, IonSelect,
    IonSelectOption, IonTitle, IonToolbar,
    useIonToast
} from '@ionic/react';
import {useState} from 'react';
import {getAllProperty, insertProperty} from '../databaseHandler';

const AddProperty: React.FC = () => {
    const [property, setProperty] = useState('')
    const [bedroom, setBedroom] = useState('')
    const [date, setDate] = useState(new Date().toISOString())
    const [price, setPrice] = useState('')
    const [furniture, setFurniture] = useState('')
    const [note, setNotes] = useState('')
    const [reporter, setReporter] = useState('')
    const [present] = useIonToast()

    const submitCLick = async () => {

        const newEntry = {
            property: property,
            bedroom: bedroom,
            date: date,
            price: price,
            furniture: furniture,
            note: note,
            reporter: reporter
        };
        const allProperties = await getAllProperty();

        const duplicate = allProperties.filter(element =>
            newEntry.property === element.property &&
            newEntry.bedroom === element.bedroom &&
            newEntry.date === element.date &&
            newEntry.price === element.price &&
            newEntry.reporter === element.reporter);

        if (!property || !bedroom || !date || !price || !reporter) {
            present('Please enter in the required field', 2000);
        } else if (duplicate.length === 0) {
            await insertProperty(newEntry);
            present('Finished', 2000);
        } else present('Property already exist', 2000);
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>CourseWork</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonItem>
                    <IonLabel position="stacked">Property Type (*)</IonLabel>
                    <IonSelect onIonChange={event => setProperty(event.detail.value!)}>
                        <IonSelectOption>Flat</IonSelectOption>
                        <IonSelectOption>House</IonSelectOption>
                        <IonSelectOption>Bungalow</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Bedrooms (*)</IonLabel>
                    <IonSelect onIonChange={event => setBedroom(event.detail.value!)}>
                        <IonSelectOption>Studio</IonSelectOption>
                        <IonSelectOption>One</IonSelectOption>
                        <IonSelectOption>Two</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Date (*)</IonLabel>
                    <IonDatetime onIonChange={event => setDate(event.detail.value!)}/>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Monthly Rent Price (*)</IonLabel>
                    <IonInput onIonChange={event => setPrice(event.detail.value!)}/>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Furniture types </IonLabel>
                    <IonSelect onIonChange={event => setFurniture(event.detail.value!)}>
                        <IonSelectOption>Furnished</IonSelectOption>
                        <IonSelectOption>Unfurnished</IonSelectOption>
                        <IonSelectOption>Part Furnished</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Description Notes</IonLabel>
                    <IonInput onIonChange={event => setNotes(event.detail.value!)}/>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Reporter Name (*)</IonLabel>
                    <IonInput onIonChange={event => setReporter(event.detail.value!)}/>
                </IonItem>
                <IonButton expand="block" onClick={submitCLick}>Ok</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default AddProperty;
