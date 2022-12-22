import React from 'react'
import './Form.css'
import Item from './Item';
import NoItem from './NoItem';

function Form({theme,entry,handleEntry,handleForm,data,filter,filterData,handleFilter,deleteById,checkById,clearAll,handleDragStart,handleDragEnter,handleDragEnd}) {

   let itemLeft = data.filter(task => task.state === 1);



   return (
    <div className={!theme? 'Form':'Form Form--Dark'}>
        <form className='Form__container' onSubmit={handleForm}>
            <div className='Form__circle'></div>
            <input type='search' placeholder='Create a new todo...' className='Form__input' value={entry} onChange={handleEntry}></input>
        </form>

        <div className='Form__items'>

            {
                !data.length && <NoItem/>
            }

            {
                filterData.map((item,index) => {
                   return <Item 
                   index={index}
                   key={item.id} 
                   item={item} 
                   deleteById={deleteById} 
                   checkById={checkById} 
                   handleDragStart={handleDragStart}
                   handleDragEnter={handleDragEnter}
                   handleDragEnd={handleDragEnd}
                   />
                })
            }
            

            <div className='Form__options'>
                <div>{itemLeft.length} items left</div>
                <div>
                    <ul className='Form__filters'>
                        <li className={filter ===1 ? 'filters__color':''} onClick={()=>handleFilter(1)}>All</li>
                        <li className={filter ===2 ? 'filters__color':''} onClick={()=>handleFilter(2)}>Active</li>
                        <li className={filter ===3 ? 'filters__color':''} onClick={()=>handleFilter(3)}>Completed</li>
                    </ul>
                </div>
                <div className='Form__clear' onClick={clearAll}>Clear Complete</div>
            </div>

        </div>


            <ul className='Form__filters__small'>
                <li className={filter ===1 ? 'filters__color':''} onClick={()=>handleFilter(1)}>All</li>
                <li className={filter ===2 ? 'filters__color':''} onClick={()=>handleFilter(2)}>Active</li>
                <li className={filter ===3 ? 'filters__color':''} onClick={()=>handleFilter(3)}>Completed</li>
            </ul>


    </div>
  )
}

export default Form