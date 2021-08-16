import React from  'react'
import DynamicComponent from '../DynamicComponent'
 

const SimpleComponent = ({blok}) =>{

    
    return (   
        
    <div> 
       <div>
            <h3>{blok.dateText}</h3>
        </div>    
        <div className="grid">
            {blok.columns.map((blok) =>
            (<DynamicComponent blok={blok} key={blok._uid}/>)
            )}
        </div>
            
    </div>
    )
}

export default SimpleComponent

