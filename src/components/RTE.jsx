import React from 'react'
import {Editor } from '@tinymce/tinymce-react';
import {Controller} from 'react-hook-form';

export default function RTE({name , control , label , defaultValue = ""}) {
  return (
    <div className='w-full'> 
    {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

    <Controller
    name={name || "content"}
    control={control}  // manage form 'state' and 'validations'
    render={({field: {onChange}}) => (
        <Editor
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
    )}
    />

     </div>
  )
}


// Notes upper code : 

// Controller: Connects the Editor component to react-hook-form.

// name: Specifies the name of the form field.

// control: Provides control object from react-hook-form.

// render: A function that renders the Editor component and connects it to the form state.

// field: { onChange }: Destructures field to extract onChange for updating form state.

// Editor: Renders a TinyMCE rich text editor.

// initialValue: Sets initial content of the editor.

// init: Configuration for the editor (height, menubar, plugins, toolbar, content style).

// onEditorChange: Updates form state when the editor content changes.