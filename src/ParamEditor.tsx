import React from 'react';
import './ParamEditor.css';

enum ParamType {
  String,
}

interface Param {
  id: number;
  name: string;
  type?: ParamType | undefined;
}

interface ParamValue {
   paramId: number;
   value: string;
}

interface Model {
   paramValues: ParamValue[];
   // colors: Color[];
}

interface Props {
   params: Param[];
   model: Model;
}

interface State {
  params: Map<number, Param>,
  values: Map<number, ParamValue>,
}

class ParamEditor extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    
    this.state = {
      params: new Map<number, Param>(),
      values: new Map<number, ParamValue>()
    };

    this.props.params.forEach((param) => {
      this.state.params.set(param.id, param );
    });

    this.props.model.paramValues.forEach((paramValue) => {
      this.state.values.set(paramValue.paramId, paramValue);
    });
  }

  public getModel(): Model {
    return {
      paramValues: [...this.state.values.values()]
    }
  }

  public addParam(param: Param): void {
    this.state.params.set(param.id, param); 
    //this.state.values.set(param.id, paramValue);
    this.setState(this.state);
  }

  private _handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const { id, value } = event.target;
    // console.log('ID:', id);
    // console.log('Value:', value);  

    let paramId = 0;
    const match = id.match(/^param_id_(\d+)$/);
    if (match){
      paramId = parseInt(match[1], 10);
    } else {
      console.log("Can't recognize param id number from input id=", id);
      return;
    }

    this.state.values.set(paramId, { paramId, value });
    this.setState(this.state);
  };  

  render() {
      return (
          <form className='editor'>
              <ul className='editor__items'>
                {[...this.state.params].map(([paramId, param]) => 
                    <li className='editor__item' key={paramId}>
                      <label className='editor__paramName' htmlFor={`param_id_${paramId}`}>{param.name}</label>
                      <input 
                        type="text"
                        className='editor__paramInput' 
                        id={`param_id_${paramId}`} 
                        value={this.state.values.get(paramId)?.value || ""} 
                        onChange={this._handleInputChange}>
                      </input>
                    </li>
                )}
            </ul>              
          </form>
      );
  }   
}

export default ParamEditor;
