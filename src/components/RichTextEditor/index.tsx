import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

export default function RichTextEditor({ handler }) {
  return (
    <CKEditor
      editor={ClassicEditor}
      onChange={handler}
    />
  )
}