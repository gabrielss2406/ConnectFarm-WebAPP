import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
  } from "@/components/shared/ui/select";
  
  interface SelectFarmProps {
    farms: string[];
    activeFarm: string;
    setActiveFarm: (farm: string) => void;
  }
  
  export const SelectFarm: React.FC<SelectFarmProps> = ({ farms, activeFarm, setActiveFarm }) => {
    const handleValueChange = (value: string) => {
      setActiveFarm(value);
    };
  
    return (
      <Select value={activeFarm} onValueChange={handleValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue>{activeFarm || "Select a farm"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Farms</SelectLabel>
            {farms.map((farm, index) => (
              <SelectItem key={index} value={farm}>{farm}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  };
  