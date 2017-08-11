'use strict';

const Homey = require('homey');
const feedparser = require('feedparser-promised');

class Tweakers extends Homey.App {

    onInit() {

        this.log('Tweakers is gestart');

        //Globale variablen
        global.TweakersMixed;
        global.TweakersNieuws;
        global.TweakersMeukTracker;
        global.TweakersGames;
        global.TweakersVraagAanbod;

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
    }

    //Trigger TweakersMixed
    async GetTweakersMixed() {
        try {

            const url = 'http://feeds.feedburner.com/tweakers/mixed';

            this.log('Start GetTweakersMixed');

            var items = await feedparser.parse(url);
            var TweakersMixedTitel = items[0].title;
            var TweakersMixedCategorie = items[0].categories;
            var TweakersMixedDatumTZ = items[0].date;
            var TweakersMixedDatum = Date.parse(TweakersMixedDatumTZ) / 1000
            this.log('End Success GetTweakersMixed');

        } catch (error) {
            console.error('error: ', error)
            this.log('End Error GetTweakersMixed');
        }

        if (global.TweakersMixed !== TweakersMixedDatum) {
            this.log('IF timestamp:', global.TweakersMixed + ' = ' + 'TweakersMixedDatum:', TweakersMixedDatum);
            global.TweakersMixed = TweakersMixedDatum;
            console.log('IF titel:', TweakersMixedTitel);
            console.log('IF TweakersMixedCategorie:', TweakersMixedCategorie);
            console.log('IF timestamp update:', global.TweakersMixed);

            //trigger flow
            let TriggerTweakersMixed = new Homey.FlowCardTrigger('TriggerTweakersMixed');

            let tokens = {
                'title': TweakersMixedTitel
            }

            TriggerTweakersMixed
                .register()
                .trigger(tokens)
                .catch(this.error)
                .then(this.log)

        } else {
            this.log('ELSE timestamp:', global.TweakersMixed + ' = ' + 'TweakersMixedDatum:', TweakersMixedDatum);
        }

    }


    //Trigger TweakersNieuws
    async GetTweakersNieuws() {
        try {

            const url = 'http://feeds.feedburner.com/tweakers/nieuws';

            this.log('Start GetTweakersNieuws');

            var items = await feedparser.parse(url);
            var TweakersNieuwsTitel = items[0].title;
            var TweakersNieuwsDatumTZ = items[0].date;
            var TweakersNieuwsDatum = Date.parse(TweakersNieuwsDatumTZ) / 1000
            this.log('End Success GetTweakersNieuws');

        } catch (error) {
            console.error('error: ', error)
            this.log('End Error GetTweakersNieuws');
        }

        if (global.TweakersNieuws !== TweakersNieuwsDatum) {
            this.log('IF timestamp:', global.TweakersNieuws + ' = ' + 'TweakersNieuwsDatum:', TweakersNieuwsDatum);
            global.TweakersNieuws = TweakersNieuwsDatum;
            console.log('IF titel:', TweakersNieuwsTitel);
            console.log('IF timestamp update:', global.TweakersNieuws);

            //trigger flow
            let TriggerTweakersNieuws = new Homey.FlowCardTrigger('TriggerTweakersNieuws');

            let tokens = {
                'title': TweakersNieuwsTitel
            }

            TriggerTweakersNieuws
                .register()
                .trigger(tokens)
                .catch(this.error)
                .then(this.log)

        } else {
            this.log('ELSE timestamp:', global.TweakersNieuws + ' = ' + 'TweakersNieuwsDatum:', TweakersNieuwsDatum);
        }

    }

    //Trigger TweakersMeukTracker
    async GetTweakersMeukTracker() {
        try {

            const url = 'http://feeds.feedburner.com/tweakers/meuktracker';

            this.log('Start GetTweakersMeukTracker');

            var items = await feedparser.parse(url);
            var TweakersMeukTitel = items[0].title;
            var TweakersMeukDatumTZ = items[0].date;
            var TweakersMeukDatum = Date.parse(TweakersMeukDatumTZ) / 1000
            this.log('End Success GetTweakersMeukTracker');

        } catch (error) {
            console.error('error: ', error)
            this.log('End Error GetTweakersMeukTracker');
        }

        if (global.TweakersMeukTracker !== TweakersMeukDatum) {
            this.log('IF timestamp:', global.TweakersMeukTracker + ' = ' + 'TweakersMeukDatum:', TweakersMeukDatum);
            global.TweakersMeukTracker = TweakersMeukDatum;
            console.log('IF titel:', TweakersMeukTitel);
            console.log('IF timestamp update:', global.TweakersMeukTracker);

            //trigger flow
            let TriggerTweakersMeukTracker = new Homey.FlowCardTrigger('TriggerTweakersMeukTracker');

            let tokens = {
                'title': TweakersMeukTitel
            }

            TriggerTweakersMeukTracker
                .register()
                .trigger(tokens)
                .catch(this.error)
                .then(this.log)

        } else {
            this.log('ELSE timestamp:', global.TweakersMeukTracker + ' = ' + 'TweakersMeukDatum:', TweakersMeukDatum);
        }

    }

    //Trigger TweakersGames
    async GetTweakersGames() {
        try {

            const url = 'http://feeds.feedburner.com/tweakers/games';

            this.log('Start GetTweakersGames');

            var items = await feedparser.parse(url);
            var TweakersGamesTitel = items[0].title;
            var TweakersGamesDatumTZ = items[0].date;
            var TweakersGamesDatum = Date.parse(TweakersGamesDatumTZ) / 1000
            this.log('End Success GetTweakersGames');

        } catch (error) {
            console.error('error: ', error)
            this.log('End Error GetTweakersGames');
        }

        if (global.TweakersGames !== TweakersGamesDatum) {
            this.log('IF timestamp:', global.TweakersGames + ' = ' + 'TweakersGamesDatum:', TweakersGamesDatum);
            global.TweakersGames = TweakersGamesDatum;
            console.log('IF titel:', TweakersGamesTitel);
            console.log('IF timestamp update:', global.TweakersGames);

            //trigger flow
            let TriggerTweakersGames = new Homey.FlowCardTrigger('TriggerTweakersGames');

            let tokens = {
                'title': TweakersGamesTitel
            }

            TriggerTweakersGames
                .register()
                .trigger(tokens)
                .catch(this.error)
                .then(this.log)

        } else {
            this.log('ELSE timestamp:', global.TweakersGames + ' = ' + 'TweakersGamesDatum:', TweakersGamesDatum);
        }

    }

    //Trigger TweakersVraagAanbod
    async GetTweakersVraagAanbod() {
        try {

            const url = 'https://tweakers.net/feeds/va.xml';

            this.log('Start GetTweakersVraagAanbod');

            var items = await feedparser.parse(url);
            var TweakersVraagAanbodTitel = items[0].title;
            var TweakersVraagAanbodDatumTZ = items[0].date;
            var TweakersVraagAanbodDatum = Date.parse(TweakersVraagAanbodDatumTZ) / 1000
            this.log('End Success GetTweakersVraagAanbod');

        } catch (error) {
            console.error('error: ', error)
            this.log('End Error GetTweakersVraagAanbod');
        }

        if (global.TweakersVraagAanbod !== TweakersVraagAanbodDatum) {
            this.log('IF timestamp:', global.TweakersVraagAanbod + ' = ' + 'TweakersVraagAanbodDatum:', TweakersVraagAanbodDatum);
            global.TweakersVraagAanbod = TweakersVraagAanbodDatum;
            console.log('IF titel:', TweakersVraagAanbodTitel);
            console.log('IF timestamp update:', global.TweakersVraagAanbod);

            //trigger flow
            let TriggerTweakersVraagAanbod = new Homey.FlowCardTrigger('TriggerTweakersVraagAanbod');

            let tokens = {
                'title': TweakersVraagAanbodTitel
            }

            TriggerTweakersVraagAanbod
                .register()
                .trigger(tokens)
                .catch(this.error)
                .then(this.log)

        } else {
            this.log('ELSE timestamp:', global.TweakersVraagAanbod + ' = ' + 'TweakersVraagAanbodDatum:', TweakersVraagAanbodDatum);
        }

    }



}

module.exports = Tweakers;
