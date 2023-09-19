import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'



const Container = tw.div`
    relative
`

const Input = tw.input`
    // display[none]
    sr-only
    // peer
`
const Label = styled.label`
    background-color: ${(props) => props.bg};

    ${tw`
        uppercase
        mr-1
        h-10
        w-10
        border-2
        shadow-inner
        cursor-pointer
        flex
        items-center
        justify-center
        
    `}
`
const Radio = ({ id, name, value, title, bg, disabled, checked, onClick }) => {
    return (
        <Container>
            <Input className='peer' type={'radio'} id={id} value={value} name={name} disabled={disabled} defaultChecked={checked} />
            <Label className='peer-checked:outline peer-checked:outline-prime-dark-10 peer-disabled:bg-black/50 ' htmlFor={id} bg={bg} onClick={onClick}>{title}</Label>
        </Container >
    )
}

export default Radio