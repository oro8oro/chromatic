/* global StyleguideSpec:true */
/* global React */
import React from 'react';
const {Chromatic} = Package['mdg:chromatic-api'] || {};
const {StubCollections} = Package['stub-collections'] || {};

StyleguideSpec = React.createClass({
  propTypes: {
    entry: React.PropTypes.instanceOf(Chromatic.Entry),
    component: React.PropTypes.instanceOf(React.Component.constructor),
    specName: React.PropTypes.string.isRequired
  },
  componentWillReceiveProps() {
    this.teardownSpec();
  },
  componentWillUnmount() {
    this.teardownSpec();
  },
  teardownSpec() {
    const spec = this.spec();
    if (spec && spec.teardown) {
      spec.teardown();
    }
    if (StubCollections) StubCollections.restore();
  },
  entry() {
    const {entry, component, specName} = this.props;
    return entry || Chromatic.entry(component && component.displayName || specName);
  },
  spec() {
    const {specName} = this.props;
    const entry = this.entry();
    let spec = entry && _.find(entry.specs, s => s.name === specName);
    if (!spec && entry && entry.specs.length > 0) {
      spec = entry().specs[0];
    }
    return spec;
  },
  componentDidMount() {
    if(this.props.showControls)
      this.loadGui()
  },
  componentWillReceiveProps() {
    if(this.props.showControls)
      this.loadGui()
  },
  componentWillUnmount() {
    if(this.guiController)
      this.guiController.remove()
  },
  loadGui() {
    const entry = this.entry();
    let self = this
    this.newProps = {}
    this.guiController = window.parent.loadGui(this.refComponent, function (obj) {
      self.newProps = obj
      self.forceUpdate()
    })
  },
  render() {
    const entry = this.entry();
    const spec = this.spec();
    let props = {};
    if (StubCollections) StubCollections.stub();

    if (spec) {
      if (spec.setup) {
        spec.setup();
      }
      props = _.isFunction(spec.props) ? spec.props() : spec.props;
    }

    if(this.newProps)
      for(i in this.newProps)
        props[i] = this.newProps[i]

    if (entry) {
      return (
        <entry.component {...props} ref={(ref) => this.refComponent = ref}/>
      );
    }
    return null;
  }
});
