import React from 'react'


const TestComponent = ({blok}) =>{
    return (
        <form>
            <label>
                {blok.label} AnglesK
                <input type="text" name="name" />
            </label>
            <input type="text" name="name2" />
            <input type="submit" value="Submit" />
        </form>
        
        )
}

export default TestComponent
