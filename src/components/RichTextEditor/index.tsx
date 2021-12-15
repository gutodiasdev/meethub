import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useState } from 'react'

type RichTextEditorParams = {
  handler: (e, editor) => void,
}

export default function RichTextEditor({ handler }: RichTextEditorParams) {
  return (
    <CKEditor
      editor={ClassicEditor}
      onChange={handler}
    />
  )
}