import React from "react";
import Link from 'next/link'
 
function Nav() {
    return (
      <div>
      <h1>Samples</h1>
      <ul>
        
        <li><h2><Link href="/gohorseHome" passHref>Go Horse Methodology - Contentful CMS Sandbox</Link></h2></li>
        <li><h2><Link href="/launchHome" passHref>Spacial lauches list - Public Graphql</Link></h2></li>
      </ul>
      </div>
    )
  }
  
  export default Nav