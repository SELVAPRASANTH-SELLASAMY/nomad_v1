const toggleFullScreen = (quillInstance) => {
    const editor = quillInstance.current.container.closest('.quill-element');
    if(editor){
        editor.classList.toggle('editor-fullscreen');
    }
}
const QuillConfig = (quillInstance) =>({
    theme:'snow',
    modules: {
        toolbar: {
            container: [
                [{header:[3, 4, 5, 6, false]}],
                ['bold','italic','underline','strike'],
                [{list:'ordered'},{list:'bullet'},'blockquote','code-block'],
                [{align:'center'},{align:'right'},{align:'justify'}],
                [{script:'sub'},{script:'super'}],
                [{indent:'-1'},{indent:'+1'}],
                ['link','image','video'],
                ['fullscreen-mode'],
                ['clean']
            ],
            handlers: {
                'fullscreen-mode': () => toggleFullScreen(quillInstance)
            }
        }
    }
})
export { QuillConfig };