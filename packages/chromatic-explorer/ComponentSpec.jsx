/* global ComponentSpec:true */
/* global React StyleguideSpec ReactMeteorData FlowRouter classnames */
import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
const { Chromatic } = Package['mdg:chromatic-api'] || {};

ComponentSpec = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData() {
    return {
      entryName: FlowRouter.getParam('entryName'),
      specName: FlowRouter.getParam('specName')
    };
  },
  componentWillMount() {
    $('body').addClass('styleguide-white');
    const entry = Chromatic.entry(this.data.entryName);
    if(entry.type == 'svg' && entry.domid)
      $('body').append('<svg id="' + entry.domid + '" width="1000px" height="1000px"></svg>')
  },
  render() {
    const {entryName, specName} = this.data;
    const entry = Chromatic.entry(entryName);

    if (specName === 'all') {
      let instances = [];
      instances = entry.specs.map(s => {
        if(entry.type == 'svg')
          return (
            <g key={s.name}><StyleguideSpec entry={entry} specName={s.name}/></g>
          );
        return (
          <div key={s.name}>
            <StyleguideSpec entry={entry} specName={s.name}/>
          </div>
        );
      });
      if(entry.type == 'svg' && entry.domid)
        return (
          <g>{instances}</g>
        );
      if(entry.type == 'svg')
        return (
          <svg width="1000px" height="1000px">{instances}</svg>
        );
      return (
        <div className="styleguide spec-container">{instances}</div>
      );
    }

    if(entry.type == 'svg' && entry.domid)
      return (
          <StyleguideSpec entry={entry} specName={specName} showControls="true"/>
      );
    if(entry.type == 'svg')
      return (
        <svg width="1000px" height="1000px">
          <StyleguideSpec entry={entry} specName={specName} showControls="true"/>
        </svg>
      );
    return (
      <div className="styleguide spec-container">
        <StyleguideSpec entry={entry} specName={specName} showControls="true"/>
      </div>
    );
  }
});
