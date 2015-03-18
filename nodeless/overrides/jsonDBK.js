
dbkjs.protocol.jsonDBK.process =  function(feature, onSuccess) {
    $('#infopanel_f').html('');
    if (feature && feature.attributes && feature.attributes.typeFeature) {
        if(feature.data && feature.data.hasOwnProperty('formeleNaam') && feature.data.hasOwnProperty('informeleNaam')) {
            $('.dbk-title')
                .text(feature.data.formeleNaam + ' ' + feature.data.informeleNaam)
                .css('visibility', 'visible')
                .on('click', function() {
                    dbkjs.modules.feature.zoomToFeature(feature);
                });
        }
        if (!dbkjs.options.feature || feature.id !== dbkjs.options.feature.id) {
            if (!dbkjs.protocol.jsonDBK.processing) {
                if(dbkjs.viewmode === 'fullscreen') {
                    dbkjs.util.getModalPopup('infopanel').hide();
                } else {
                    $('#infopanel').hide();
                }
                dbkjs.protocol.jsonDBK.processing = true;
                dbkjs.util.alert('<i class="icon-spinner icon-spin"></i>', i18n.t('dialogs.running'), 'alert-info');
                    if(feature.attributes.typeFeature === 'Object'){
                        dbkjs.protocol.jsonDBK.getObject(feature);
                    } else if (feature.attributes.typeFeature === 'Gebied') {
                        dbkjs.protocol.jsonDBK.getGebied(feature);
                    }
            }
        } else {
            //Check if processing is finished
            if (!dbkjs.protocol.jsonDBK.processing) {
                $('#infopanel_b').html(dbkjs.options.feature.div);
                $('#infopanel_f').html('');
                if(dbkjs.viewmode === 'fullscreen') {
                    // dbkjs.util.getModalPopup('infopanel').show();
                } else {
                    $('#infopanel').show();
                }
            }
        }
    }
};
