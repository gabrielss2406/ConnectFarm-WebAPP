import MoneyBag from '@/static/money_bag.png';
import MoneyBagGray from '@/static/money_bag_gray.png';
import List from '@/static/list.png';
import ListGray from '@/static/list_gray.png';

interface InformationExpensesProps {
    amount: number
    invertColor: boolean
    expenseType: string
}

function InformationExpenses(props: InformationExpensesProps) {
  return (
    <div className={`
        flex flex-col md:w-[30vh] md:h-[30vh] w-[20vh] h-[20vh]
        ${props.invertColor ? 'bg-white text-[#303030]' : 'bg-[#303030] text-white'}
    `}>
      <div className={`
        flex flex-col justify-between
        mt-[10%] ml-[15%] mb-[20%] h-full
      `}>
        <div className='flex flex-row justify-between w-3/4'>
          <img
            className="w-[30%] h-auto mb-[5%]"
            src={`${props.invertColor ? MoneyBagGray.src : MoneyBag.src}`}
            alt="moneyBag-icon"
          />
          <img
            className="h-1/2 w-auto mb-[5%]"
            src={`${props.invertColor ? ListGray.src : List.src}`}
            alt="list-icon"
          />
        </div>

        <div className='text-[#8E8D8D] font-extrabold'>
          {props.expenseType}
        </div>

        <div className='font-extrabold text-lg'>
          R$ {props.amount}
        </div>
      </div>
    </div>
  );
}

export default InformationExpenses;