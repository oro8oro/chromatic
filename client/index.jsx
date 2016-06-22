/* globals ReactMeteorApp ReactDOM */
import ReactDOM from 'react-dom';
import React from 'react';

Meteor.startup(function() {
  const root = document.createElement('div');
  document.body.appendChild(root);
  $('head').append('<script type="text/javascript" src="/lib/datgui/dat.gui.min.js"></script>')
  $('head').append('<script type="application/javascript" src="/loadGui.js"></script>')
  $('head').append('<link rel="stylesheet" href="/loadGui.css"></link>')
  ReactDOM.render(<ReactMeteorApp />, root);
});
