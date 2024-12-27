import Select from "react-select";
import ArrowDropDownCircle from "../../public/static/images/arrow_drop_down_circle.svg";
import ArrowDropDownCircleWhite from "../../public/static/images/arrow_drop_down_circle_white.svg";
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
  darkMode?: boolean;
}

const DropdownIndicator = (isMobile: boolean, darkMode: boolean) => (
  <Image
    src={darkMode ? ArrowDropDownCircleWhite : ArrowDropDownCircle}
    alt="dropdown indicator"
    width={isMobile ? 20 : 40}
    height={isMobile ? 20 : 40}
  />
);

const PADDING = {
  mobile: {
    x: "!px-4", // 16px
    y: "!py-2", // 8px
  },
  desktop: {
    x: "!px-8", // 32px
    y: "!py-4", // 16px
  },
};

const customStyles = {
  control: (provided: any) => ({
    ...provided,
    border: "2px solid #053749",
    borderRadius: "8px",
    padding: "8px 16px",
    boxShadow: "none",
    "&:hover": {
      border: "2px solid #053749",
    },
    minHeight: "32px",
  }),
  option: (provided: any, state: { isSelected: boolean }) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#053749" : "white",
    color: state.isSelected ? "white" : "#053749",
    padding: "16px",
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#053749",
      color: "white",
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    border: "2px solid #053749",
  }),
  menuList: (provided: any) => ({
    ...provided,
    padding: 0,
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: "#053749",
    fontWeight: "bold",
  }),
};

export default function BaseSelect({
  name,
  options,
  defaultValue,
  onChange,
  className,
  ariaLabel,
  isMobile = false,
  darkMode = false,
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
        DropdownIndicator: () => DropdownIndicator(isMobile, darkMode),
        IndicatorSeparator: () => null,
      }}
      className={className}
      unstyled={true}
      classNames={{
        control: () =>
          `${
            isMobile
              ? `flex !px-3 !py-0 items-center h-8 gap-2`
              : `flex h-16 px-8 !pl-[32px] !pr-[32px] py-4 justify-center items-center gap-[8px]`
          }`,
        container: () => "relative",
        valueContainer: () => "flex flex-1 items-center justify-center",
        singleValue: () =>
          `align-middle
        ${
          isMobile
            ? `text-[14px] font-bold`
            : `text-center text-[24px] not-italic font-extrabold leading-[normal] flex-1`
        }`,
        indicatorSeparator: () => "hidden",
        dropdownIndicator: () =>
          `flex items-center ${
            isMobile ? "!w-[20px] !h-[20px]" : "!w-[40px] !h-[40px]"
          }`,
        option: ({ isSelected }) =>
          `${
            isSelected ? "bg-[#053749] text-white" : "bg-white text-[#053749]"
          } p-4 font-bold hover:bg-[#053749] hover:text-white`,
        menu: () => "rounded-lg shadow-lg border-2 border-[#053749]",
        menuList: () => "p-0",
      }}
      styles={customStyles}
      isSearchable={false}
    />
  );
}
