import React, {useRef, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import ParamEditor from './ParamEditor';

const initParams = [
  {
    "id": 1,
    "name": "Назначение"
  },
  {
    "id": 2,
    "name": "Длина"
  },
  {
    "id": 3,
    "name": "Параметр без начального значения"
  }
];

const initModel = 
{
  "paramValues": [
    {
      "paramId": 1,
      "value": "повседневное"
    },
    {
      "paramId": 2,
      "value": "макси"
    }
  ] 
}

let counter = initParams.length;

function App() {

  const paramsEditorInstance = useRef<ParamEditor>(null);  
  const [newParamName, setNewParamName] = useState('new param');  

  const handleParamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewParamName(event.target.value);
  }; 
  
  const addParamsFunc = () => {
    if (newParamName) {
      if (paramsEditorInstance.current) {
        paramsEditorInstance.current.addParam({id: ++counter, name: newParamName});
      }
    }
  }

  const printParamsFunc = () => {
    if (paramsEditorInstance.current){
      console.log('Params values: ', paramsEditorInstance.current.getModel().paramValues);
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <label htmlFor='new_param_name'>New param name: </label>
          <input 
            type="text"
            id='new_param_name'
            value={newParamName}
            onChange={handleParamChange}            
            >
          </input>
          <button onClick={addParamsFunc}>Add param</button>
        </div>

        <ParamEditor params={initParams} model={initModel} ref={paramsEditorInstance}/>
        <button onClick={printParamsFunc}>Print params</button>
      </header>
    </div>
  );
}

export default App;
