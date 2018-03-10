# Huffpost Headlines
        
This app tells you the latest news
Source: Huffington Post

## Remarks:
* Based on the [Tweakers-app](https://github.com/lubbertkramer/net.tweakers.homey)
* American Newsfeed
* Doesn't work through the [phone-app](https://play.google.com/store/apps/details?id=com.athom.homey&hl=nl) (yet)
 
## Disclaimer
The huffpo app is not made by Huffington Post. The app is made without commercial intentions. 
This app is merely a shell for the available RSS feeds.

## Bugs / Feature requests
* Please submit bugs or feature requests at the [github page of the Huffpo Homey app](https://github.com/bvdbos/com.Sasteren.HuffPo-headlines) or at the app topic at the Athom forum

## Supported languages / Ondersteunende talen:
* English
App is only available in the English language because it's an app for an English website
Will be extended once we can choose output-language for speech-items

## Available Newsfeeds:
* World News
* Business
* Entertainment
* Sports
* Books
* Green

## Flow Triggers:
Huffington Post RSS News is available with the following categories and triggers:
Trigger: Checks every 5 minutes if there are new publications available
Action: Reads 'x' Newsitems from source 'y' and lets you choose between "Title" or "Title and description"

## Upcoming features :
* Speech-input for requests
* Selecting categories for each RSS to narrow down the selection
* Settings page
* Doesn't work through the [phone-app](https://play.google.com/store/apps/details?id=com.athom.homey&hl=nl) (yet)
* Tell more about item xxx

## Release notes:

### Version 0.9.3 - extended app-page

### Version 0.9 - rewritten version
* based on the [Tweakers-app](https://github.com/lubbertkramer/net.tweakers.homey)
* News as a trigger
* omitted speech-trigger for now
* changed from nl.sasteren to com.sasteren

### Version 0.2 - included upstream changes
* Based on the [NOS feed / App](https://github.com/kerkenit/nl.nos.newsheadlines)
* American Newsfeed
* include body text
* break at end of line if too long
* replace abbreviations