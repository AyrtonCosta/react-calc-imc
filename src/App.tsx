
import { useState } from 'react'

import './global.css'
import styles from './App.module.css'

import  poweredImg  from './assets/powered.png'
import leftArrowImg from './assets/leftArrow.png'

import {GridItem} from './components/GridItem/GridItem'
import {levels,calculateImc, Level} from './helpers/imc'



function App() {
  const [heightFiel,setHeightField] = useState<number>(0)
  const [weightFiel,setWeightField] = useState<number>(0)
  const [toShow,setToShow] = useState<Level | null>(null)

  function handleCalculateButton(){
   if(heightFiel && weightFiel){
    setToShow(calculateImc(heightFiel,weightFiel))
   }else {
    alert("Preencha todos os campos")
   }
  }

  const handleBackButton = () => {
    setToShow(null)
    setHeightField(0)
    setWeightField(0)
  }
 return(
  <div className={styles.main}>
    <header>
      <div className={styles.headerContainer}>
        <img src={poweredImg} alt="Logo" width={150} />
      </div>
    </header>

    <div className={styles.container}>
      <div className={styles.leftSide}>
      <h1>Calcule o seu IMC</h1>
      <p>IMC é a sigla para Índice de Masssa Corpórea, parâmetro adotado pela Organização Mundial da Saúde para calcular o peso ideal de cada pessoa.</p>
      <input 
      type="number" 
      disabled={toShow ? true : false}
      placeholder="Digite sua altura. Ex 1.5(em métros)"
      value={heightFiel > 0 ? heightFiel : '' }
      onChange={e => setHeightField(parseFloat(e.target.value))} 
      />
      <input 
      type="number" 
      disabled={toShow ? true : false}
      placeholder="Digite o seu peso. Ex 78.8(em kg)"
      value={weightFiel > 0 ? weightFiel : '' }
      onChange={e => setWeightField(parseFloat(e.target.value))} 
      />

      
      <button onClick={handleCalculateButton} disabled={toShow ? true : false} >Calcular</button>
      </div>
      <div className={styles.rightSide}>
       {!toShow && 
      <div className={styles.grid}>
          {levels.map((item,key) => (
            <GridItem key={key} item={item}/>
          ))}
      </div>
      }
      {toShow && 
        <div className={styles.rightBig}>
          <div className={styles.rightArrow} onClick={handleBackButton}>
            <img src={leftArrowImg} alt="" width={25} />
          </div>
          <GridItem item={toShow}/>
        </div>
      }
      </div>

    </div>
  </div>
 )
}

export default App
