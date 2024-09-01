import Image from 'next/image';
import MoneyBag from '@/static/money_bag.png';
import MoneyBagGray from '@/static/money_bag_gray.png';
import ListN from '@/static/list_n.png';
import ListGray from '@/static/list_gray.png';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../shared/ui/card';
import { Equal, MoveDown, MoveUp } from 'lucide-react';

interface InformationExpensesProps {
  amount: number;
  invertColor: boolean;
  expenseType: string;
  change?: number;
}

const InformationExpenses: React.FC<InformationExpensesProps> = ({ amount, invertColor, expenseType, change }) => {
  const getChangeIcon = () => {
    if (change > 0) return <MoveUp color='green' />;
    if (change < 0) return <MoveDown color='red' />;
    return <Equal color='gray' />;
  };

  return (
    <Card className={`h-auto w-full flex-1 min-w-32 ${invertColor ? 'bg-white text-[#303030]' : 'bg-[#303030] text-white'}`}>
      <CardHeader>
        <CardTitle>
          <div className='flex flex-row justify-between'>
            <Image
              className="w-[20%] h-auto mb-[5%]"
              src={invertColor ? MoneyBagGray : MoneyBag}
              alt="moneyBag-icon"
            />
            <Image
              className="h-1/2 w-auto"
              src={invertColor ? ListGray : ListN}
              alt="list-icon"
            />
          </div>
        </CardTitle>
        <CardDescription>{expenseType}</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-row justify-between flex-wrap'>
        <p>R$ {amount.toFixed(2)}</p>
        {change !== null && change !== undefined && (
          <div className="flex items-center">
            {getChangeIcon()}
            <span className="ml-2">{change.toFixed(2)}%</span>
          </div>
        )
        }
      </CardContent>
    </Card>
  );
}

export default InformationExpenses;
