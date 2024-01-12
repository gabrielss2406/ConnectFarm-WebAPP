import './Main.css';
import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar'; 
import InformationExpenses from '../../components/InformationExpenses/InformationExpenses'; 

function Main() {
  const dataForInformationExpenses = {
    expenseType: 'Gasto Total',
    amount: "2500.00",
    type: 1
  };

  return (
    <div className="screen">
      <Sidebar />
      <div className="main-content">
        <div className="content-title"><h1>Data Analisys</h1></div>
        <div className="content">
        <InformationExpenses data={{ expenseType: 'Lucro', amount: "200.00", invertColor:true} } />
          < InformationExpenses data={dataForInformationExpenses} />
          < InformationExpenses data={dataForInformationExpenses} />
          < InformationExpenses data={dataForInformationExpenses} />
        </div>
      </div>
    </div>
  );
}

export default Main;