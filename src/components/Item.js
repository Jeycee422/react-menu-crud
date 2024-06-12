import React from 'react'
import '../css/Item.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

function Item({data, index, showForm, showDialog}) {
    const className = index % 2 === 0 ? 'even' :'odd'

    function capitalizeFirstLetter(string) {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
      }
  return (
    <div className={`item-container ${className}`}>
        <div>{data.name}</div>
        <div>{data.category}</div>
        <div>{data.options === "None" ? data.options : data.options.map((opt,idx) => (
            <div key={idx} className='option-name'>{capitalizeFirstLetter(opt.trim())}</div>
        ))}</div>
        <div>{`₱${data.price}`}</div>
        <div>{`₱${data.cost}`}</div>
        <div>{`${data.stock}x`}</div>
        <div className='edit-delete'>
            <FontAwesomeIcon icon={faPen} className='icon-pen' onClick={() => showForm(true,data)}/>
            <FontAwesomeIcon icon={faTrash} className='icon-trash' onClick={() => showDialog(true,data)} />
        </div>
    </div>
  )
}

export default Item