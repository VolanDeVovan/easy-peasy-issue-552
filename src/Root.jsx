import { useStoreActions, useStoreRehydrated, useStoreState } from 'easy-peasy'
import React from 'react'

export const Root = () => {
    const rehydrated = useStoreRehydrated()

    const value = useStoreState(state => state.value)
    const computedValue = useStoreState(state => state.computedValue)
    const increment = useStoreActions(actions => actions.increment)

    if (!rehydrated) { 
        return <h1>Loading...</h1>
    }

    return (
        <>
            <p>Value: {value}</p>
            <p>Computed value: {computedValue}</p>
            <br />
            <button onClick={() => increment()}>increment</button>            
        </>
    )
}

export default Root