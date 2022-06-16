import icomeImg from "../../assets/income.svg";
import outcome from "../../assets/outcome.svg";
import total from "../../assets/total.svg";
import { Container } from "./styles";
import { useTransaction } from "../../hooks/useTransaction";

export function Summary() {

    const { transactions } = useTransaction();

    const summary = transactions.reduce((acc, transactions) => {
      if(transactions.type === 'deposit') {
         acc.deposit += transactions.amount;
         acc.total += transactions.amount;
      } else {
        acc.withdrawn += transactions.amount;
        acc.total -= transactions.amount;
      }

      return acc;
    },{
       deposit :0,
       withdrawn : 0,
       total : 0 
    })

    return(      
      <Container>
          <div>
              <header>
                  <p>Entradas</p>
                  <img src={icomeImg} alt="Entradas" />
              </header>
              <strong>
               {new Intl.NumberFormat('pt-br', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(summary.deposit)}                
              </strong>
          </div>

          <div>
              <header>
                  <p>Saídas</p>
                  <img src={outcome} alt="Saídas" />
              </header>
              <strong>
               - {new Intl.NumberFormat('pt-br', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(summary.withdrawn)} 
              </strong>
          </div>

          <div className="highlight-backgound">
              <header>
                  <p>Total</p>
                  <img src={total} alt="Total" />
              </header>
              <strong>
               {new Intl.NumberFormat('pt-br', {
                            style: 'currency',
                            currency: 'BRL'
                          }).format(summary.total)} 
              </strong>
          </div>
      </Container>    
    )
}