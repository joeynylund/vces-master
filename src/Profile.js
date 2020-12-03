import React, { useState, useEffect, useRef } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarText,
  Row,
  Container,
  Col
} from 'reactstrap';
import logo from './V_spade_2.png';
import adrian from './adrian.jpg';
import adrianbg from './image3.jpg';
import { slide as Menu } from 'react-burger-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faTwitch,faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { TwitchClip, TwitchChat, TwitchPlayer, TwitchEmbed } from 'react-twitch-embed';
import './App.css';

function App({match}) {

  console.log(match.params.member)

  const NavBar2 = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{width:'100%',position:'absolute',top:'0'}}>

        <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><img src={logo} width="75px" /></NavbarBrand>

        </Navbar>
      </div>
    );
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  return (
    
    <div className="App" id="App">
      <NavBar2 />
      <div class="section">
        <Container>
          <Row>
            <div className="col-2 sticky-top" style={{height:'100%'}}>
              <img src={adrian} style={{borderRadius:'50%',width:'100%',paddingBottom:'10px'}} />
              <h4 style={{color:'#b71314'}}>thevceofspades</h4>
              <a style={{display:'flex',width:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'#212121',color:'#fff',padding:'10px 0px',marginBottom:'10px'}}><FontAwesomeIcon icon={faTwitter} style={{color:"#FFF",cursor:'pointer',marginRight:'10px'}} /><p style={{margin:'0'}}>Twitter</p></a>
              <a style={{display:'flex',width:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'#212121',color:'#fff',padding:'10px 0px',marginBottom:'10px'}}><FontAwesomeIcon icon={faTwitch} style={{color:"#FFF",cursor:'pointer',marginRight:'10px'}} /><p style={{margin:'0'}}>Twitch</p></a>
              <a style={{display:'flex',width:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'#212121',color:'#fff',padding:'10px 0px',marginBottom:'10px'}}><FontAwesomeIcon icon={faYoutube} style={{color:"#FFF",cursor:'pointer',marginRight:'10px'}} /><p style={{margin:'0'}}>Youtube</p></a>
              <a style={{display:'flex',width:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'#212121',color:'#fff',padding:'10px 0px',marginBottom:'10px'}}><FontAwesomeIcon icon={faInstagram} style={{color:"#FFF",cursor:'pointer',marginRight:'10px'}} /><p style={{margin:'0'}}>Instagram</p></a>
            </div>
            <div className="col-10">
              <Row>
                <h3 style={{color:'#fff',fontWeight:'600',marginBottom:'10px',textAlign:'left'}}>LIVE STREAM  <span style={{color:'#b71314', fontStyle:'italic'}}>///</span></h3>
              </Row>
              <Row style={{marginBottom:'20px'}}>
                <div className="col-md-12">
                  <TwitchPlayer channel="thevceofspades" theme="dark" width="100%" />
                </div>
              </Row>
              <Row>
                <h3 style={{color:'#fff',fontWeight:'600',marginBottom:'10px',textAlign:'left'}}>SHORT INTRO  <span style={{color:'#b71314', fontStyle:'italic'}}>///</span></h3>
              </Row>
              <Row style={{marginBottom:'20px'}}>
                <div className="col-md-12">
                  <p style={{color:'#fff',textAlign:'left'}}>Yooo what's really good! I am the Vce Of Spades ♠️ or you can call me AC. I love gaming with my good friends when I’m not at Hard Rock Stadium with the squad preparing to beat your favorite NFL team. The House of Vces is a small but strong community built on faith, family, and (you guessed it FOOTBALL haha jk) fun! We pride ourselves on having a great time and providing a space that everyone can enjoy and interact in. We also happen to be pretty good shooters 😌 So stop by, chat & learn more but don't forget to hit that follow button while you're here🤙🏾</p>
                </div>
              </Row>
              <Row>
                <h3 style={{color:'#fff',fontWeight:'600',marginBottom:'10px',textAlign:'left'}}>TOP CLIPS  <span style={{color:'#b71314', fontStyle:'italic'}}>///</span></h3>
              </Row>
              <Row>
                <div className="col-6">
                  <TwitchClip clip="CreativeGlutenFreeLemurKippa" width="417" height="234" autoplay="false" />
                </div>
                <div className="col-6">
                  <TwitchClip clip="PrettyVenomousRedpandaPeteZarollTie" width="417" height="234" autoplay="false" />
                </div>
              </Row>
              <Row><a className="view-more" href="https://www.twitch.tv/thevceofspades/videos?filter=clips&range=all" target="_blank">VIEW MORE</a></Row>
            </div>
          </Row>
          <Row>
            
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
