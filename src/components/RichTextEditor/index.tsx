import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import ReactHtmlParser from 'react-html-parser'
import { useState } from 'react'
import { Text } from '@chakra-ui/react'

const RichTextEditor = () => {
  const [value, setValue] = useState('')

  const handleOnChange = (e, editor) => {
    const data = editor.getData()
    setValue(data)
  }

  return (
    <>
      <CKEditor 
        editor={ClassicEditor}
        onChange={handleOnChange}
      />
      <Text>{ReactHtmlParser(value)}</Text>
    </>
  )
}

export { RichTextEditor }