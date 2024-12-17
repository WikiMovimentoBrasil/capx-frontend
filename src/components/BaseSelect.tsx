import Select from "react-select";
import ArrowDropDownCircle from "../../public/static/images/arrow_drop_down_circle.svg";
import Image from "next/image";

interface Option {
  value: string;
  label: string;
}

interface BaseSelectProps {
  name: string;
  options: Option[];
  defaultValue: Option;
  onChange: (selectedOption: Option) => void;
  className?: string;
  ariaLabel?: string;
  isMobile?: boolean;
}

const DropdownIndicator = (isMobile: boolean) => {
  return (
    <Image
      src={ArrowDropDownCircle}
      alt="dropdown indicator"
      width={isMobile ? 24 : 40}
      height={isMobile ? 24 : 40}
    />
  );
};

export default function BaseSelect({
  name,
  options,
  defaultValue,
  onChange,
  className,
  ariaLabel,
  isMobile = false,
}: BaseSelectProps) {
  return (
    <Select
      name={name}
      instanceId={name}
      options={options}
      defaultValue={defaultValue}
      onChange={onChange}
      aria-label={ariaLabel}
      components={{
        DropdownIndicator: () => DropdownIndicator(isMobile),
      }}
      className={className}
      unstyled={true}
      classNames={{
        control: () =>
          "!border-2 !border-solid !border-capx-dark-box-bg !rounded-lg text-capx-dark-box-bg font-extrabold h-8 sm:h-16 flex items-center cursor-pointer m-0 px-4 sm:px-8 text-sm sm:text-2xl",
        container: () => "h-16 sm:h-8 flex items-center",
        valueContainer: () => "h-8 sm:h-8 flex items-center",
        singleValue: () =>
          "text-capx-dark-box-bg font-extrabold text-sm sm:text-2xl h-8 sm:h-8 flex items-center rounded-lg text-center not-italic leading-6 pr-2",
        indicatorSeparator: () => "hidden",
        dropdownIndicator: () => "h-8 sm:h-8 flex items-center",
        option: (state) =>
          `text-capx-dark-box-bg ${
            state.isSelected ? "bg-gray-200" : "bg-white"
          } hover:bg-gray-100 h-8 sm:h-14 flex items-center px-4 sm:px-8 text-sm sm:text-2xl`,
      }}
    />
  );
}
