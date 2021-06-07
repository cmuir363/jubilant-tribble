import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Fib = (props) => {

  const [seenIndexes, setSeenIndexes] = useState([])
  const [values, setValues] = useState({})
  const [index, setIndex] = useState('')

  useEffect(() => {
    fetchValues()
    fetchIndexes()
  }, [])


  const fetchValues = () => {
    axios.get('api/values/current')
    .then(valuesRes => {
      setValues(valuesRes.data)
    })
  }

  const fetchIndexes = () => {
    axios.get('api/values/all')
    .then(seenIndexesRes => {
      setSeenIndexes(seenIndexesRes.data)
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post('/api/values', {
      index: index
    })
    setIndex('')
  }

  const renderEntries = () => {
    const entries = []
    for (let key in values) {
      if (key !== "undefined") {
        entries.push(
          <div key={key}>
            For Index {key} I calculated {values[key]}
          </div>
        )
      }
    }
    return entries
  }

  const renderValues = () => {
    return seenIndexes.map(({ number }) => number).join(', ')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index:</label>
        <input
          value={index}
          onChange={event => setIndex(event.target.value)}
        />
        <button>Submit</button>
      </form>


      <h3>Indexes I have seen:</h3>
      {
        renderValues()
      }


      <h3>CalculatedValues:</h3>
      {renderEntries()}
    </div>
  )
}

export default Fib
