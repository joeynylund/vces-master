import React, { useState, useEffect } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarText,
  Row,
  Container,
  Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from './V_spade_2.png';
import adrianbg from './image3.jpg';
import { slide as Menu } from 'react-burger-menu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './App.css';

function App() {
 
  const [members, setMembers] = useState([]);

  const [streamers, setStreamers] = useState([]);

  async function loadTeam() {

    var token = '';

    var details = {};

    await fetch('https://id.twitch.tv/oauth2/token?client_id=5dttul3z4tjwptxsf65frvp8qhyr1x&client_secret=pmj5deusycz6owtc2pozoek58a1on8&grant_type=client_credentials', {
      method: 'POST'
    }).then((response) => response.json())
    .then((data) => {
      token = 'Bearer ' + data.access_token;
    })

    await fetch('https://api.twitch.tv/kraken/teams/houseofvces', {
      headers: {
        'Client-ID': '5dttul3z4tjwptxsf65frvp8qhyr1x',
        'Accept': 'application/vnd.twitchtv.v5+json',
      }
      }).then((response) => response.json())
      .then((data) => {

        setMembers(data.users)
        
        data.users.forEach(user => {
          fetch('https://api.twitch.tv/kraken/streams/' + user._id, {
            headers: {
              'Client-ID': '5dttul3z4tjwptxsf65frvp8qhyr1x',
              'Accept': 'application/vnd.twitchtv.v5+json',
            }
          }).then((response) => response.json())
            .then((data) => {             
              if (data.stream != null) {
                details = {name: data.stream.channel.display_name,logo: data.stream.channel.logo,game: data.stream.game}
                setStreamers(oldArray => [...oldArray, details])
              }    
          })
        });
        
      });

  }

  const closeMenu = () => {
    setMenu(false)
  }

  const [menu, setMenu] = useState(false)

  const SideMenu = () => {
    return (
      <Menu slide right disableAutoFocus  isOpen={ menu } onClose={ closeMenu } customBurgerIcon={ false } width="500px">
        <h2 style={{fontWeight:'600', textAlign:'left', color:'#b71314'}}>CURRENTLY LIVE</h2>
      {streamers && streamers.map(streamer => (
        <div style={{display:'flex',alignItems:'center'}} key={streamer.name}>
          <img src={streamer.logo} style={{width:'75px',borderRadius:'50%'}} />
          <div style={{marginLeft:'10px',textAlign:'left'}}>
            <h5 style={{marginBottom:'0px'}}>{streamer.name}</h5>
            <h6>{streamer.game}</h6>
          </div>
        </div>
      ))}
    </Menu>
    )
  }

  const NavBar2 = () => {

    return (
      <div style={{width:'100%',position:'absolute',top:'0'}}>

        <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><img src={logo} width="75px" /></NavbarBrand>

        {streamers.length === 0 ? null : <NavbarText onClick={(e) => setMenu(!menu)} style={{color:'#b71314',fontWeight:'600',fontSize:'1.1rem',cursor:'pointer'}}> 
              LIVE STREAMS{'    '}<FontAwesomeIcon icon={faBars} style={{color:'#fff',marginLeft:'10px'}} />
            </NavbarText>}
        </Navbar>
      </div>
    );
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    loadTeam()
  },[]);

  return (
    
    <div className="App" id="App">
      <div className="top App-header" style={{backgroundImage:`url(${adrianbg})`,backgroundPosition:'bottom center',backgroundSize:'cover'}}>

      <SideMenu />
      <NavBar2 />

      <div className="header">
        <Container>
          <Row><center>
            <h1 style={{color:'#fff'}}>Adrian Colbert Presents The House of Vces: A group of gamers gathered together from a shared common interest - video games and football. Welcome to the <span style={{color:'#b71314'}}>#houseofvces!</span></h1>
            </center></Row>
        </Container>
      </div>
    </div>
    <div class="section">
        <Container>
          <Row>
            <h3 style={{color:'#fff',fontWeight:'600',marginBottom:'10px'}}>CURRENT GIVEAWAYS  <span style={{color:'#b71314', fontStyle:'italic'}}>///</span></h3>
          </Row>
          <Row>
            \
          </Row>
        </Container>
      </div>
      <div class="section" style={{backgroundColor:'#212121'}}>
        <Container>
          <Row>
            <h3 style={{color:'#fff',fontWeight:'600',marginBottom:'10px'}}>OUR MEMBERS  <span style={{color:'#b71314', fontStyle:'italic'}}>///</span></h3>
          </Row>
          <Row>
            {members.map(member => (
              <Col xs="6" md="2" style={{marginBottom:'20px'}} key={member.display_name}>
                <Link to={{
                pathname: "/member/" + member.display_name,
              }}>
                <img src={member.logo} style={{width:'100%', borderRadius:'50%'}} />
                <h5 style={{color:'#b71314'}}>{member.display_name}</h5></Link>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;
