import React from 'react';
//createdButtons = Package['loredanacirstea:oroboro-controller'].createdButtons

ComponentDatGui = React.createClass({
  componentWillMount() {
    $('head').append('<script type="text/javascript" src="/lib/datgui/dat.gui.min.js"></script>')
  },
  componentDidMount() {
    var cont = document.getElementById("iframeId").contentWindow
    console.log(cont)
    console.log('globalVarA:')
    console.log(cont.globalVarA)
    //console.log(createdButtons)
    //this.gui = new dat.GUI();
    this.gui = new dat.GUI({ autoPlace: false });
    var customContainer = document.getElementById('my-gui-container');
    customContainer.appendChild(this.gui.domElement);

    this.buildGui()
  },
  buildGui() {
    let FizzyText = function() {
      this.message = 'dat.gui';
      this.speed = 0.8;
      this.displayOutline = false;
    };
    let text = new FizzyText();
    console.log(this.gui)
    this.gui.add(text, 'message');
    this.gui.add(text, 'speed', -5, 5);
    this.gui.add(text, 'displayOutline');
  },
  componentWillUnmount() {
    console.log('componentWillUnmount')
    console.log(this.gui)
    this.gui.domElement.parentElement.removeChild(this.gui.domElement);
  },
  render() {
    //const {entryName, specName} = this.data;
    //const entry = Chromatic.entry(entryName);
    
    
    return (
      <g></g>
    );
  }
});
