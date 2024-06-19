export default function TextDoubleInput({ children, darkMode, placeholderDisplayName, placeholderValue, formData, setFormData, field, type = "text", maxLength = 10 }) {
  const handleFieldChange = (index, subField, value) => {
    const updatedField = formData.userData[field].map((item, i) =>
      i === index ? { ...item, [subField]: value } : item
    );

    setFormData((prevState) => ({
      ...prevState,
      userData: {
        ...prevState.userData,
        [field]: updatedField,
      },
    }));
  };

  const addField = () => {
    if (formData.userData[field].length < 3) {
      setFormData((prevState) => ({
        ...prevState,
        userData: {
          ...prevState.userData,
          [field]: [...prevState.userData[field], { display_name: '', value: '' }],
        },
      }));
    }
  };

  if (formData.userData[field] === null) {
    const newUserData = {
      ...formData.userData,
      [field]: [
        { display_name: "", value: "" },
        { display_name: "", value: "" },
        { display_name: "", value: "" },
      ]
    };
    setFormData({ ...formData, userData: newUserData });
  }

  if (formData.userData[field] !== null) {
    return (
      <div className="w-full space-y-2">
        <label className="w-full ml-2">{children}</label>
        <div className={(darkMode ? "bg-capx-dark-box-bg " : "bg-capx-light-box-bg ") + "w-full text-capx-dark-bg p-8 rounded-lg space-y-4"}>
          {formData.userData[field].map((item, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 sm:gap-10">
              <input
                type={type}
                placeholder={placeholderDisplayName}
                className="w-full h-12 pl-4 border-2 rounded-md"
                value={item.display_name}
                onChange={(e) => handleFieldChange(index, 'display_name', e.target.value)}
              />
              <input
                type={type}
                placeholder={placeholderValue}
                className="w-full h-12 pl-4 border-2 rounded-md"
                value={item.value}
                onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }
}