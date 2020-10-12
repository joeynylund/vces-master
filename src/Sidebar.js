import React, { useState, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";

export default props => {

  const [loading, setLoading] = useState(true);

  const [live, setLive] = useState([]);
 
  const [streamers, setStreamers] = useState([]);

  async function loadTeam() {

    var token = '';

    var details = {};

    var twitch_id = '';

    await fetch('https://id.twitch.tv/oauth2/token?client_id=5dttul3z4tjwptxsf65frvp8qhyr1x&client_secret=pmj5deusycz6owtc2pozoek58a1on8&grant_type=client_credentials', {
      method: 'POST'
    }).then((response) => response.json())
    .then((data) => {
      token = 'Bearer ' + data.access_token;
    })

    await fetch('https://api.twitch.tv/kraken/teams/houseofvces', {
      headers: {
        'Client-ID': 'jrhhhmgv1e73eq5qnswjqh2p3u1uqr',
        'Accept': 'application/vnd.twitchtv.v5+json',
      }
      }).then((response) => response.json())
      .then((data) => {
        setStreamers(data.users)

        console.log(streamers)
      });
    
    

  }

  

  useEffect(() => {
    loadTeam()
  });

  return (
    // Pass on our props
    <Menu {...props}>
      <p>Streams will appear here...</p>
    </Menu>
  );
};