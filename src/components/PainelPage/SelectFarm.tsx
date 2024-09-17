import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/shared/ui/select";

interface Farm {
  id: string;
  name: string;
}

interface SelectFarmProps {
  farms: Farm[];
  activeFarmId: string;
  setActiveFarmId: (id: string) => void;
}

export const SelectFarm: React.FC<SelectFarmProps> = ({ farms, activeFarmId, setActiveFarmId }) => {
  const handleValueChange = (value: string) => {
    setActiveFarmId(value);
  };
  return (
    <Select value={activeFarmId} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue>{activeFarmId}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Farms</SelectLabel>
          {farms?.map(farm => (
            <SelectItem key={farm.id} value={farm.id}>
              {farm.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
