export const formatDateReturn = (value: string) => {
    const values = value.split("-")

    if (values[2])
        return `${values[2]}/${values[1]}/${values[0]}`
    return "-"
};