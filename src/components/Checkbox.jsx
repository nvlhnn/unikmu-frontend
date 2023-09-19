import { CheckCircleOutline } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'



const Container = tw.div`
    relative
`

const Checker = tw.input`
    // display[none]
    sr-only
    // peer
`
const Label = styled.label`
    background-color: ${(props) => props.bg};

    ${tw`
        cursor-pointer
        border-2
        p-4
        flex
        items-center
        justify-center
        uppercase
        md:hover:border-prime-dark-20
        peer-checked:border-prime-dark-30
        // peer-checked:opacity-30
        
    `}
`

const Checkbox = ({ id, name, value, title, bg, onChange, state }) => {
    return (
        <Container className='basis-[33%]'>
            <Checker className='peer' type={'checkbox'} id={id} value={value} name={name} onChange={onChange} defaultChecked={(state != null) && state.split("&").includes(value)} />
            <Label htmlFor={id} bg={bg}>{title}</Label>
            {/* <CheckCircleOutline className='absolute top-0 right-0' /> */}
        </Container>
    )
}

export default Checkbox