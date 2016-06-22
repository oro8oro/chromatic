// TODO: properties object for gui (step, min, max, )

function loadGui(obj, callback) {
  var gc = {}
  gc.remove = function() {
    loadGui.gui.domElement.parentElement.removeChild(loadGui.gui.domElement)
    loadGui.gui = null
  }

  if(loadGui.gui)
    gc.remove()
  if(!obj || !obj.props)
    return

  // Set dat.gui
  var customContainer = document.getElementById('my-gui-container');
  if(!customContainer)
    return

  var props = obj.props,
    folders = {}, colors = [],
    hiddenControls = []

  if(!loadGui.modal) {
    loadGui.modal = document.body.appendChild(document.createElement('div'))
    loadGui.modal.setAttribute('id', 'controllerModal')
    loadGui.modal.className = "cmodal"
    loadGui.modal.innerHTML = '<div class="controllerModalContent"><span class="controllerModalClose">x</span><textarea id="controllerModalText">Some text in the Modal..</textarea></div>'
  }

  var span = document.getElementsByClassName("controllerModalClose")[0],
    modalT = document.getElementById('controllerModalText')

  span.onclick = function() {
    loadGui.modal.style.display = "none";
  }

  if(props.hiddenControls && Array.isArray(props.hiddenControls))
    hiddenControls = JSON.parse(JSON.stringify(props.hiddenControls))

  hiddenControls.push('hiddenControls')

  function buildAttr(val, k, self) {
    if(typeof val == 'function' || hiddenControls.indexOf(k) != -1)
      return

    if(Array.isArray(val)) {
      // TODO: if Array -> options with add/remove
      //self['+ ' + k] = function() {
      //  var objvals = {}
      //  folders[k].__folders[k+'$0'].__controllers.forEach(function(c) {
      //    console.log(c)
      //    objvals[c.property] = c.getValue()
      //  })
      //  buildGuiAttr(objvals, k + '$' + folders[k].__folders.length,  folders[k])
      //}
      for(i in val) {
        buildAttr(val[i], k+'$'+i, self)
        //self['- ' + k+'$'+i] = function() {console.log('-')}
      }
    }
    else if(typeof val == 'object') {
      for(k2 in val) {
        self[k + '.' + k2] = val[k2]
      }
    }
    else {
      if(isColor(val)) {
        self[k] = getGuiColor(val)
        colors.push(k)
      }
      else
        self[k] = val
    }
  }

  function guiAttrObject() {
    var self = this

    for(k in props)
      buildAttr(props[k], k, self, loadGui.gui)

    this.json = function() {
      var jsonn = getGuiValues(loadGui.gui)
      //alert(JSON.stringify(jsonn))
      modalT.value = JSON.stringify(jsonn)
      loadGui.modal.style.display = "block";
    }
  }

  function buildGuiAttr(val, k, fold) {
    if(typeof val == 'function' || hiddenControls.indexOf(k) != -1)
      return

    if(Array.isArray(val)) {
      folders[k] = fold = fold.addFolder(k)
      //addToGui('+ ' + k, fold)
      for(i in val) {
        var foldd = folders[k+'$'+i] = fold.addFolder(k+'$'+i)
        buildGuiAttr(val[i], k+'$'+i, foldd)
        //addToGui('- ' + k+'$'+i, foldd)
      }
    }
    else if(typeof val == 'object') {
      for(k2 in val)
        addToGui(k + '.' + k2, fold)
    }
    else
      addToGui(k, fold)
  }

  function addToGui(key, fold) {
    var added
    if(colors.indexOf(key) != -1)
      added = fold.addColor(gao, key)
    else
      added = fold.add(gao, key)

    added.onChange(function(value) {
      var k, vals = []
      if(key.indexOf('$') != -1) {
        k = key.substring(0, key.indexOf('$'))
        var objs = getGuiValues(loadGui.gui.__folders[k])
        for(i in objs) {
          var no = i.substring(i.indexOf('$')+1, i.indexOf('.'))
          if(!vals[no])
            vals[no] = {}
          vals[no][i.substring(i.indexOf('.')+1)] = objs[i]
        }
        obj.setParam(k, vals) 
      }
      else {
        k = key
        vals = value
      }

      if(obj.setParam)
        obj.setParam(k, vals) 
      else if(callback) {  
        var res = {}
        res[k] = vals
        callback(res)
      }
    });
  }

  // We need to cache the dat.gui instance, so we can replace it for every component
  loadGui.gui = new dat.GUI({ autoPlace: false })
  customContainer.appendChild(loadGui.gui.domElement)
  var gao = new guiAttrObject()

  // Colors first - css issue
  for(k in props)
    if(isColor(props[k]))
      buildGuiAttr(props[k], k, loadGui.gui)

  for(k in props)
    if(!isColor(props[k]))
      buildGuiAttr(props[k], k, loadGui.gui)

  loadGui.gui.add(gao, 'json')

  gc.gui = loadGui.gui
  return gc
}

function getGuiValues(folder, obj) {
  if(!obj)
    obj = {}
  var c = folder.__controllers;
  for(i in c){
    if(c[i].property == 'json' || c[i].property.indexOf('+') != -1 || c[i].property.indexOf('-') != -1)
      break
    obj[c[i].property] = c[i].getValue()
  }
  if(folder.__folders) {
    for(j in folder.__folders)
      obj = getGuiValues(folder.__folders[j], obj)
  }
  return obj
}

function isColor(color) {
  return typeof color == 'string' && (color.indexOf('#') != -1 || color.indexOf('rgb') != -1)
}

function getGuiColor(color) {
  if(color.indexOf('#') != -1)
    return color
  return color.substring(color.indexOf('(')+1, color.indexOf(')'))
    .split(',')
    .map(function(c) {
      return parseFloat(c)
    })
}
