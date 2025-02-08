import React, {useState} from 'react';
import { VectorMap } from '@south-paw/react-vector-maps';
import styled from 'styled-components'
import africa from '../assets/africa.json';
import { Typography } from 'antd';

const { Paragraph} = Typography;

const style = { margin: '3rem auto', width: '100%', height: '100vh',};

const findCountryId = (name) => {
  return africa.layers.find(country => country.name === name ).id;
}

const AfricaMap = ({ hovered, setHovered, focused, setFocused, clicked, setClicked}) =>{
    //const [countryHovered, setCountryHovered] = useState(hovered);
    // const [countryFocused, setCountryFocused] = useState(focused);
    const [countryClicked, setCountryClicked] = useState(clicked);
    const countryId = countryClicked !== 'None' ? findCountryId(countryClicked) : '';

    const layerProps = {
        onClick: ({ target }) => {
          if(countryClicked !== target.attributes.name.value){
            setClicked(target.attributes.name.value); 
            setCountryClicked(target.attributes.name.value);
          }
          else{
            setClicked('None'); 
            setCountryClicked('None');
          }
          
        },
        // onMouseEnter: ({ target }) => {setHovered(target.attributes.name.value);setCountryHovered(target.attributes.name.value)},
        // onMouseLeave: ({ target }) => {setHovered('None');setCountryHovered('None')},
        // onBlur: ({ target }) => {setFocused('None'); setCountryFocused('None')},
        // onFocus: ({ target }) => {setFocused(target.attributes.name.value); setCountryFocused(target.attributes.name.value)},
      };

      const Map = styled.div`
      margin: 1rem auto;
    
      svg {
        stroke: #fff;
    
        // All layers are just path elements
        path {
          fill: #1890ff;
          cursor: pointer;
          outline: none;
    
          // When a layer is hovered
          &:hover {
            fill: #001529;
          }
    
         
          &:focus {
            fill: #001529;
          }
    
          // When a layer is 'checked' (via checkedLayers prop).
          &[aria-checked='true'] {
            fill: rgba(0,21,41,1);
          }
    
          // When a layer is 'selected' (via currentLayers prop).
          &[aria-current='true'] {
            fill: #001529;
          }
    
          // You can also highlight a specific layer via it's id
          &[id="nz-can"] {
            fill: rgba(56,43,168,0.6);
          }
        }
      }
    `;

    return (
        <div style={style}>
          <Map>
            <VectorMap {...africa} layerProps={layerProps} checkedLayers={countryId || null}/>
          </Map>
          {clicked !== 'None' && <Paragraph style={{textAlign: 'center'}}>You've selected <b>{clicked}</b></Paragraph>}
        </div>
      );
} 

export default AfricaMap;