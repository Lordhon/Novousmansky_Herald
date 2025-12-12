CKEDITOR.on('instanceReady', function(evt) {
    var editor = evt.editor;
    
    editor.on('mode', function() {
        if (editor.mode === 'source') {
            setTimeout(function() {
                
                var sourceTextarea = editor.editable().textarea;
                
                if (sourceTextarea) {
                    sourceTextarea.style.backgroundColor = '#ffffff !important';
                    sourceTextarea.style.color = '#000000 !important';
                    sourceTextarea.style.fontFamily = 'Courier New, monospace !important';
                    sourceTextarea.style.fontSize = '13px !important';
                }
                
                
                var allTextareas = document.querySelectorAll('.cke_source textarea');
                allTextareas.forEach(function(ta) {
                    ta.style.backgroundColor = '#ffffff !important';
                    ta.style.color = '#000000 !important';
                });
                
            }, 200);
        }
    });
});