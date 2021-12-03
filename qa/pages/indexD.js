import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
  });
  
  const { data } = await client.query({
    query: gql`
      query GetLaunches {
        launchesPast(limit: 10) {
          id
          mission_name
          launch_date_local
          launch_site {
            site_name_long
          }
          links {
            article_link
            video_link
            mission_patch
          }
          rocket {
            rocket_name
          }
        }
      }
    `
  });
  
  return {
    props: {
      launches: data.launchesPast
    }
  }
}

export default function Home({ launches }) {
  console.log('launches', launches);
  return (
    <div className={styles.grid}>
      {launches.map(launch => {
        return (
          <a key={launch.id} href={launch.links.video_link} className={styles.card}>
            <h3>{ launch.mission_name }</h3>
            <p><strong>Launch Date:</strong> { new Date(launch.launch_date_local).toLocaleDateString("en-US") }</p>
          </a>
        );
      })}
    </div>
  )
}
