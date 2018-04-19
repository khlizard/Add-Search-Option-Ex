window.onload = function(){
  var observer = new MutationObserver(function(mutations){
    if(!document.getElementById('qdr_m3')){
      addThreeMonth();
    }
    if(!document.getElementById('qdr_m6')){
      addSixMonth();
    }
    if(!document.getElementById('qdr_y3')){
      addThreeYear();
    }
    if(!document.getElementById('qdr_ey1')){
      addEarlierThanOneYear();
    }
    if(!document.getElementById('qdr_ey3')){
      addEarlierThanThreeYear();
    }
  });
  var options = { subtree: true, childList: true, characterData: true }
  observer.observe(document.body, options);
}

function addThreeMonth(){
    var m3 = createOptNode("qdr:m3", "qdr_m3", '3 か月以内');
    var ele_m6 = document.getElementById('qdr_m6');
    var ele_y  = document.getElementById('qdr_y'); 
    if (ele_m6) {
        ele_y.parentNode.insertBefore(m3, ele_m6);
    } else {
        ele_y.parentNode.insertBefore(m3, ele_y);
    }
}

function addSixMonth(){
    var ele = createOptNode("qdr:m6", "qdr_m6", '6 か月以内');
    document.getElementById('qdr_y').parentNode.insertBefore(
        ele, document.getElementById('qdr_y'));
}

function addThreeYear(){
    var ele = createOptNode("qdr:y3", "qdr_y3", '3 年以内');
    document.getElementById('cdr_opt').parentNode.insertBefore(
        ele, document.getElementById('cdr_opt'));
}

function addEarlierThanOneYear() {
    var cdmax = beforeYearStr(1);
    var ele = createOptNode("cdr:1,cd_min:,cd_max:" + cdmax, "qdr_ey1", "1 年以上前");
    if (ele == null) return false;
    ele.style.borderTop = "1px solid #EBEBEB";
    document.getElementById('cdr_opt').parentNode.insertBefore(
        ele, document.getElementById('cdr_opt'));
}

function addEarlierThanThreeYear() {
    var cdmax = beforeYearStr(3);
    var ele = createOptNode("cdr:1,cd_min:,cd_max:" + cdmax, "qdr_ey3", "3 年以上前");
    if (ele == null) return false;
    document.getElementById('cdr_opt').parentNode.insertBefore(
        ele, document.getElementById('cdr_opt'));
}

function createOptNode(query, domid, content) {
  if(document.getElementById('qdr_m') && document.getElementById('qdr_m').childNodes[0].nodeType !== 3) {
    var ele = document.getElementById('qdr_m').cloneNode(true);
    var mHref = ele.childNodes[0].getAttribute('href');
    var eleHref = mHref.replace(/qdr:m/, query);
  } else if(document.getElementById('qdr_y')) {
    var ele = document.getElementById('qdr_y').cloneNode(true);
    var mHref = ele.childNodes[0].getAttribute('href');
    var eleHref = mHref.replace(/qdr:y/, query);
  }else{
    return null;
  }
  ele.childNodes[0].setAttribute('href', eleHref);
  ele.setAttribute('id', domid);
  ele.childNodes[0].textContent = content;
  return ele;
}

function beforeYearStr(yearDiff) {
    var d = new Date();
    d.setFullYear(d.getFullYear() - parseInt(yearDiff));
    return "" + (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
}
