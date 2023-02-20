import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import {useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal} from 'react'

const inter = Inter({ subsets: ['latin'] })

export const getStaticProps = async () =>{

  //my response and wait for the data to return
  const res = await fetch('https://jsonplaceholder.typicode.com/users');

  //on fetch, add to json
  const data = await res.json();
  console.log(data);

  return {
    props: { users: data }
  }
}

export default function Home({ users }: {users: any})  {
  return (
    <>

     {/* <!-- Begin content div --> */}
       <div>
        <h2>Testing API Endpoint</h2>
        <p>JSON Placeholder URL - https://jsonplaceholder.typicode.com/users</p>
  
       {users.map((user: { id: Key | null | undefined; name: string | undefined; email: string })=>(
        <div key={user.id}>
          <h3>User Information</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
       ))}
          </div>



       

      {/* <!-- End content div --> */}
      <div className="nys-global-footer">
        <div className="footer-container nys-global-footer-cols-2">
          <h3>Office of Temporary and Disability Assistance | Child Support</h3>
          <div className="footer-col">
            <h4>Child Support</h4>
            <ul>
              <li><a href="/DCSE/HomePage"><span>Child Support Home</span></a></li>
              <li><a href="/dcse/custodial_parent_services.html"><span>Custodial Parents</span></a></li>
              <li><a href="/dcse/non_custodial_parent_services.html"><span>Noncustodial Parents</span></a></li>
              <li><a href="/dcse/employers_new.html"><span className="capitalize">Employers</span></a></li>
              <li><a href="/dcse/providers.html"><span>Providers</span></a></li>
              <li><a href="/DCSE/LocalOffices_input"><span>Local Offices</span></a></li>
              <li><a href="/dcse/resources.html"><span>Resources</span></a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Office of Temporary and Disability Assistance</h4>
            <ul>
              <li><a href="https://otda.ny.gov/"><span className="notranslate" translate="no">OTDA</span> <span>Home</span></a></li>
              <li><a href="https://otda.ny.gov/contact.asp"><span>Contact</span> <span className="notranslate" translate="no">OTDA</span></a></li>
              {/* <!--li><a href="https://otda.ny.gov/legal/">Laws &amp; Policies</a></li--> */}
              <li><a href="https://otda.ny.gov/accessibility.asp"><span>Accessibility</span></a></li>
              <li><a href="https://otda.ny.gov/privacypolicy.asp"><span>Privacy Policy</span></a></li>
              <li><a href="https://otda.ny.gov/disclaimer.asp"><span>Disclaimer</span></a></li>
              <li><a href="https://otda.ny.gov/ada-notice.asp"><span>Notice under ADA</span></a></li>
              <li><a href="https://otda.ny.gov/legal/FOIL/"><span>Freedom of Information Law (FOIL)</span></a>
              </li>
            </ul>
          </div>

          <div className="social-media">
            <div className="social-media-title">
              <h4>CONNECT WITH US</h4>
            </div>
            <div className="social-media-links">
              <ul>
                <li>
                  <a href="https://facebook.com/nys.otda">
                    <span className="icon-social-facebook"></span>
                    <span>FACEBOOK</span>
                  </a>
                </li>
                <li>
                  <a href="https://flickr.com/photos/nysotda">
                    <span className="icon-social-flickr"></span>
                    <span>FLICKR</span>
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/nysotda">
                    <span className="icon-social-twitter"></span>
                    <span>TWITTER</span>
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com/user/NYStateOTDA">
                    <span className="icon-social-youtube"></span>
                    <span>YOUTUBE</span>
                  </a>
                </li>
                <li>
                  <a href="https://otda.ny.gov/news/feed/rss.xml">
                    <span className="icon-social-feed"></span>
                    <span>RSS FEED</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id="program">
          <p>A Program of the <a href="https://otda.ny.gov"><span>Office of Temporary and Disability
            Assistance</span></a></p>
        </div>
      </div>
      {/* <!-- End nys-global-footer div --> */}
    
    </>
  )
}
