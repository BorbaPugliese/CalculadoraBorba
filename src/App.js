import React, {Component} from 'react';
import './App.css';
import { render } from '@testing-library/react';

function Display(props){  //Função que criará o conteúdo do Display
  return(
    <p className="p1">{props.value}</p>
  );
}

function Number(props){   //Função que criará os números salvos na memória
  return(
  <p className="p2">{props.numb}</p>
  )
}

class App extends Component {   //Classe que conterá os componentes
    constructor(props){
      super(props);

      this.state = {
        previousOperand: '',  //número anterior
        currentOperand: '',   //número atual
        operation: '',        //operador básico que será usado   
        memory:[]             // lista que conterá os dados de memória
      };

    /* Definição com o bind para utilizar o this*/  
    this.clearDisplay = this.clearDisplay.bind(this);
    this.AddNumber = this.AddNumber.bind(this);
    this.AddOperation = this.AddOperation.bind(this);
    this.SaveMemory = this.SaveMemory.bind(this);
    this.EraseMemoryOnly = this.EraseMemoryOnly.bind(this);
    this.EraseAllMemory = this.EraseAllMemory.bind(this);
    this.RecoverMemoryOnly = this.RecoverMemoryOnly.bind(this);
    this.RecoverLastMemory = this.RecoverLastMemory.bind(this);
    this.SumLastMemory = this.SumLastMemory.bind(this);
    /* Fim da definição*/
    }
    
  /*Métodos*/
    clearDisplay(){  // Esse método setará o valor atual da calculadora para zero
      this.setState(state => {
        return{
          currentOperand: ''
        };
      });
    }

    AddNumber(number){  //Esse método seta o valor atual como o valor que já existe e o próximo valor 
      this.setState(state=> {
        return{
          currentOperand: state.currentOperand + number
        };
      });
    }

    AddOperation(operation_mean){  //Esse método adiciona o operador básico

      if(this.state.previousOperand != ''){  //Caso tenha número e seja adicionado um valor ele fará o calculo

          this.EqualOperation()
          this.setState(state => ({operation: operation_mean}));
       } 

      else{   //Caso não tenha valor anterior 
        this.setState(state => ({
          operation: operation_mean,  //Adiciona o operador
          previousOperand: this.state.currentOperand,  //Valor anterior será atual
          currentOperand: ''  //Valor atual é zerado
      }));

      }
    }

    EqualOperation(){
      var result
      const prevFloat = parseFloat(this.state.previousOperand)  //Transformação de String para Float
      const curtFloat = parseFloat(this.state.currentOperand)   //Transformação de String para Float

      switch(this.state.operation){  //Dependendo do valor do operador o método fará uma conta diferente

        case '/':
          result = prevFloat / curtFloat;
          break;

        case 'x':
          result = prevFloat * curtFloat;
          break;

        case '+':
          result = prevFloat + curtFloat;
          break;

        case '-':
          result = prevFloat - curtFloat;
          break;

        default:  // Caso não aconteça nada, o valor será o mesmo o atual
          result = curtFloat;

      }
      this.setState(state => ({   //Seta o resultado no valor anterior e zerá os valores atuais e do operador
        previousOperand: result,
        currentOperand:'',
        operation:''
      }));
    }

  /*Memória*/

    SaveMemory(value){   //Salvar número na memória
      var tempList = this.state.memory;  // Foi criada uma variável para que pudesse adicionar um item na lista de memória
      tempList.push(value);
      this.setState(state => ({memory: tempList})); //Lista de memória principal receberá a lista criada
    }

    EraseMemoryOnly(item){   // Apaga somente um item 
        const newmemory = [].concat(this.state.memory) //Cria const pra fazer alteração na memória de maneira indireta
        newmemory.splice(item, 1);  //Apaga o item selecionado
        this.setState({memory: newmemory});       
    }

    EraseAllMemory(){  //Apaga toda a memória setando a memória para uma lista vazia
      this.setState(state =>({memory: []}));
    }

    RecoverMemoryOnly(props){   // Recupera o valor da memória para o valor atual
      var futureOperand = this.state.memory[props];  //Cria variável para alteração na memória 
      this.setState(state => ({currentOperand:futureOperand}));  // Adiciona o valor encontrado no valor atual
    }

    RecoverLastMemory(){  //Recupera o último valor da memória
      
      var LastOperand = this.state.memory[this.state.memory.length-1];  //Cria variável com o ultimo valor na memória
      var futureOperand = this.state.memory[this.state.memory.indexOf(LastOperand)];  // Variável com index
      this.setState(state => ({currentOperand:futureOperand}));  //Define o valor da ultima memória como valor atual
    }

    SumLastMemory(){  //Soma o valor atual no último valor da memória 

      var LastOperand = this.state.memory[this.state.memory.length-1];  // Processo similar ao RecoverLastMemory para encontrar o ultimo valor 
      console.log(this.state.memory);
      console.log(LastOperand);
      var currentFloat = parseFloat(this.state.currentOperand);
      var futureOperand = this.state.memory[this.state.memory.indexOf(LastOperand)];
      var futureFloat = parseFloat(futureOperand);
      var sum = currentFloat + futureFloat;
      this.setState(state => ({currentOperand:sum})); //No final soma o valor atual com o valor no ultimo valor da memória

    }

  /*Fim da Memória*/

  /*Fim dos Métodos*/

    /*Visual da calculadora*/
    render(){

    return(
      <div className="App">
          <header className="App-header">
            <div className="row">
              <div className="calculator">
              <div className="row">
              <button id = "clear" className="clear" onClick={() => this.clearDisplay()}>AC</button> 
                <div className="top">
                  <div className="column">
                  <div className="top_previous"><Display value = {this.state.previousOperand}/></div>
                  <div className="top_current"><Display value = {this.state.currentOperand}/></div>
                </div>
                </div>
                </div>
                <div className="keys"> 
                  <div className="row">
                    <button className="memory" onClick={() => this.EraseAllMemory()}>MC</button>
                    <button className="memory" onClick={() => this.RecoverLastMemory()}>MR</button>
                    <button className="memory" onClick={() => this.SumLastMemory()}>M+</button>
                    <button className="memory" onClick={() => this.SaveMemory(this.state.previousOperand)}>MS</button>
                  </div>                
                  <div className="row">
                    <button className="number" onClick={() => this.AddNumber(7)}>7</button>
                    <button className="number" onClick={() => this.AddNumber(8)}>8</button>
                    <button className="number" onClick={() => this.AddNumber(9)}>9</button>
                    <button className="operator" onClick={() => this.AddOperation('/')}>÷</button>
                  </div>
                  <div className="row">
                    <button className="number" onClick={() => this.AddNumber(4)}>4</button>
                    <button className="number" onClick={() => this.AddNumber(5)}>5</button>
                    <button className="number" onClick={() => this.AddNumber(6)}>6</button>
                    <button className="operator" onClick={() => this.AddOperation('x')}>x</button>
                  </div>
                  <div className="row">
                    <button className="number" onClick={() => this.AddNumber(1)}>1</button>
                    <button className="number" onClick={() => this.AddNumber(2)}>2</button>
                    <button className="number" onClick={() => this.AddNumber(3)}>3</button>
                    <button className="operator" onClick={() => this.AddOperation('-')}>-</button>
                  </div>
                  <div className="row">
                    <button className="number" onClick={() => this.AddNumber(0)}>0</button>
                    <button className="number" onClick={() => this.AddNumber('.')}>.</button>
                    <button className="eval" onClick={() => this.EqualOperation()}>=</button>
                    <button className="operator" onClick={() => this.AddOperation('+')}>+</button>
                  </div>
                </div>
          </div>
              <div className="Memory_screen">
                <div className="table">
                  <div className="row">
                    <Number numb = {this.state.memory[0]}/>
                    <button className="memory_button" onClick={() => this.EraseMemoryOnly(0)}>MC</button>
                    <button className="memory_button" onClick={() => this.RecoverMemoryOnly(0)}>MR</button>
                  </div>
                  <div className="row">
                    <Number numb = {this.state.memory[1]}/>
                    <button className="memory_button" onClick={() => this.EraseMemoryOnly(1)}>MC</button>  
                    <button className="memory_button" onClick={() => this.RecoverMemoryOnly(1)}>MR</button>
                  </div>
                  <div className="row">
                    <Number numb = {this.state.memory[2]}/>
                    <button className="memory_button" onClick={() => this.EraseMemoryOnly(2)}>MC</button>
                    <button className="memory_button" onClick={() => this.RecoverMemoryOnly(2)}>MR</button>
                  </div>
                  <div className="row">
                    <Number numb = {this.state.memory[3]}/>
                    <button className="memory_button" onClick={() => this.EraseMemoryOnly(3)}>MC</button>
                    <button className="memory_button" onClick={() => this.RecoverMemoryOnly(3)}>MR</button>
                  </div>
                </div>
            </div>
            </div>
          </header>
      </div>

    );  
  /*Fim do Visual da calculadora*/

  }
}
export default App;
