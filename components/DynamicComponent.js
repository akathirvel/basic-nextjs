import SbEditable from "storyblok-react"; 

import Teaser from './generic/Teaser'
import Page from './generic/Page'
import Feature from './generic/Feature'
import Grid from './generic/Grid'
import SimpleComponent from './generic/SampleComponent'
import TestComponent  from "./generic/TestComponent";
import AccordionComp from './generic/AccordionComp'
import Placeholder from "./Placeholder";
//resolve the Story blck Components
const compList = {
    'teaser':Teaser,
    'page':Page,
    'feature':Feature,
    'grid':Grid,
    'sampleComponent':SimpleComponent,
    'testComponent':TestComponent,
    'accordionComp':AccordionComp
}


const DynamicComponent = ({blok}) =>{
    
    if (typeof compList[blok.component] !== undefined){
        
        const Component = compList[blok.component];
        return (<SbEditable content={blok}><Component blok={blok} /></SbEditable>)

    }
      // fallback if the component doesn't exist
    return <Placeholder componentName={blok.component} />;

}

export default DynamicComponent