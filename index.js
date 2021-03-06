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

            request.get({ url: 'http://vps341573.ovh.net:5050/getConnectedDevice', json: true }).then(function(nameSpeakerconnected) {
                return request.get({ url: 'http://vps341573.ovh.net:5050', json: true }).then(function(result) {
                    if (result) {
                        var speakerListString = ''
                        for (i = 0; i < result.list.length; i++) {

                            if (i == 0) {

                                speakerListString = result.list[i]
                            }
                            if (i > 0) {
                                if (i == result.list.length - 1) {
                                    speakerListString = speakerListString + ' and ' + result.list[i]
                                } else {
                                    speakerListString = speakerListString + ',' + result.list[i]
                                }

                            }
                        }
                        if (result.list.length == 0) {
                            return res.json({
                                speech: 'No allPlay device have been discovered',
                                source: 'webhook-echo-one',

                            });

                        }
                        if (result.list.length == 1) {
                            if (nameSpeakerconnected) {
                                return res.json({
                                    speech: 'You have  ' + result.list.length + ' allplay device available, ' + nameSpeakerconnected + '.and it is already selected! ',
                                    source: 'webhook-echo-one',

                                });
                            } else {

                                return res.json({
                                    speech: 'You have  ' + result.list.length + ' allplay device available, ' + speakerListString + '.Do you want to select it ',
                                    source: 'webhook-echo-one',

                                });

                            }


                        } else {
                            return res.json({
                                speech: 'You have  ' + result.list.length + ' allplay device available, ' + speakerListString + '. Please choose one! ',
                                source: 'webhook-echo-one',

                            });

                        }





                    } else {

                        return res.json({
                            speech: 'No allplay device have been selected!',
                            source: 'webhook-echo-one',

                        });

                    }



                })

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
        case 'which':

            return request.get({ url: 'http://vps341573.ovh.net:5050/getConnectedDevice', form: { key: '' } }).then(
                function(body) {
                    console.log(body)

                    if (body == 'false') {

                        return res.json({
                            speech: 'No allplay device have been selected!',
                            source: 'webhook-echo-one',

                        });

                    } else {
                        return res.json({
                            speech: 'The device ' + body + ' is selected',
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

            return request.post({ url: 'http://vps341573.ovh.net:5050/', form: { key: req.body.result.parameters.any } }).then(
                function(body) {
                    console.log(body)

                    if (body == "found") {

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
        case 'increaseVolumeBy':

            return request.post({ url: 'http://vps341573.ovh.net:5050/increasevolume', form: { nb: req.body.result.parameters.number } }).then(
                function(body) {
                    console.log(body)

                    var obj = JSON.parse(body);
                    if (obj.status == "ok") {

                        return res.json({
                            speech: 'ok',
                            source: 'webhook-echo-one',

                        });

                    } else {
                        return res.json({
                            speech: 'I have no allplay device selected.   ',
                            source: 'webhook-echo-one',

                        });
                    }
                })
            break;
        case 'decreaseVolumeBy':

            return request.post({ url: 'http://vps341573.ovh.net:5050/decreasevolume', form: { nb: req.body.result.parameters.number } }).then(
                function(body) {
                    console.log(body)
                    var obj = JSON.parse(body);
                    if (obj.status == "ok") {

                        return res.json({
                            speech: 'ok',
                            source: 'webhook-echo-one',

                        });

                    } else {
                        return res.json({
                            speech: 'I have no allplay device selected.   ',
                            source: 'webhook-echo-one',

                        });
                    }
                })
            break;
        case 'anyone':

            return request.post({ url: 'http://vps341573.ovh.net:5050/linktoanyone', form: { key: 'anyone' } }).then(
                function(body) {


                    if (body == 'error') {

                        return res.json({
                            speech: 'No allplay device have been selected!',
                            source: 'webhook-echo-one',

                        });

                    } else {
                        return res.json({
                            speech: ' device ' + body + ' is selected',
                            source: 'webhook-echo-one',

                        });
                    }
                })
            break;
        case 'pause':
            return request.post({ url: 'http://vps341573.ovh.net:5050/pause', form: { key: '' } }).then(
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
        case 'yes':

            console.log('*****', req.body.result.contexts[0])
            console.log('+++', req.body.result.contexts[1])
            if (req.body.result.contexts[0].name == "search" || req.body.result.contexts[1].name == "search") {
                request.get({ url: 'http://vps341573.ovh.net:5050/getConnectedDevice', json: true }).then(function(nameSpeakerconnected) {
                    return request.get({ url: 'http://vps341573.ovh.net:5050', json: true }).then(function(result) {
                        if (result) {
                            var speakerListString = ''
                            for (i = 0; i < result.list.length; i++) {

                                if (i == 0) {

                                    speakerListString = result.list[i]
                                }
                                if (i > 0) {
                                    if (i == result.list.length - 1) {
                                        speakerListString = speakerListString + ' and ' + result.list[i]
                                    } else {
                                        speakerListString = speakerListString + ',' + result.list[i]
                                    }

                                }
                            }
                            if (result.list.length = 0) {
                                return res.json({
                                    speech: 'No allPlay device have been discovered',
                                    source: 'webhook-echo-one',

                                });

                            }
                            if (result.list.length = 1) {
                                if (nameSpeakerconnected) {
                                    return res.json({
                                        speech: 'You have  ' + result.list.length + ' allplay device available, ' + nameSpeakerconnected + '.and it is already selected! ',
                                        source: 'webhook-echo-one',

                                    });
                                } else {

                                    return res.json({
                                        speech: 'You have  ' + result.list.length + ' allplay device available, ' + nameSpeakerconnected + '.Do you want to select it ',
                                        source: 'webhook-echo-one',
                                        contextOut: [{ name: 'link' }]

                                    });

                                }


                            } else {
                                return res.json({
                                    speech: 'You have  ' + result.list.length + ' allplay device available, ' + speakerListString + '. Please choose one! ',
                                    source: 'webhook-echo-one',

                                });

                            }





                        } else {

                            return res.json({
                                speech: 'No allplay device have been selected!',
                                source: 'webhook-echo-one',

                            });

                        }



                    })

                })
            }
            if (req.body.result.contexts[0].name == "link" || req.body.result.contexts[1].name == "link") {

                return request.post({ url: 'http://vps341573.ovh.net:5050/', form: { key: req.body.result.parameters.any } }).then(
                    function(body) {
                        console.log(body)

                        if (body == "found") {

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

            } else {

                request.get({ url: 'http://vps341573.ovh.net:5050/getConnectedDevice', json: true }).then(function(nameSpeakerconnected) {
                    return request.get({ url: 'http://vps341573.ovh.net:5050', json: true }).then(function(result) {
                        if (result) {
                            var speakerListString = ''
                            for (i = 0; i < result.list.length; i++) {

                                if (i == 0) {

                                    speakerListString = result.list[i]
                                }
                                if (i > 0) {
                                    if (i == result.list.length - 1) {
                                        speakerListString = speakerListString + ' and ' + result.list[i]
                                    } else {
                                        speakerListString = speakerListString + ',' + result.list[i]
                                    }

                                }
                            }
                            if (result.list.length == 0) {
                                return res.json({
                                    speech: 'No allPlay device have been discovered',
                                    source: 'webhook-echo-one',

                                });

                            }
                            if (result.list.length == 1) {
                                if (nameSpeakerconnected) {
                                    return res.json({
                                        speech: 'You have  ' + result.list.length + ' allplay device available, ' + nameSpeakerconnected + '.and it is already selected! ',
                                        source: 'webhook-echo-one',

                                    });
                                } else {

                                    return res.json({
                                        speech: 'You have  ' + result.list.length + ' allplay device available, ' + speakerListString + '.Do you want to select it ',
                                        source: 'webhook-echo-one',
                                        contextOut: [{ name: 'link' }]

                                    });

                                }


                            } else {
                                return res.json({
                                    speech: 'You have  ' + result.list.length + ' allplay device available, ' + speakerListString + '. Please choose one! ',
                                    source: 'webhook-echo-one',

                                });

                            }





                        } else {

                            return res.json({
                                speech: 'No allplay device have been selected!',
                                source: 'webhook-echo-one',

                            });

                        }



                    })

                })


            }

            break;

        case 'no':
            return res.json({
                speech: ' Ok! ',
                source: 'webhook-echo-one',

            });
            break;

    }
})

restService.listen((process.env.PORT || 9090), function() {
    console.log("Server up and listening");
});