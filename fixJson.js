var jsonfile = require('jsonfile');
var file = 'Zipcode.json';
jsonfile.readFile(file, function(err, objArray) {

  var newObjArrayy = [];

  objArray.forEach(function(obj) {

    coordinates = [];

    cs = obj.the_geom.replace('MULTIPOLYGON (((', '').replace(')))', '').split(',');

    let newObj = {
      zipCode: obj.ZIPCODE,
      area: obj.Shape_area,
      len: obj.Shape_len,
      borders : {
        type: "linestring"
      }
      
    };

    newObj.borders.coordinates = [];

    for (i in cs) {
      let coord = cs[i];



      longLatTuple = coord.trim().split(' ');

      if (longLatTuple.length > 2 || !parseFloat(longLatTuple[0]) || !parseFloat(longLatTuple[1])) {
        console.log(coord);
        console.log(longLatTuple);
        console.log(obj.ZIPCODE);
        break;
      }

      longLatTuple[0] = parseFloat(longLatTuple[0]);
      longLatTuple[1] = parseFloat(longLatTuple[1]);


      newObj.borders.coordinates.push(longLatTuple);

    }



    newObjArrayy.push(newObj);


  });



  jsonfile.writeFile('goodZips.json', newObjArrayy, function(err) {

    if (err)
      console.error(err)

  })



});