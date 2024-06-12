import React, { useState, useEffect } from 'react';
import {database, ref, onValue} from './config'
import ItemForm from './components/ItemForm';
import Item from './components/Item';
import ConfirmationDialog from './components/ConfirmationDialog';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faPlus, faFilter, faGhost } from '@fortawesome/free-solid-svg-icons'
import notfound from './images/no-result.jpg'
import './App.css';
import { toast } from 'sonner';

function App() {
  const [showForm, setShowForm] = useState(false)
  const [showDialog,setShowDialog] = useState(false)
  const [menuList, setMenuList] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [itemData,setItemData] = useState(null)

  const exitForm = (setExit,data) => {
    setShowForm(setExit)
    setItemData(data)
  }
  const openDialog = (isOpen,data) => {
    setShowDialog(isOpen)
    setItemData(data)
  }
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showForm]);

  useEffect(() => {
    const dbRef = ref(database, 'menu');
    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const fetchedData = snapshot.val();
        const dataArray = Object.keys(fetchedData).map(key => ({
          id: key,
          ...fetchedData[key]
        }));
        setMenuList(dataArray);
      } else {
        toast.error("No data available")
      }
    }, (error) => {
      toast.error("Error fetchind data.")
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const filtered = menuList.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
      // item.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // item.cost.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // item.stock.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredList(filtered);
  }, [searchTerm, menuList]);


  return (
    <div className="App">
      {showForm ? <ItemForm closeForm={exitForm} itemData={itemData} /> : null}
      <div className='menu-container'>
        <div className='search-container'>
          <div className='search-filter'>
            <div className='search-box'>
              <input type='text' placeholder='Search' className='search-bar' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
              <FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass} />
            </div>
            <FontAwesomeIcon className='icon-filter' title='Filter items' icon={faFilter} />
          </div>

          <div className='create-box' onClick={() => setShowForm(true)}>
            <FontAwesomeIcon className='plus-icon' icon={faPlus} />
            <button className='button-create' >Add new Item</button>
          </div>

        </div>

        <div className='menu-table-container'>
          <div className='table-header'>
            <div>Name</div>
            <div>Category</div>
            <div>Options</div>
            <div>Price</div>
            <div>Cost</div>
            <div>Stock</div>
          </div>
          <div className='table-content'>
            {filteredList.length > 0 ? 
              filteredList.map((item, index) => (
                <Item key={item.id} data={item} index={index} showForm={exitForm} showDialog={openDialog} />
              ))
            : menuList.length > 0 && filteredList.length <= 0 
            ? <div className='empty-state'>
            <img src={notfound} className='no-result-img' alt='not found'/>
            <div>Oops!</div>
            <div>No matches found.<br/>Please try a different search term.</div>
          </div>
            :<div className='empty-state'>
            <FontAwesomeIcon className='ghost-icon' icon={faGhost} />
            <div>Oops!</div>
            <div>No items found.<br></br>Please add a new item.</div>
          </div>}
            
          </div>
        </div>
      </div>
      {showDialog ? <ConfirmationDialog openDialog={openDialog} data={itemData} /> : null}
    </div>
  );
}

export default App;
