import React from 'react'
import styled from 'styled-components'
import tw from 'twin.macro'



const Container = styled.div`
    ${tw`
        max-h-[380px]
        // overflow-auto
        // grid
        // grid-cols-2
        // place-items-center
        // gap-0
        
        

        
        // gap-2
        flex
        flex-wrap
        // flex-row
        // items-start
        // -space-y-10
        // align-top
        // items-start
    `}
`
const Button = tw.button`
    box-content
    // w-auto
    // h-auto
    focus:border-prime-dark-10
    border-2
    border-transparent
    // mb-4
    // m-0
    // h-[70px]
    // self-start
    // border-none
    // outline-none`

const Thumb = tw.img`
    w-[75px]
    // object-top
    // outline-black
    // p-1
`


const Thumbs = ({ product }) => {

    return (
        <Container className='basis-[15%]'>
            <Button><Thumb src={product.data[0].img} /></Button>
            {product.images.map((item) => (
                <Button><Thumb src={item} /></Button>
            ))}

        </Container>
    )
}

export default Thumbs