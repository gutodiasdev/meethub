import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

type RichTextEditorParams = {
  handler: (e, editor) => void,
}

export default function RichTextEditor({ handler }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      onChange={handler}
    />
  )
}