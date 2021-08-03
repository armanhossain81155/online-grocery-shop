import React from 'react'
import { Link } from 'react-router-dom'
import photo1 from '../../images/ph1.jpg'
import photo2 from '../../images/ph2.jpg'
import photo3 from '../../images/ph3.jpg'
import photo4 from '../../images/ph4.jpg'
import './Product.css'

const Product = () => {
  return (
    <div>
      <div >
        <ul className='front-img'>
          <li>
            <Link to="/login"><img src={photo1} alt='' /></Link>
          </li>
          <li>
            <Link to="/login"><img src={photo2} alt='' /></Link>
            
          </li>
          <li>
          <Link to="/login"><img src={photo3} alt='' /></Link>
            
          </li>
        
        </ul>
      </div>
    </div>
  )
}

export default Product
