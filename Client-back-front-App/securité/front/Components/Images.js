// Images.jsx
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './css/images.css';
import img1 from '../Assets/Images/Aigle_pecheur1.jpg';
import img2 from '../Assets/Images/Aigle_pecheur2.jpg';
import img3 from '../Assets/Images/Aigle_pecheur3.jpg';
import img4 from '../Assets/Images/Aigrette_ardoisee.jpg';
import img5 from '../Assets/Images/Aningha.jpg';
import img6 from '../Assets/Images/Balbuzard.jpg';
import img7 from '../Assets/Images/Canard_siffleur1.jpg';
import img8 from '../Assets/Images/Canard_siffleur2.jpg';

import img9 from '../Assets/Images/Avocette_2.jpg';
import img10 from '../Assets/Images/Avocette_1.jpg';
import img11 from '../Assets/Images/Avocette.jpg';
import img12 from '../Assets/Images/Becasseau_sanderling.jpg';
import img13 from '../Assets/Images/Grand_gravelot.jpg';
import img14 from '../Assets/Images/Gallinule_poule_d_eau.jpg';
import img15 from '../Assets/Images/Gallinule_poule_d_eau_1.jpg';
import img16 from '../Assets/Images/Gallinule_poule_d_eau_2.jpg';


const Images = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true, // Enable autoplay
    autoplaySpeed: 3000, // Set autoplay speed (in milliseconds)
    centerMode: true,
    centerPadding: '0',
  };

  return (
    <div>
      <div className="title">
        <h2>Oiseaux Marins :</h2>
        <h4>L'objectif du travail est de dévelloper un modèle d'IA à partir du quel on peut identifier avec une bonne precision la classe d'appartenance d'une image d'oiseau reçu en entrée</h4>
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          <div>
            <img src={img4} alt="Aigrette ardoisée" />
          </div>
          <div>
            <img src={img5} alt="Aningha" />
          </div>
          <div>
            <img src={img6} alt="Balbuzard" />
          </div>
          <div>
            <img src={img7} alt="Canard siffleur 1" />
          </div>
          <div>
            <img src={img8} alt="Canard siffleur 2" />
          </div>
        </Slider>
      </div>
      <div className="fixed-images">
        <img src={img1} alt="Aigle pêcheur 1" />
        <img src={img2} alt="Aigle pêcheur 2" />
        <img src={img3} alt="Aigle pêcheur 3" />
      </div>
      <i className='def'>
        Les oiseaux marins partagent des caractéristiques communes imposées par la vie dans les milieux aquatiques salés, comme une structure particulière du plumage, une aptitude au déplacement sur et dans l'eau, une fécondité et maturité sexuelle tardive compensées par une longévité élevée, et une propension à former des colonies denses sur le littoral1. Il existe deux catégories d'oiseaux marins :
        <br /> <br/>
        <li> Les oiseaux d'eau ou de bord de mer, qui fréquentent le rivage marin (limicoles, canards, oies, cygnes, plongeons et grèbes).</li>
        <br />
        <li> Les oiseaux de mer, côtiers ou hauturiers, qui vivent essentiellement au large et se nourrissent exclusivement en mer <br/> (pétrels, puffins, océanites, fous, cormorans, labbes, goélands, mouettes, sternes et alcidés)</li>
      </i>

      <div className="fixed-images">
        <img src={img9} alt="Aigle pêcheur 1" />
        <img src={img10} alt="Aigle pêcheur 2" />
        <img src={img11} alt="Aigle pêcheur 3" />
      </div>
      <div className="fixed-images">
        <img src={img12} alt="Aigle pêcheur 1" />
        <img src={img13} alt="Aigle pêcheur 2" />
        <img src={img14} alt="Aigle pêcheur 3" />
      </div>
     {/* <div className="fixed-images">
        <img src={img15} alt="Aigle pêcheur 1" />
        <img src={img16} alt="Aigle pêcheur 2" />
        <img src={img3} alt="Aigle pêcheur 3" />
      </div>*/}
      <i className='def'>
        Les parcs d’oiseaux offrent un lieu d’habitat magnifique et jouent un rôle déterminant dans la conservation de la biodiversité aviaire, ainsi que dans la préservation et régulation des écosystèmes aquatiques et côtiers.  
        Au Sénégal nous avons plusieurs zones de protections des espèces vivant dans les zones humides, nous allons énumérer ci-dessous à l’aide d’un tableau l’ensemble des sites « parcs et réserves »
        <br /> <br/>
        
          <th>
            <tr>
              <td>Parc</td>
              <td>Superficie</td>
              <td>Ecosystèmes</td>
            </tr>
            <br></br>
          </th>
        
        <tr>
          <td>Parc National des Oiseaux de Djoudj (PNOD)</td>
          <td>160 km²</td>
          <td>Savane sahélienne, méandres du fleuve Sénégal et marais attenants.</td>
        </tr>
        <tr>
          <td>Parc National de la Langue de Barbarie (PNLB)</td>
          <td>20 km²</td>
          <td>Embouchure du fleuve Sénégal, dunes et îlots</td>
        </tr>
        <tr>
          <td>Réserve Naturelle de Gueumbeul (RNG)</td>
          <td>7,2 km²</td>
          <td>Dunes d'Acacia, lagune et marais salants</td>
        </tr>
        <tr>
          <td>Réserve de Faune du Ferlo Nord (RFFN)</td>
          <td>6000 km²</td>
          <td>Steppe et savane arbustive du Sahel</td>
        </tr>
        <tr>
          <td>Parc National des îles de la Madeleine (PNIM)</td>
          <td>0,5 km²</td>
          <td>Ilots rocheux et milieux marins</td>
        </tr>
        <tr>
          <td> Réserve Naturelle de Popenguine (RNP) </td>
          <td>10 km²</td>
          <td>Savane et forêt sèche</td>
        </tr>
        
        <tr>
          <td> Parc National du Delta du Saloum (PNDS) </td>
          <td>730 km²</td>
          <td>Savane et forêt claire, mangrove et milieux marins et insulaires</td>
        </tr>

        <tr>
          <td> Parc National du Niokolo Koba (PNNK)  </td>
          <td>8130 km²</td>
          <td>Savane arbustive et boisée soudanienne</td>
        </tr>

        <tr>
          <td> Parc National de Base Casamance (PNBC) </td>
          <td>50 km²</td>
          <td>Forêt dense, savane et mangrove</td>
        </tr>
        
        </i>
      {/*<div className="slider-container">
        <Slider {...settings}>
          <div>
            <img src={img11} alt="Aigrette ardoisée" />
          </div>
          <div>
            <img src={img15} alt="Aningha" />
          </div>
          <div>
            <img src={img12} alt="Balbuzard" />
          </div>
          <div>
            <img src={img10} alt="Canard siffleur 1" />
          </div>
          <div>
            <img src={img16} alt="Canard siffleur 2" />
          </div>
        </Slider>
      </div>*/}
      <div>Oiseaux Marins</div>
      </div>
  );
};

export default Images;
