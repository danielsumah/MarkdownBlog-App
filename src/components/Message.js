import React from 'react'
import { Message } from 'semantic-ui-react'

export default ({ message, info, positive, negative, warning }) => (
    <Message message info positive negative warning>
        <Message.Header>{message}</Message.Header>
        {/* <p>That offer has expired</p> */}
    </Message>
)