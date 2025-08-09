import { IonButtons, IonHeader, IonContent, IonToolbar, IonTitle, IonButton } from '@ionic/react';
import ga4 from 'react-ga4';
import { useHistory } from 'react-router';
import { isProd } from 'utils';

function AboutPage() {
    // if (isProd()) {
    //     // Send an event when user enters page
    //     ga4.send({ hitType: "pageview", page: "/about", title: "About Page" });
    //   }
    const history = useHistory();
    function handleClick(): void {
        if (isProd()) {
            // Send an event when user goes to my ko-fi page
            ga4.event({
              category: "about",
              action: "kofi_visit",
            });
          }
    }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton routerDirection='back' onClick={() => history.goBack()}/>
          </IonButtons>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <h1>HD-tracker</h1>
        <p>
            This app helps you track drops in HayDay.
            It's a PWA so you can install it anywhere.
            The app has 3 tabs:
        </p>
        <p>
            <strong>/track:</strong> Track the drops. Each click/touch for an item increments
            the count for it.
            <br/>
            <strong>/stats:</strong> See your farms' drop distribution.
            <br/>
            <strong>/farms:</strong> Add, delete and edit your farms.
        </p>
        <p>
            I have built this app mainly for myself but decided to share it with the HayDay community.
            <br/>
            If you like this app you can support me by tipping <a href='https://ko-fi.com/doronsoup' target='_blank' onClick={handleClick} >here.</a>
            <br/>
            I've worked pretty hard on this project so I would really appreciate it, thanks! <link ></link>
        </p>
      </IonContent>
    </>
  );
}

export default AboutPage;