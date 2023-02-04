import { Reducer, useReducer, useState } from "react"
import { actionProps, calcReducer, solveOperation } from './reducer/calculatorReducer';


const initialState: Array<string> = ['0']

const operatorInit = {
  symbol: '',
  value: ''
}


function Calculator() {

  const [state, dispatch] = useReducer<Reducer<any, actionProps>>(calcReducer, initialState)

  const [operator, setOperator] = useState(operatorInit)

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement>) => dispatch({
    type: '[Calculator] Add',
    payload: e.currentTarget.innerHTML
  })

  const handleDeleteOne = () => dispatch({
      type: '[Calculator] Delete One',
    })

  const handleRemoveAll = () => {
    dispatch({
      type: '[Calculator] Remove All'
    })
    setOperator(operatorInit)
  }

  const handleSolve = () => {
    dispatch({
      type: '[Calculator] Solve',
      payload: operator
    })
    setOperator(operatorInit)
  }

  const setOperation = ({ currentTarget }: React.MouseEvent<HTMLButtonElement>) => {

    switch (true) {
      case state.join('') === '0' && operator.value.length === 0:
        break;
        
      case state.join('') === '0' && operator.value.length > 0:
        setOperator(v => ({ ...v, symbol: currentTarget.innerHTML }))
        break;

      case state.join('') !== '0' && operator.value.length === 0:
        setOperator({ symbol: currentTarget.innerHTML, value: state.join('') })
        dispatch({
          type: '[Calculator] Remove All'
        })
        break;

      case state.join('') !== '0' && operator.value.length > 0:
        dispatch({
          type: '[Calculator] Remove All'
        })

        const newValue = solveOperation(state, {
          payload: {
            symbol: operator.symbol,
            value: operator.value
          }
        })

        setOperator({
          symbol: currentTarget.innerHTML,
          value: newValue.join('')
        })
        break;
    
      default:
        throw new Error('Uncaught Exception')
    }
  }


  return (
    <div className="calculator">
      <div className="output">
        <div className="prev">{ operator.value } { operator.symbol }</div>
        <div className="curr">{ state }</div>
      </div>

      <button onClick={handleRemoveAll} className="button-ac">AC</button>
      <button onClick={handleDeleteOne}>CE</button>
      <button onClick={setOperation}>÷</button>
      <button onClick={handleAdd}>7</button>
      <button onClick={handleAdd}>8</button>
      <button onClick={handleAdd}>9</button>
      <button onClick={setOperation}>x</button>
      <button onClick={handleAdd}>4</button>
      <button onClick={handleAdd}>5</button>
      <button onClick={handleAdd}>6</button>
      <button onClick={setOperation}>-</button>
      <button onClick={handleAdd}>1</button>
      <button onClick={handleAdd}>2</button>
      <button onClick={handleAdd}>3</button>
      <button onClick={setOperation} className="button-add">+</button>
      <button onClick={handleAdd}>0</button>
      <button onClick={handleAdd}>.</button>
      <button onClick={handleSolve}>=</button>
    </div>
  )
}

export default Calculator
