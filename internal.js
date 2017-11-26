
// serveur:   $('#192-168-1-21').css('fill', 'red')
// livebox:   $('#192-168-1-1 > g > rect, #192-168-1-1 > g > path').css('fill', 'green')
// Raspberry: $('#192-168-1-46 > path').css('fill', 'green')
// Postes:    $('#192-168-1-27 > path').css('stroke', 'red')
fetch('internalnet.svg').then((resp) => {
 // console.log(resp.text())
  resp.text().then((text) => {
    document.querySelector('#svg').innerHTML = text

var svgPaths = {
  '192.168.1.1': {
    path: '#192-168-1-1 > g > rect, #192-168-1-1 > g > path',
    cssProp: 'fill'
  },
  '192.168.1.10': {
    path: '#192-168-1-10 > g > path',
    cssProp: 'fill'
  },
  '192.168.1.21': {
    path: '#192-168-1-21',
    cssProp: 'fill'
  },
  '192.168.1.43': {
    path: '#192-168-1-43 path',
    cssProp: 'fill'
  },
  '192.168.1.44': {
    path: '#192-168-1-44 path',
    cssProp: 'fill'
  },
  '192.168.1.45': {
    path: '#192-168-1-45 path',
    cssProp: 'fill'
  },
  '192.168.1.46': {
    path: '#192-168-1-46 path',
    cssProp: 'fill'
  },
  '192.168.1.47': {
    path: '#192-168-1-47 > path',
    cssProp: 'fill'
  },
   '192.168.1.26': {
    path: '#192-168-1-26 > path',
    cssProp: 'stroke'
  },
    '192.168.1.27': {
    path: '#192-168-1-27 > path',
    cssProp: 'stroke'
  },
    '192.168.1.28': {
    path: '#192-168-1-28 > path',
    cssProp: 'fill'
  },
    '192.168.1.30': {
    path: '#192-168-1-30 > path',
    cssProp: 'fill'
  },
    '192.168.1.31': {
    path: '#192-168-1-31 > path',
    cssProp: 'stroke'
  },
    '192.168.1.64': {
    path: '#192-168-1-64 > path',
    cssProp: 'stroke'
  }
};

  $.each(svgPaths, function(key, value) {
    $(value.path).css(value.cssProp, 'red');
  });

  $.ajax({
    url: '/internalnet.xml',
    cache: false,
    dataType: 'xml',
    success: function(xml) {
      $(xml).find('host').each(function() {
        var ipAddr = $(this).find("address[addrtype='ipv4']");
        ipAddr = ipAddr[0].attributes["addr"];
        var svgProps = svgPaths[ipAddr.value];
        if (! svgProps) {
          return; 
        }
        $(svgProps.path).css(svgProps.cssProp, 'green');
      });
      var finishedSummary = $(xml).find("finished")[0].attributes['summary'].value;
      finishedSummary = finishedSummary.split(';')[1].trim() + "<ul>";
      $(xml).find('host').each(function() {
        var ipAddr = $(this).find("address[addrtype='ipv4']");
	if (ipAddr && ipAddr[0].attributes)
            finishedSummary += "<li>" + ipAddr[0].attributes['addr'].value + "</li>";
      });
      finishedSummary += "</ul>";
      $('#additionalInfos').append(finishedSummary);
    }
  });

})
})
