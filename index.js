var express = require('express');
var bodyParser = require('body-parser');
var request = require('request-promise');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/webhook', function(req, res) {
    console.log('=============' + req.body.result.action)
    switch (req.body.result.action) {
        case "FetchProducts":

            return request.get({ url: 'http://vps341573.ovh.net:5050', json: true }).then(function(result) {
                if (result) {

                    return res.json({
                        speech: 'You have  ' + result.list.length + ' allplay device available, ' + result.list + '. Do you want to select it! ',
                        source: 'webhook-echo-one',

                    });




                } else {

                    return res.json({
                        speech: 'No allplay device have been selected!',
                        source: 'webhook-echo-one',

                    });

                }



            })


            break;
        case 'play':

            return request.post({ url: 'http://vps341573.ovh.net:5050/playtrack', form: { key: '' } }).then(
                function(body) {
                    console.log(body)
                    var obj = JSON.parse(body);
                    if (obj.status == "no") {

                        return res.json({
                            speech: 'I have no allplay device selected. would you like to launch discovery ? ',
                            source: 'webhook-echo-one',

                        });

                    } else {
                        return res.json({
                            speech: 'OK ',
                            source: 'webhook-echo-one',

                        });
                    }
                })
            break;
        case 'playNext':

            return request.post({ url: 'http://vps341573.ovh.net:5050/playnext', form: { key: '' } }).then(
                function(body) {
                    console.log(body)
                    var obj = JSON.parse(body);
                    if (obj.status == "no") {

                        return res.json({
                            speech: 'I have no allplay device selected. would you like to launch discovery ? ',
                            source: 'webhook-echo-one',

                        });

                    } else {
                        return res.json({
                            speech: 'OK ',
                            source: 'webhook-echo-one',

                        });
                    }
                })
            break;
        case 'playPrevious':

            return request.post({ url: 'http://vps341573.ovh.net:5050/playprevious', form: { key: '' } }).then(
                function(body) {
                    console.log(body)
                    var obj = JSON.parse(body);
                    if (obj.status == "no") {

                        return res.json({
                            speech: 'I have no allplay device selected. would you like to launch discovery ? ',
                            source: 'webhook-echo-one',

                        });

                    } else {
                        return res.json({
                            speech: 'OK ',
                            source: 'webhook-echo-one',

                        });
                    }
                })
            break;
        case 'increaseVolume':
            return request.post({ url: 'http://vps341573.ovh.net:5050/incrvolume', form: { key: '' } }).then(
                function(body) {
                    console.log(body)
                    var obj = JSON.parse(body);
                    if (obj.status == "no") {

                        return res.json({
                            speech: 'I have no allplay device selected. would you like to launch discovery ? ',
                            source: 'webhook-echo-one',

                        });

                    } else {
                        return res.json({
                            speech: 'OK ',
                            source: 'webhook-echo-one',

                        });
                    }
                })
            break;
        case 'reduceVolume':

            return request.post({ url: 'http://vps341573.ovh.net:5050/decrevolume', form: { key: '' } }).then(
                function(body) {
                    console.log(body)
                    var obj = JSON.parse(body);
                    if (obj.status == "no") {

                        return res.json({
                            speech: 'I have no allplay device selected. would you like to launch discovery ? ',
                            source: 'webhook-echo-one',

                        });

                    } else {
                        return res.json({
                            speech: 'OK ',
                            source: 'webhook-echo-one',

                        });
                    }
                })
            break;




        case 'link':

            return request.post({ url: 'http://vps341573.ovh.net:5050', form: { key: req.body.result.parameters.any } }).then(
                function(body) {
                    console.log(body)
                    var obj = JSON.parse(body);
                    if (obj == "found") {

                        return res.json({
                            speech: req.body.result.parameters.any + ' has been selected',
                            source: 'webhook-echo-one',

                        });

                    } else {
                        return res.json({
                            speech: 'I was unable to select ' + req.body.result.parameters.any + ' . Please try again later',
                            source: 'webhook-echo-one',

                        });
                    }
                })
            break;
    }
})

restService.listen((process.env.PORT || 9090), function() {
    console.log("Server up and listening");
});