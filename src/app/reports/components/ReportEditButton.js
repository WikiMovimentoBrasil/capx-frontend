import ActionButton from "@/components/ActionButton";

export default function ReportEditButton({children, to}) {
    const buttonStyle = "bg-capx-secondary-purple hover:bg-capx-primary-green text-[#F6F6F6] hover:text-capx-dark-bg w-fit text-base px-4 sm:px-8 py-3 rounded-full";

    return (
        <ActionButton
            to={to}
            customClass={buttonStyle}
        >
            {children}
        </ActionButton>
    )
}