import React from 'react'
import '../css/ConfirmationDialog.css'
import { database, ref, remove } from '../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { toast } from 'sonner';

function ConfirmationDialog({openDialog,data}) {
    const handleDeleteItem = async () => {
        // e.preventDefault();
        if(data !== null ) {
            try {
              await remove(ref(database, 'menu/' + data.id));
              toast.success('Data deleted successfully');
            } catch (error) {
              toast.error('Failed to delete data');
            }
            openDialog(false,null)
        }
      };
  return (
    <div className='confirmation-background' >
        <div className='confirmation-container'>
            <div>
                <FontAwesomeIcon icon={faExclamationCircle} className='icon-exclamation'/>
                <div className='confirm-title'>Confirm deletion</div>
                <div className='confirm-sub'>Are you sure you want to delete this item?<br/>This action cannot be undone.</div>
            </div>
            <div className='action-container'>
                <button type='button' className='cancel-btn' onClick={() => openDialog(false,null)}>Cancel</button>
                <button type='button' className='confirm-btn' onClick={handleDeleteItem}>Confirm</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmationDialog