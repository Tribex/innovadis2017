<template lang="pug">
.case-socialhof
  .container.pt
    h1.dot {{ title }}
    p.intro {{ lead }}

  .hero

  .hidden-phone
    .gray
      .container.pt
        .padded-container
          h2.dot Door en voor de zorg
          p Innovadis heeft voor Woon- en zorgcentrum De Vriezenhof het platform Socialhof gerealiseerd. De Vriezenhof wil met het platform een bijdragen leveren aan de interne communicatie door het uitwisselen van informatie leuk en gemakkelijk te maken. Het platform ondersteunt en faciliteert de medewerkers, de bewoners en de familie van de bewoners.

      .container.pt.flex.flex-justify-center.flex-column-phablet.flex-align-center
        .padded-container.flex.flex-column.small
          h3 Eén platform voor alle leuke en nuttige informatie.
          p {{ text1 }}
        phone-orbs

    .gray
      .container.pt.text-center
        h3 Deel eenvoudig informatie.
        p {{ text2 }}

      kiosk

      .container.flex.pt
        phones-side-by-side
        .flex.flex-column
          h3 Chatten zoals je gewend bent, maar gescheiden van je privé leven.
          p {{ text3 }}

    .gray
      .container.pt
        .flex
          .flex.flex-column
            h3 Alle collega’s overzichtelijk bij elkaar.
            p {{ text4 }}
          phones-overlap

      .container.pt
        .flex
          .with-macbook.flex.flex-column
            h3 Easy to use beheeromgeving.
            p {{ text5 }}

            .orbs
              .row
                orb(icon='brain-settings', :size='50', :initialX='-25', :initialY='-23', single)
                | Geen technische kennis benodigd
              .row
                orb(icon='identification-documents', :size='50', :initialX='-25', :initialY='-23', single)
                | Gebruikersbeheer
              .row
                orb(icon='picture', :size='50', :initialX='-25', :initialY='-23', single)
                | Controle over gepubliceerde berichten
              .row
                orb(icon='user-options', :size='50', :initialX='-25', :initialY='-23', single)
                | Rollen en rechten

          macbook

  //- Phone only
  .hidden-desktop.hidden-tablet
    .gray.container.pt
      h2.text-center Door en voor de zorg
      p.text-center Innovadis heeft voor Woon- en zorgcentrum De Vriezenhof het platform Socialhof gerealiseerd. De Vriezenhof wil met het platform een bijdragen leveren aan de interne communicatie door het uitwisselen van informatie leuk en gemakkelijk te maken. Het platform ondersteunt en faciliteert de medewerkers, de bewoners en de familie van de bewoners.

      .with-image.flex.pt.flex-align-center
        .flex.flex-column
          h3(style='margin-bottom: 20px') Eén platform voor alle leuke en nuttige informatie.
          inno-button(label='Meer info', small, yellow, @click='dialogOpen1 = true')
        img(src='/static/images/smarthealth_mobile_orbs.png', height='280px', style='margin: 0 -20px 20px 20px')

        info-dialog(v-model='dialogOpen1', closable, v-if='dialogOpen1')
          .dialog-container
            p {{ text1 }}

    .gray.container.pt.flex.flex-column.flex-align-center
      h3 Deel eenvoudig informatie.
      p.text-center Het grote touchscreen in de centrale hal biedt een unieke ervaring.
      inno-button(label='Meer info', small, yellow, @click='dialogOpen2 = true', style='z-index: 1')
      img(src='/static/cases/socialhof/kiosk.png', height='250px', style='margin-top: -40px')

      info-dialog(v-model='dialogOpen2', closable, v-if='dialogOpen2')
        .dialog-container
          p {{ text2 }}

      .flex.flex-align-center(style='margin: 160px 0 40px 0')
        img(src='/static/cases/socialhof/2phones_sidebyside.png', height='200px', style='margin-right: 20px')

        .flex.flex-column
          h3(style='margin-bottom: 20px') Chatten zoals je gewend bent, maar gescheiden van je privé leven.
          inno-button(label='Meer info', small, yellow, @click='dialogOpen3 = true')

          info-dialog(v-model='dialogOpen3', closable, v-if='dialogOpen3')
            .dialog-container
              p {{ text3 }}

    .gray.container.pt
      .flex.flex-align-center(style='margin: 100px 0')
        .flex.flex-column
          h3(style='margin-bottom: 20px') Laat weten welke activiteiten er zijn voor personeel en bewoners.
          inno-button(label='Meer info', small, yellow, @click='dialogOpen4 = true')
        img(src='/static/cases/socialhof/2phones_overlap.png', height='250px')

        info-dialog(v-model='dialogOpen4', closable, v-if='dialogOpen4')
          .dialog-container
            p {{ text4 }}

      .flex.flex-align-center(style='padding: 100px 0')
        .flex.flex-column
          h3(style='margin-bottom: 20px') Easy to use beheeromgeving.
          inno-button(label='Meer info', small, yellow, @click='dialogOpen5 = true')
        img(src='/static/cases/socialhof/macbook.png', height='250px')

        info-dialog(v-model='dialogOpen5', closable, v-if='dialogOpen5')
          .dialog-container
            p {{ text5 }}

  send-box-with-slot(flip, subject='Reactie op Socialhof case')
    h2.dot Vraag een demo aan
    p Meer weten of wil je een demo? Neem dan contact met ons op of laat een berichtje achter. Vinden we leuk!
</template>

<script>
export default {
  components: {
    Orb: require('src/components/Orb'),
    PhoneOrbs: require('./PhoneOrbs'),
    Kiosk: require('./Kiosk'),
    PhonesSideBySide: require('./PhonesSideBySide'),
    PhonesOverlap: require('./PhonesOverlap'),
    Macbook: require('./Macbook'),
    SendBoxWithSlot: require('src/components/SendBox/SendBoxWithSlot'),
    ButtonAlternate: require('src/components/ButtonAlternate'),
    InnoButton: require('src/components/Button'),
    InfoDialog: require('src/components/Feed/Dialog')
  },

  data() {
    return {
      title: 'Socialhof',
      lead: 'De Vriezenhof is een vooruitstrevende zorginstelling in Vriezenveen, die wonen, welzijn dagbesteding, huishoudelijke ondersteuning en wijkverpleging en -verzorging biedt. Er zijn de laatste jaren grote verbeteringen doorgevoerd. Een belangrijke basis voor de verbeteringen is dat de medewerkers in zelfsturende teams werken. Het blijkt echter dat medewerkers van verschillende teams daardoor minder contact hebben. Om teams van elkaar te kunnen laten leren, om successen te vieren en om elkaar en anderen te vertellen wat er allemaal gebeurt in en rondom De Vriezenhof, is er behoefte aan een platform die dat mogelijk maakt en stimuleert.',
      text1: 'Socialhof is de communicatietool van De Vriezenhof. De tool brengt alle communicatie bij elkaar en het combineert bestaande tools op één plek die voor iedereen binnen De Vriezenhof toegankelijk is. Alle digitale communicatie vindt er plaats, van privé chats tot groep chats, belangrijke mededelingen, openbare berichten tot het delen van bestanden en het bijhouden van agenda\'s en dagmenu\'s.',
      dialogOpen1: false,
      text2: 'Het grote touchscreen in de centrale hal biedt een unieke ervaring. Al wachtende op de lift worden de bewoners, het personeel en de familie snel en op een leuke manier geïnformeerd over het laatste nieuws en activiteiten. De Vriezenhof gerelateerd nieuws en algemene mededelingen worden afgewisseld met zaken als filmpjes en foto’s van activiteiten met bewoners. Daarnaast worden de activiteiten voor bewoners en het restaurant menu getoond.',
      dialogOpen2: false,
      text3: 'Degenen die WhatsApp gewend zijn, zullen vele gelijkenissen zien met de chat functie van Socialhof. De chat functionaliteit laat je snel, simpel en veilig chatberichten versturen. Het platform biedt de mogelijkheid om privé te chatten met alle contactpersonen in het platform maar ook groepsgesprekken zijn mogelijk. Ook het delen van afbeeldingen, video’s en bestanden zijn features die de chat functionaliteit beidt. De chat functionaliteit is volledig beveiligd door middel van encryptie en wordt gehost op Europese servers. Notificaties zijn allen zichtbaar bij gebruik van het portaal. Zo kan privé en werk makkelijk gescheiden gehouden worden.',
      dialogOpen3: false,
      text4: 'Net als een agenda is een contactenlijst een onmisbare tool geworden voor de Vriezenhof. Elke organisatie waar communicatie essentieel is, komt vroeg of laat voor de vraag te staan hoe hij zijn contactenlijst up-to-date houdt. Natuurlijk kun je dit in excel doen. Nadeel is dat je lijst met contacten alweer verouderd is voordat je hem opgesteld hebt. Het Sociahof platform brengt alle brengt alle contacten samen op een 1 plek zodat je de juiste gegevens kunt terugvinden wanneer je deze nodig hebt. De medewerker kan zelf zijn gegevens up to date houden en met 1 druk op de knop een telefoongesprek, e-mail of chat starten.',
      dialogOpen4: false,
      text5: 'De Socialhof beheeromgeving maar het mogelijk om op eenvoudige wijze de App en de Kiosk te beheren. Middels de beheeromgeving houdt De Vriezenhof controle of hetgeen gepubliceerd wordt in de App en Kiosk. Tevens is er een functie beschikbaar waarmee alle medewerkers middels een mededeling bereikt kunnen worden.',
      dialogOpen5: false
    }
  },

  head: {
    title: {
      inner: 'Socialhof'
    },
    meta() {
      return [
        // Google+
        { itemprop: 'name', content: this.title },
        { itemprop: 'description', content: this.lead },

        // Twitter
        { name: 'twitter:title', content: this.title },
        { name: 'twitter:description', content: this.lead },

        // Facebook
        { property: 'og:title', content: this.title },
        { property: 'og:description', content: this.lead }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables';

.case-socialhof {
  .gray {
    background: linear-gradient(180deg, #FFFFFF 0%, #F1F1F1 100%);
  }

  .small {
    max-width: 50%;

    @include phablet {
      max-width: none;
    }
  }

  .hero {
    margin-top: $gutter;
    background-image: url('/static/cases/socialhof/banner.png');
  }

  .with-macbook {
    max-width: 50%;
    margin-bottom: 200px;

    .image {
      min-width: 400px !important;
    }

    .orbs {
      display: flex;
      flex-direction: column;

      .row {
        display: flex;
        padding: 10px 0;
        line-height: 50px;

        .orb-wrapper {
          margin-right: 65px;
        }
      }
    }
  }

  .dialog-container {
    padding: 20px;

    p {
      margin: 0;
    }
  }

  .sendboxwithslot {
    margin-top: 100px;
  }
}
</style>
