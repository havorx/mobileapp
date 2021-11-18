import {
    IonButton, IonContent, IonDatetime, IonHeader,
    IonInput, IonItem, IonLabel, IonPage, IonRefresher,
    IonRefresherContent, IonSelect, IonSelectOption, IonTitle, IonToolbar,
    useIonToast
} from '@ionic/react';
import {useEffect, useState} from 'react';
import {getAllProperty, insertProperty} from '../databaseHandler';

const AddProperty: React.FC = () => {
    const [property, setProperty] = useState('')
    const [bedroom, setBedroom] = useState('')
    const [date] = useState(new Date().toISOString())
    const [price, setPrice] = useState('')
    const [furniture, setFurniture] = useState('')
    const [note, setNotes] = useState('')
    const [reporter, setReporter] = useState('')
    const [present] = useIonToast()

    async function submitCLick() {
        const newEntry = {
            property: property,
            bedroom: bedroom,
            date: date,
            price: price,
            furniture: furniture,
            note: note,
            reporter: reporter
        }
        const allProperties = await getAllProperty()

        const duplicate = allProperties.filter(element =>
            newEntry.property === element.property &&
            newEntry.bedroom === element.bedroom &&
            newEntry.date === element.date &&
            newEntry.price === element.price &&
            newEntry.reporter === element.reporter)

        if (!property || !bedroom || !date || !price || !reporter) {
            present('Please enter in the (*) required field', 2000)
        } else if (duplicate.length === 0) {
            await insertProperty(newEntry);
            present('Property submitted', 2000);
        } else present('Property already exist', 2000)
    }

    function resetState() {
        setProperty('')
        setBedroom('')
        setPrice('')
        setFurniture('')
        setNotes('')
        setReporter('')
    }

    function doRefresh(event: any) {
        resetState()
        setTimeout(() => {
            console.log('refreshed')
            event.detail.complete()
        }, 1000)
    }

    useEffect(() => {
        resetState()
    }, [])

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
                    <IonSelect value={property} onIonChange={event => setProperty(event.detail.value!)}>
                        <IonSelectOption>Flat</IonSelectOption>
                        <IonSelectOption>House</IonSelectOption>
                        <IonSelectOption>Bungalow</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Bedrooms (*)</IonLabel>
                    <IonSelect value={bedroom} onIonChange={event => setBedroom(event.detail.value!)}>
                        <IonSelectOption>Studio</IonSelectOption>
                        <IonSelectOption>One</IonSelectOption>
                        <IonSelectOption>Two</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Created date (*)</IonLabel>
                    <IonDatetime readonly={true} value={date}/>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Monthly Rent Price (*)</IonLabel>
                    <IonInput value={price} onIonChange={event => setPrice(event.detail.value!)}/>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Furniture types </IonLabel>
                    <IonSelect value={furniture} onIonChange={event => setFurniture(event.detail.value!)}>
                        <IonSelectOption>Furnished</IonSelectOption>
                        <IonSelectOption>Unfurnished</IonSelectOption>
                        <IonSelectOption>Part Furnished</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Description Notes</IonLabel>
                    <IonInput value={note} onIonChange={event => setNotes(event.detail.value!)}/>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked">Reporter Name (*)</IonLabel>
                    <IonInput value={reporter} onIonChange={event => setReporter(event.detail.value!)}/>
                </IonItem>
                <IonButton expand="block" onClick={submitCLick}>Submit</IonButton>
                <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
                    <IonRefresherContent/>
                </IonRefresher>
            </IonContent>
        </IonPage>
    )
}


export default AddProperty;
