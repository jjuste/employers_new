import Head from 'next/head'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import {useState, useEffect} from 'react';


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  //url for json
  const apiURL = 'https://jsonplaceholder.typicode.com/users'

  //this function pulls the data from the api
  function getJSON() {
    //fetch url
    fetch(apiURL)
    //when we get it
    .then(response =>response.json())

    //display it in the console
    .then(result => {
      console.log(result);
    })
  }

  useEffect(()=>{

    //function to display apiurl
    getJSON()

  },[])
  return (
    <>
      
<p>Testing</p>
   
     

        {/* <!-- InstanceBeginEditable name="pageHead" --> */}
        <h1>Information for Employers</h1>
        {/* <!-- InstanceEndEditable --> */}
        <noscript>
          <div id="jsoff" className="warn">
            <h2>Enable JavaScript to access your account</h2>
            <p>To access your account information, please enable JavaScript in your browser.
              <a href="/dcse/enable_js.html">
                Follow these instructions to enable JavaScript.</a></p>

            <p>You can receive your payment information by phone at
              <strong><abbr translate="no" dir="ltr" className="nowrap"
                title="Teletypewriter: 866-875-9975; Video Relay Service: https://fcc.gov/encyclopedia/trs-providers">1-888-208-4485</abbr></strong>
              (<abbr title="Teletypewriter" translate="no">TTY</abbr>: <strong translate="no" dir="ltr" className="nowrap">1-866-875-9975</strong>),
              Monday&ndash;Friday, 8:00 AM&ndash;7:00 PM.</p>
          </div>
        </noscript>

        {/* <!-- InstanceBeginEditable name="content" --> */}

       
   
    
      
      {/* <!-- End content div --> */}

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
