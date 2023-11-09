import PropTypes from 'prop-types'
import React, { Component } from 'react'
import LoadingGif from '../assets/Bean Eater-1.4s-203px.gif'

export class Loader extends Component {
  static propTypes = {}

  render() {
    return (
      <div className='text-center'>
        <img src={LoadingGif} alt='Loading'/>
      </div>
    )
  }
}

export default Loader