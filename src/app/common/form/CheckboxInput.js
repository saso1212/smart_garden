import React from 'react'
import {Form} from 'semantic-ui-react'

const CheckboxInput = ({input,width,type,label}) => {
  return (
    <Form.Field  >
        <div className=" ui checkbox"> 
          <input type={type} {...input} /> {' '}
          <label>{label}</label>
        </div>
    </Form.Field>
  )
}

export default CheckboxInput