import React, { useState, useEffect} from 'react';
import './App.css';
import Footer from './footer';
import Navbar from './navbar';


function App() {
  const [score, setScore] = useState(0);
  const [dollarValue, setDollarValue] = useState(5.26); // Valor do dólar atual
  const [amount, setAmount] = useState(0); // Quantidade de reais que o usuário pretende gastar
  const [miles, setMiles] = useState(0); // Pontos convertidos em reais
  const [realValue, setRealValue] = useState(0); // Valor em reais dos pontos
  const [discount, setDiscount] = useState(0); // Valor do desconto
  const [discountValue, setDiscountValue] = useState(0); // Valor do desconto em reais
  const [advantage, setAdvantage] = useState(''); // Vantagem entre pontos e desconto
  const [storePoints, setStorePoints] = useState(0); // Pontos da loja
  const [bonusTransferPercentage, setBonusTransferPercentage] = useState(0); // Porcentagem da transferência bonificada
  const [bonusTransferValue, setBonusTransferValue] = useState(0); // Valor em reais da transferência bonificada
  const [bonusTransferPoints, setBonusTransferPoints] = useState(0); // Pontos da transferência bonificada
  const [pontos, setPontos] = useState(0);
  const [pontosBonificados, setPontosBonificados] = useState(0);
  const [totalPontos, setTotalPontos] = useState(0);
  const [valorEmReais, setValorEmReais] = useState(0);
  const taxaConversao = 0.01; // Ajuste para a taxa de conversão desejada

  const POINTS_TO_REAL_RATIO = 8.40 / 467; // Taxa de conversão de pontos para reais



  const calculateMiles = () => {
    const calculatedMiles = ((amount / dollarValue) * score) + (storePoints * amount);
    setMiles(Math.round(calculatedMiles)); // Arredonda para o número inteiro mais próximo
    setPontos(Math.round(calculatedMiles)); // Atualiza os pontos
  
    const calculatedRealValue = calculatedMiles * POINTS_TO_REAL_RATIO;
    setRealValue(Number(calculatedRealValue.toFixed(2))); // Arredonda para 2 casas decimais
    const calculatedDiscountValue = (amount * discount) / 100;
    setDiscountValue(Number(calculatedDiscountValue.toFixed(2))); // Arredonda para 2 casas decimais
  
    if (calculatedRealValue > calculatedDiscountValue) {
      setAdvantage('Nesse caso, é mais vantajoso obter os pontos.');
    } else if (calculatedRealValue < calculatedDiscountValue) {
      setAdvantage('Nesse caso, é mais vantajoso obter o desconto.');
    } else {
      setAdvantage('Tanto faz usar um como o outro.');
    }
    calculateTotalPointsAndValue();
  };
  
  const calculateBonusTransfer = () => {
    const bonusMiles = pontos * (bonusTransferPercentage / 100);
    setBonusTransferPoints(Math.round(bonusMiles)); // Arredonda para o número inteiro mais próximo
    setPontosBonificados(Math.round(bonusMiles)); // Atualiza os pontos bonificados
  
    // Atualiza o valor em reais com base nos pontos bonificados
    const bonusTransferValue = bonusMiles * POINTS_TO_REAL_RATIO;
    setBonusTransferValue(Number(bonusTransferValue.toFixed(2))); // Arredonda para 2 casas decimais
  
    // Atualiza o total de pontos
    const total = pontos + Math.round(bonusMiles);
    setTotalPontos(total);
    
    // Atualiza o valor em reais com base no total de pontos
    const valor = total * taxaConversao;
    setValorEmReais(valor);
    calculateTotalPointsAndValue();
  };

  const calculateTotalPointsAndValue = () => {
    // Soma miles e bonusTransferPoints para obter o total de pontos
    const totalPoints = miles + bonusTransferPoints;
    setTotalPontos(totalPoints);
  
    // Converte o total de pontos para reais usando a taxa POINTS_TO_REAL_RATIO
    const valorEmReais = totalPoints * POINTS_TO_REAL_RATIO;
    setValorEmReais(Number(valorEmReais.toFixed(2))); // Arredonda para 2 casas decimais
  };

  useEffect(() => {
    calculateTotalPointsAndValue();
  }, [pontos, pontosBonificados]); // Dependências do useEffect

  const calculateMilheiroValue = () => {
    if (totalPontos > 0) {
      const milheiroValue = valorEmReais / totalPontos * 1000;
      return milheiroValue.toFixed(2);
    }
    return 0;
  };
  
  useEffect(() => {
    calculateTotalPointsAndValue();
    calculateMilheiroValue();
  }, [pontos, pontosBonificados]); // Dependências do useEffect

  const resetFields = () => {
    setScore(0);
    setAmount(0);
    setStorePoints(0);
    setMiles(0);
    setRealValue(0);
    setDiscount(0); // Adicione esta linha
    setDiscountValue(0);
    setAdvantage('');
    setBonusTransferPercentage(0);
    setBonusTransferPoints(0);
    setBonusTransferValue(0);
    setPontos(0);
    setPontosBonificados(0);
    setTotalPontos(0);
    setValorEmReais(0);
  };

    return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <div>
        <h3>Simule agora se é mais vantajoso você ganhar pontos ou optar 
        <br />pelo desconto ao fazer suas compras!</h3>
        </div>
        <div className="calculator">
        <h2>Calculadora de Pontos ou Descontos</h2>
          <p>
            Digite a pontuação do seu cartão por dólar:
            <input type="number" value={score} onChange={e => setScore(e.target.value)} />
          </p>
          
          <p>
            Digite quanto você pretende gastar em reais (R$):
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
          </p>

          <p>
            Caso ganhe, digite aqui os pontos dos parceiros:
            <input type="number" value={storePoints} onChange={e => setStorePoints(e.target.value)} />
          </p>
          <p><strong>Você ganhará {miles} pontos.</strong></p>
          <p><strong>Seus pontos equivalem a R$ {realValue.toFixed(2)} na Livelo</strong></p>
          <p>==================================================</p>
          <p></p>
          <p>
            Digite o desconto da loja pagando no PIX ou Boleto:
            <input type="number" value={discount} onChange={e => setDiscount(e.target.value)} />
            <span>%</span>
          </p>

          <p><strong>Se optar pelo desconto o valor será de R$ {discountValue.toFixed(2)}.</strong></p>

          <p>==================================================</p>
          
          <p className="advantage">{advantage}</p>

          <button onClick={calculateMiles}>Calcular pontos</button>
          
        </div>
        <div className="bonus-transfer">
          <h2>Transferência Bonificada</h2>
          <p>
            Digite a porcentagem da transferência bonificada:
            <input type="number" value={bonusTransferPercentage} onChange={e => setBonusTransferPercentage(e.target.value)} />
            <span>%</span>
          </p>
          <button onClick={calculateBonusTransfer}>Calcular transferência bonificada</button>
          <p><strong> Você ganhará {bonusTransferPoints} pontos com a transferência bonificada.</strong></p>
          <p><strong>O valor da transferência bonificada é R$ {bonusTransferValue.toFixed(2)}.</strong></p>
        </div>
        <p></p>
        <div className="total-points">
        <h2>TOTAL DA SIMULAÇÃO</h2>
        <p>Total de pontos que você ganhará: {totalPontos}</p>
        <p>Valor em reais na Livelo equivalente aos pontos: R$ {valorEmReais.toFixed(2)}</p>
        <p>Valor do milheiro que você está ganhando: R$ {calculateMilheiroValue()}</p>
      </div>
        <p></p>
        <button onClick={resetFields}>Novo cálculo</button>
      </header>
      <Footer/>
    </div>
  );
}

export default App;