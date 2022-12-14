import Head from 'next/head'
import dictionary from '../data/words_dictionary.json'
import React, { useEffect, useState } from 'react'

export default function Home() {

  const [ upperCase, setUppercase ] = useState(false)
  const [ lowerCase, setLowerCase ] = useState(false)
  const [ specialCharacters, setSpecialCharacters ] = useState(false)
  const [ numbers, setNumbers ] = useState(false)
  const [ dictionaryCheck, setDictionaryCheck ] = useState(false)
  const [ passwordLength, setPasswordLength ] = useState(0)
  const [ password, setPassword ] = useState('')
  const [ results, setResults ] = useState([])
  const [ errors, setErrors ] = useState([])
  const [passed, setPassed] = useState(false)

  const submitForm = (e) => {
    e.preventDefault()

    let allErrors = []

    setPassed(false)
    setErrors([])

    if ( specialCharacters && !password.match( new RegExp(/[ !"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/) ) ) allErrors.push('No special characters found')
    if ( upperCase && !password.match( new RegExp('[A-Z]') ) ) allErrors.push('No uppercase letters found')
    if ( lowerCase && !password.match( new RegExp('[a-z]') ) ) allErrors.push('No lowercase letters found')
    if ( numbers && !password.match( new RegExp('[1-9]') ) ) allErrors.push('No numbers found')
    if ( password.length > passwordLength ) allErrors.push('Password length too short')

    if ( dictionaryCheck ) {

      let limit = 0
      for (let key of Object.keys(dictionary)) {
        if ( key.length > 3 && password.includes(key) ) {
          limit = limit + dictionary[key]
        }
        if (limit > 2) {
          allErrors.push("Contains too many words from dictionary")
          break
        }
      }

    }

    if (allErrors.length === 0) setPassed(true)
    setErrors(allErrors)
    
  }

  useEffect(() => {
    setPassed(false)
  }, [password, upperCase, lowerCase, numbers, specialCharacters])

  const displayResults = () => {
    if (errors.length === 0 && passed) return <p className='text-green-400 text-3xl'>PASSED!</p>
  
    return errors.map((error, i) => {
      return <p key={i} className='text-red-400 text-xl'>{ error }</p>
    })
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='w-[1000px] m-auto pt-60'>
        <h1 className='text-3xl'>Password Conformance Checker</h1>
        <form onSubmit={ (e) => submitForm(e) }>
          <div className="searchbar w-full flex flex-row items-center my-10">
            <input onChange={ e => setPassword(e.target.value) } value={ password } className='w-full h-8 border-2 px-3 py-2 h-10' placeholder="Enter your password" type="text" />
            <button className='ml-2 bg-slate-400 h-10 w-40'>Submit</button>
          </div>
          <div className="validation-parameters w-full min-h-40">
          <label htmlFor="passwordLength">Password Length: </label>
          <input onChange={ e => setPasswordLength(e.target.value) } value={ passwordLength }  name="passwordLength" type="number" className='border-2 mr-5 ml-3' />

          <label htmlFor="dictionaryCheck mr-5">Dictionary Check</label>
          <input onChange={ e => setDictionaryCheck(e.target.value) } value={ dictionaryCheck } name="dictionaryCheck" type="checkbox" className='ml-1' />

          <h2 className='text-xl mt-4 mb-2'>Includes</h2>

          <div className="w-full flex flex-row">
            <div className="mr-5">
              <label htmlFor="specialCharacters" className='mr-1'>Special Characters</label>
              <input onChange={ e => setSpecialCharacters(e.target.value) } value={ specialCharacters } name="specialCharacters" type="checkbox" className='ml-1' />
            </div>
            <div className="mr-5">
              <label htmlFor="numbers" className='mr-1'>Numbers</label>
              <input onChange={ e => setNumbers(e.target.value) } value={ numbers }  name="numbers" type="checkbox" className='ml-1' />
            </div>
            <div className="mr-5">
              <label htmlFor="uppercase" className='mr-1'>Uppercase</label>
              <input onChange={ e => setUppercase(e.target.value) } value={ upperCase }  name="uppercase" type="checkbox" className='ml-1' />
            </div>
            <div className="mr-5">
              <label htmlFor="lowercase" className='mr-1'>Lowercase</label>
              <input onChange={ e => setLowerCase(e.target.value) } value={ lowerCase }  name="lowercase" type="checkbox" className='ml-1' />
            </div>
          </div>
        </div>
        </form>
        
        
        <div className="results mt-10">
            { displayResults() }
          </div>
      </main>

    </div>
  )
}
