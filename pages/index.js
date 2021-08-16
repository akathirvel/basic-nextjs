import Head from 'next/head' 
import styles from '../styles/Home.module.css'
import Storyblok ,{ useStoryblok } from '../lib/storyblok'
import DynamicComponent  from '../components/DynamicComponent'
import Link from 'next/link'

export default function Home({ story, preview }) {
  console.log('preview--->',preview)
  story = useStoryblok(story, preview)
  
  return (<div className={styles.container}>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <header>
      <h1>
        { story ? story.name : 'My Site' }
      </h1>
    </header>

    <DynamicComponent blok={story.content} />

    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/testpage">
          <a>About Us</a>
        </Link>
      </li>
      <li>
        <Link href="/test3page">
          <a>Blog Post</a>
        </Link>
      </li>
    </ul>

  </div>
  )
}

export async function getStaticProps(context){

  let slug = 'home'
  let params = {
    version:'published' //or 'publish'
  }
  //check if next js is preview mode
  console.log('context.preview--->',context.preview)
  if (context.preview){
    //load draft version
    params.version = 'draft'
  } else {
    context.preview = false
  }
  params.cv = Date.now()
  // loads the story from the Storyblok API
  let { data } = await Storyblok.get(`cdn/stories/${slug}`, params)
   
 
  // return the story from Storyblok and whether preview mode is active
  return {
    props: {
      story: data ? data.story : false,
      preview: context.preview 
    },
    revalidate: 10000, 
  }
}