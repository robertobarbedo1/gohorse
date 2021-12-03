import { useRouter } from 'next/router'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';



const Launch = ({ launch }) => {
  const router = useRouter()
  const { lids } = router.query
 // console.log(launch)
 // return <p>Launch: {lids}</p>

  return (
    <div> <span>Mission Name:  {launch.mission_name}</span><br />
     <span>Mission Year:  {launch.launch_year}</span><br />
     <span>Mission Date:  {launch.launch_date_local}</span>
     
    </div>
    
  )
}

export default Launch

export async function getStaticPaths() {
   return { paths:[],
   fallback:  'blocking'}
}

export async function getStaticProps(context) {
  const client = new ApolloClient({
    uri: 'https://api.spacex.land/graphql/',
    cache: new InMemoryCache()
  });

  const sludid = context.params.lids
  console.log(sludid)



  const { data } = await client.query({
    query: gql`
      query GetLaunch {
        
          launch(id: "${sludid}") {
            id
            mission_name
            rocket {
              rocket_name
              first_stage {
                cores {
                  core {
                    id
                  }
                }
              }
            }
            launch_date_local
            launch_year
            launch_success
          }
        
        
      }
    `
  });
  
  return {
    props: {
      launch: data.launch
    }
  }
}
