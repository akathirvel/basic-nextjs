import React from "react";
import DynamicComponent from "../components/DynamicComponent";
import Head from "next/head";
import styles from "../styles/Home.module.css";
 
import Storyblok, { useStoryblok } from "../lib/storyblok";
 
export default function Page({ story, preview }) {

  console.log('Page [[slug]].js inside')
  //const enableBridge = true; // load the storyblok bridge everywhere
  const enableBridge = preview; // enable bridge only in prevew mode
  story = useStoryblok(story, enableBridge);
 /*
 let urllll = 'cdn/stories/'+story.full_slug
  let sbParams = {
    version: "published", // or published
    
  };
    Storyblok.get(urllll, sbParams).then((data)=> {
      console.log('inside story',data.data.story);
      story = data.data.story
      
    }).catch((err) =>{
      console.log(err)
    });
  
 */
 
  return (
    <div className={styles.container}>
      <Head>
        <title>{story ? story.name : "My Site"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
 
      <DynamicComponent blok={story.content} />
    </div>
  );
}
 
export async function getStaticProps({ params, preview = true }) {
 
  let slug = params.slug ? params.slug.join("/") : "home";
 
  let sbParams = {
    version: "published", // or published
  };
 
  if (preview) {
    sbParams.version = "draft";
    sbParams.cv = Date.now();
  }
 
  let { data } = await Storyblok.get(`cdn/stories/${slug}`, sbParams);
 
  return {
    props: {
      story: data ? data.story : null,
      preview,
    },
    revalidate: 3600, // revalidate every hour
  };
}
 
export async function getStaticPaths() {
  let { data } = await Storyblok.get("cdn/links/",{
   version:'draft',starts_with:'uat'
  });
  //let {data} = await Storyblok.get("cdn/links")
   
  let paths = [];
  
  Object.keys(data.links).forEach((linkKey) => {
     
    if (data.links[linkKey].is_folder) {
      return;
    }
 
    // get array for slug because of catch all
    const slug = data.links[linkKey].slug;
      
    // remove the pages part from the slug
    // let newSlug = slug.replace('pages', '')
    let splittedSlug = slug.split("/"); 
    paths.push({ params: { slug: splittedSlug } });

  });
   
  return {
    paths: paths,
    fallback: false,
  };
}
