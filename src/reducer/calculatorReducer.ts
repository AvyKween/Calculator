
interface solveProps {
    symbol: string,
    value: string
}

export interface actionProps {
    type: '[Calculator] Add' | '[Calculator] Delete One' | '[Calculator] Remove All' | '[Calculator] Solve',
    payload?: solveProps | string | undefined
}

const addNumber = (state: Array<string>, action: actionProps) => {
    if ( state[0] === '0' ) return  [action.payload]
    if ( state.includes('.') && action.payload === '.' ) return state
    return [
        ...state,
        action.payload
    ]

}

const deleteOne = (state: Array<string>) => {
    if ( state.length === 1 ) return ['0']
    return state.slice(0, -1)
}

export const solveOperation = (state: Array<string>, { payload }: any) => {
    if ( payload.symbol === '+' ) return [ parseFloat(payload.value) + parseFloat(state.join('')) ] 

    if ( payload.symbol === '-' ) return [ parseFloat(payload.value) - parseFloat(state.join('')) ]

    if ( payload.symbol === 'x' ) return [ parseFloat(payload.value) * parseFloat(state.join('')) ]

    if ( payload.symbol === '÷' && state.join('') === '0' ) return ['0']
    if ( payload.symbol === '÷' ) return [ parseFloat(payload.value) / parseFloat(state.join('')) ]

    return state
}

export const calcReducer = (state: Array<string>, action: actionProps ) => {

    switch (action.type) {
        case '[Calculator] Add':
            return addNumber(state, action)

        case '[Calculator] Delete One':
            return deleteOne(state)

        case '[Calculator] Remove All':
            return ['0']

        case '[Calculator] Solve':
            return solveOperation(state, action)

        default:
            return state
    }
}


