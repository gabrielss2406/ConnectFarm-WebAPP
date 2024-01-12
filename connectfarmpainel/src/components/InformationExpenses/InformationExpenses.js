import './InformationExpenses.css';
import MoneyBag from '../../static/moneyBag.png';
import MoneyBagGray from '../../static/moneyBagGray.png';
import List from '../../static/list.png';
import ListGray from '../../static/listGray.png';

function InformationExpenses(props) {

  const { expenseType, amount, invertColor } = props.data;

  
  return (
    <div className={`${invertColor ? 'invertedBox' : 'box'}`}>
      <div className='boxElements'>
        <div className='imgs'>
          <img
            className="imgIcon"
            src={`${invertColor ? MoneyBagGray : MoneyBag}`}
            alt="moneyBag-icon"
          />
          <img
            className="imgList"
            src={`${invertColor ? ListGray : List}`}
            alt="list-icon"
          />
        </div>

        <div className='expenseTypeText'>
          {expenseType}
        </div>

        <div className='amountText'>
          R$ {amount}
        </div>
      </div>
    </div>
  );
}

export default InformationExpenses;