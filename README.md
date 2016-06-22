# Chromatic - Tool for Exploring & Initializing React Components

! be sure to `meteor npm install` first. 

Take a look at http://meteor-fan.github.io/meteor-docs-ja/guide-1.3-migration-1.3.html#react


## About

Demo: https://www.youtube.com/watch?v=DVFj2A6789Y

Original (Meteor Team): https://github.com/meteor/chromatic
Original demo (Meteor Team): https://www.youtube.com/watch?v=dlMe7u02m50

+ Works with Meteor 1.3

+ Dynamic exploration, design and testing - interface for changing React props

+ Just copy-paste the new JSON settings into your React component

+ Supports HTML and SVG

+ In work: having your stylesheet classes at your GUI fingertips


## Additional features

1. Meteor 1.3 support (not complete; only base packages are included)
2. `addParam({key:value})`:
   - add this to your React component if you want to handle the props changes yourself
   - this is called by dat.GUI after a change, if it exists - if not, it will re-render the React component
2. we support `'#cccccc'` and `'rgb(23,200,450)'` colors in the props:
3. SVG suport:
   - SVG React component:
  
  `Chromatic.add(ButtonController, {type: 'svg', specs: specs})`

   - SVG component, lightly wrapped in React (if your SVG has to be rendered inside a "parent" DOM element - usually an `<svg>` element: 
  
  `Chromatic.add(ButtonController, {type: 'svg', domid: 'drawing', specs: specs})`


Example SVG package : `loredanacirstea:svgtest` (included), with init code in https://github.com/oro8oro/chromatic/blob/master/client/index.js

---------------------

Explore, visualize, and prototype your UI components.
``` bash
meteor add mdg:chromatic
```

## Importing Chromatic
Versions 0.0.x of these packages are compatible with Meteor 1.2
```
const { Chromatic } = Package['mdg:chromatic-api'] || {};
```
Versions 0.1.x are compatible with Meteor 1.3
```
import { Chromatic } from 'meteor/mdg:chromatic';
```

## Installing Component Explorer
Configure the URL:
```js
import { ChromaticExplorer } from 'meteor/mdg:chromatic';

if (ChromaticExplorer) {
  ChromaticExplorer.configure({ basePath: '/styleguide' });
}
```

## Write Component Specs
``` js
import { Chromatic } from 'meteor/mdg:chromatic';

ComponentName = React.createClass({
  // code
});

if (Chromatic) {
  Chromatic.add(ComponentName, {
    specs: [
      new Chromatic.Spec('specName1', {props:
        {
          // props used by your component
        }
      }),
      new Chromatic.Spec('specName2', {props:
        {
          // props used by your component
        }
      })
    ]
  });
}
```

## Component packages
```
mdg:animations
mdg:buttons
mdg:callout
mdg:code-block
mdg:color-grid
mdg:date-components
mdg:form-components
mdg:list
mdg:loading-spinner
mdg:overlays
mdg:sortable
mdg:tooltips
mdg:outlines
```

## Circular references
When extending Chromatic itself you may need to import the API directly to avoid circular references:
```
import { Chromatic } from 'meteor/mdg:chromatic-api';
```
