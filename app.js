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
        await this.log('Start LoopTweakers');
        await this.GetTweakersMixed();
        await this.GetTweakersNieuws();
        await this.GetTweakersMeukTracker();
        await this.GetTweakersGames();
        await this.GetTweakersVraagAanbod();
        await this.log('Einde LoopTweakers');
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

            await this.log('Start GetTweakersMixed');

            var items = await feedparser.parse(url);
            var TweakersMixedTitel = await items[0].title;
            var TweakersMixedCategorie = await items[0].categories;
            var TweakersMixedDatumTZ = await items[0].date;
            var TweakersMixedDatum = Date.parse(TweakersMixedDatumTZ) / 1000
            await this.log('End Success GetTweakersMixed');

        } catch (error) {
            console.error('error: ', error)
            await this.log('End Error GetTweakersMixed');
        }

        if (global.TweakersMixed !== TweakersMixedDatum) {
            await this.log('IF timestamp:', global.TweakersMixed + ' = ' + 'TweakersMixedDatum:', TweakersMixedDatum);
            global.TweakersMixed = TweakersMixedDatum;
            await console.log('IF titel:', TweakersMixedTitel);
            await console.log('IF TweakersMixedCategorie:', TweakersMixedCategorie);
            await console.log('IF timestamp update:', global.TweakersMixed);

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
            await this.log('ELSE timestamp:', global.TweakersMixed + ' = ' + 'TweakersMixedDatum:', TweakersMixedDatum);
        }

    }


    //Trigger TweakersNieuws
    async GetTweakersNieuws() {
        try {

            const url = 'http://feeds.feedburner.com/tweakers/nieuws';

            await this.log('Start GetTweakersNieuws');

            var items = await feedparser.parse(url);
            var TweakersNieuwsTitel = await items[0].title;
            var TweakersNieuwsDatumTZ = await items[0].date;
            var TweakersNieuwsDatum = Date.parse(TweakersNieuwsDatumTZ) / 1000
            await this.log('End Success GetTweakersNieuws');

        } catch (error) {
            console.error('error: ', error)
            await this.log('End Error GetTweakersNieuws');
        }

        if (global.TweakersNieuws !== TweakersNieuwsDatum) {
            await this.log('IF timestamp:', global.TweakersNieuws + ' = ' + 'TweakersNieuwsDatum:', TweakersNieuwsDatum);
            global.TweakersNieuws = TweakersNieuwsDatum;
            await console.log('IF titel:', TweakersNieuwsTitel);
            await console.log('IF timestamp update:', global.TweakersNieuws);

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
            await this.log('ELSE timestamp:', global.TweakersNieuws + ' = ' + 'TweakersNieuwsDatum:', TweakersNieuwsDatum);
        }

    }

    //Trigger TweakersMeukTracker
    async GetTweakersMeukTracker() {
        try {

            const url = 'http://feeds.feedburner.com/tweakers/meuktracker';

            await this.log('Start GetTweakersMeukTracker');

            var items = await feedparser.parse(url);
            var TweakersMeukTitel = await items[0].title;
            var TweakersMeukDatumTZ = await items[0].date;
            var TweakersMeukDatum = Date.parse(TweakersMeukDatumTZ) / 1000
            await this.log('End Success GetTweakersMeukTracker');

        } catch (error) {
            console.error('error: ', error)
            await this.log('End Error GetTweakersMeukTracker');
        }

        if (global.TweakersMeukTracker !== TweakersMeukDatum) {
            await this.log('IF timestamp:', global.TweakersMeukTracker + ' = ' + 'TweakersMeukDatum:', TweakersMeukDatum);
            global.TweakersMeukTracker = TweakersMeukDatum;
            await console.log('IF titel:', TweakersMeukTitel);
            await console.log('IF timestamp update:', global.TweakersMeukTracker);

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
            await this.log('ELSE timestamp:', global.TweakersMeukTracker + ' = ' + 'TweakersMeukDatum:', TweakersMeukDatum);
        }

    }

    //Trigger TweakersGames
    async GetTweakersGames() {
        try {

            const url = 'http://feeds.feedburner.com/tweakers/games';

            await this.log('Start GetTweakersGames');

            var items = await feedparser.parse(url);
            var TweakersGamesTitel = await items[0].title;
            var TweakersGamesDatumTZ = await items[0].date;
            var TweakersGamesDatum = Date.parse(TweakersGamesDatumTZ) / 1000
            await this.log('End Success GetTweakersGames');

        } catch (error) {
            console.error('error: ', error)
            await this.log('End Error GetTweakersGames');
        }

        if (global.TweakersGames !== TweakersGamesDatum) {
            await this.log('IF timestamp:', global.TweakersGames + ' = ' + 'TweakersGamesDatum:', TweakersGamesDatum);
            global.TweakersGames = TweakersGamesDatum;
            await console.log('IF titel:', TweakersGamesTitel);
            await console.log('IF timestamp update:', global.TweakersGames);

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
            await this.log('ELSE timestamp:', global.TweakersGames + ' = ' + 'TweakersGamesDatum:', TweakersGamesDatum);
        }

    }

    //Trigger TweakersVraagAanbod
    async GetTweakersVraagAanbod() {
        try {

            const url = 'https://tweakers.net/feeds/va.xml';

            await this.log('Start GetTweakersVraagAanbod');

            var items = await feedparser.parse(url);
            var TweakersVraagAanbodTitel = await items[0].title;
            var TweakersVraagAanbodDatumTZ = await items[0].date;
            var TweakersVraagAanbodDatum = Date.parse(TweakersVraagAanbodDatumTZ) / 1000
            await this.log('End Success GetTweakersVraagAanbod');

        } catch (error) {
            console.error('error: ', error)
            await this.log('End Error GetTweakersVraagAanbod');
        }

        if (global.TweakersVraagAanbod !== TweakersVraagAanbodDatum) {
            await this.log('IF timestamp:', global.TweakersVraagAanbod + ' = ' + 'TweakersVraagAanbodDatum:', TweakersVraagAanbodDatum);
            global.TweakersVraagAanbod = TweakersVraagAanbodDatum;
            await console.log('IF titel:', TweakersVraagAanbodTitel);
            await console.log('IF timestamp update:', global.TweakersVraagAanbod);

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
            await this.log('ELSE timestamp:', global.TweakersVraagAanbod + ' = ' + 'TweakersVraagAanbodDatum:', TweakersVraagAanbodDatum);
        }

    }



}

module.exports = Tweakers;
