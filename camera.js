// New Camera class. One instance will be created. Will contain MainDrawFrame (which will in turn be
// commented out), adding a "viewer" field (which is, for this game, always "PC"). Camera instance will
// store the current bounds of the camera's view, simplifying later places that need to check if something
// is on screen.
// Possibly could simplify animations by storing the list of what is currently on screen animating here,
// but for the time being not going to touch something that is working.

class Camera {
  constructor() {
    this.leftedge;
    this.rightedge;
    this.topedge;
    this.bottomedge;
    this.viewer;
  }

  Draw(themap, centerx, centery, viewer) {
    if (PC.getWaiting()) { return; }  // Don't draw the screen if PC is using (W)ait- should avoid a draw during the fade in/out.
    let tp = 0; // telepathy
    let ev = 0; // ethereal vision

    if (!viewer) { this.viewer = PC; }
    else {this.viewer = viewer; }

    displayspecs = getDisplayCenter(themap,centerx,centery);
    this.leftedge = displayspecs.leftedge;
    this.rightedge = displayspecs.rightedge;
    this.topedge = displayspecs.topedge;
    this.bottomedge = displayspecs.bottomedge;
    
    if (themap.getBackground()) {
      let opacity = themap.getOpacity();
      document.getElementById('worldlayer').innerHTML = "<div id='cloudlayer' style='background-image:url(\"graphics/" + themap.getBackground() + "\");opacity:" + opacity + ";position:relative;z-index:10;background-position: " + wind.xoff + "px " + wind.yoff + "px;'><img src='graphics/spacer.gif' width='416' height='416' /></div>";
    } else {
      document.getElementById('worldlayer').innerHTML = "<img src='graphics/spacer.gif' width='416' height='416' />";
    }
    if (themap.worldlayer) {
      document.getElementById('worldlayer').style.backgroundImage = "url('graphics/" + themap.worldlayer + "')";
    } else {
      document.getElementById('worldlayer').style.backgroundImage = "";
    }

    if (this.viewer.getSpellEffectsByName("Telepathy")) { tp = 1; }
    if (this.viewer.getSpellEffectsByName("EtherealVision")) { ev = 1; }
    for (let i=this.topedge;i<=this.bottomedge;i++) {
      for (let j=this.leftedge;j<=this.rightedge;j++) {
        this.PaintTile(themap,centerx,centery,j,i,tp,ev,displayspecs);
      }  
    }
    for (let idx in spellcount) {
      let val=spellcount[idx];
      if ((val.getx() >= this.leftedge) && (val.getx() <= this.rightedge) && (val.gety() >= this.topedge) && (val.gety() <= this.bottomedge)) {
        let where = GetCoords(val.getHomeMap(),val.getx(), val.gety());
        let sparkles = document.getElementById(idx);
        if (sparkles) {
          sparkles.style.left = where.x;
          sparkles.style.top = where.y;
        }
      }
    }

  }

  DrawOne(themap, centerx, centery) {
    if (PC.getWaiting()) { return; }  // Don't draw the screen if PC is using (W)ait- should avoid a draw during the fade in/out.
    let tp = 0; // telepathy
    let ev = 0; // ethereal vision

    if (this.viewer.getSpellEffectsByName("Telepathy")) { tp = 1; }
    if (this.viewer.getSpellEffectsByName("EtherealVision")) { ev = 1; }

    if ((themap === this.viewer.getHomeMap()) && (centerx <= this.rightedge) && (centerx >= this.leftedge) && (centery >= this.topedge) && (centery <= this.bottomedge)) {
      this.PaintTile(themap,this.viewer.getx(),this.viewer.gety(),centerx,centery,tp,ev);
    }
    for (let idx in spellcount) {
      let val=spellcount[idx];
      if ((val.getx() >= this.leftedge) && (val.getx() <= this.rightedge) && (val.gety() >= this.topedge) && (val.gety() <= this.bottomedge)) {
        let where = GetCoords(val.getHomeMap(),val.getx(), val.gety());
        let sparkles = document.getElementById(idx);
        if (sparkles) {
          sparkles.style.left = where.x;
          sparkles.style.top = where.y;
        }
      }
    }

  }

  PaintTile(themap, centerx, centery, j, i, tp, ev) {
    let thiscell, isseen;
    [thiscell, isseen] = GetDisplayStack(themap,centerx,centery,j,i,tp,ev);
    let yidx = i-this.topedge;
    let xidx = j-this.leftedge;
    let mview = document.getElementById('mainview_'+xidx+'x'+yidx);
    mview.innerHTML = "";

    for (let k=0;k<thiscell.length;k++) {
      let opac = 1;
      if ((thiscell[k].lighthere >= SHADOW_THRESHOLD) && (thiscell[k].lighthere < 1) && !ev && !(tp && thiscell[k].isnpc)) {
        opac = 0.3;
      } else if ((thiscell[k].lighthere < SHADOW_THRESHOLD) && !ev && !(tp && thiscell[k].isnpc)) {
        opac = 0;
      }
      let id="";
      //if (k===0) { id = `id="tilediv_${j}x${i}"`; }
      id = `id="${thiscell[k].divid}"`; 
      let newdiv = `<div ${id} style="position:absolute; top:0px; left:0px; background-image: url('graphics/${thiscell[k].showGraphic}'); background-repeat:no-repeat; background-position: ${thiscell[k].graphics2}px ${thiscell[k].graphics3}px">
      <img id='tile${j}x${i}' src='graphics/${thiscell[k].graphics1}' border='0' alt='tile${j}x${i} los: ${thiscell[k].losresult} light:${thiscell[k].lighthere}' width='32' height='32' title='${thiscell[k].desc}'/></div>`;
      mview.innerHTML += newdiv;
      if ((opac > 0) && (opac < 1)) {
        mview.innerHTML += "<div style='background-image: url(\"graphics/shadow.gif\"); position:absolute;left:0px;top:0px;width:32px;height:32px' ></div>";
      } else if (opac === 0) {
        mview.innerHTML += "<div style='background-image: url(\"graphics/static.gif\"); background-position:0px -3104px; position:absolute;left:0px;top:0px;width:32px;height:32px' ></div>";
      }  
    }
    if (mapmagic.active && (ev || (thiscell[0].lighthere >= SHADOW_THRESHOLD) && (thiscell[0].losresult < LOS_THRESHOLD))) {
      let tile = themap.getTile(j,i);
      let fea = tile.getTopVisibleFeature();
      if (fea && (fea.getPeerview() !== PEER_COLORS[0])) {
        mapmagic[themap.getName()][i][j] = fea.getPeerview();
      } else {
        let terr = tile.getTerrain();
        let peer = terr.getPeerview();
        if (peer) { mapmagic[themap.getName()][i][j] = peer; }
        else {
          mapmagic[themap.getName()][i][j] = 0;
        }
      }
    }
  }

  IsOnCamera(x,y) {
    let themap = this.viewer.getHomeMap();
    if ((this.leftedge > x) || (this.rightedge < x)) { return 0; }
    if ((this.topedge > y) || (this.bottomedge < y)) { return 0; }
    let targettile = themap.getTile(x, y);
    x = x-this.leftedge;
    y = y-this.topedge;
    let onscreen = document.getElementById('mainview_' + x + 'x' + y).innerHTML;
    let losval = 0;
    if (onscreen.indexOf("You cannot see that") !== -1) { losval = 1; }
    else {
      let light = targettile.getLocalLight();
      light += themap.getAmbientLight();
      if (light < SHADOW_THRESHOLD) {
        losval = 1;
      }
    }
    if (losval >= LOS_THRESHOLD) {
      return 0;
    }
    
    return 1;
  }

}