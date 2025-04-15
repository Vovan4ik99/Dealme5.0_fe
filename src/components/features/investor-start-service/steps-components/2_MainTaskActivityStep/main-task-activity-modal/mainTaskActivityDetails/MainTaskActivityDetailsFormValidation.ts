export const PipelineFormValidation = {
    amount: {
        required: {
            message: "Podaj ilość",
            value: true
        },
        valueAsNumber: true,
        min: {
            value: 1,
            message: 'Wartość musi być większa od 0'
        }
    },
    period: {
        required: "Wybierz okres"
    },
    startDate:  {
        required: 'Data rozpoczęcia wymagana',
        valueAsDate: true
    },
    description: {
        required: " Podaj dodatkowe informacje "
    }
}