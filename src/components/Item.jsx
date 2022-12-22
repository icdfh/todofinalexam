import React from 'react'
import check from '../images/icon-check.svg'
import cross from '../images/icon-cross.svg'

function Item({index,item,deleteById,checkById,handleDragStart,handleDragEnter,handleDragEnd}) {



    if(item.state === 1){

        return (
            <div className='item__cont' draggable onDragStart={()=>handleDragStart(index)} 
                onDragEnter={()=>handleDragEnter(index)} 
                onDragEnd={handleDragEnd}>
                <div className='item'>
                 <div className='Form__circle' onClick={()=>checkById(item)}></div>
                    <div className='item__item'>
                        <p>{item.task}</p>
                        <button className='item__cross' onClick={()=>deleteById(item.id)}>
                            <img src={cross} alt='cross'></img></button>
                    </div>
                </div>
            </div>
            
        )
    }else{
        return (
            <div className='item__cont' draggable onDragStart={()=>handleDragStart(index)} 
                onDragEnter={()=>handleDragEnter(index)} 
                onDragEnd={handleDragEnd}>
                <div className='item'>
                    <div className='Form__circle__checked' onClick={()=>checkById(item)}>
                        <img src={check} alt='check'></img>
            </div>
                <div className='item__item__checked'>
                        <p>{item.task}</p>
                        <button className='item__cross' onClick={()=>deleteById(item.id)}>
                            <img src={cross} alt='cross'></img></button>
                    </div>
                </div>
            </div>
        )
    }


}

export default Item