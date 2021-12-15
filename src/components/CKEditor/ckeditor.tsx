import { CKEditor } from '@ckeditor/ckeditor5-react'

export default function CKEditorWrapper(fn){return <CKEditor editor={fn} />}