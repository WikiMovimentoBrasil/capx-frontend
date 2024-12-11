import Select, { components } from "react-select";

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
}

// Custom dropdown indicator component
const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_13461_4282"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="20"
          height="20"
        >
          <rect width="20" height="20" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_13461_4282)">
          <path
            d="M9.99935 12.4165L13.1383 9.2638H6.84664L9.99935 12.4165ZM9.99935 18.3332C8.85588 18.3332 7.7772 18.1144 6.76331 17.6769C5.74942 17.2394 4.86511 16.6434 4.11039 15.8888C3.35581 15.1341 2.75977 14.2498 2.32227 13.2359C1.88477 12.222 1.66602 11.1433 1.66602 9.99984C1.66602 8.84706 1.88477 7.76373 2.32227 6.74984C2.75977 5.73595 3.35581 4.854 4.11039 4.104C4.86511 3.354 5.74942 2.76025 6.76331 2.32275C7.7772 1.88525 8.85588 1.6665 9.99935 1.6665C11.1521 1.6665 12.2355 1.88525 13.2494 2.32275C14.2632 2.76025 15.1452 3.354 15.8952 4.104C16.6452 4.854 17.2389 5.73595 17.6764 6.74984C18.1139 7.76373 18.3327 8.84706 18.3327 9.99984C18.3327 11.1433 18.1139 12.222 17.6764 13.2359C17.2389 14.2498 16.6452 15.1341 15.8952 15.8888C15.1452 16.6434 14.2632 17.2394 13.2494 17.6769C12.2355 18.1144 11.1521 18.3332 9.99935 18.3332ZM9.99935 16.9442C11.9345 16.9442 13.5757 16.2683 14.9229 14.9165C16.2701 13.5647 16.9437 11.9258 16.9437 9.99984C16.9437 8.0647 16.2701 6.42352 14.9229 5.0763C13.5757 3.72907 11.9345 3.05546 9.99935 3.05546C8.07338 3.05546 6.43449 3.72907 5.08268 5.0763C3.73088 6.42352 3.05497 8.0647 3.05497 9.99984C3.05497 11.9258 3.73088 13.5647 5.08268 14.9165C6.43449 16.2683 8.07338 16.9442 9.99935 16.9442Z"
            fill="#053749"
          />
        </g>
      </svg>
    </components.DropdownIndicator>
  );
};

const customStyles = {
  control: (base: any) => ({
    ...base,
    border: "solid #053749",
    borderWidth: "1.5",
    borderRadius: "8px",
    color: "#053749",
    fontWeight: "bold",
    minHeight: "32px",
    height: "32px",
    padding: "0px 4px 0px 8px",
    display: "flex",
    alignItems: "center",
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: "0",
    height: "30px",
    display: "flex",
    alignItems: "center",
    paddingBottom: "8px",
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "#053749",
    fontWeight: "bold",
    margin: "0",
    display: "flex",
    alignItems: "center",
    paddingBottom: "8px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    padding: "0 4px",
    display: "flex",
    alignItems: "center",
  }),
  option: (base: any, state: any) => ({
    ...base,
    color: "#053749",
    backgroundColor: state.isSelected ? "#E5E7EB" : "white",
    "&:hover": {
      backgroundColor: "#F3F4F6",
    },
    height: "32px",
    display: "flex",
    alignItems: "center",
    paddingBottom: "8px",
  }),
};

export default function BaseSelect({
  name,
  options,
  defaultValue,
  onChange,
  className,
  ariaLabel,
}: BaseSelectProps) {
  return (
    <div className="flex items-center justify-center flex w-fit h-2 my-auto">
      <Select
        name={name}
        instanceId={name}
        options={options}
        defaultValue={defaultValue}
        onChange={onChange}
        styles={customStyles}
        aria-label={ariaLabel}
        components={{ DropdownIndicator }}
      />
    </div>
  );
}
