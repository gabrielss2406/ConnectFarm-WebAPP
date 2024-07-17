import Image from 'next/image';
import MoneyBag from '@/static/money_bag.png';
import MoneyBagGray from '@/static/money_bag_gray.png';
import ListN from '@/static/list_n.png';
import ListGray from '@/static/list_gray.png';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shared/ui/card';

interface InformationExpensesProps {
    amount: number;
    invertColor: boolean;
    expenseType: string;
}

function InformationExpenses(props: InformationExpensesProps) {
  return (
    <Card className={`h-auto w-full flex-1
      ${props.invertColor ? 'bg-white text-[#303030]' : 'bg-[#303030] text-white'}`}>
      <CardHeader>
        <CardTitle>
          <div className='flex flex-row justify-between'>
            <Image
              className="w-[20%] h-auto mb-[5%]"
              src={props.invertColor ? MoneyBagGray : MoneyBag}
              alt="moneyBag-icon"
            />
            <Image
              className="h-1/2 w-auto"
              src={props.invertColor ? ListGray : ListN}
              alt="list-icon"
            />
          </div>
        </CardTitle>
        <CardDescription>{props.expenseType}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>R$ {props.amount}</p>
      </CardContent>
    </Card>
  );
}

export default InformationExpenses;
