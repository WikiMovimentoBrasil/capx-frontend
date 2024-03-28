import TextArea from "./TextArea";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import MultiSelectInput from "./MultiSelectInput";

export default function ProfileForm() {
  return (
    <section className="flex flex-wrap flex-col w-10/12 mx-auto sm:mt-52 sm:pb-32 font-montserrat">
      <SelectInput>Pronoun</SelectInput>
      <TextInput>Display name</TextInput>
      <TextInput>Profile image</TextInput>
      <TextArea>About me</TextArea>
      <TextInput>X</TextInput>
      <TextInput>Facebook</TextInput>
      <TextInput>Instagram</TextInput>
      <TextInput>Telegram</TextInput>
      <TextInput>Github</TextInput>
      <TextInput>IRC</TextInput>
      <TextInput>Wikimedia alternative account</TextInput>
      <TextInput>Wikimedia developer account</TextInput>
      <SelectInput>Preferred contact method</SelectInput>
      <SelectInput>Region</SelectInput>
      <MultiSelectInput>Language</MultiSelectInput>
      <MultiSelectInput>Affiliation</MultiSelectInput>
      <MultiSelectInput>Wikimedia project</MultiSelectInput>
      <MultiSelectInput>Area of interest</MultiSelectInput>
      <MultiSelectInput>Known capacities</MultiSelectInput>
      <MultiSelectInput>Desired capacities</MultiSelectInput>
    </section>
  )
}