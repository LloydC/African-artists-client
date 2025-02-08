import React, { useState, useEffect } from 'react';
import AfricaMap from '../../components/AfricaMap';
import ArtistsList from '../../components/ArtistsList';
import Welcome from '../../components/Welcome';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import './HomePage.css';
const { Content } = Layout;


function HomePage({user}) {
    const [hovered, setHovered] = useState('None');
    const [clicked, setClicked] = useState('None');
    const [artists, setArtists] = useState(undefined);

    const queryCountryMusic = async (country) => {
      const music = await fetch(`http://localhost:5005/search?country=${country}`).then((response) => response.json())
      return setArtists(music);
    }
    
    useEffect(()=>{
      if(clicked === 'None' && artists !== undefined){
        setArtists(undefined)
      }
      else if(clicked !== 'None' && artists === undefined){
       queryCountryMusic(clicked);
      }
    }, [artists, clicked])

    return (
        <Content className="site-layout" style={{ padding: '0 50px'}}>
          <div className="home-container site-layout-background">      
              {hovered === 'None' && clicked ==='None' && <Welcome user={user}/>}
              {clicked!== 'None' && <div className="right-section">
                  {/* {artists === undefined && clicked!== 'None' && <Spin size="large"/>} */}
                  {artists !== undefined && artists.artists.items.length === 0 ? 
                    <h1>No artists from {clicked} </h1> : 
                    <ArtistsList artists={artists} clicked={clicked}/>
                }
              </div>}
              <AfricaMap hovered={hovered} clicked={clicked} setHovered={setHovered} setClicked={setClicked}/>
          </div>
        </Content>
    )
}

export default HomePage;