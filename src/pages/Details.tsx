import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonItem, IonLabel, IonSelectOption, IonSelect, IonDatetime,
  IonInput, IonButton, useIonToast, IonBackButton, IonIcon
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { trashSharp } from 'ionicons/icons';
import { useHistory, useParams } from 'react-router';
import { getRecordById, deleteRecord, updateRecord } from '../databaseHandler';
import { Record } from '../models';

interface CWParams {
  id: string
}

const Details: React.FC = () => {
  const { id } = useParams<CWParams>()
  const [property, setProperty] = useState('')
  const [bedroom, setBedroom] = useState('')
  const [date, setDate] = useState(new Date().toISOString())
  const [price, setPrice] = useState('')
  const [furniture, setFurniture] = useState('')
  const [note, setNotes] = useState('')
  const [reporter, setReporter] = useState('')
  const [present] = useIonToast()
  const history = useHistory()

  const handleUpdate = () => {
    const newEntry = {
      id: Number.parseInt(id),
      property: property,
      bedroom: bedroom,
      date: date,
      price: price,
      furniture: furniture,
      note: note,
      reporter: reporter
    }

    if (!property || !bedroom || !date || !price || !reporter) {
      present("Please enter in the required field", 2000);
    } else {
      updateRecord(newEntry);
      present("Updated", 2000);
    }
  }

  async function fetchData() {
    const record = await getRecordById(Number.parseInt(id)) as Record;
    setProperty(record.property);
    setBedroom(record.bedroom);
    setDate(record.date);
    setPrice(record.price);
    setFurniture(record.furniture);
    setNotes(record.note);
    setReporter(record.reporter);
  }

  useEffect(() => {
    fetchData();
  }, [])

  function handleDelete() {
    const userConfirm = window.confirm("Are you sure you want to delete?");
    if (userConfirm) {
      deleteRecord(Number.parseInt(id))
      alert("detele successfully")
      history.goBack();
    } else {
      alert("your action has been cancelled")
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start">
            <IonBackButton />
          </IonButton>
          <IonTitle>Details {id}</IonTitle>
          <IonButton onClick={handleDelete} color="danger" slot="end">
            <IonIcon icon={trashSharp}></IonIcon>
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel position="stacked">Property Type</IonLabel>
          <IonSelect value={property} onIonChange={event => setProperty(event.detail.value!)}>
            <IonSelectOption>Flat</IonSelectOption>
            <IonSelectOption>House</IonSelectOption>
            <IonSelectOption>Bungalow</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Bedrooms</IonLabel>
          <IonSelect value={bedroom} onIonChange={event => setBedroom(event.detail.value!)}>
            <IonSelectOption>Studio</IonSelectOption>
            <IonSelectOption>One</IonSelectOption>
            <IonSelectOption>Two</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Date</IonLabel>
          <IonDatetime value={date} onIonChange={event => setDate(event.detail.value!)}></IonDatetime>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Monthly Rent Price</IonLabel>
          <IonInput value={price} onIonChange={event => setPrice(event.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Furniture types</IonLabel>
          <IonSelect value={furniture} onIonChange={event => setFurniture(event.detail.value!)}>
            <IonSelectOption>Furnished</IonSelectOption>
            <IonSelectOption>Unfurnished</IonSelectOption>
            <IonSelectOption>Part Furnished</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Notes</IonLabel>
          <IonInput value={note} onIonChange={event => setNotes(event.detail.value!)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Reporter Name</IonLabel>
          <IonInput value={reporter} onIonChange={event => setReporter(event.detail.value!)}></IonInput>
        </IonItem>
        <IonButton expand="block" onClick={handleUpdate}>Update</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Details;