'use strict';

const Homey = require('homey');
const feedparser = require('feedparser-promised');

class Tweakers extends Homey.App {

    onInit() {

        this.log('Tweakers is gestart');

        //App instantie variablen
        this.TweakersMixed = null;
        this.TweakersNieuws = null;
        this.TweakersMeukTracker = null;
        this.TweakersGames = null;
        this.TweakersVraagAanbod = null;

        //Flow card registration 
        this.TriggerTweakersMixed = new Homey.FlowCardTrigger('TriggerTweakersMixed')
            .register();
        this.TriggerTweakersNieuws = new Homey.FlowCardTrigger('TriggerTweakersNieuws')
            .register();
        this.TriggerTweakersMeukTracker = new Homey.FlowCardTrigger('TriggerTweakersMeukTracker')
            .register();
        this.TriggerTweakersGames = new Homey.FlowCardTrigger('TriggerTweakersGames')
            .register();
        this.TriggerTweakersVraagAanbod = new Homey.FlowCardTrigger('TriggerTweakersVraagAanbod')
            .register();

        //Start loop interval
        this.log('StartInterval');
        this.startLoop();

    }

    //Tweakers homey app

    //Function LoopTweakers
    async LoopTweakers() {
        this.log('Start LoopTweakers');
        await this.GetTweakersMixed();
        await this.GetTweakersNieuws();
        await this.GetTweakersMeukTracker();
        await this.GetTweakersGames();
        await this.GetTweakersVraagAanbod();
        this.log('Einde LoopTweakers');
    }

    //StartLoop
    startLoop() {
        setInterval(() => {
            this.LoopTweakers();
        }, 300000); //5 minuten ->  300000
        // Call this.loopTweakers() to set the initial state
        this.LoopTweakers();
    }

    //Trigger TweakersMixed
    async GetTweakersMixed() {
        try {

            const url = 'http://feeds.feedburner.com/tweakers/mixed';

            this.log('Start GetTweakersMixed');

            var items = await feedparser.parse(url);
            var TweakersMixedTitel = items[0].title;
            var TweakersMixedCategorie = items[0].categories;
            var TweakersMixedDescription = items[0].description;
            var TweakersMixedDatumTZ = items[0].date;
            var TweakersMixedDatum = Date.parse(TweakersMixedDatumTZ) / 1000
            this.log('End Success GetTweakersMixed');

        } catch (error) {
            console.error('error: ', error)
            this.log('End Error GetTweakersMixed');
        }

        if (this.TweakersMixed !== TweakersMixedDatum) {
            this.log('IF timestamp:', this.TweakersMixed + ' = ' + 'TweakersMixedDatum:', TweakersMixedDatum);
            this.TweakersMixed = TweakersMixedDatum;
            console.log('IF titel:', TweakersMixedTitel);
            console.log('IF timestamp update:', this.TweakersMixed);

            //trigger flow
            let tokens = {
                'title': TweakersMixedTitel,
                'description': TweakersMixedDescription
            }

            return this.TriggerTweakersMixed
                .trigger(tokens)
                .catch(this.error)
                .then(this.log)

        } else {
            this.log('ELSE timestamp:', this.TweakersMixed + ' = ' + 'TweakersMixedDatum:', TweakersMixedDatum);
        }

    }


    //Trigger TweakersNieuws
    async GetTweakersNieuws() {
        try {

            const url = 'http://feeds.feedburner.com/tweakers/nieuws';

            this.log('Start GetTweakersNieuws');

            var items = await feedparser.parse(url);
            var TweakersNieuwsTitel = items[0].title;
            var TweakersNieuwsDescription = items[0].description;
            var TweakersNieuwsCategories = items[0].categories;
            var TweakersNieuwsDatumTZ = items[0].date;
            var TweakersNieuwsDatum = Date.parse(TweakersNieuwsDatumTZ) / 1000
            this.log('End Success GetTweakersNieuws');

        } catch (error) {
            console.error('error: ', error)
            this.log('End Error GetTweakersNieuws');
        }

        if (this.TweakersNieuws !== TweakersNieuwsDatum) {
            this.log('IF timestamp:', this.TweakersNieuws + ' = ' + 'TweakersNieuwsDatum:', TweakersNieuwsDatum);
            this.TweakersNieuws = TweakersNieuwsDatum;
            console.log('IF titel:', TweakersNieuwsTitel);
            console.log('IF timestamp update:', this.TweakersNieuws);

            //trigger flow
            let tokens = {
                'title': TweakersNieuwsTitel,
                'description': TweakersNieuwsDescription
            }



            return this.TriggerTweakersNieuws
                .trigger(tokens)
                .catch(this.error)
                .then(this.log)

        } else {
            this.log('ELSE timestamp:', this.TweakersNieuws + ' = ' + 'TweakersNieuwsDatum:', TweakersNieuwsDatum);
        }

    }

    //Trigger TweakersMeukTracker
    async GetTweakersMeukTracker() {
        try {

            const url = 'http://feeds.feedburner.com/tweakers/meuktracker';

            this.log('Start GetTweakersMeukTracker');

            var items = await feedparser.parse(url);
            var TweakersMeukTitel = items[0].title;
            var TweakersMeukCategorie = items[0].categories;
            var TweakersMeukDescription = items[0].description;
            var TweakersMeukDatumTZ = items[0].date;
            var TweakersMeukDatum = Date.parse(TweakersMeukDatumTZ) / 1000
            this.log('End Success GetTweakersMeukTracker');

        } catch (error) {
            console.error('error: ', error)
            this.log('End Error GetTweakersMeukTracker');
        }

        if (this.TweakersMeukTracker !== TweakersMeukDatum) {
            this.log('IF timestamp:', this.TweakersMeukTracker + ' = ' + 'TweakersMeukDatum:', TweakersMeukDatum);
            this.TweakersMeukTracker = TweakersMeukDatum;
            console.log('IF titel:', TweakersMeukTitel);
            console.log('IF timestamp update:', this.TweakersMeukTracker);

            //trigger flow
            let tokens = {
                'title': TweakersMeukTitel,
                'description': TweakersMeukDescription
            }

            return this.TriggerTweakersMeukTracker
                .trigger(tokens)
                .catch(this.error)
                .then(this.log)

        } else {
            this.log('ELSE timestamp:', this.TweakersMeukTracker + ' = ' + 'TweakersMeukDatum:', TweakersMeukDatum);
        }

    }

    //Trigger TweakersGames
    async GetTweakersGames() {
        try {

            const url = 'http://feeds.feedburner.com/tweakers/games';

            this.log('Start GetTweakersGames');

            var items = await feedparser.parse(url);
            var TweakersGamesTitel = items[0].title;
            var TweakersGamesCategorie = items[0].categories;
            var TweakersGamesDescription = items[0].description;
            var TweakersGamesDatumTZ = items[0].date;
            var TweakersGamesDatum = Date.parse(TweakersGamesDatumTZ) / 1000
            this.log('End Success GetTweakersGames');

        } catch (error) {
            console.error('error: ', error)
            this.log('End Error GetTweakersGames');
        }

        if (this.TweakersGames !== TweakersGamesDatum) {
            this.log('IF timestamp:', this.TweakersGames + ' = ' + 'TweakersGamesDatum:', TweakersGamesDatum);
            this.TweakersGames = TweakersGamesDatum;
            console.log('IF titel:', TweakersGamesTitel);
            console.log('IF timestamp update:', this.TweakersGames);

            //trigger flow
            let tokens = {
                'title': TweakersGamesTitel,
                'description': TweakersGamesDescription
            }

            return this.TriggerTweakersGames
                .trigger(tokens)
                .catch(this.error)
                .then(this.log)

        } else {
            this.log('ELSE timestamp:', this.TweakersGames + ' = ' + 'TweakersGamesDatum:', TweakersGamesDatum);
        }

    }

    //Trigger TweakersVraagAanbod
    async GetTweakersVraagAanbod() {
        try {

            const url = 'https://tweakers.net/feeds/va.xml';

            this.log('Start GetTweakersVraagAanbod');

            var items = await feedparser.parse(url);
            var TweakersVraagAanbodTitel = items[0].title;
            var TweakersVraagAanbodCategorie = items[0].categories;
            var TweakersVraagAanbodDescription = items[0].description;
            var TweakersVraagAanbodDatumTZ = items[0].date;
            var TweakersVraagAanbodDatum = Date.parse(TweakersVraagAanbodDatumTZ) / 1000
            this.log('End Success GetTweakersVraagAanbod');

        } catch (error) {
            console.error('error: ', error)
            this.log('End Error GetTweakersVraagAanbod');
        }

        if (this.TweakersVraagAanbod !== TweakersVraagAanbodDatum) {
            this.log('IF timestamp:', this.TweakersVraagAanbod + ' = ' + 'TweakersVraagAanbodDatum:', TweakersVraagAanbodDatum);
            this.TweakersVraagAanbod = TweakersVraagAanbodDatum;
            console.log('IF titel:', TweakersVraagAanbodTitel);
            console.log('IF timestamp update:', this.TweakersVraagAanbod);

            //trigger flow
            let tokens = {
                'title': TweakersVraagAanbodTitel,
                'description': TweakersVraagAanbodDescription
            }

            return this.TriggerTweakersVraagAanbod
                .trigger(tokens)
                .catch(this.error)
                .then(this.log)

        } else {
            this.log('ELSE timestamp:', this.TweakersVraagAanbod + ' = ' + 'TweakersVraagAanbodDatum:', TweakersVraagAanbodDatum);
        }

    }


}

module.exports = Tweakers;