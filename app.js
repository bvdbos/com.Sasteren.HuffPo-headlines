'use strict';

const Homey = require('homey');
const feedparser = require('feedparser-promised');
const striptags = require('striptags');

class Huffpost extends Homey.App {

    onInit() {

        this.log('Huffington Post is gestart');

        //App instantie variablen
        this.HuffPoWorldNews = null;
        this.HuffPoBusiness = null;
        this.HuffPoEntertainment = null;
        this.HuffPoSports = null;
        this.HuffPoBooks = null;
		this.HuffPoGreen = null;
		this.readNews = null;
		
        //Flow card registration 
		//to do via settings uitkiezen welke gepolled moeten worden
        this.TriggerHuffPoWorldNews = new Homey.FlowCardTrigger('TriggerHuffPoWorldNews')
            .register();
        this.TriggerHuffPoBusiness = new Homey.FlowCardTrigger('TriggerHuffPoBusiness')
            .register();
        this.TriggerHuffPoEntertainment = new Homey.FlowCardTrigger('TriggerHuffPoEntertainment')
            .register();
        this.TriggerHuffPoSports = new Homey.FlowCardTrigger('TriggerHuffPoSports')
            .register();
        this.TriggerHuffPoBooks = new Homey.FlowCardTrigger('TriggerHuffPoBooks')
            .register();
        this.TriggerHuffPoGreen = new Homey.FlowCardTrigger('TriggerHuffPoGreen')
            .register();

		let readnews_listener = async(args)  => {
                    const url = 'http://www.huffingtonpost.com/section/green/feed';
                    this.log('Get News');
                    let items = await feedparser.parse(url);
					var maxNews = 5;
					for (var i = 0; i < maxNews; i++) {
						if(items[i].title !== undefined) {
							var title = replaceContent(items[i].title);
							var content = replaceContent(items[i].description);
							if (title.length > 0 && content.length > 0) {
								var textstring = (formatHeadline(headlineKeywords[i] + '. ' + title + '. ' + content));
								Homey.ManagerSpeechOutput.say(textstring);                        
								this.log(textstring);
							}
						}
					}
		};


		let TriggerHuffPoReadNews = new Homey.FlowCardAction('readNews');
		TriggerHuffPoReadNews
                .register()
                .registerRunListener(readnews_listener);			

		
        //Start loop interval
        this.log('StartInterval');
        this.startLoop();

		let replaceContent = function(text) {
			text = text.replace(('BBC'), ('B B C'));
			return text;
		}; 
		
		var formatHeadline = function(text) {
			text = text.replace('"', '');
			text = text.replace("'", "");
			text = text.replace("\"", "");
			text = striptags(text).substr(0, 255);
			var index = text.lastIndexOf('.');
			return [text.slice(0, index), text.slice(index + 1)][0]+'.';
		};
	
		var headlineKeywords = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fiveteen', 'sixteen', 'seventeen', 'eightteen', 'nineteen', 'twenty'];
				
    }

	


    //Function LoopHuffPo
	//to do via settings uitkiezen welke gepolled moeten worden
    async LoopHuffPo() {
        this.log('Start LoopHuffPo');
        await this.GetHuffPoWorldNews();
        await this.GetHuffPoBusiness();
        await this.GetHuffPoEntertainment();
        await this.GetHuffPoSports();
        await this.GetHuffPoBooks();
        await this.GetHuffPoGreen();		
        this.log('Einde LoopHuffPo');
    }

    //StartLoop
	//todo maak hier een setting van
    startLoop() {
        setInterval(() => {
            this.LoopHuffPo();
        }, 300000); //5 minuten ->  300000
        // Call this.loopHuffPo() to set the initial state
        this.LoopHuffPo();
    }

    //Trigger HuffPo WorldNews
    async GetHuffPoWorldNews() {
        try {

            const url = 'http://www.huffingtonpost.com/section/world-news/feed';

            this.log('Start GetHuffPoWorldNews');

            var items = await feedparser.parse(url);
            var HuffPoWorldNewsTitle = items[0].title;
            var HuffPoWorldNewsDescription = items[0].description;
            var HuffPoWorldNewsDatumTZ = items[0].pubDate;
            var HuffPoWorldNewsDatum = Date.parse(HuffPoWorldNewsDatumTZ) / 1000
            this.log('End Success GetHuffPoWorldNews');

        } catch (error) {
            console.error('error: ', error)
            this.log('End Error GetHuffPoWorldNews');
        }

        if (this.HuffPoWorldNews !== HuffPoWorldNewsDatum) {
            this.log('IF timestamp:', this.HuffPoWorldNews + ' = ' + 'HuffPoWorldNewsDatum:', HuffPoWorldNewsDatum);
            this.HuffPoWorldNews = HuffPoWorldNewsDatum;
            console.log('IF titel:', HuffPoWorldNewsTitle);
            console.log('IF timestamp update:', this.HuffPoWorldNews);

            //trigger flow
            let tokens = {
                'title': HuffPoWorldNewsTitle,
                'description': HuffPoWorldNewsDescription
            }

            return this.TriggerHuffPoWorldNews
                .trigger(tokens)
                .catch(this.error)
                .then(this.log)

        } else {
            this.log('ELSE timestamp:', this.HuffPoWorldNews + ' = ' + 'HuffPoWorldNewsDatum:', HuffPoWorldNewsDatum);
        }

    }


    //Trigger HuffPoBusiness
    async GetHuffPoBusiness() {
        try {

            const url = 'http://www.huffingtonpost.com/section/business/feed';

            this.log('Start GetHuffPoBusiness');

            var items = await feedparser.parse(url);
            var HuffPoBusinessTitle = items[0].title;
            var HuffPoBusinessDescription = items[0].description;
            var HuffPoBusinessDatumTZ = items[0].pubDate;
            var HuffPoBusinessDatum = Date.parse(HuffPoBusinessDatumTZ) / 1000
            this.log('End Success GetHuffPoBusiness');

        } catch (error) {
            console.error('error: ', error)
            this.log('End Error GetHuffPoBusiness');
        }

        if (this.HuffPoBusiness !== HuffPoBusinessDatum) {
            this.log('IF timestamp:', this.HuffPoBusiness + ' = ' + 'HuffPoBusinessDatum:', HuffPoBusinessDatum);
            this.HuffPoBusiness = HuffPoBusinessDatum;
            console.log('IF titel:', HuffPoBusinessTitle);
            console.log('IF timestamp update:', this.HuffPoBusiness);

            //trigger flow
            let tokens = {
                'title': HuffPoBusinessTitle,
                'description': HuffPoBusinessDescription
            }



            return this.TriggerHuffPoBusiness
                .trigger(tokens)
                .catch(this.error)
                .then(this.log)

        } else {
            this.log('ELSE timestamp:', this.HuffPoBusiness + ' = ' + 'HuffPoBusinessDatum:', HuffPoBusinessDatum);
        }

    }

    //Trigger HuffPoEntertainment
    async GetHuffPoEntertainment() {
        try {

            const url = 'http://www.huffingtonpost.com/dept/entertainment/feed';

            this.log('Start GetHuffPoEntertainment');

            var items = await feedparser.parse(url);
            var HuffPoEntertainmentTitle = items[0].title;
            var HuffPoEntertainmentCategorie = items[0].categories;
            var HuffPoEntertainmentDescription = items[0].description;
            var HuffPoEntertainmentDatumTZ = items[0].pubDate;
            var HuffPoEntertainmentDatum = Date.parse(HuffPoEntertainmentDatumTZ) / 1000
            this.log('End Success GetHuffPoEntertainment');

        } catch (error) {
            console.error('error: ', error)
            this.log('End Error GetHuffPoEntertainment');
        }

        if (this.HuffPoEntertainment !== HuffPoEntertainmentDatum) {
            this.log('IF timestamp:', this.HuffPoEntertainment + ' = ' + 'HuffPoEntertainmentDatum:', HuffPoEntertainmentDatum);
            this.HuffPoEntertainment = HuffPoEntertainmentDatum;
            console.log('IF Title:', HuffPoEntertainmentTitle);
            console.log('IF timestamp update:', this.HuffPoEntertainment);

            //trigger flow
            let tokens = {
                'title': HuffPoEntertainmentTitle,
                'description': HuffPoEntertainmentDescription
            }

            return this.TriggerHuffPoEntertainment
                .trigger(tokens)
                .catch(this.error)
                .then(this.log)

        } else {
            this.log('ELSE timestamp:', this.HuffPoEntertainment + ' = ' + 'HuffPoEntertainmentDatum:', HuffPoEntertainmentDatum);
        }

    }

    //Trigger HuffPoSports
    async GetHuffPoSports() {
        try {

            const url = 'http://www.huffingtonpost.com/section/sports/feed';

            this.log('Start GetHuffPoSports');

            var items = await feedparser.parse(url);
            var HuffPoSportsTitle = items[0].title;
            var HuffPoSportsDescription = items[0].description;
            var HuffPoSportsDatumTZ = items[0].pubDate;
            var HuffPoSportsDatum = Date.parse(HuffPoSportsDatumTZ) / 1000
            this.log('End Success GetHuffPoSports');

        } catch (error) {
            console.error('error: ', error)
            this.log('End Error GetHuffPoSports');
        }

        if (this.HuffPoSports !== HuffPoSportsDatum) {
            this.log('IF timestamp:', this.HuffPoSports + ' = ' + 'HuffPoSportsDatum:', HuffPoSportsDatum);
            this.HuffPoSports = HuffPoSportsDatum;
            console.log('IF Title:', HuffPoSportsTitle);
            console.log('IF timestamp update:', this.HuffPoSports);

            //trigger flow
            let tokens = {
                'title': HuffPoSportsTitle,
                'description': HuffPoSportsDescription
            }

            return this.TriggerHuffPoSports
                .trigger(tokens)
                .catch(this.error)
                .then(this.log)

        } else {
            this.log('ELSE timestamp:', this.HuffPoSports + ' = ' + 'HuffPoSportsDatum:', HuffPoSportsDatum);
        }

    }

    //Trigger HuffPoBooks
    async GetHuffPoBooks() {
        try {

            const url = 'http://www.huffingtonpost.com/section/books/feed';

            this.log('Start GetHuffPoBooks');

            var items = await feedparser.parse(url);
            var HuffPoBooksTitle = items[0].title;
            var HuffPoBooksDescription = items[0].description;
            var HuffPoBooksDatumTZ = items[0].pubDate;
            var HuffPoBooksDatum = Date.parse(HuffPoBooksDatumTZ) / 1000
            this.log('End Success GetHuffPoBooks');

        } catch (error) {
            console.error('error: ', error)
            this.log('End Error GetHuffPoBooks');
        }

        if (this.HuffPoBooks !== HuffPoBooksDatum) {
            this.log('IF timestamp:', this.HuffPoBooks + ' = ' + 'HuffPoBooksDatum:', HuffPoBooksDatum);
            this.HuffPoBooks = HuffPoBooksDatum;
            console.log('IF Title:', HuffPoBooksTitle);
            console.log('IF timestamp update:', this.HuffPoBooks);

            //trigger flow
            let tokens = {
                'title': HuffPoBooksTitle,
                'description': HuffPoBooksDescription
            }

            return this.TriggerHuffPoBooks
                .trigger(tokens)
                .catch(this.error)
                .then(this.log)

        } else {
            this.log('ELSE timestamp:', this.HuffPoBooks + ' = ' + 'HuffPoBooksDatum:', HuffPoBooksDatum);
        }

    }

    //Trigger HuffPoGreen
    async GetHuffPoGreen() {
        try {

            const url = 'http://www.huffingtonpost.com/section/green/feed';

            this.log('Start GetHuffPoGreen');

            var items = await feedparser.parse(url);
            var HuffPoGreenTitle = items[0].title;
            var HuffPoGreenDescription = items[0].description;
            var HuffPoGreenDatumTZ = items[0].pubDate;
            var HuffPoGreenDatum = Date.parse(HuffPoGreenDatumTZ) / 1000
            this.log('End Success GetHuffPoGreen');

        } catch (error) {
            console.error('error: ', error)
            this.log('End Error GetHuffPoGreen');
        }

        if (this.HuffPoGreen !== HuffPoGreenDatum) {
            this.log('IF timestamp:', this.HuffPoGreen + ' = ' + 'HuffPoGreenDatum:', HuffPoGreenDatum);
            this.HuffPoGreen = HuffPoGreenDatum;
            console.log('IF Title:', HuffPoGreenTitle);
            console.log('IF timestamp update:', this.HuffPoGreen);

            //trigger flow
            let tokens = {
                'title': HuffPoGreenTitle,
                'description': HuffPoGreenDescription
            }

            return this.TriggerHuffPoGreen
                .trigger(tokens)
                .catch(this.error)
                .then(this.log)

        } else {
            this.log('ELSE timestamp:', this.HuffPoGreen + ' = ' + 'HuffPoGreenDatum:', HuffPoGreenDatum);
        }

    }
	

	
	
	
}

module.exports = Huffpost;