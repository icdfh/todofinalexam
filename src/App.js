import { useState,useEffect} from 'react';
import './App.css';
import Footer from './components/Footer';
import Form from './components/Form';
import Header from './components/Header';
import bg from './images/bg-desktop-light.jpg'
import bgdark from './images/bg-desktop-dark.jpg'

let DataBase =JSON.parse(localStorage.getItem("todos")) || [];
let darkTheme = JSON.parse(localStorage.getItem("darkTheme")) || false;



function App() {

/* ------------- Состояния ------------- */

  const [data, setData] = useState(DataBase);
  const [entry, setEntry] = useState('');
  const [filter, setFilter] = useState(1);
  const [filterData, setFilterData] = useState(DataBase);
  const [theme, setTheme] = useState(darkTheme);

  const [dragged, setDragged] = useState('');
  const [draggedOver, setDraggedOver] = useState('');


useEffect(() => {

  let newfilterData;
  if(filter === 1){
    newfilterData=data;
  }else if(filter === 2){
    newfilterData = data.filter(task => task.state === 1);
  }else if(filter === 3){
    newfilterData = data.filter(task => task.state === 2);
  }

  setFilterData(newfilterData);

}, [data,filter]);

useEffect(() => {

localStorage.setItem("todos", JSON.stringify(data));


}, [data]);

  

/*  Функции */

  const handleEntry = (event) =>{
    setEntry(event.target.value);
  }

  const handleForm = (event) =>{
    event.preventDefault();
    saveData({task:entry});
  }

  const handleTheme = () =>{
    localStorage.setItem("darkTheme", JSON.stringify(!theme));
    setTheme(!theme);
    
  }

/*  Методы  */


const findNextID = () =>{
  if(data.length > 0){
      let ids = data.map(task =>  task.id);
      const max = Math.max.apply(null, ids);
      return max+1;
  }else{
      return 1;
  }
}

const saveData = (obj) =>{
      let proximoId = findNextID();
      obj = {...obj,id:proximoId,state:1};
      let datosAGuardar = [...data,obj];
      setData(datosAGuardar);
      setEntry('');
}

const deleteById = (id) =>{
      let nuevosDatos = data.filter(task => task.id !== id);
      setData(nuevosDatos);
}

const checkById = (obj) =>{
      let newState;
      if(obj.state===1){
        newState=2;
      }else{
        newState=1;
      }
      let nuevoDatos = data.map(el => el.id === obj.id ? {...obj, state:newState}:el);
      setData(nuevoDatos)
}

const clearAll = () =>{
    let nuevoDatos = data.filter(task => task.state === 1);
    setData(nuevoDatos);
}

const handleFilter = (just) =>{
    setFilter(just);
}

/* DRAG AND DROP  */

const handleDragStart = (id)=>{
  setDragged(id);
  }

const handleDragEnter = (id) =>{
 setDraggedOver(id);
}

const handleDragEnd = ()=>{
 let newData = [...data];
 let valorAMover = newData.splice(dragged,1)[0];
 newData.splice(draggedOver,0,valorAMover);
 setData(newData);
}


/*  Рендер  */

  return (
    <div className={!theme? 'App':'App App--Dark'} style={{ backgroundImage: `url(${theme? bgdark :bg})` }}>
      <div className='App__container'>
        <Header theme={theme} handleTheme={handleTheme}/>
        <Form theme={theme} 
        entry={entry} 
        handleEntry={handleEntry} 
        handleForm={handleForm} 
        data={data} filter={filter} 
        filterData={filterData} 
        handleFilter={handleFilter} 
        deleteById={deleteById} 
        checkById={checkById} 
        clearAll={clearAll} 
        handleDragStart={handleDragStart} 
        handleDragEnter={handleDragEnter} 
        handleDragEnd={handleDragEnd}/>
        <Footer/>
      </div>
      
    </div>
  );
}

export default App;
