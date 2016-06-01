# cssdiff [![Build Status](https://travis-ci.org/jrfaller/cssdiff.svg?branch=master)](https://travis-ci.org/jrfaller/cssdiff)

A css diff utility.

## Installation

You need `casperjs` installed on your system.

## Usage

To use cssdiff you first have to write a navigation plan which will define which pages of your website will be analyzed. For instance, here is a simple navigation plan for my personal website:

```javascript
[
	{"start": "http://www.labri.fr/perso/falleri/perso/"},
	{"snapshot": "home"},
	{"open": "http://www.labri.fr/perso/falleri/perso/research"},
	{"snapshot": "research"}
]
```
A navigation plan begins by a `start` url, and can `open` other urls as well. A `snapshot` item indicates that css properties at this point of the navigation plan will be extracted under the given (unique) name.

When your navigation plan is ready you can run the script to extract css properties.

```
casperjs cssdump.js plan.json > v0.json
```

If you make some modifications to the css properties of the website, you can extract again the css properties.

```
casperjs cssdump.js plan.json > v1.json
```

Finally, use `cssdiff` to compute the differences between css properties across the two versions.

```
node cssdiff.js v0.json v1.json > diff.json
```

It will compute a patch in the JSON format to indicate what changed. Example:

```javascript
{
	"home": {
		"html body h2": [
			{
				"action": "changed",
				"property": "font-weight",
				"value": "bold"
			}
		]
	}
}
```
