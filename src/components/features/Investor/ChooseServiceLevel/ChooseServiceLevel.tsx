import BackToPreviousPage from "../BackToPreviousPage/BackToPreviousPage";

const ChooseServiceLevel = () => {
    return (
        <BackToPreviousPage
        onClick={() => console.log("hello")}
        text={"Wiem jakiej usługi potrzebuję"}
        title={"Wybierz poziom usługi"}
      />
    )
}
export default ChooseServiceLevel;