import React from 'react'


const TestComponent = ({blok}) =>{
    return (
        <form>
            <label>
                {blok.label} i am  updating here
                <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
        </form>
        
        )
}

export default TestComponent
