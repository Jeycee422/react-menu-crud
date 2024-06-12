import React, { useEffect, useState } from 'react'
import '../css/ItemForm.css'
import {database, ref, set, update} from '../config'
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faPlus } from '@fortawesome/free-solid-svg-icons'

function ItemForm({closeForm, itemData}) {
    
    const [optionValue, setOptionValue] = useState('')
    const [optionsArr,setOptions] = useState([])
    const [name,setName] = useState('')
    const [category,setCategory] = useState('')
    const [price,setPrice] = useState('')
    const [cost,setCost] = useState('')
    const [stock,setStock] = useState('')
    

    const handleAddOption = () => {
        if (optionValue.trim() !== '') {
          setOptions([...optionsArr, optionValue]);
          setOptionValue('');
        }
      };
    const handleRemoveOption = (i) => {
        setOptions(optionsArr.filter((_, index) => index !== i));
    };

    const handleAddItem = async (e) => {
        e.preventDefault()
        if(name.trim() !== "" && category.trim() !== "" && price.trim() !== "" && cost.trim() !== "" && stock.trim() !== "") {
            const uuid = uuidv4();
            const toastLoadingId = toast.loading("Loading..")
            await set(ref(database, 'menu/' + uuid), {
                name: name,
                category: category,
                price: price,
                cost: cost,
                stock: stock,
                options: optionsArr.length > 0 ? optionsArr : "None"
              }).then(() => {
                toast.success('Data added successfully');
                toast.dismiss(toastLoadingId)
                closeForm(false,null)
                clearAllState()
              }).catch((error) => {
                toast.error('Failed to add data');
              });
        }else {
            toast.error("Please fill in all required fields")
        }
    }

    const handleUpdateItem = async (e) => {
        e.preventDefault();
        if(name.trim() !== "" && category.trim() !== "" && price.trim() !== "" && cost.trim() !== "" && stock.trim() !== "") {
            try {
                const toastLoadingId = toast.loading("Loading..")
                await update(ref(database, 'menu/' + itemData.id), {
                  name: name,
                  category: category,
                  price: price,
                  cost: cost,
                  stock: stock,
                  options: optionsArr.length > 0 ? optionsArr : "None"
                });
                toast.success('Data updated successfully');
                toast.dismiss(toastLoadingId)
                closeForm(false,null)
                clearAllState()
              } catch (error) {
                toast.error('Failed to update data');
              }
        }else {
            toast.error("Please fill in all required fields")
        }
        
      };

    const clearAllState = () => {
        setName('');
        setCategory('');
        setPrice('');
        setCost('');
        setStock('');
        setOptions([]);
    }

    useEffect(() => {
        if(itemData !== null) {
            setName(itemData.name)
            setCategory(itemData.category)
            setOptions(Array.isArray(itemData.options) ? itemData.options : [])
            setPrice(itemData.price)
            setCost(itemData.cost)
            setStock(itemData.stock)
        }
    },[itemData])

  return (
    <div className='form-background'>
        
        <form onSubmit={itemData !== null ? handleUpdateItem : handleAddItem} className='form-container'>
            <div className='exit-btn' onClick={() => closeForm(false,null)}>
                <FontAwesomeIcon icon={faXmark} />
            </div>
            <div className='input-container name-input'>
                <label>Name</label>
                <input className='input' type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className='input-container'>
                <label>Category</label>
                <input className='input' type='text' placeholder='Category' value={category} onChange={(e) => setCategory(e.target.value)}/>
            </div>
            <div className='price-cost'>
                <div className='input-container'>
                    <label>Price</label>
                    <input className='price' type='number' min="0" placeholder='₱ 0.00' value={price} onChange={(e) => setPrice(e.target.value)}/>
                </div>
                <div className='input-container'>
                    <label>Cost</label>
                    <input className='cost' type='number' min="0" placeholder='₱ 0.00' value={cost} onChange={(e) => setCost(e.target.value)}/>
                </div>
                <div className='input-container'>
                    <label>Stock</label>
                    <input className='price' type='number' min="0" placeholder='2x' value={stock} onChange={(e) => setStock(e.target.value)}/>
                </div>
            </div>
            <div>
                <label>Options<span>{"(optional*)"}</span></label>
                <div className='add-option-container'>
                    <input className='input' type='text' placeholder='Add options' value={optionValue} onChange={(e) => setOptionValue(e.target.value)}/>
                    <div className='add-option-button' onClick={handleAddOption}>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </div>
                <div className='options-container'>
                        {Array.isArray(optionsArr) && optionsArr.map((item, index) => (
                            <div className='option-item' key={index}>
                                <div>{item}</div>
                                <div className='x-option'>
                                    <FontAwesomeIcon icon={faXmark} onClick={() => handleRemoveOption(index)}/>
                                </div>
                            </div>
                        ))}
                    </div>
            </div>
            <button className='button-add-item' type='submit'>{itemData !== null ? "Update Item" : "Add Item"}</button>
        </form>
    </div>
  )
}

export default ItemForm