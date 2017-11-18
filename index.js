var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  log: 'trace',
  hosts: [
    'http://elastic:changeme@localhost:9200'
  ]
});

client.ping({
  requestTimeout: 30000,
}, function(error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});



var jsonfile = require('jsonfile');
var file = 'goodZips.json';

jsonfile.readFile(file, function(err, objects) {

  var data = objects.map(function(object) {
    return {
      index: {
        _index: 'zips',
        _type: 'zipCode',
        data: object
      }
    }
  });


  client.bulk(data, function(err, response) {
    if (err) {
      util.puts("Failed Bulk operation".red, err)
    } else {
      console.log("Successfull Twitter update: %s tweets".green, data.length);
    }
  });


});